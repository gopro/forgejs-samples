var ForgePlugins = ForgePlugins || {};

/**
 * This plugin displays thumbnails with camera look at actions.
 */
ForgePlugins.LookAt = function()
{
    // Canvas of the plugin
    this._canvas = null;

    // Loaded data
    this._data = null;

    // points of interest data
    this._poi = null;

    // poi counter
    this._count = 0;

    // images array
    this._images = null;
};

ForgePlugins.LookAt.prototype = {

    /**
     * The boot function
     */
    boot: function()
    {
        // Load the JSON data
        this._loadJsonData();
    },

    /**
     * The reset function
     */
    reset: function()
    {

    },

    /**
     * Load the data from the json file
     */
    _loadJsonData: function()
    {
        var json = this.plugin.data.json;

        if (typeof json === "string" && json !== "")
        {
            this.viewer.load.json(this.plugin.uid + "_json", json, this._jsonLoadComplete.bind(this), this);
        }
        else
        {
            this.plugin.warn("Plugin LookAt can't load json data: invalid URL!");
        }
    },

    /**
     * On JSON loaded, read it and parse it
     */
    _jsonLoadComplete: function(file)
    {
        this._data = file.data;

        this._prepareCanvas();
    },

    /**
     * Update the canvas rendering
     */
    update: function()
    {

    },

    /**
     * Prepare the canvas size
     */
    _prepareCanvas: function()
    {
        if (this._data === null)
        {
            return;
        }

        this._poi = this._data.poi;
        var poiLength = this._poi.length;
        this._count = poiLength;

        var rows = Math.ceil(Math.sqrt(poiLength));
        var columns = Math.floor(Math.sqrt(poiLength));

        var margin = this.plugin.options.container.margin;

        var hMax = rows * this.plugin.options.thumbnail.width + (rows - 1) * margin;
        var vMax = columns * this.plugin.options.thumbnail.height + (columns - 1) * margin;

        // Create the canvas
        this._canvas = this.plugin.create.canvas();
        this._canvas.width = hMax + margin * 2;
        this._canvas.height = vMax + margin * 2;

        this._canvas.top = this.plugin.options.top;
        this._canvas.left = this.plugin.options.left;
        this._canvas.right = this.plugin.options.right;
        this._canvas.bottom = this.plugin.options.bottom;

        this.plugin.container.addChild(this._canvas);

        this._images = [];

        // load images
        for(var i = 0; i < poiLength; i++)
        {
            // create an image element
            var img = document.createElement('img');
            img.crossOrigin = "anonymous";

            // use common loader as we need to count files
            img.onload = this._imageLoaded.bind(this);
            img.onerror = this._imageError.bind(this);
            img.onabort = this._imageError.bind(this);

            img.src = this._poi[i].img;

            // push image onto array in the same order as file names
            this._images.push(img);
        }

        // add click listener
        this._canvas.pointer.enabled = true;
        this._canvas.pointer.cursor = "pointer";
        this._canvas.pointer.onClick.add(this._canvasClick, this);
    },

    /**
     * Canvas click handler
     */
    _canvasClick: function(e)
    {
        var elem = this._canvas.dom,
        elemLeft = elem.offsetLeft,
        elemTop = elem.offsetTop;

        var x = e.data.center.x - elemLeft;
        var y = e.data.center.y - elemTop;

        var self = this;
        this._poi.forEach(function(element)
        {
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width)
            {
                self._lookAt(element);
            }
        });
    },

    /**
     * lookAt action for a given element
     */
    _lookAt: function(elem)
    {
        this.viewer.camera.lookAt(elem.yaw, elem.pitch, 0, elem.fov, 2000, true, FORGE.EasingType.QUAD_IN_OUT);
    },

    /**
     * Image loaded handler
     */
    _imageLoaded: function(e)
    {
        // for each successful load we count down
        this._count--;
        //start when all images are loaded
        if (this._count === 0) this._drawThumbs();
    },

    /**
     * Image error/aborted handler
     */
    _imageError: function(e)
    {
        // for each error or aborted load we count down
        this._count--;
        //start when all images are requested
        if (this._count === 0) this._drawThumbs(false);
    },

    /**
     * Thumbnails drawing
     */
    _drawThumbs: function(status)
    {
        var ctx = this._canvas.context2D;

        try
        {
            ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

            ctx.fillStyle = this.plugin.options.container.color;
            ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);

            var row = 0;
            var column = 0;

            var imgWidth = this.plugin.options.thumbnail.width;
            var imgHeight = this.plugin.options.thumbnail.height;
            var margin = this.plugin.options.container.margin;

            var imagesLength = this._images.length;
            for (var i = 0; i < imagesLength; i++)
            {
                var x = row * imgWidth + row * margin + margin;
                var y = column * imgHeight + column * margin + margin;

                if (status === false)
                {
                    // black box fallback when no image
                    ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
                }
                else
                {
                    //draw background image
                    ctx.drawImage(this._images[i], x, y, imgWidth, imgHeight);

                    // draw a color box over the thumb
                    ctx.fillStyle = this.plugin.options.thumbnail.color;
                }

                ctx.fillRect(x, y, imgWidth, imgHeight);

                // set next position
                if (row >= 4) //Math.ceil(Math.sqrt(this._poi.length))
                {
                    column++;
                    row = 0;
                }
                else
                {
                    row++;
                }

                // set canvas coordinates to the poi object
                this._poi[i].width = imgWidth;
                this._poi[i].height = imgHeight;
                this._poi[i].top = y;
                this._poi[i].left = x;
            };
        }
        catch (e)
        {
            // waiting next frame to get the canvas not yet created
        }
    },

    /**
     * Destroy routine
     */
    destroy: function()
    {
        this._canvas.destroy();
        this._canvas = null;

        this._poi = null;
        this._images = null;
        this._data = null;
    }
};
