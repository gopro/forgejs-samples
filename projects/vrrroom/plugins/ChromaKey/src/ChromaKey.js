var ForgePlugins = ForgePlugins || {};

/**
 * ChromaKey plugin
 * Extract foreground with chromakey algorithm
 * Author / Provider modes to prepare settings and them use them
 *
 * @constructor ForgePlugins.ChromaKey
 */
ForgePlugins.ChromaKey = function()
{
    // Flags
    this._mediaReady = false;

    this._canvasReady = false;

    this._needsUpdate = false;

    this._authoring = false;

    // Input media
    this._mediaURL = null;

    this._media = null;

    this._mediaType = null;

    this._mediaLastFrameIndex = null;

    // Processing settings
    this._backgroundRGB = null;

    this._backgroundYCrCb = null;

    this._threshold = 0;

    this._smoothness = 0;

    this._backgroundSample = null;

    // Processing objects
    this._canvasSrc = null;

    this._canvasDst = null;

    // UI
    this._ui = null;

    // dat.gui
    this._datGUI = null;

    this._datGUIControls = null;

    // Worker
    this._workerState = -1; // State machine

    this._worker = null;

    this._onWorkerMessageBound = null;

    this._onWorkerErrorBound = null;
};

ForgePlugins.ChromaKey.WORKER_STATE = {
    INIT: -1, // worker is not ready
    IDLE: 0, // worker is ready, but nothing happens
    PROCESSING: 1 // worker is processing current frame, wait for response
};

ForgePlugins.ChromaKey.prototype = {

    /**
     * Boot sequence
     * Create UI object, set flags and get options from json config
     * Set authoring mode if asked by caller
     * Set input media
     */
    boot: function()
    {
        this._authoring = this.plugin.options.authoring || false;

        this._worker = new Worker(this.plugin.fullUrl + "src/ChromaKeyWorker.js");

        this._onWorkerMessageBound = this._onWorkerMessage.bind(this);
        this._worker.addEventListener("message", this._onWorkerMessageBound, true);

        this._onWorkerErrorBound = this._onWorkerError.bind(this);
        this._worker.addEventListener("error", this._onWorkerErrorBound, true);

        if (this._authoring)
        {
            this._datGUIControls = new ForgePlugins.ChromaKeySettings(this);
            this._initGUI();
        }

        // Apply mutable settings to dat structure if authoring mode
        if (typeof this.plugin.options.background !== "undefined")
        {
            if (this._authoring)
            {
                this._datGUIControls.background = this.plugin.options.background;
            }
            else
            {
                this.background = this.plugin.options.background;
            }
        }

        // Apply mutable settings to dat structure if authoring mode
        if (typeof this.plugin.options.backgroundSample !== "undefined")
        {
            this._backgroundSample = this.plugin.options.backgroundSample;
        }

        if (typeof this.plugin.options.threshold !== "undefined")
        {
            if (this._authoring)
            {
                this._datGUIControls.threshold = this.plugin.options.threshold;
            }
            else
            {
                this.threshold = this.plugin.options.threshold;
            }
        }

        if (typeof this.plugin.options.smoothness !== "undefined")
        {
            if (this._authoring)
            {
                this._datGUIControls.smoothness = this.plugin.options.smoothness;
            }
            else
            {
                this.smoothness = this.plugin.options.smoothness;
            }
        }

        if (typeof this.plugin.options.url !== "undefined")
        {
            this._setMedia(this.plugin.options.url);
        }

        this._workerState = ForgePlugins.ChromaKey.WORKER_STATE.IDLE;
    },

    /**
     * Destroy sequence
     */
    destroy: function()
    {
        this._mediaReady = false;
        this._needsUpdate = false;

        this._deinitDatGui();

        if (this._ui !== null)
        {
            this._destroyGUI();
        }

        if (this._canvasSrc !== null)
        {
            this._canvasSrc.destroy();
            this._canvasSrc = null;
        }

        if (this._canvasDst !== null)
        {
            this._canvasDst.destroy();
            this._canvasDst = null;
        }

        if (this._media !== null)
        {
            if (this._media.onEnded.has(this._onVideoEnded, this))
            {
                this._media.onEnded.remove(this._onVideoEnded, this);
            }
            this._media.destroy();
            this._media = null;
        }
        this._mediaURL = null;
        this._mediaType = null;

        this._worker.terminate();
        this._worker = null;
        this._onWorkerMessageBound = null;
        this._onWorkerErrorBound = null;

        this._backgroundRGB = null;
        this._backgroundYCrCb = null;
    },

    /**
     * Update routine
     */
    update: function()
    {
        if (this._workerState !== ForgePlugins.ChromaKey.WORKER_STATE.IDLE ||
            this._mediaReady === false ||
            this._canvasReady === false)
        {
            return;
        }

        // Force update if video has enough data for current frame or more
        if (this._mediaType === "video")
        {
            var video = this._media.videos[0].element;
            if (video.readyState >= video.HAVE_CURRENT_DATA)
            {
                var frameIndex = Math.floor(this._media.currentTime * this._media.data.framerate);
                if (frameIndex !== this._mediaLastFrameIndex)
                {
                    this._needsUpdate = true;
                    this._mediaLastFrameIndex = frameIndex;
                }
            }
        }

        if (this._needsUpdate === false)
        {
            return;
        }

        // Compute output frame
        this._computeFrame();

        // Refresh update flag
        this._needsUpdate = false;
    },

    /**
     * Placeholder, do nothing
     */
    reset: function() {},

    /**
     * Toggle play/pause
     */
    togglePlayPause: function()
    {
        if (this._mediaType === "image")
        {
            return;
        }

        if (this._media.playing)
        {
            this._media.pause();
        }
        else
        {
            this._media.play();
        }

        if (this._authoring === true)
        {
            this.togglePlayPauseAuthoring();
        }
    },

    /**
     * Internal log function
     * @param  {String} text text to log
     * @private
     */
    _log: function(text)
    {
        this.plugin.log("[" + this.plugin.instanceConfig.uid + "] " + text);
    },

    /**
     * Set media
     * @param {String} url media URL
     * @private
     */
    _setMedia: function(url)
    {
        this._log("Set media " + url);

        this._mediaURL = url;

        // Set media type
        this._mediaType = "image";
        var videoTypes = ["mp4", "webm", "ogg"];
        for (var i = 0, ii = videoTypes.length; i < ii; i++)
        {
            if (this._mediaURL.indexOf(videoTypes[i]) !== -1)
            {
                this._mediaType = "video";
                break;
            }
        }

        var mediaConfig = {
            key: this._uid,
            url: this._mediaURL
        };

        // Create media element
        if (this._mediaType === 'image')
        {
            this._media = this.plugin.create.image(mediaConfig);
            this._media.onLoadComplete.addOnce(this._onMediaLoadComplete, this);
        }
        else
        {
            this._media = this.plugin.create.video(this._uid, null, FORGE.VideoFormat.HTML5);
            this._media.load([this._mediaURL]);
            this._media.onLoadedMetaData.addOnce(this._onMediaLoadComplete, this);
            this._media.onEnded.add(this._onVideoEnded, this);
        }
    },

    /**
     * Media load complete event handler
     * @param {Event} event load complete event
     * @private
     */
    _onMediaLoadComplete: function(event)
    {
        this._setupCanvas();
        this._mediaReady = true;

        if (this.plugin.options.autoPlay === true)
        {
            this._start();
        }

        if (this._mediaType === "video")
        {
            if (this._media.data === null)
            {
                this._media.data = {};
            }

            this._media.data.framerate = this._media.data.framerate || 30;
        }

        this._needsUpdate = true;
    },

    /**
     * Video ended event handler
     * @param {Event} event event object
     * @private
     */
    _onVideoEnded: function(event)
    {
        this._media.currentTime = 0;
        this._media.play();
    },

    /**
     * Set background
     * @param {String} value background color string rgba(r,g,b)
     * @private
     */
    _setBackground: function(value)
    {
        this._backgroundRGB = FORGE.Color.fromRgbaString(value);
        this._backgroundYCrCb = FORGE.Color.rgbToYcbcr(this._backgroundRGB);
        this._needsUpdate = true;
    },

    /**
     * Set threshold
     * @param {Number} value treshold
     * @private
     */
    _setThreshold: function(value)
    {
        this._threshold = value;
        this._needsUpdate = true;
    },

    /**
     * Set alpha smoothness
     * @param {String} value alpha smoothness (percent)
     * @private
     */
    _setSmoothness: function(value)
    {
        this._smoothness = FORGE.Math.clamp(value, 0, 1);
        this._needsUpdate = true;
    },

    /**
     * get media size
     * @param {Object} object with width and height property
     * @private
     */
    _getMediaSize: function()
    {
        if (this._mediaType === 'video')
        {
            return {
                width: this._media.originalWidth,
                height: this._media.originalHeight
            }
        }

        return {
            width: this._media.width,
            height: this._media.height
        }
    },

    /**
     * Setup canvas objects
     * @private
     */
    _setupCanvas: function()
    {
        this._log("Setup canvas");
        var size = this._getMediaSize();

        this._canvasSrc = this.plugin.create.canvas();
        this._canvasDst = this.plugin.create.canvas();

        this._canvasSrc.width = this._canvasDst.width = size.width;
        this._canvasSrc.height = this._canvasDst.height = size.height;

        if (this._authoring === true)
        {
            this._setupCanvasAuthoring(size);
        }

        this._autoResizeContainer();

        this._computeFrame();
    },

    _onWorkerMessage: function(msg)
    {
        // this._log("Compute frame done");
        this._workerState = ForgePlugins.ChromaKey.WORKER_STATE.IDLE;

        if (msg.data.success === true)
        {
            if (this._canvasReady === false)
            {
                this._canvasReady = true;
                this.plugin.notifyInstanceReady();
            }
            this._canvasDst.context2D.putImageData(msg.data.frame, 0, 0);
            delete msg.data.frame;

            this.updatePreview();
        }
    },

    _onWorkerError: function(event)
    {
        this._workerState = ForgePlugins.ChromaKey.WORKER_STATE.IDLE;

        if (typeof event.message !== "undefined")
        {
            throw new Error(event.message + " (" + event.filename + ":" + event.lineno + ")");
        }
    },

    /**
     * Compute a frame
     * Get image data from source canvas
     * Put image data into dest canvas
     *
     * @todo: should use a web worker to lighten main thread
     * @private
     */
    _computeFrame: function()
    {
        this._log("Compute frame");

        var size = this._getMediaSize();
        var w = size.width;
        var h = size.height;

        // Prepare input frame
        var ctx = this._canvasSrc.context2D;
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(this._media.element, 0, 0, w, h);

        var frame = ctx.getImageData(0, 0, w, h);

        // Use sample 10x10 as background color
        if (this._backgroundSample !== null)
        {
            var idx = this._backgroundSample.x + this._backgroundSample.y * w;

            var r = frame.data[4 * idx + 0];
            var g = frame.data[4 * idx + 1];
            var b = frame.data[4 * idx + 2];
            var rgb = "rgb(" + r + "," + g + "," + b + ")";

            this._setBackground(rgb);
        }

        // Sending canvas data to the worker using a copy memory operation
        var workerParams = {
            action: "do",
            frame: frame,
            width: w,
            height: h,
            background: this._backgroundYCrCb,
            threshold: this._threshold,
            smoothness: this._smoothness
        }
        this._workerState = ForgePlugins.ChromaKey.WORKER_STATE.PROCESSING;
        this._worker.postMessage(workerParams);
    },

    /**
     * Start processing
     * @private
     */
    _start: function()
    {
        if (this._mediaReady === false)
        {
            return;
        }

        this.togglePlayPause();
    }
};

/**
 * Get and set media URL
 * @name ForgePlugins.ChromaKey#url
 * @type {String}
 */
Object.defineProperty(ForgePlugins.ChromaKey.prototype, "url",
{
    get: function()
    {
        return this._mediaURL;
    },

    set: function(value)
    {
        if (typeof value !== "string")
        {
            return;
        }

        this._setMedia(value);
    }
});

/**
 * Get and set background color (RGB)
 * @name ForgePlugins.ChromaKey#background
 * @type {String}
 */
Object.defineProperty(ForgePlugins.ChromaKey.prototype, "background",
{
    get: function()
    {
        return this._backgroundRGB;
    },

    set: function(value)
    {
        this._setBackground(value);
    }
});

/**
 * Get and set threshold
 * @name ForgePlugins.ChromaKey#threshold
 * @type {String}
 */
Object.defineProperty(ForgePlugins.ChromaKey.prototype, "threshold",
{
    get: function()
    {
        return this._threshold;
    },

    set: function(value)
    {
        this._setThreshold(value);
    }
});

/**
 * Get and set smoothness
 * @name ForgePlugins.ChromaKey#smoothness
 * @type {String}
 */
Object.defineProperty(ForgePlugins.ChromaKey.prototype, "smoothness",
{
    get: function()
    {
        return this._smoothness * 100;
    },

    set: function(value)
    {
        this._setSmoothness(value / 100);
    }
});

/**
 * Get provider
 * @name ForgePlugins.ChromaKey#provider
 * @type {FORGE.Canvas}
 */
Object.defineProperty(ForgePlugins.ChromaKey.prototype, "texture",
{
    get: function()
    {
        return this._canvasDst;
    }
});