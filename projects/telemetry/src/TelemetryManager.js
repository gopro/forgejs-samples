 FORGE.TelemetryManager = function(viewer)
{
    this._viewer = viewer;

    this._modules = [];
};

FORGE.TelemetryManager.prototype.add = function(name, pluginUid, hotspotUid)
{
	var config = {name: name, plugin: pluginUid, hotspot: hotspotUid};
	var module = new FORGE.TelemetryModule(this._viewer, config);
    this._modules.push(module);
};

Object.defineProperty(FORGE.TelemetryManager.prototype, "modules",
{
    get: function()
    {
        return this._modules;
    }
});
