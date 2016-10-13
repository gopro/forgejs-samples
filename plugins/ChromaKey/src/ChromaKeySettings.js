var KPlug = KPlug || {};

/**
 * ChromaKey plugin settings
 * Interface used for dat.gui communication
 *
 * @constructor KPlug.ChromaKeySettings
 * @param {KPlug.ChromaKey} chromaKey - {@link KPlug.ChromaKey} reference.
 */
KPlug.ChromaKeySettings = function(chromaKey)
{
    this._chromaKey = chromaKey;
    this._bypass = false;

    this.togglePlayPause = function()
    {
        this._chromaKey.togglePlayPause();
    };
};

KPlug.ChromaKeySettings.prototype.destroy = function()
{
    // Release weak reference on chromakey plugin
    this._chromaKey = null;
};

/**
 * Treshold property accessor
 */
Object.defineProperty(KPlug.ChromaKeySettings.prototype, "threshold",
{
    set: function(value)
    {
        this._chromaKey.threshold = value;
    },

    get: function()
    {
        return this._chromaKey.threshold;
    }
});

/**
 * Smoothness property accessor
 */
Object.defineProperty(KPlug.ChromaKeySettings.prototype, "smoothness",
{
    set: function(value)
    {
        this._chromaKey.smoothness = value;
    },

    get: function()
    {
        return this._chromaKey.smoothness;
    }
});

/**
 * Background property accessor
 */
Object.defineProperty(KPlug.ChromaKeySettings.prototype, "background",
{
    set: function(value)
    {
        this._chromaKey.background = value;
    },

    get: function()
    {
        return this._chromaKey.background;
    }
});

/**
 * Show preview property accessor
 * Enable or disable the display of preview canvas
 */
Object.defineProperty(KPlug.ChromaKeySettings.prototype, "showPreview",
{
    set: function(value)
    {
        if (value === true)
        {
            this._chromaKey.showPreview();
            this._chromaKey.updatePreview();
        }
        else
        {
            this._chromaKey.hidePreview();
        }
    },

    get: function()
    {
        return this._chromaKey.hasPreview();
    }
});

/**
 * Bypass property accessor
 * Turn on/off the processing to highlight current state
 */
Object.defineProperty(KPlug.ChromaKeySettings.prototype, "bypass",
{
    set: function(value)
    {
        this._bypass = value;
        this._chromaKey.updatePreview();
    },

    get: function()
    {
        return this._bypass;
    }
});