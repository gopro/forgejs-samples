 FORGE.TelemetryModule = function(viewer, config)
{
    this._viewer = viewer;

    this._config = config;

    this._displayMode = 2;
};

FORGE.TelemetryModule.displayModes =
{
    NONE: 0,
    SCREEN: 1,
    SPHERE: 2
};

FORGE.TelemetryModule.prototype._setDisplayMode = function(value)
{
    this._displayMode = Number(value);

    switch(this._displayMode)
    {
        case FORGE.TelemetryModule.displayModes.NONE:
            this._displayNone();
            break;

        case FORGE.TelemetryModule.displayModes.SCREEN:
            this._displayScreen();
            break;

        case FORGE.TelemetryModule.displayModes.SPHERE:
            this._displaySphere();
            break;
    }
};

FORGE.TelemetryModule.prototype._displayNone = function()
{
    var plugin = FORGE.UID.get(this._config.plugin);
    plugin.instance.hide();

    var hotspot = FORGE.UID.get(this._config.hotspot);
    hotspot.visible = false;
};

FORGE.TelemetryModule.prototype._displayScreen = function()
{
    var plugin = FORGE.UID.get(this._config.plugin);
    plugin.instance.show();

    var hotspot = FORGE.UID.get(this._config.hotspot);
    hotspot.visible = false;
};

FORGE.TelemetryModule.prototype._displaySphere = function()
{
    var plugin = FORGE.UID.get(this._config.plugin);
    plugin.instance.hide();

    var hotspot = FORGE.UID.get(this._config.hotspot);
    hotspot.visible = true;
};


Object.defineProperty(FORGE.TelemetryModule.prototype, "name",
{
    get: function()
    {
        return this._config.name;
    }
});


Object.defineProperty(FORGE.TelemetryModule.prototype, "displayMode",
{
    get: function()
    {
        return this._displayMode;
    },

    set: function(value)
    {
        this._setDisplayMode(value);
    }
});



