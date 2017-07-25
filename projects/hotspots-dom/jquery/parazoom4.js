(function(jQuery){
    jQuery.fn.parazoom = function(options) {
        //Device detection
        var pluginEnable;
        function is_touch() {
            try {
                document.createEvent("TouchEvent");
                return true;
            }
            catch (e) {
                return false;
            }
        }
        function is_mobile() {
            if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)){
                return true;
            }else{
                return false;
            }
        }
        //Enable only on touch and non-touch desktops
        if(is_mobile() == true && is_touch() == true){ pluginEnable = false; }
        if(is_mobile() == true && is_touch() == false){ pluginEnable = false; }
        if(is_mobile() == false && is_touch() == true){ pluginEnable = true; }
        if(is_mobile() == false && is_touch() == false){ pluginEnable = true; }

        //If applicable, run plugin
        if(pluginEnable){
            //Variables
            var dataHeight,
                dataWidth,
                dataBackgroundImage,
                dataPosition,
                // dataPaddingTop,
                // dataPaddingLeft,
                // dataPaddingRight,
                dataFinalWidth,
                dataImg,
                dataLargeImg,
                dataFirstImg,
                dataFirstLink,
                dataScale,
                dataOverflow,
                dataTransitionTime,
                dataTransitionTimeLeave,
                dataOpacity,
                dataOpacityHover,
                dataCursor,
                dataCustomCursorIcon = '',
                dataCustomCursorSize,
                dataTilt,
                dataTiltXamount,
                dataTiltYamount,
                dataPosX,
                dataPosY,
                dataPercentX,
                dataPercentY,
                dataLink,
                dataText,
                dataTextContent = '',
                dataTextClass,
                dataTextPosition,
                dataTextAlignment,
                dataTextOpacity,
                dataTextOpacityHover,
                dataRandom = '',
                dataCSSZIndex,
                dataCSSPosition,
                dataCSSTop,
                dataCSSRight,
                dataCSSBottom,
                dataCSSLeft,
                textXParallax,
                textYParallax,
                result,
                targetID,
                dataIndex,
                dataCallback,
                mouseCoordinates,
                i=1,
                numberOfNodes = this.length,
                iNode=1,
                mouseMoveThreshold = 20,
                mouseMove = mouseMoveThreshold,
                mouseMoveTransition = '400ms',
                quikRandom = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",

                //Defaults parameters
                defaults = {
                    scale: '1.2',
                    transitionTime: '0.3s',
                    transitionTimeLeave: '1s',
                    opacity: '1',
                    opacityHover: '1',
                    overflow: 'hidden',
                    cursor: 'default',
                    customCursorIcon: '',
                    customCursorSize: '20px',
                    tilt: false,
                    tiltXamount: 10,
                    tiltYamount: 10,
                    text: false,
                    textClass: false,
                    textPosition: 'middle',
                    textAlignment: 'center',
                    textXParallax: 10,
                    textYParallax: 10,
                    textOpacity: 0,
                    textOpacityHover: 1
                };



            //If options are passed, use options values
            if(options !== undefined){
                if(options.scale !== undefined)               { defaults.scale = options.scale }
                if(options.transitionTime !== undefined)      { defaults.transitionTime = options.transitionTime }
                if(options.transitionTimeLeave !== undefined) { defaults.transitionTimeLeave = options.transitionTimeLeave }
                if(options.opacity !== undefined)             { defaults.opacity = options.opacity }
                if(options.opacityHover !== undefined)        { defaults.opacityHover = options.opacityHover }
                if(options.overflow !== undefined)            { defaults.overflow = options.overflow }
                if(options.cursor !== undefined)              { defaults.cursor = options.cursor }
                if(options.customCursorIcon !== undefined)    { defaults.customCursorIcon = options.customCursorIcon }
                if(options.customCursorSize !== undefined)    { defaults.customCursorSize = options.customCursorSize }
                if(options.tilt !== undefined)                { defaults.tilt = options.tilt }
                if(options.tiltXamount !== undefined)         { defaults.tiltXamount = options.tiltXamount }
                if(options.tiltYamount !== undefined)         { defaults.tiltYamount = options.tiltYamount }
                if(options.text !== undefined)                { defaults.text = options.text }
                if(options.textClass !== undefined)           { defaults.textClass = options.textClass }
                if(options.textPosition !== undefined)        { defaults.textPosition = options.textPosition }
                if(options.textAlignment !== undefined)       { defaults.textAlignment = options.textAlignment }
                if(options.textXParallax !== undefined)       { defaults.textXParallax = options.textXParallax }
                if(options.textYParallax !== undefined)       { defaults.textYParallax = options.textYParallax }
                if(options.textOpacity !== undefined)         { defaults.textOpacity = options.textOpacity }
                if(options.textOpacityHover !== undefined)    { defaults.textOpacityHover = options.textOpacityHover }
                if(options.onClick !== undefined)             { defaults.onClick = options.onClick }
                if(options.onHover !== undefined)             { defaults.onHover = options.onHover }
                if(options.onMove !== undefined)              { defaults.onMove = options.onMove }
                if(options.onLeave !== undefined)             { defaults.onLeave = options.onLeave }
            }

            //Style that will be injected in the <head>
            var style = '<style>.prz-wrapper{display:inline-block}.prz-container{position:absolute;pointer-events:none;perspective:150vh;}.prz-overlay{position:absolute;width:100%;height:100%;top:0;left:0;background-position:center;background-size:cover;background-repeat:no-repeat;will-change:transform}.prz-text{position:absolute;display:table;width:100%;height:100%;top:0;left:0;will-change:transform,opacity;transition-property:opacity,transform;}.prz-text>div{display:table-cell;}.prz-custom-cursor{display:none;position:absolute;z-index:auto;transform:translateX(-50%) translateY(-50%);opacity:0;transition-property:opacity,background-color;transition-duration:300ms;background-size:contain;background-position:center;}.prz-container.hover>.prz-custom-cursor{display:block}.prz-container.hover.active>.prz-custom-cursor,.prz-container.loading>.prz-custom-cursor{opacity:1}</style>';

            //Include common Parazoom styles
            jQuery('head').append(style);


            //For each Parazoom block
            jQuery(this)
                //Wrap the target container between the prz-container
                .each(function(){

                    //Is an image <img>?
                    if(jQuery(this).attr('src') !== undefined){
                        dataImg = jQuery(this).attr('src');
                        dataTextContent = jQuery(this).attr('alt');
                    }else{
                        dataTextContent = jQuery(this).text();
                    }

                    //Wrap to avoid Parazoom container misplacement
                    jQuery(this).wrap('<div class="prz-wrapper"></div>');

                    //Has a custom data attribute data-prz-img?
                    if(jQuery(this).attr('data-prz-img') !== undefined){
                        dataImg = jQuery(this).attr('data-prz-img');
                    };

                    //If there is at least an image to apply the effect
                    if(dataImg !== undefined && dataImg !== ''){
                        //Apply effect on image load (required to get the right height)
                        var loaderContainer = [dataImg];
                        loaderContainer.forEach(function(source){
                            var loaderImg = jQuery('<img src="'+source+'">');
                            loaderImg.on('load',function(){
                                //Image is loaded
                                var jQimgSources = jQuery('.prz-set[src="'+source+'"],.prz-set[data-prz-img="'+source+'"]');
                                var jQprzContainer = jQuery('.prz-container[data-prz-img="'+source+'"]');
                                //Hide source images
                                //Function 'each' because there can be several images with the same source
                                //Otherwise, only the first image works
                                jQimgSources.each(function(){
                                    jQuery(this).css({
                                        'opacity':0
                                    });
                                    //Display Parazoom container
                                    jQprzContainer
                                        .css({
                                            'display': 'inline-block',
                                            'height': jQuery(this).height()+'px'
                                        });
                                    //Apply css background image with the loaded img
                                    jQprzContainer.find('.prz-overlay')
                                        .css({
                                            'background-image': 'url("'+source+'")'
                                        });
                                });
                            });
                        });

                        //Get custom transition time. If any, use is for this block
                        dataTransitionTime = jQuery(this).attr('data-prz-transition-time');
                        if(dataTransitionTime === undefined){ dataTransitionTime = defaults.transitionTime };

                        //Get custom opacity. If any, use is for this block
                        dataOpacity = jQuery(this).attr('data-prz-opacity');
                        if(dataOpacity === undefined){ dataOpacity = defaults.opacity };

                        //Get custom overflow. If any, use is for this block
                        dataOverflow = jQuery(this).attr('data-prz-overflow');
                        if(dataOverflow === undefined){ dataOverflow = defaults.overflow };

                        //Get custom cursor. If any, use is for this block
                        dataCursor = jQuery(this).attr('data-prz-cursor');
                        if(dataCursor === undefined){ dataCursor = defaults.cursor };

                        //If custom cursor URL is set, set system cursor to none
                        dataCustomCursorIcon = jQuery(this).attr('data-prz-custom-cursor-icon');
                        if(dataCustomCursorIcon === undefined){ dataCustomCursorIcon = defaults.customCursorIcon }
                        if(dataCustomCursorIcon != ''){ dataCursor = 'none'}

                        //Get custom cursor size. If any, use is for this block
                        dataCustomCursorSize = jQuery(this).attr('data-prz-custom-cursor-size');
                        if(dataCustomCursorSize === undefined){ dataCustomCursorSize = defaults.customCursorSize };

                        //Get custom text content. If any, use is for this block
                        if(jQuery(this).attr('data-prz-text-content') !== undefined){ dataTextContent = jQuery(this).attr('data-prz-text-content') };

                        //Get custom text position. If any, use is for this block
                        dataTextPosition = jQuery(this).attr('data-prz-text-position');
                        if(dataTextPosition === undefined){ dataTextPosition = defaults.textPosition };

                        //Get custom text alignment. If any, use is for this block
                        dataTextAlignment = jQuery(this).attr('data-prz-text-alignment');
                        if(dataTextAlignment === undefined){ dataTextAlignment = defaults.textAlignment };

                        //Get custom text class name. If any, use is for this block
                        dataTextClass = jQuery(this).attr('data-prz-text-class');
                        if(dataTextClass === undefined){ dataTextClass = defaults.textClass };

                        //Get custom text opacity. If any, use is for this block
                        dataTextOpacity = jQuery(this).attr('data-prz-text-opacity');
                        if(dataTextOpacity === undefined){ dataTextOpacity = defaults.textOpacity };

                        //Initialize index to assign an unique ID that will be used to match mouse movements on user content with parazoom containers
                        dataIndex = i;
                        for( var n=0; n < 5; n++ ){
                            dataIndex += quikRandom.charAt(Math.floor(Math.random() * quikRandom.length))+i;
                        }
                        jQuery(this).attr('data-prz-id', dataIndex);
                        i++;

                        //Get user content data required to build a parazoom container
                        dataHeight = jQuery(this).height();
                        dataWidth = jQuery(this).width();
                        dataPosition = jQuery(this).offset();
                        // dataPaddingTop = parseFloat(jQuery(this).css('padding-top'));
                        // dataPaddingRight = parseFloat(jQuery(this).css('padding-right'));
                        // dataPaddingLeft = parseFloat(jQuery(this).css('padding-left'));

                        jQuery(this)
                            .before('<div class="prz-container" data-prz-img="'+dataImg+'" data-prz-id="'+dataIndex+'" style="display:none;width:'+dataWidth+'px; height:'+dataHeight+'px; overflow:'+dataOverflow+'"><div class="prz-overlay" data-prz-id="'+dataIndex+'" style="opacity:'+dataOpacity+'; transition-property:transform,opacity; transition-duration: '+dataTransitionTime+'"></div><div class="prz-text" data-prz-id="'+dataIndex+'" style="transition-duration: '+dataTransitionTime+'; text-align:'+dataTextAlignment+'; opacity:'+dataTextOpacity+'"><div class="'+dataTextClass+'" style="vertical-align:'+dataTextPosition+'">'+dataTextContent+'</div></div><div class="prz-custom-cursor" style="background-image:url('+dataCustomCursorIcon+');width:'+dataCustomCursorSize+';height:'+dataCustomCursorSize+'"></div></div>')
                            .css({
                                backgroundColor:'transparent',
                                backgroundImage: 'none',
                                //Cursor CSS property
                                cursor: dataCursor
                            })
                            //When all done, add prz-set CSS class to the user content element
                            .addClass('prz-set');

                        //If image CSS position is not initial (inline/static)
                        //Adjust Parazoom container accordingly
                        dataCSSPosition = jQuery(this).css('position');
                        dataCSSTop = jQuery(this).css('top');
                        dataCSSRight = jQuery(this).css('right');
                        dataCSSBottom = jQuery(this).css('bottom');
                        dataCSSLeft = jQuery(this).css('left');
                        dataCSSZIndex = jQuery(this).css('z-index');
                        if(dataCSSPosition != 'static'){
                            jQuery('.prz-container[data-prz-id="'+dataIndex+'"]')
                                .css({
                                    'position': dataCSSPosition,
                                    'top': dataCSSTop,
                                    'left': dataCSSLeft,
                                    'right': dataCSSRight,
                                    'bottom': dataCSSBottom,
                                    'z-index': dataCSSZIndex
                                });
                        };
                    }
                })

                //When user clicks, we add an event
                .on('click',function(){
                    // Create the event.
                    var event = document.createEvent('Event');
                    // Define that the event name is 'przClick'.
                    event.initEvent('przClick', true, true);
                    // Listen for the event.
                    this.addEventListener('przClick', function (e) {
                      // e.target matches elem
                    }, false);
                    // target can be any Element or other EventTarget.
                    this.dispatchEvent(event);
                })

                //When user hover the user content block
                .on('mouseenter', function(e){
                    if(jQuery(this).hasClass('prz-set')) {
                        dataWidth = jQuery(this).width();
                        dataHeight = jQuery(this).height();
                        dataScale = jQuery(this).attr('data-prz-scale');
                        if(dataScale === undefined){ dataScale = defaults.scale; }

                        dataOpacity = jQuery(this).attr('data-prz-opacity');
                        if(dataOpacity === undefined){ dataOpacity = defaults.opacity; }

                        dataOpacityHover = jQuery(this).attr('data-prz-opacity-hover');
                        if(dataOpacityHover === undefined){ dataOpacityHover = defaults.opacityHover; }

                        dataTransitionTime = jQuery(this).attr('data-prz-transition-time');
                        if(dataTransitionTime === undefined){ dataTransitionTime = defaults.transitionTime; }

                        dataCursor = jQuery(this).attr('data-prz-cursor');
                        if(dataCursor === undefined){ dataCursor = defaults.cursor; }

                        //If custom cursor URL is set, set system cursor to none
                        dataCustomCursorIcon = jQuery(this).attr('data-prz-custom-cursor-icon');
                        if(dataCustomCursorIcon === undefined){ dataCustomCursorIcon = defaults.customCursorIcon }
                        if(dataCustomCursorIcon != ''){ dataCursor = 'none'}

                        //Get custom cursor size. If any, use is for this block
                        dataCustomCursorSize = jQuery(this).attr('data-prz-custom-cursor-size');
                        if(dataCustomCursorSize === undefined){ dataCustomCursorSize = defaults.customCursorSize };

                        //Get custom text enabled/disabled. If any, use is for this block
                        dataText = jQuery(this).attr('data-prz-text');
                        if(dataText === undefined){ dataText = defaults.text };

                        //Get custom text opacity. If any, use is for this block
                        dataTextOpacity = jQuery(this).attr('data-prz-text-opacity');
                        if(dataTextOpacity === undefined){ dataTextOpacity = defaults.textOpacity };

                        //Get custom text opacity on hover. If any, use is for this block
                        dataTextOpacityHover = jQuery(this).attr('data-prz-text-opacity-hover');
                        if(dataTextOpacityHover === undefined){ dataTextOpacityHover = defaults.textOpacityHover };

                        //Get custom text horizontal parallax. If any, use is for this block
                        dataTextXParallax = jQuery(this).attr('data-prz-text-x-parallax');
                        if(dataTextXParallax === undefined){ dataTextXParallax = defaults.textXParallax };

                        //Get custom text vertical parallax. If any, use is for this block
                        dataTextYParallax = jQuery(this).attr('data-prz-text-y-parallax');
                        if(dataTextYParallax === undefined){ dataTextYParallax = defaults.textYParallax };

                        //Get custom Tilt effect. If any, use is for this block
                        dataTilt = jQuery(this).attr('data-prz-tilt');
                        if(dataTilt === undefined){
                            dataTilt = defaults.tilt;
                        }else{
                            dataTilt = eval(dataTilt);
                        };

                        //Get custom Tilt X amount. If any, use is for this block. Work only if tilt is enabled
                        dataTiltXamount = jQuery(this).attr('data-prz-tilt-x-amount');
                        if(dataTiltXamount === undefined){
                            dataTiltXamount = defaults.tiltXamount;
                        }else{
                            dataTiltXamount = parseInt(dataTiltXamount);
                        };

                        //Get custom Tilt X amount. If any, use is for this block. Work only if tilt is enabled
                        dataTiltYamount = jQuery(this).attr('data-prz-tilt-y-amount');
                        if(dataTiltYamount === undefined){
                            dataTiltYamount = defaults.tiltYamount;
                        }else{
                            dataTiltYamount = parseInt(dataTiltYamount);
                        };

                        // dataImg = jQuery(this).attr('data-prz-img');
                        dataLargeImg = jQuery(this).attr('data-prz-large-img');
                        targetID = jQuery(this).attr('data-prz-id');
                        var jQcontainer = jQuery('.prz-container[data-prz-id="'+targetID+'"]');
                        var jQtarget = jQcontainer.find('.prz-overlay').eq(0);
                        var jQtargetText = jQcontainer.find('.prz-text').eq(0);

                        if(dataLargeImg !== undefined){
                            //Time you wait for the large img
                            var jQtargetCustomCursor = jQcontainer.find('.prz-custom-cursor').eq(0);
                            var jQcurrentNode = jQuery(this);
                            jQcurrentNode.css({cursor:'wait'});
                            jQtargetCustomCursor.addClass('loading');
                            var img = $('<img src="'+dataLargeImg+'">');
                            img.on('load',function(){
                                console.log(dataCursor);
                                //Large image is loaded
                                jQtarget.css({
                                    backgroundImage: 'url('+dataLargeImg+')'
                                });
                                jQtargetCustomCursor.removeClass('loading');
                                if(defaults.customCursorIcon != ''){
                                    jQcurrentNode.css({cursor:'none'});
                                    jQtargetCustomCursor.css({
                                        backgroundImage: 'url('+dataCustomCursorIcon+')'
                                    });
                                }else{
                                    jQcurrentNode.css({cursor:dataCursor});
                                }
                            });
                        }
                        jQtarget.css({
                            // transform: 'scale('+dataScale+')',
                            opacity: dataOpacityHover,
                            transitionDuration: dataTransitionTime
                        });
                        jQcontainer.addClass('hover');
                        setTimeout(function(){
                            jQcontainer.addClass('active');
                        },1)

                        if(dataText == true){
                            jQtargetText
                                .css({
                                    // transform: 'scale('+dataScale+')',
                                    opacity: dataTextOpacityHover,
                                    transitionDuration: dataTransitionTime
                                })
                                .children().addClass('active');
                        }

                    }
                    // Create the event.
                    var event = document.createEvent('Event');
                    // Define that the event name is 'przHover'.
                    event.initEvent('przHover', true, true);
                    // Listen for the event.
                    this.addEventListener('przHover', function (e) {
                      // e.target matches elem
                    }, false);
                    // target can be any Element or other EventTarget.
                    this.dispatchEvent(event);
                })

                //When the mouse is over the use content block
                .on('mousemove', function(e){
                    targetID = jQuery(this).attr('data-prz-id');
                    var jQcontainer = jQuery('.prz-container[data-prz-id="'+targetID+'"]');
                    var jQtarget = jQcontainer.find('.prz-overlay').eq(0);
                    var jQtargetText = jQcontainer.find('.prz-text').eq(0);
                    var jQtargetCustomCursor = jQcontainer.find('.prz-custom-cursor').eq(0);
                    if(dataImg !== undefined) {
                        if(dataCustomCursorIcon != ''){
                            jQtargetCustomCursor.css({
                                'top': e.offsetY+'px',
                                'left': e.offsetX+'px',
                                'transform': 'translateY(-50%) translateX(-50%)  rotateX('+dataTiltYamount*dataPercentY+'deg) rotateY('+dataTiltXamount*dataPercentX+'deg) translateZ(50px) ',
                                'transition-property': 'transform,opacity',
                                'transition-duration': mouseMoveTransition
                            });
                        }
                        jQtarget.css({
                            'transform-origin': (100 * e.offsetX / dataWidth)+'% '+(100 * e.offsetY / dataHeight)+'%'
                        });
                        jQtargetText.css({
                            'transform-origin': (100 * e.offsetX / dataWidth)+'% '+(100 * e.offsetY / dataHeight)+'%'
                        });
                        //Mouse positions
                        dataPosX = - (dataWidth / 2 - dataWidth * (e.offsetX / dataWidth));
                        dataPosY = (dataHeight / 2 - dataHeight * (e.offsetY / dataHeight));
                        dataPercentX = 2 * dataPosX / dataWidth;
                        dataPercentY = 2 * dataPosY / dataHeight;
                        //If tilt effect is enabled
                        if(dataTilt == true){
                            if(mouseMove > mouseMoveThreshold){
                                jQtarget.css({
                                    'transform': 'scale('+dataScale+') rotateX('+dataTiltYamount*dataPercentY+'deg) rotateY('+dataTiltXamount*dataPercentX+'deg)',
                                    'transition-duration': mouseMoveTransition
                                });
                                if(dataText == true){
                                    jQtargetText.css({
                                        'transform': 'scale('+dataScale+') translateX('+0.1*dataTextXParallax*dataTiltXamount*dataPercentX+'px) translateY('+-0.1*dataTextYParallax*dataTiltYamount*dataPercentY+'px) translateZ(10px) rotateX('+dataTiltYamount*dataPercentY+'deg) rotateY('+dataTiltXamount*dataPercentX+'deg)',
                                        'transition-property': 'opacity,transform',
                                        'transition-duration': mouseMoveTransition
                                    });

                                }
                                mouseMove = 0;
                            }else{
                                mouseMove++;
                            }
                            // jQtargetText.css({
                            //     'transform': 'scale('+dataScale+') translateX('+2*dataTiltXamount*dataPercentX+'px) translateY('+-2*dataTiltYamount*dataPercentY+'px) translateZ(200px)  rotateX('+dataTiltYamount*dataPercentY+'deg) rotateY('+dataTiltXamount*dataPercentX+'deg)',
                            //     'transition-property': 'opacity'
                            // });
                        }else{
                            jQtarget.css({
                                'transform': 'scale('+dataScale+')'
                            });
                            if(dataText == true){
                                jQtargetText.css({
                                    'transform': 'scale('+dataScale+') translateX('+0.1*dataTextXParallax*dataTiltXamount*dataPercentX+'px) translateY('+-0.1*dataTextYParallax*dataTiltYamount*dataPercentY+'px) translateZ(10px)',
                                    'transition-property': 'opacity'
                                });
                            }
                        }
                    }
                    //When mouse moves on a use content block, send mouse coordinates and width and height of this user content block
                    callbacks = {
                        id: targetID,
                        x: e.offsetX,
                        y: e.offsetY,
                        mouseMove: mouseMove,
                        mouseMoveThreshold: mouseMoveThreshold,
                        height: dataHeight,
                        width: dataWidth,
                        tilt: dataTilt,
                        percentX: dataPercentX,
                        percentY: dataPercentY,
                        tiltXamount: dataTiltXamount,
                        tiltYamount: dataTiltYamount,
                        transitionTime: dataTransitionTime,
                        transitionTimeLeave: dataTransitionTimeLeave
                    };
                    //If a function is passed through options arguments, execute this function
                    if(defaults.onMove){
                        defaults.onMove(callbacks);
                    }
                })

                //When mouse leaves the user content block
                .on('mouseleave', function(e){
                    targetID = jQuery(this).attr('data-prz-id');
                    dataTransitionTimeLeave = jQuery(this).attr('data-prz-transition-time-leave');
                    //If a custom leave transition time is set, we use it
                    if(dataTransitionTimeLeave === undefined){ dataTransitionTimeLeave = defaults.transitionTimeLeave; }
                    var jQcontainer = jQuery('.prz-container[data-prz-id="'+targetID+'"]');
                    var jQtarget = jQcontainer.find('.prz-overlay').eq(0);
                    var jQtargetText = jQcontainer.find('.prz-text').eq(0);
                    //Apply CSS on leave
                    jQtarget.css({
                        'transition-property': 'transform',
                        'opacity': dataOpacity,
                        'background-image': 'url('+jQtarget.parent().attr('data-prz-img')+')',
                        'transition-duration': dataTransitionTimeLeave
                    });

                    jQcontainer.removeClass('active');
                    setTimeout(function(){
                        jQcontainer.removeClass('hover');
                    },300)

                    jQtargetText.css({
                        'opacity': dataTextOpacity,
                        'transition-duration': dataTransitionTimeLeave
                    });
                    setTimeout(function(){
                        jQtarget.css({
                            'transform': 'scale(1) rotateX(0deg) rotateY(0deg)'
                        });
                        if(dataText == true){
                            jQtargetText
                                .css({
                                    'transform': 'scale(1) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px)',
                                    'transition-property': 'transform,opacity'
                                })
                                .children().removeClass('active');
                        }
                    },1);

                    // Create the event.
                    var event = document.createEvent('Event');
                    // Define that the event name is 'przLeave'.
                    event.initEvent('przLeave', true, true);
                    // Listen for the event.
                    this.addEventListener('przLeave', function (e) {
                      // e.target matches elem
                    }, false);
                    // target can be any Element or other EventTarget.
                    this.dispatchEvent(event);

                    //Reset mousemove
                    mouseMove = mouseMoveThreshold + 1;
                })

                //On the event przClick
                .on('przClick', function(e){
                    // e.preventDefault();
                    //Whereas przHover and przLeave have priorites (data attribute > global option function),
                    //przClick makes possible to assign in parallel a link + (data attribute > global option function)

                    //Get optional function executed on mouse click from data attribute
                    dataCallback = jQuery(this).attr('data-prz-callback-click');
                    //If set, use it in priority
                    if(dataCallback !== undefined){
                        eval(dataCallback);
                    //If no custom function assigned
                    }else{
                        //If not, use function in options with the following callbacks available
                        //Get Parazoom index
                        dataIndex = jQuery(this).attr('data-prz-id');
                        //Populate callbacks values
                        var callbacks =  {
                            id: dataIndex
                        }
                        //If onClick, send callbacks values
                        if(defaults.onClick){
                            defaults.onClick(callbacks);
                        }
                    }

                    //Independantly from the custom function, get optional link data attribute
                    dataLink = jQuery(this).attr('data-prz-link');
                    //If set, use it in priority
                    if(dataLink !== undefined){
                        window.location.href = dataLink;
                    }
                })

                //On the event przHover
                .on('przHover', function(e){
                    //Get optional function executed on hover from data attribute
                    dataCallback = jQuery(this).attr('data-prz-callback-hover');
                    //If set, use it in priority
                    if(dataCallback !== undefined){
                        eval(dataCallback);
                    }else{
                        //If not, use function in options with the following callbacks available
                        //Get Parazoom index
                        dataIndex = jQuery(this).attr('data-prz-id');
                        //Populate callbacks values
                        var callbacks =  {
                            id: targetID,
                            width: dataWidth,
                            height: dataHeight
                        }
                        //If onHover, send callbacks values
                        if(defaults.onHover){
                            defaults.onHover(callbacks);
                        }
                    }
                })

                //On the event przLeave
                .on('przLeave', function(e){
                    //Get optional function executed on mouse leave from data attribute
                    dataCallback = jQuery(this).attr('data-prz-callback-leave');
                    //If set, use it in priority
                    if(dataCallback !== undefined){
                        eval(dataCallback);
                    }else{
                        //If not, use function in options with the following callbacks available
                        //Get Parazoom index
                        dataIndex = jQuery(this).attr('data-prz-id');
                        //Populate callbacks values
                        var callbacks =  {
                            id: targetID

                        }
                        //If onClick, send callbacks values
                        if(defaults.onLeave){
                            defaults.onLeave(callbacks);
                        }
                    }
                });

            //Update on window resize
            jQuery(window).on('resize', function(){
                jQuery('.prz-set').each(function(){
                    dataHeight = jQuery(this).height();
                    dataWidth = jQuery(this).width();
                    dataIndex = jQuery(this).attr('data-prz-id');
                    jQuery('.prz-container[data-prz-id="'+dataIndex+'"]').css({
                        'width': dataWidth+'px',
                        'height': dataHeight+'px'
                    });
                    //If image CSS position is not initial (inline/static)
                    //Adjust Parazoom container accordingly
                    dataCSSPosition = jQuery(this).css('position');
                    dataCSSTop = jQuery(this).css('top');
                    dataCSSRight = jQuery(this).css('right');
                    dataCSSBottom = jQuery(this).css('bottom');
                    dataCSSLeft = jQuery(this).css('left');
                    dataCSSZIndex = jQuery(this).css('z-index');
                    if(dataCSSPosition != 'static'){
                        jQuery('.prz-container[data-prz-id="'+dataIndex+'"]')
                            .css({
                                'position': dataCSSPosition,
                                'top': dataCSSTop,
                                'left': dataCSSLeft,
                                'right': dataCSSRight,
                                'bottom': dataCSSBottom,
                                'z-index': dataCSSZIndex
                            });
                    };
                })
            });
        }//END IF TOUCH DEVICE

    };

}(jQuery));
