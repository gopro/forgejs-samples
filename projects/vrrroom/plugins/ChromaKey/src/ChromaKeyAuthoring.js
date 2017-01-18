/**
 * All code authoring and preview related is present here.
 */

/**
 * Update preview canvas
 */
ForgePlugins.ChromaKey.prototype.updatePreview = function()
{
    if (this._authoring === false || this._canvasReady === false || this._ui.previewCanvas.context2D === null || this._datGUIControls.showPreview === false || this._canvasDst === null || this._canvasSrc === null)
    {
        return;
    }

    // if not visible, add to the bottom of the plugin and draw content
    // otherwise
    if (this._ui.previewCanvas.visible === false)
    {
        this.showPreviewCanvas();
    }

    // this._log("update preview");
    var source = this._datGUIControls.bypass === true ? this._canvasSrc : this._canvasDst;
    var ctx = this._ui.previewCanvas.context2D;

    // Clear, apply background pattern (chessboard) and draw new frame
    ctx.clearRect(0, 0, this._ui.previewCanvas.pixelWidth, this._ui.previewCanvas.pixelHeight);
    ctx.fillRect(0, 0, this._ui.previewCanvas.pixelWidth, this._ui.previewCanvas.pixelHeight);

    ctx.drawImage(source.dom,
        0, 0, source.pixelWidth, source.pixelHeight, 0, 0,
        this._ui.previewCanvas.pixelWidth, this._ui.previewCanvas.pixelHeight);
}


/**
 * Has preview
 * @return {Boolean} true if plugin has a preview canvas
 */
ForgePlugins.ChromaKey.prototype.hasPreview = function()
{
    return this._ui.previewCanvas.visible;
}

/**
 * Show preview canvas
 */
ForgePlugins.ChromaKey.prototype.showPreview = function()
{
    this._ui.previewCanvas.visible = true;
    this._autoResizeContainer();
}

/**
 * Hide preview canvas
 */
ForgePlugins.ChromaKey.prototype.hidePreview = function()
{
    this._ui.previewCanvas.visible = false;
    this._autoResizeContainer();
}

/**
 * Toggle play/pause
 */
ForgePlugins.ChromaKey.prototype.togglePlayPauseAuthoring = function()
{
    var datGuiController = null;
    for (var i = 0, ii = this._datGUI.__controllers.length; i < ii; i++)
    {
        var controller = this._datGUI.__controllers[i];
        if (controller.property === "togglePlayPause")
        {
            datGuiController = controller;
            break;
        }
    }

    if (this._media.playing)
    {
        if (datGuiController !== null)
        {
            datGuiController.__li.innerText = "Pause";
        }
    }
    else
    {
        if (datGuiController !== null)
        {
            datGuiController.__li.innerText = "Play";
        }
    }
}


/**
 * Init GUI objects
 * @private
 */
ForgePlugins.ChromaKey.prototype._initGUI = function()
{
    this._log("init gui");

    this._ui = {};
    this._ui.container = this.plugin.create.displayObjectContainer();
    this.plugin.container.addChild(this._ui.container);

    this._ui.container.width = this.plugin.options.width;
    this._ui.container.height = this.plugin.options.height || "800px";
    this._ui.container.top = this.plugin.options.top;
    this._ui.container.right = this.plugin.options.right;
    this._ui.container.borderRadius = 3;
    this._ui.container.pointer.enabled = true;
    this._ui.container.drag.enabled = true;

    this._ui.header = this.plugin.create.textField();
    this._ui.container.addChild(this._ui.header);
    this._ui.header.width = "100%";
    this._ui.header.height = this._ui.header.lineHeight = 30;
    this._ui.header.top = 0;
    this._ui.header.value = this.plugin.options.title;
    this._ui.header.background = "#f7f7f7";
    this._ui.header.color = "#525252";
    this._ui.header.fontFamily = "Consolas Arial";
    this._ui.header.textAlign = "center";
    this._ui.header.value = "Chromakey authoring";

    this._ui.body = this.plugin.create.displayObjectContainer();
    this._ui.container.addChild(this._ui.body);
    this._ui.body.width = "100%";
    this._ui.body.height = this._ui.container.pixelHeight - this._ui.header.pixelHeight;
    this._ui.body.top = this._ui.header.height;
    this._ui.body.pointer.enabled = true;

    this._ui.datguiContainer = this.plugin.create.displayObjectContainer();
    this._ui.body.addChild(this._ui.datguiContainer);
    this._ui.datguiContainer.width = "100%";
    this._ui.datguiContainer.height = 140
    this._ui.datguiContainer.background = "black";
    this._ui.datguiContainer.pointer.enabled = true;

    this._ui.previewCanvas = this.plugin.create.canvas();
    this._ui.body.addChild(this._ui.previewCanvas);

    this._initDatGui();
}

/**
 * Destroy the GUI related stuff
 */
ForgePlugins.ChromaKey.prototype._destroyGUI = function()
{
    if (this._ui.datguiContainer !== null)
    {
        this._ui.datguiContainer.empty(true);
        this._ui.datguiContainer.destroy();
        this._ui.datguiContainer = null;
    }

    if (this._ui.header !== null)
    {
        this._ui.header.destroy();
        this._ui.header = null;
    }

    if (this._ui.previewChessboard !== null)
    {
        this._ui.previewChessboard.destroy();
        this._ui.previewChessboard = null;
    }

    if (this._ui.previewCanvas !== null)
    {
        this._ui.previewCanvas.destroy();
        this._ui.previewCanvas = null;
    }

    if (this._ui.body !== null)
    {
        this._ui.body.empty(true);
        this._ui.body.destroy();
        this._ui.body = null;
    }

    if (this._ui.container !== null)
    {
        this._ui.container.empty(true);
        this._ui.container.destroy();
        this._ui.container = null;
    }

    this._ui = null;
}

/**
 * Autoresize UI container
 * Called when showing or hiding preview elements
 * @private
 */
ForgePlugins.ChromaKey.prototype._autoResizeContainer = function()
{
    if (this._ui === null)
    {
        return;
    }

    this._ui.body.height = this._ui.datguiContainer.pixelHeight;
    if (this._authoring === true && this.hasPreview())
    {
        this._ui.body.height += this._ui.previewCanvas.pixelHeight;
    }
    this._ui.container.height = this._ui.header.pixelHeight + this._ui.body.pixelHeight;
}

/**
 * Preview canvas background image loaded event handler
 * @param {Event} event event object
 * @private
 */
ForgePlugins.ChromaKey.prototype._onChessboardImageLoaded = function(event)
{
    this._log("Preview canvas chessboard image loaded");
    var ctx = this._ui.previewCanvas.context2D;
    ctx.fillStyle = ctx.createPattern(event.emitter.element, 'repeat');

    this.updatePreview();
}

/**
 * Init dat.gui objects
 * @private
 */
ForgePlugins.ChromaKey.prototype._deinitDatGui = function()
{
    if (this._datGUI === null)
    {
        return;
    }

    // Clear listeners
    while (this._datGUI.__listening.length > 0) 
    {
        this._datGUI.__listening.pop();
    }

    // Clear controllers
    while (this._datGUI.__controllers.length > 0) 
    {
        var idx = this._datGUI.__controllers.length - 1;
        this._datGUI.remove(this._datGUI.__controllers[idx]);
    }

    this._datGUI = null;

    if (this._datGUIControls !== null)
    {
        this._datGUIControls.destroy();
        this._datGUIControls = null;
    }
}

/**
 * Init dat.gui objects
 * @private
 */
ForgePlugins.ChromaKey.prototype._initDatGui = function()
{
    this._datGUI = new dat.GUI(
    {
        width: this._ui.datguiContainer.pixelWidth,
        autoPlace: false
    });

    // Append dat.gui dom element to the plugin container and remove close button
    this._ui.datguiContainer.dom.appendChild(this._datGUI.domElement);
    var datCloseButton = document.querySelector(".dg .close-button");
    datCloseButton.parentNode.removeChild(datCloseButton);

    // Populate with settings
    this._datGUI.add(this._datGUIControls, "showPreview").name("Preview").listen();
    this._datGUI.add(this._datGUIControls, "bypass").name("Bypass").listen();
    this._datGUI.add(this._datGUIControls, "threshold", 0, 100).name("Threshold").listen();
    this._datGUI.add(this._datGUIControls, "smoothness", 0, 100).name("Smoothness").listen();
    this._datGUI.add(this._datGUIControls, "togglePlayPause").name("Play");

    // GUI defaults
    this._datGUIControls.showCanvas = true;
    this._datGUIControls.bypass = false;
}

/**
 * Setup canvas objects
 * @private
 */
ForgePlugins.ChromaKey.prototype._setupCanvasAuthoring = function(size)
{
    var videoRatio = size.width / size.height;

    var w, h;
    if (videoRatio >= 1)
    {
        w = this._ui.body.pixelWidth;
        h = w / videoRatio;
    }
    else
    {
        h = this._ui.body.pixelHeight;
        w = h * videoRatio;
    }

    this._ui.previewCanvas.width = Math.floor(w) + "px";
    this._ui.previewCanvas.height = Math.floor(h) + "px";
    this._ui.previewCanvas.top = this._ui.datguiContainer.height;

    this._log("Create preview background image");
    this._ui.previewChessboard = this.plugin.create.image(
    {
        key: "chessboard-background",
        url: "assets/chessboard.png",
        i18n: false
    });
    this._ui.previewChessboard.onLoadComplete.addOnce(this._onChessboardImageLoaded, this);
}