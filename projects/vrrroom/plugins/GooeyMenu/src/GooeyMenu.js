var ForgePlugins = ForgePlugins || {};

/**
 * A Gooey menu, inspired by the one created by Lucas Bebber here
 * http://codepen.io/lbebber/pen/RNgBPP
 */
ForgePlugins.GooeyMenu = function()
{
    // The main container
    this._container = null;

    // The list of items in the menu
    this._items = [];

    // Number of items
    this._itemsCount = 0
};

ForgePlugins.GooeyMenu.prototype = {

    /**
     * The boot function
     */
    boot: function()
    {
        // Create a FORGE.DisplayObjectContainer instance
        this._container = this.plugin.create.displayObjectContainer();

        // Set properties to the div
        this._container.width = this.plugin.options.width;
        this._container.height = this.plugin.options.height;
        this._container.top = this.plugin.options.top;
        this._container.left = this.plugin.options.left;
        this._container.right = this.plugin.options.right;
        this._container.bottom = this.plugin.options.bottom;

        // Add it to the main container
        this.plugin.container.addChild(this._container);

        // Write the content of the menu
        var content = '';
        content += '<nav class="menu">';
        content += '    <input type="checkbox" href="#" class="menu-open" name="menu-open" id="menu-open"/>';
        content += '    <label class="menu-open-button" for="menu-open">';
        content += '        <span class="hamburger hamburger-1"></span>';
        content += '        <span class="hamburger hamburger-2"></span>';
        content += '        <span class="hamburger hamburger-3"></span>';
        content += '    </label>';

        this._itemsCount = this.plugin.options.items.length;

        for (var i = 0; i < this._itemsCount; i++)
        {
            content += '    <a class="menu-item menu-'
                    + this.plugin.options.items[i].id + ' '
                    + (this.plugin.options.items[i].ticked ? 'menu-item-active' : 'menu-item-inactive')
                    + (this.plugin.options.items[i].toggle ? ' menu-item-toggle' : '')
                    + '" id="menu-item-' + i + '"></a>';
        }

        content += '</nav>';

        // Set it to the DOM
        this._container.dom.innerHTML = content;

        // Configure each item and its action
        for (var i = 0; i < this._itemsCount; i++)
        {
            this._items[i] = {
                title: this.plugin.create.string('gooeymenu-item-' + i),
                dom: document.getElementById('menu-item-' + i)
            };

            this._items[i].dom.addEventListener('click', this._clickHandler.bind(this));
        }

        this._setLabelTitle();

        // Load the locale
        this.viewer.i18n.onLocaleChangeComplete.add(this._onLocaleChangeCompletehandler, this);
    },

    /**
     * Handle a click on an element of the menu
     */
    _clickHandler: function(event)
    {
        var item = event.target;

        // Change the visual
        if (item.classList.contains('menu-item-active') && item.classList.contains('menu-item-toggle'))
        {
            item.classList.remove('menu-item-active');
            item.classList.add('menu-item-inactive');
        }
        else if(item.classList.contains('menu-item-toggle'))
        {
            item.classList.remove('menu-item-inactive');
            item.classList.add('menu-item-active');
        }

        // Execute the action
        var id = item.id.charAt(item.id.length - 1);
        var action = this.plugin.options.items[id].click.action;
        var target = this.plugin.options.items[id].click.target;

        // Toggle the visibility of plugins on the scene
        if (action === "visibility")
        {
            for (var i = 0, ii = target.length; i < ii; i++)
            {
                this.viewer.plugins.get(target[i]).container.toggleVisibility();
            }
        }

        // Change the current scene
        else if (action === "scene")
        {
            if (target === "next")
            {
                this.viewer.story.nextScene();
            }
            else if (target === "previous")
            {
                this.viewer.story.previousScene();
            }
            else if (typeof target === "string")
            {
                this.viewer.story.scene = target
            }
            else if (Array.isArray(target))
            {
                for (var i = 0, ii = target.length; i < ii; i++)
                {
                    if (this.viewer.story.scene.uid === target[i][0])
                    {
                        this.viewer.story.scene = target[i][1];
                    }
                    else if (this.viewer.story.scene.uid === target[i][1])
                    {
                        this.viewer.story.scene = target[i][0];
                    }
                }
            }
        }

        // Change the current song in the playlist
        else if (action === "playlist")
        {
            if (target === "next")
            {
                this.viewer.playlists.nextTrack();
            }
            else if (target === "previous")
            {
                this.viewer.playlists.previousTrack();
            }
        }
    },

    /**
     * Handle the locale change
     */
    _onLocaleChangeCompletehandler: function(event)
    {
        this._setLabelTitle();
    },

    _setLabelTitle: function()
    {
        for (var i = 0; i < this._itemsCount; i++)
        {
            this._items[i].dom.title = this._items[i].title.value;
        }
    },

    /**
     * Placeholder, do nothing
     */
    reset: function() {},

    /**
     * Placeholder, do nothing
     */
    update: function() {},

    /**
     * Destroy the button.
     */
    destroy: function()
    {
        this.viewer.i18n.onLocaleChangeComplete.remove(this._onLocaleChangeCompletehandler, this);

        this._container = null;

        for (var i = 0; i < this._itemsCount; i++)
        {
            this._items[i].dom = null;
            this._items[i] = null;
        }

        this._items = null;
    }
};