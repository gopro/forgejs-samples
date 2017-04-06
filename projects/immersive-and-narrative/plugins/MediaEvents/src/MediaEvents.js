var ForgePlugins = ForgePlugins || {};

ForgePlugins.MediaEvents = function()
{
    this._video = null;
};

ForgePlugins.MediaEvents.prototype =
{
    boot: function()
    {
        this._setupVideo();
    },

    reset: function()
    {
        this._clearVideo();
        this._setupVideo();
    },

    _setupVideo: function()
    {
        this._video = this.viewer.story.scene.media.displayObject;
        this._video.onEnded.add(this._onEndedHandler, this);
    },

    _clearVideo: function()
    {
        if(this._video !== null)
        {
            this._video.onEnded.remove(this._onEndedHandler, this);
        }

        this._video = null;
    },

    _onEndedHandler: function()
    {
        this.plugin.events.onEnded.dispatch();
    },

    destroy: function()
    {
        this._clearVideo();
    }
};