var ForgePlugins = ForgePlugins || {};

/**
 * Plugin allowing a letterboxing effect on a scene.
 *
 * From wikipedia: Letterboxing is the practice of transferring film shot in a
 * widescreen aspect ratio to standard-width video formats while preserving the
 * film's original aspect ratio.
 *
 * Here, we're only adding black bars.
 */
ForgePlugins.Letterbox = function()
{
    this._stripeTop = null;
    this._stripeBottom = null;
};

ForgePlugins.Letterbox.prototype = {

    /**
     * The boot function, instantiate two black display object and position them
     * on the correct side of the scene.
     */
    boot: function()
    {
        // The top stripe
        this._stripeTop = this.plugin.create.displayObject();
        this._stripeTop.width = "100%";
        this._stripeTop.height = this.plugin.options.stripeHeight;
        this._stripeTop.top = 0;
        this._stripeTop.background = this.plugin.options.stripeColor;
        this._stripeTop.pointer.enabled = false;

        // The bottom stripe
        this._stripeBottom = this.plugin.create.displayObject();
        this._stripeBottom.width = "100%";
        this._stripeBottom.height = this.plugin.options.stripeHeight;
        this._stripeBottom.bottom = 0;
        this._stripeBottom.background = this.plugin.options.stripeColor;
        this._stripeBottom.pointer.enabled = false;

        // Add each stripe to the main container
        this.viewer.container.addChild(this._stripeTop);
        this.viewer.container.addChild(this._stripeBottom);
    },

    /**
     * Placeholder, do nothing
     */
    update: function() {},

    /**
     * Placeholder, do nothing
     */
    reset: function() {},

    /**
     * Destroy the two stripes.
     */
    destroy: function()
    {
        this._stripeTop = null;
        this._stripeBottom = null;
    }
};