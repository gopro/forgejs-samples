var ForgePlugins = ForgePlugins || {};

/**
 * This plugin displays a simple speedometer on the screen, indicating the speed
 * of the vehicule the camera is in.
 */
ForgePlugins.Speedometer = function()
{
    // The reference to the video, for synchronization
    this._video = null;

    // Is the plugin ready for update
    this._ready = false;

    // Main container of the plugin
    this._container = null;

    // Label for the speed
    this._speedLabel = null;

    // Unit (kmh, mph...)
    this._unitLabel = null;

    // Timeline for sync
    this._timeline = null;

    // Current keyframe
    this._keyframe = null;
};

ForgePlugins.Speedometer.prototype = {

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

        // Create the elements composing the speedometer (two textfield)
        this._createSpeedometer();

        // Get the keyframes for sync
        this._loadKeyframes();
    },

    /**
     * Get the video to sync with, and set it as a reference for
     * synchronization.
     */
    _setupVideo: function()
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
    },

    /**
     * Remove the video reference and its event handlers
     */
    _clearVideo: function()
    {
        this._video = null;
    },

    /**
     * Create the two textfield containing informations about the speed
     */
    _createSpeedometer: function()
    {
        this._speedLabel = this.plugin.create.textField();
        this._speedLabel.value = "0";
        this._speedLabel.left = 15;
        this._speedLabel.verticalCenter = true;
        this._speedLabel.color = this.plugin.options.font.color;
        this._speedLabel.fontSize = this.plugin.options.font.size;
        this._speedLabel.fontFamily = this.plugin.options.font.family;
        this._container.addChild(this._speedLabel);

        this._unitLabel = this.plugin.create.textField();
        this._unitLabel.value = this.plugin.options.speedUnit;
        this._unitLabel.right = 10;
        this._unitLabel.verticalCenter = true;
        this._unitLabel.color = this.plugin.options.font.color;
        this._unitLabel.fontSize = 0.5 * this.plugin.options.font.size;
        this._unitLabel.fontFamily = this.plugin.options.font.family;
        this._container.addChild(this._unitLabel);
        this._unitLabel.width = this._unitLabel.width + 3; // Compensate weird autoWidth behavior
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
     * Load the keyframes from the json file, or directly from the json configuration.
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
        if (this._ready === false || this._video.playing === false || (this._video.duration - this._video.currentTime) <= 0)
        {
            return;
        }

        var kf = this._timeline.getKeyframes(this._video.currentTimeMS);
        if (kf !== null)
        {
            var keyframe = kf.previous;

            if (keyframe !== this._keyframe)
            {
                this._keyframe = keyframe;

                this._speedLabel.value = this._keyframe.data;
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
        this._speedLabel = null;
        this._unitLabel = null;
        this._timeline = null;
        this._keyframe = null;
    }
};