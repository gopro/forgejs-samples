var ForgePlugins = ForgePlugins || {};

/**
 * This plugin is a custom one for the VROOM project, displaying on top of a
 * driver (in the selection screen) information about him.
 */
ForgePlugins.KartingDriverSpot = function()
{
    // Information will be drawn in a canvas
    this._canvas = null;

    // Color of the text; the setTextColor method can interact with this value
    this._textColor = "#fff";
};

ForgePlugins.KartingDriverSpot.prototype = {

    /**
     * The boot function
     */
    boot: function()
    {
        // Create a FORGE.Canvas instance
        this._canvas = this.plugin.create.canvas();

        // Set properties to canvas
        this._canvas.width = this.plugin.options.width;
        this._canvas.height = this.plugin.options.height;
        this._canvas.top = this.plugin.options.top;
        this._canvas.right = this.plugin.options.right;
        this._canvas.bottom = this.plugin.options.bottom;
        this._canvas.left = this.plugin.options.left;
        this._canvas.horizontalCenter = this.plugin.options.horizontalCenter;
        this._canvas.verticalCenter = this.plugin.options.verticalCenter;
        this._canvas.background = this.plugin.options.background;

        // set default options
        this._textColor = this.plugin.options.color || this._textColor;

        // trick for Edge / Internet Explorer
        // Issue #8167417 https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8167417/
        this._canvas.dom.style.display = "none";

        this.plugin.notifyInstanceReady();
    },

    /**
     * Redraw every frame the informations. We are obliged to do that, as it is
     * the only way to update the color of the font on hovering.
     */
    update: function()
    {
        var ctx = this._canvas.context2D;
        var x = this._canvas.dom.width / 2;
        var y = this._canvas.dom.height / 2;

        // Clear the previous informations
        ctx.clearRect(0, 0, this._canvas.dom.width, this._canvas.dom.height);

        // Draw the rectangle containing the informations
        ctx.fillStyle = this.plugin.options.background;
        ctx.fillRect(0, 0, this._canvas.dom.width, this._canvas.dom.height);

        // General font style
        ctx.fillStyle = this._textColor;
        ctx.textAlign = 'center';
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000";

        // Name of the driver
        ctx.font = "35px " + this.plugin.options.nameFontFamily;
        ctx.fillText(this.plugin.options.name, x, 40);

        // Height and weight of the driver
        ctx.font = "20px " + this.plugin.options.infoFontFamily;
        ctx.fillText(this.plugin.options.size, x, 70);
        ctx.fillText(this.plugin.options.weight, x, 90);

        // trick for Edge / Internet Explorer
        // Issue #8167417 https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8167417/
        if (FORGE.Device.browser === "edge" || FORGE.Device.browser === "internetexplorer")
        {
            document.body.appendChild(this._canvas.dom);
        }
    },

    /**
     * Placeholder, do nothing
     */
    reset: function() {},

    /**
     * Show the informations
     */
    show: function()
    {
        this._canvas.show();
    },

    /**
     * Hide the informations
     */
    hide: function()
    {
        this._canvas.hide();
    },

    /**
     * Change the color of the text
     */
    setTextColor: function(value)
    {
        this._textColor = value;
    },

    /**
     * Destroy the canvas
     */
    destroy: function()
    {
        this._canvas = null;
    }
};

/**
 * Return the canvas, to use it with a parallax effect.
 */
Object.defineProperty(ForgePlugins.KartingDriverSpot.prototype, "texture",
{
    get: function()
    {
        return this._canvas;
    }
})