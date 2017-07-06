var ForgePlugins = ForgePlugins || {};

ForgePlugins.Ranking = function()
{
    this._drivers = [];

    // The reference to the video, for synchronization
    this._video = null;

    // Main container of the plugin
    this._container = null;

    // Tween for the animation between
    this._tween = null;

    // The current selected driver
    this._currentDriver = null;

    // Is the plugin ready
    this._ready = false;
};

ForgePlugins.Ranking.prototype = {

    /**
     * Boot function
     */
    boot: function()
    {
        // Setup the reference to the video
        this._setupVideo();

        // Create a div containing the informations
        this._container = this.plugin.create.displayObjectContainer();
        this._container.width = this.plugin.options.width;
        this._container.height = (this.plugin.options.height * this.plugin.options.drivers.length) + (this.plugin.options.margin * (this.plugin.options.drivers.length - 1));
        this._container.top = this.plugin.options.top;
        this._container.bottom = this.plugin.options.bottom;
        this._container.left = this.plugin.options.left;
        this._container.right = this.plugin.options.right;

        // Add it to the main container
        this.plugin.container.addChild(this._container);

        // Create the elements for each drivers
        this._createDrivers();

        // Highlight the current driver
        this._higlightCurrentDriver();

        // Plugin is ready
        this._ready = true;
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

        if (this._video !== null && (FORGE.Utils.isTypeOf(this._video, "VideoHTML5") === true || FORGE.Utils.isTypeOf(this._video, "VideoDash") === true))
        {
            this._video.onSeeked.add(this._onSeekedHandler, this);
            this._video.onPlay.add(this._onPlayHandler, this);
            this._video.onPause.add(this._onPauseHandler, this);

            if (typeof this.plugin.persistentData.time !== "undefined" && this.plugin.options.timeSync === true)
            {
                this._video.currentTime = this.plugin.persistentData.time;
            }

            if (typeof this.plugin.persistentData.camera !== "undefined")
            {
                this.viewer.renderer.camera.yaw = this.plugin.persistentData.camera.yaw;
                this.viewer.renderer.camera.pitch = this.plugin.persistentData.camera.pitch;
                this.viewer.renderer.camera.fov = this.plugin.persistentData.camera.fov;
            }
        }
    },

    /**
     * Reset the reference to the video, and highlight the currently selected driver.
     */
    reset: function()
    {
        this._clearVideo();
        this._setupVideo();

        this._higlightCurrentDriver();
    },

    /**
     * Clear the reference to the video
     */
    _clearVideo: function()
    {
        if (this._video !== null)
        {
            this._video.onSeeked.remove(this._onSeekedHandler, this);
            this._video.onPlay.remove(this._onPlayHandler, this);
            this._video.onPause.remove(this._onPauseHandler, this);

            this._video = null;
        }
    },

    /**
     * Create the drivers
     */
    _createDrivers: function()
    {
        var driver;

        for (var i = 0, ii = this.plugin.options.drivers.length; i < ii; i++)
        {
            // Driver object
            driver = {
                container: null,
                infoContainer: null,
                name: null,
                position: null,
                thumbContainer: null,
                type: null,
                video: null,
                image: null,
                tween: null,
                timeline: null,
                keyframes: this.plugin.options.drivers[i].keyframes,
                scenes: this.plugin.options.drivers[i].scenes
            }

            // Main container for a driver
            driver.container = this.plugin.create.displayObjectContainer();
            driver.container.width = this.plugin.options.width;
            driver.container.height = this.plugin.options.height;

            // Container for the informations: driver + position
            driver.infoContainer = this.plugin.create.displayObjectContainer();
            driver.infoContainer.width = 5 * this.plugin.options.width / 6;
            driver.infoContainer.height = 2 * this.plugin.options.height / 3;
            driver.infoContainer.top = this.plugin.options.height / 6;
            driver.infoContainer.left = this.plugin.options.height / 2;
            driver.infoContainer.background = "rgba(255, 255, 255, 0.4)";
            driver.container.addChild(driver.infoContainer);

            // Driver name
            driver.name = this.plugin.create.textField();
            driver.name.value = this.plugin.options.drivers[i].name;
            driver.name.color = this.plugin.options.font.color;
            driver.name.fontFamily = this.plugin.options.font.family;
            driver.name.fontSize = this.plugin.options.font.size;
            driver.name.left = 15;
            driver.name.padding = "0px " + this.plugin.options.height / 2 + "px";
            driver.name.verticalCenter = true;
            driver.infoContainer.addChild(driver.name);

            // Driver position
            driver.position = this.plugin.create.textField();
            driver.position.value = "1st";
            driver.position.color = this.plugin.options.font.color;
            driver.position.fontFamily = this.plugin.options.font.family;
            driver.position.fontSize = this.plugin.options.font.size;
            driver.position.right = 15;
            driver.position.verticalCenter = true;
            driver.infoContainer.addChild(driver.position);

            // The container of the video
            driver.thumbContainer = this.plugin.create.displayObjectContainer();
            driver.thumbContainer.width = this.plugin.options.height;
            driver.thumbContainer.height = this.plugin.options.height;
            driver.thumbContainer.borderColor = this.plugin.options.borderColor;
            driver.thumbContainer.borderRadius = driver.thumbContainer.width / 2;
            driver.container.addChild(driver.thumbContainer);

            if (this.plugin.options.drivers[i].type === "image")
            {
                // The image (face of the driver)
                driver.image = this.plugin.create.image(this.plugin.options.drivers[i].thumb, false);
                driver.image.width = driver.thumbContainer.width - 2 * this.plugin.options.borderSize;
                driver.image.height = driver.thumbContainer.height - 2 * this.plugin.options.borderSize;
                driver.image.borderRadius = driver.thumbContainer.borderRadius;
                driver.thumbContainer.addChild(driver.image);
            }
            else
            {
                // The video (face of the driver)
                driver.video = this.plugin.create.video(this.plugin.uid + "-video-"+i, this.plugin.options.drivers[i].thumb, this.plugin.options.drivers[i].streaming, "manual");
                driver.video.width = driver.thumbContainer.width - 2 * this.plugin.options.borderSize;
                driver.video.height = driver.thumbContainer.height - 2 * this.plugin.options.borderSize;
                driver.video.borderRadius = driver.thumbContainer.borderRadius;
                driver.thumbContainer.addChild(driver.video);
            }

            // Data to save
            driver.container.data = this.plugin.options.drivers[i].scenes;

            // Event handlers
            driver.container.pointer.enabled = true;
            driver.container.pointer.cursor = "pointer";
            driver.container.pointer.onClick.add(this._driverClickHandler, this);

            // Tween when changing ranking
            driver.tween = this.plugin.create.tween(driver.container);

            // Create keyframes for synchronization with the main video
            var keyframes = [];
            for (var j = 0, jj = driver.keyframes.length, keyframe; j < jj; j++)
            {
                keyframe = new FORGE.Keyframe(driver.keyframes[j].ts, driver.keyframes[j].rank);
                keyframes.push(keyframe);
            }

            // Create a timeline for the keyframes
            driver.timeline = new FORGE.Timeline(keyframes);

            // Add all of this in the main container of the plugin
            this._container.addChild(driver.container);

            if (driver.video !== null)
            {
                // Play the video
                driver.video.volume = 0;
                driver.video.play();
            }

            // Add it to the list
            this._drivers.push(driver);
        }
    },

    /**
     * Highlight the current driver
     */
    _higlightCurrentDriver: function()
    {
        var driver;

        for (var i = 0, ii = this._drivers.length; i < ii; i++)
        {
            driver = this._drivers[i];

            for (var j = 0, jj = driver.scenes.length; j < jj; j++)
            {
                if (driver.scenes[j] === this.viewer.story.sceneUid)
                {
                    this._currentDriver = driver;
                    driver.thumbContainer.borderWidth = this.plugin.options.borderSize;
                    if (driver.video === null)
                    {
                        driver.image.top = 0;
                        driver.image.left = 0;
                    }
                    else
                    {
                        driver.video.top = 0;
                        driver.video.left = 0;
                    }
                    break;
                }
                else
                {
                    driver.thumbContainer.borderWidth = 0;
                    if (driver.video === null)
                    {
                        driver.image.top = this.plugin.options.borderSize;
                        driver.image.left = this.plugin.options.borderSize;
                    }
                    else
                    {
                        driver.video.top = this.plugin.options.borderSize;
                        driver.video.left = this.plugin.options.borderSize;
                    }
                }
            }
        }
    },

    /**
     * Handle the click on a driver to change the current view.
     */
    _driverClickHandler: function(event)
    {
        if (this._video !== null && this.plugin.options.timeSync === true)
        {
            this.plugin.persistentData.time = this._video.currentTime;
        }

        this.plugin.persistentData.camera = {
            yaw: this.viewer.renderer.camera.yaw,
            pitch: this.viewer.renderer.camera.pitch,
            fov: this.viewer.renderer.camera.fov
        };

        var scene = event.emitter.data;

        // If array, there is two view
        if (Array.isArray(scene))
        {
            this.viewer.story.scene = scene[this._currentDriver.scenes.indexOf(this.viewer.story.scene.uid)];
        }
        else
        {
            this.viewer.story.scene = scene;
        }
    },

    /**
     * Synchronize the drivers frame with the current time of the main video.
     */
    _onSeekedHandler: function()
    {
        var driver;

        for (var i = 0, ii = this._drivers.length; i < ii; i++)
        {
            driver = this._drivers[i];

            var kf = driver.timeline.getKeyframes(this._video.currentTimeMS);
            if (kf !== null)
            {
                driver.keyframe = kf.previous;
                if (driver.video !== null)
                {
                    driver.video.currentTime = this._video.currentTime;
                }
            }
        }
    },

    /**
     * Play everything when the video is triggered to be played
     */
    _onPlayHandler: function()
    {
        var driver;

        for (var i = 0, ii = this._drivers.length; i < ii; i++)
        {
            driver = this._drivers[i];
            if (driver.video !== null)
            {
                driver.video.play(this._video.currentTime);
            }
        }
    },

    /**
     * Pause everything when the video is paused
     */
    _onPauseHandler: function()
    {
        var driver;

        for (var i = 0, ii = this._drivers.length; i < ii; i++)
        {
            driver = this._drivers[i];
            if (driver.video !== null)
            {
                driver.video.pause();
            }
        }
    },

    /**
     * Update the synchronization with the main video, and update the position
     * of the driver if necessary.
     */
    update: function()
    {
        if (this._ready === false || this._video === null)
        {
            return;
        }

        var driver;

        for (var i = 0, ii = this._drivers.length; i < ii; i++)
        {
            driver = this._drivers[i];

            // Get the current keyframe
            var kf = driver.timeline.getKeyframes(this._video.currentTimeMS);
            if (kf !== null)
            {
                var keyframe = kf.previous;

                if (keyframe !== driver.keyframe)
                {
                    // Update the current keyframe
                    driver.keyframe = keyframe;

                    // Compute and move the player to its position on the leaderboard
                    var top = driver.keyframe.data * this.plugin.options.height + driver.keyframe.data * this.plugin.options.margin;

                    driver.tween.to(
                    {
                        top: top
                    }, 350).start();

                    // Get the text displaying the position of the driver
                    var pos = (driver.keyframe.data + 1).toString(), suffix = null;
                    switch (pos.charAt(pos.length - 1))
                    {
                        case "1":
                            suffix = "st";
                            break;
                        case "2":
                            suffix = "nd";
                            break;
                        case "3":
                            suffix = "rd";
                            break;
                        default:
                            suffix = "th";
                            break;
                    }

                    driver.position.value = pos + suffix;
                }

                // Update the synchronization
                if (driver.video !== null && Math.abs(this._video.currentTimeMS - driver.video.currentTimeMS) > 200)
                {
                    driver.video.currentTime = this._video.currentTime;
                }
            }
        }
    },

    /**
     * Destroy routine
     */
    destroy: function()
    {
        for (var i = 0, ii = this._drivers.length; i < ii; i++)
        {
            this._drivers[i] = null;
        }
        this._drivers = null;

        this._video = null;
        this._container = null;
        this._tween = null;
        this._currentDriver = null;
    }

};