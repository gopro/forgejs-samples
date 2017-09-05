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

    this._poi = null;

    this._count = 0;

    this._margin = 5;

    this._horizontal = 0;

    this._vertical = 0;

    this._imgWidth = 47;

    this._imgHeight = 27;

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
     * [draw description]
     * @return {[type]} [description]
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

        this._horizontal = Math.ceil(Math.sqrt(poiLength));
        this._vertical = Math.floor(Math.sqrt(poiLength));

        var hMax = this._horizontal * this._imgWidth + (this._horizontal - 1) * this._margin;
        var vMax = this._vertical * this._imgHeight + (this._vertical - 1) * this._margin;

        // Create the canvas
        this._canvas = this.plugin.create.canvas();
        this._canvas.width = hMax + this._margin * 2;
        this._canvas.height = vMax + this._margin * 2;
        this._canvas.top = this.plugin.options.top;
        this._canvas.left = this.plugin.options.left;
        this._canvas.right = this.plugin.options.right;
        this._canvas.bottom = this.plugin.options.bottom;

        this.plugin.container.addChild(this._canvas);

        this._images = [];

        // load images
        for(var i = 0; i < poiLength; i++) {

            // create an image element
            var img = document.createElement('img');

            // use common loader as we need to count files
            img.onload = this._imageLoaded.bind(this);
            //img.onerror = ... handle errors too ...
            //img.onabort = ... handle errors too ...

            img.src = this._poi[i].img;

            // push image onto array in the same order as file names
            this._images.push(img);
        }

        // add click listener
        this._canvas.pointer.enabled = true;
        this._canvas.pointer.cursor = "pointer";
        this._canvas.pointer.onClick.add(this._canvasClick, this);
    },

    _canvasClick: function(e)
    {
        var elem = this._canvas.dom,
        elemLeft = elem.offsetLeft,
        elemTop = elem.offsetTop;

        var x = e.data.center.x - elemLeft;
        var y = e.data.center.y - elemTop;

        var self = this;
        this._poi.forEach(function(element) {
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
                self._lookAt(element);
            }
        });
    },

    _lookAt: function(elem)
    {
        console.log(elem);
        this.viewer.camera.lookAt(elem.yaw, elem.pitch, 0, elem.fov, 2000, true, FORGE.EasingType.QUAD_IN_OUT);
    },

    _imageLoaded: function(e)
    {
        // for each successful load we count down
        this._count--;
        //start when all images are loaded
        if (this._count === 0) this._drawThumbs();
    },

    _drawThumbs: function()
    {
        var ctx = this._canvas.context2D;

        this._elements = [];

        try
        {
            ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

            ctx.fillStyle = "rgba(112, 66, 20, 1.0)";
            ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);

            var hPos = 0;
            var vPos = 0;

            var imagesLength = this._images.length;
            for (var i = 0; i < imagesLength; i++)
            {
                var x = hPos * this._imgWidth + hPos * this._margin + this._margin;
                var y = vPos * this._imgHeight + vPos * this._margin + this._margin;


                //draw background image
                ctx.drawImage(this._images[i], x, y, this._imgWidth, this._imgHeight);

                //draw a box over the top
                ctx.fillStyle = "rgba(112, 66, 20, 0.2)";
                ctx.fillRect(x, y, this._imgWidth, this._imgHeight);

                if (hPos === (this._horizontal - 1))
                {
                    vPos++;
                    hPos = 0;
                }
                else
                {
                    hPos++;
                }

                // add coordinate to the poi object
                this._poi[i].width = this._imgWidth;
                this._poi[i].height = this._imgHeight;
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

        this._data = null;
    }
};
