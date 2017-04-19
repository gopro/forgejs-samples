var ForgePlugins = ForgePlugins || {};

/**
 * This plugin displays a simple heartbeat meter on the screen, indicating the
 * speed of the vehicule the camera is in.
 */
ForgePlugins.Heartbeat = function()
{
    // The reference to the video, for synchronization
    this._video = null;

    // Is the plugin ready for update
    this._ready = true;

    // Main container of the plugin
    this._container = null;

    // The FORGE.Sprite containing the animation for the heart
    this._heartbeat = null;

    // The FORGE.TextField containing the beating value
    this._heartbeatPulse = null;

    // Timeline for sync
    this._timeline = null;

    // Current keyframe
    this._keyframe = null;
};

ForgePlugins.Heartbeat.prototype = {

    /**
     * The boot function
     */
    boot: function()
    {
        // Setup the reference to the video
        this._setupVideo();

        // Create a timeline
        this._timeline = new FORGE.Timeline();

        // Create a div containing the informations
        this._container = this.plugin.create.displayObjectContainer();
        this._container.width = this.plugin.options.width;
        this._container.height = this.plugin.options.height;
        this._container.top = this.plugin.options.top;
        this._container.left = this.plugin.options.left;
        this._container.right = this.plugin.options.right;
        this._container.bottom = this.plugin.options.bottom;
        this._container.background = this.plugin.options.background;

        // Add it to the main container
        this.plugin.container.addChild(this._container);

        // Create the elements composing the heartbeat meter (one textfield and an image)
        this._createHeartbeat();

        // Get the keyframes for sync
        this._loadKeyframes();
    },

    /**
     * Get the video to sync with, and set it as a reference for
     * synchronization.
     */
    _setupVideo: function(video)
    {
        if (this.plugin.options.source === "media")
        {
            this._video = this.viewer.story.scene.media.displayObject;
        }
        else if (FORGE.UID.isTypeOf(this.plugin.options.source, "Plugin") === true)
        {
            var plugin = FORGE.UID.get(this.plugin.options.source);

            if (plugin.instanceReady === true)
            {
                this._video = plugin.instance.video;
            }
            else
            {
                if (plugin.onInstanceReady.has(this._setupVideo, this) === false)
                {
                    plugin.onInstanceReady.addOnce(this._setupVideo, this);
                }
            }
        }

        if (FORGE.Utils.isTypeOf(this._video, "VideoHTML5") === true || FORGE.Utils.isTypeOf(this._video, "VideoDash") === true)
        {
            this._video.onSeeked.add(this._onSeekedHandler, this);
            this._video.onPlay.add(this._onPlayHandler, this);
            this._video.onPause.add(this._onPauseHandler, this);
        }
    },

    /**
     * Remove the video reference and its event handlers
     */
    _clearVideo: function()
    {
        if (this._video !== null)
        {
            this._video.onSeeked.remove(this._onSeekedHandler, this);
            this._video.onPlay.remove(this._onPlayHandler, this);
            this._video.onPause.remove(this._onPauseHandler, this);
        }

        this._video = null;
    },

    /**
     * Create the textfield and image containing informations about the heartbeat
     */
    _createHeartbeat: function()
    {
        var config = {
            "key": "heartbeat",
            "url": this.plugin.options.urlIcon,
            "frames": this.plugin.options.urlAnimation
        };

        this._heartbeat = this.plugin.create.sprite(config);
        this._heartbeat.animations.add("pulse", 0, this.plugin.options.frames, 60, true);
        this._heartbeat.animations.stop();
        this._heartbeat.width = this._container.width;
        this._heartbeat.height = this._container.height;
        this._heartbeat.right = 5;
        this._heartbeat.verticalCenter = true;
        this._container.addChild(this._heartbeat);

        this._heartbeatPulse = this.plugin.create.textField();
        this._heartbeatPulse.value = "";
        this._heartbeatPulse.left = 15;
        this._heartbeatPulse.verticalCenter = true;
        this._heartbeatPulse.color = this.plugin.options.font.color;
        this._heartbeatPulse.fontSize = this.plugin.options.font.size;
        this._heartbeatPulse.fontFamily = this.plugin.options.font.family;
        this._container.addChild(this._heartbeatPulse);
    },

    /**
     * Create the timeline given the keyframes
     * @param {Object} data - the data containing the keyframes
     */
    _createTimeline: function(data)
    {
        var keyframes = [];
        var keyframe;
        for (var i = 0, ii = data.length; i < ii; i++)
        {
            keyframe = new FORGE.Keyframe(data[i].ts, data[i].data);
            keyframes.push(keyframe);
        }

        this._timeline.keyframes = keyframes;

        this._ready = true;
        this.plugin.notifyInstanceReady();
    },

    /**
     * Load the keyframes from the json file, or directly from the json configuration
     */
    _loadKeyframes: function()
    {
        if (typeof this.plugin.data.keyframes === "object")
        {
            this._createTimeline(this.plugin.data.keyframes);
        }
        else if (typeof this.plugin.data.keyframes)
        {
            this.viewer.load.json(this.plugin.uid + "-keyframes", this.plugin.data.keyframes, this._keyframesLoadCompleteHandler, this);
        }
    },

    /**
     * Keyframe load complete handler
     */
    _keyframesLoadCompleteHandler: function(event)
    {
        if (event.data !== null && typeof event.data.keyframes === "object")
        {
            this._createTimeline(event.data.keyframes);
        }
    },

    /**
     * Handler when the video is seeked, so the heartbeat can be sync with
     */
    _onSeekedHandler: function()
    {
        this._currentTime = this._video.currentTime;
    },

    /**
     * Handler when the video is played, so the heart can be played too
     */
    _onPlayHandler: function()
    {
        if (this._heartbeat.loaded === false)
        {
            this._heartbeat.onLoadComplete.addOnce(this._heartbeatLoadCompleteHandler, this);
            return;
        }

        if (this._heartbeat.animations.current.paused === true)
        {
            this._heartbeat.resume();
        }
        else
        {
            this._heartbeat.play("pulse", true);
        }
    },

    /**
     * Handler when the video is paused, so the heartbeat can be paused too
     */
    _onPauseHandler: function()
    {
        if (this._heartbeat.animations.current.playing === true)
        {
            this._heartbeat.pause();
        }
    },

    /**
     * Heartbeat load complete handler
     */
    _heartbeatLoadCompleteHandler: function()
    {
        if (this._video !== null && this._video.playing === true)
        {
            this._heartbeat.play("pulse", true);
        }
    },

    /**
     * Reset the entire plugin, on scene change. Reload everything, useful if
     * the driver is changing.
     */
    reset: function()
    {
        this._ready = false;

        this._clearVideo();
        this._setupVideo();

        this._loadKeyframes();
    },

    /**
     * Update if needed the displayed value, if the next jeyframe is attained.
     */
    update: function()
    {
        if (this._heartbeat.loaded === false || this._video === null || this._ready === false || this._video.playing === false || (this._video.duration - this._video.currentTime) <= 0)
        {
            return;
        }

        var kf = this._timeline.getKeyframes(this._video.currentTimeMS);
        if (kf !== null)
        {
            var keyframe = kf.previous;

            if (typeof keyframe !== "undefined" && keyframe !== this._keyframe)
            {
                this._keyframe = keyframe;

                //pulse value
                this._heartbeatPulse.value = this._keyframe.data;

                var totalFrames = this._heartbeat.animations.current.frames.length;
                var frameRate = Math.round((this._keyframe.data * totalFrames) / 60);

                this._heartbeat.animations.current.frameRate = frameRate;
            }
        }
    },

    /**
     * Destroy routine
     */
    destroy: function()
    {
        this._video = null;
        this._container = null;
        this._heartbeat = null;
        this._heartbeatPulse = null;
        this._timeline = null;
        this._keyframe = null;
    }

};