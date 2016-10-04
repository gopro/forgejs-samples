var KPlug = KPlug || {};

/**
 * This plugin is a wrapper around KEN.Button, allowing someone to create a
 * button from a tour.json, without having to access the javascript code and
 * instantiate itself a KEN.Button.
 */
KPlug.SimpleButton = function()
{
    // The button, a KEN.Button instance
    this._btn = null;
};

KPlug.SimpleButton.prototype = {

    /**
     * The boot function
     */
    boot: function()
    {
        // Create a KEN.Button instance
        this._btn = this.plugin.create.button();

        // Set properties to the button
        this._btn.top = this.plugin.options.top;
        this._btn.right = this.plugin.options.right;
        this._btn.bottom = this.plugin.options.bottom;
        this._btn.left = this.plugin.options.left;
        this._btn.horizontalCenter = this.plugin.options.horizontalCenter;
        this._btn.verticalCenter = this.plugin.options.verticalCenter;

        var skin = this._btn.skin;

        // Set the skin if any
        if (typeof this.plugin.options.skin !== "undefined")
        {
            if (typeof this.plugin.options.skin.out !== "undefined")
            {
                skin.out = KEN.Utils.extendMultipleObjects(KEN.ButtonSkin.defaultState, skin.out, this.plugin.options.skin.out);
            }

            if (typeof this.plugin.options.skin.over !== "undefined")
            {
                skin.over = KEN.Utils.extendMultipleObjects(KEN.ButtonSkin.defaultState, skin.over, this.plugin.options.skin.over);
            }

            if (typeof this.plugin.options.skin.down !== "undefined")
            {
                skin.down = KEN.Utils.extendMultipleObjects(KEN.ButtonSkin.defaultState, skin.down, this.plugin.options.skin.down);
            }
        }

        // Set the global value if any
        if (this.plugin.options.value !== undefined)
        {
            skin.out.label.value = this.plugin.options.value;
            skin.over.label.value = this.plugin.options.value;
            skin.down.label.value = this.plugin.options.value;
        }

        this._btn.updateSkin();

        this._btn.width = this.plugin.options.width;
        this._btn.height = this.plugin.options.height;

        // Add the button to the main container
        this.plugin.container.addChild(this._btn);

        // Add the events handlers
        this._btn.pointer.onClick.add(this._btnClickHandler, this);
        this._btn.pointer.onOut.add(this._btnOutHandler, this);
        this._btn.pointer.onOver.add(this._btnOverHandler, this);
        this._btn.pointer.onDown.add(this._btnDownHandler, this);
    },

    /**
     * Fires the handler for a click on the button.
     */
    _btnClickHandler: function(event)
    {
        this.plugin.events.onClick.dispatch();
    },

    /**
     * Fires the handler for going out the button.
     */
    _btnOutHandler: function(event)
    {
        this.plugin.events.onOut.dispatch();
    },

    /**
     * Fires the handler for being over the button.
     */
    _btnOverHandler: function(event)
    {
        this.plugin.events.onOver.dispatch();
    },

    /**
     * Fires the handler for the button currently being click on (click
     * maintained).
     */
    _btnDownHandler: function(event)
    {
        this.plugin.events.onDown.dispatch();
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
     * Show the button
     */
    show: function()
    {
        this._btn.show();
    },

    /**
     * Hide the button
     */
    hide: function()
    {
        this._btn.hide();
    },

    /**
     * Destroy the button.
     */
    destroy: function()
    {
        this._btn.destroy();
        this._btn = null;
    }
};