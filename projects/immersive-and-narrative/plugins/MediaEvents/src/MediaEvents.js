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
        if(this.viewer.renderer.media !== null)
        {
            this._video = this.viewer.renderer.media.displayObject;
            this._video.onEnded.add(this._onEndedHandler, this);
        }
        else
        {
            if(this.viewer.renderer.onMediaReady.has(this._setupVideo, this) === false)
            {
                this.viewer.renderer.onMediaReady.addOnce(this._setupVideo, this);
            }
        }
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