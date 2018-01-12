//Static jQuery objects
var jQ_forgeContainer = jQuery('#container'),
    jQ_navPointsOfInterest = jQuery('nav.points-of-interest'),
    jQ_hotspotsPoi = jQuery('.hotspot:not(.easter-egg):not(.media-style__cache)'),
    jQ_modalShare = jQuery('.modal.share'),
    jQ_modalPlacesDetails = jQuery('.modal.places-details'),
    jQ_modalFloorPlan = jQuery('.modal.floor-plan'),
    jQ_sidebarPrimary = jQuery('.sidebar.primary'),
    jQ_sidebarSecondary = jQuery('.sidebar.secondary'),
    jQ_sidebarMain = jQuery('.sidebar.main'),
    jQ_aToggle = jQuery('a[href="#toggle"]'),
    jQ_aFullscreen = jQuery('a[href="#fullscreen"]'),
    jQ_aZoom = jQuery('a[href*="#zoom"]'),
    jQ_responsiveToolbarLinks = jQuery('.link-toolbar.hideable'),
    jQ_mobileMenuBackdrop = jQuery('.backdrop.mobile-menu'),
    jQ_notificationBarPopup = jQuery('.notification-bar.popup'),
    jQ_cache = jQuery('.hotspot.media-style__cache');

//Static variables
var SV_viewerTransitionDuration = parseFloat(jQ_forgeContainer.css('transition-duration')) * 1000;
var SV_assetsRootUrl = './';
if(jQuery('html').hasClass('cdn')){
    SV_assetsRootUrl = 'https://cdn.forgejs.org/samples/paris2018/';
}


/**
 * Get the value of a querystring
 * @param  {String} field The field to get the value of
 * @param  {String} url   The URL to get the value from (optional)
 * @return {String}       The field value
 */
var getQueryString = function (field,url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
};


//Deep link URL update
var deepLinkUpdater = function(){
    var currentYaw = viewer.camera.yaw;
    var currentPitch = viewer.camera.pitch;
    var currentFov = viewer.camera.fov;
    var currentSceneUid = viewer.story.sceneUid;

    // window.location.hash = share_pseudo_url;
    // history.replaceState(null, null, share_pseudo_url);
    var currentSceneTitle;
    if(currentSceneUid == 'paris'){
        currentSceneTitle = jQuery('body h1').eq(0).text();
    }else{
        currentSceneTitle = jQuery('a[href="#'+currentSceneUid+'"]>span').text();
    }
    var share_pseudo_url = 'share.php?uid='+currentSceneUid+'&yaw='+currentYaw+'&pitch='+currentPitch+'&fov='+currentFov+'&title='+currentSceneTitle;
    window.history.pushState(currentSceneTitle, null, share_pseudo_url);
    document.title = currentSceneTitle;
}

//Utilities
var utilities = {
    browser: FORGE.Device.browser,
    iOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    browserLanguage: navigator.language
}
if(utilities.iOS){
    jQ_aFullscreen.remove();
}
// var isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

//Launch
var launch = function(){
    jQuery('.intro').removeClass('active');
    jQ_forgeContainer.removeClass('dimmed');
    jQ_sidebarPrimary.addClass('active');
    // setCookie('Paris26g_Intro','true',365);
    // var jQcurrentMenuItem = jQ_sidebarPrimary.find('p.toolbar a.active');
    // if(jQcurrentMenuItem.length > 0 && getCookie('Paris26g_MenuStatus') == 'true'){
    //     var currentId = jQcurrentMenuItem.attr('href');
    //     tabulation(currentId);
    // }
    var currentTabId = getCookie('Paris26g_MenuItem');
    var currentMenuStatus = getCookie('Paris26g_MenuStatus');
    if(currentTabId != '' && currentMenuStatus == 'true'){
        toggleMenu('show');
        tabulation(currentTabId);
    }
}

//Median value calculation
var median = function(values) {
    values.sort( function(a,b) {return a - b;} );
    var half = Math.floor(values.length/2);
    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}

//Enable disable viewer controllers
var viewerControllers = function(cmd){
    if(cmd !== undefined){
        if(cmd == true){
            // viewer.raf.start();
            viewer.controllers.all.forEach(function(el) {el.enable();});
            jQ_aZoom.removeClass('inactive');
        }else if(cmd == false){
            viewer.controllers.all.forEach(function(el) {el.disable();});
            jQ_aZoom.addClass('inactive');
            // viewer.raf.stop();
        }else{
            return false;
        }
    }else{
        return false;
    }
}

//Camera movement
var kickMeTo_options = {
        zoomInDuration: 2000,
        zoomOutDuration: 0,
        closeSpots: true,
        fakeTransition: false,
        openSpotOnComplete: true
    };
var kickMeTo = function(id, zoomInDuration = kickMeTo_options.zoomInDuration, zoomOutDuration = kickMeTo_options.zoomOutDuration, closeSpots = kickMeTo_options.closeSpots, fakeTransition = kickMeTo_options.fakeTransition, openSpotOnComplete = kickMeTo_options.openSpotOnComplete){

    if(id !== undefined){

        var jQlink = jQ_navPointsOfInterest.find('a[href="#'+id+'"]'),
            jQspot = jQuery('[id*="hotspot-dom-'+id+'"]'),
            targetFov = parseFloat(jQlink.attr('data-fov')),
            targetYaw = parseFloat(jQlink.attr('data-yaw')),
            targetPitch = parseFloat(jQlink.attr('data-pitch')),
            currentFov = parseFloat(viewer.camera.fov),
            currentYaw = parseFloat(viewer.camera.yaw),
            currentPitch = parseFloat(viewer.camera.pitch),
            fovDiff = Math.abs(targetFov - currentFov),
            durationMax = zoomInDuration,
            fovMax = 40,
            durationMin = 500,
            //Transition time according to the difference between target FOV and source FOV
            duration = (durationMax / fovMax) * fovDiff + durationMin;
        //Target spot management, preload thumbnails etc
        activeSpotManagement(id);
        //To make a camera movement, target coordinates must be slightly different from current
        //and the target spot id must not be opened
        if((targetFov != currentFov || targetYaw != currentYaw || targetPitch != currentPitch)){
            //Enable controllers
            viewerControllers(true);
            //Close all modals
            modal('all','hide');
            //Hide hero image
            // jQuery('.scene>.hero-image').removeClass('active');

            //Make all hotspot get closed
            if(closeSpots) {
                jQ_hotspotsPoi.removeClass('active');
            }

            //Workaround transition for kickMeTo:
            //Avoid misloading of tiles by transitioning with CSS/JS only, no camera movement
            if(fakeTransition){
                var transitionDuration = SV_viewerTransitionDuration,
                    zoomOutFov = currentFov / 1.5,
                    zoomInFov = targetFov * 1.5;

                viewer.camera.lookAt(null, null, null, zoomOutFov, transitionDuration, false, 'linear');
                jQ_forgeContainer.addClass('transition');
                // jQ_forgeContainer.removeClass('transformed');
                setTimeout(function(){
                    viewer.camera.lookAt(targetYaw, targetPitch, null, zoomInFov, 0, false, 'linear');
                    viewer.camera.lookAt(null, null, null, targetFov, transitionDuration, false, 'linear');
                    jQ_forgeContainer.removeClass('transition');
                    // jQ_forgeContainer.addClass('transformed');
                    if(openSpotOnComplete){
                        setTimeout(function(){
                            jQspot.addClass('active');
                            // placeDetails(id);
                            // modal('places-details','show');
                        },transitionDuration);
                    }
                },transitionDuration);

            //Default transition
            }else{
                if(zoomOutDuration > 0){
                    var medianYaw = median([currentYaw,targetYaw]),
                        medianFov = targetFov * 2;
                    // jQuery('.cursor .status').text('Take you to...');
                    viewer.camera.lookAt(medianYaw, 0, 0, medianFov, zoomOutDuration, false, 'easeInOutCubic');
                }
                if(jQspot.hasClass('active')){
                    jQspot.removeClass('active')
                }
                setTimeout(function(){
                    viewer.camera.lookAt(targetYaw, targetPitch, 0, targetFov, duration, false, 'easeInOutCubic');
                    if(openSpotOnComplete){
                        setTimeout(function(){
                            jQspot.addClass('active');
                            viewerControllers(false);
                            // jQuery('.cursor .status').text('');
                        },duration);
                    }
                },zoomOutDuration);


            }
        }else{
            if(!jQspot.hasClass('active')){
                jQspot.addClass('active');
                viewerControllers(false);
            }
        }
    }
}

//Points of interests content
//Copy content of the active hotspot to the details lightbox
var poiContent = function(id){
    if(id !== undefined){
        var jQcontent = jQuery('[id*="hotspot-dom-'+id+'"]').find('h2[lang]');
        var currentLanguage = getCookie('Paris26g_Language');
        var jQ_modalPlacesDetailsContent = jQ_modalPlacesDetails.find('.content');
        jQ_modalPlacesDetailsContent.html('');
        jQ_modalPlacesDetails.find('.toolbar').attr('data-scene-id',id);
        jQcontent.each(function(){
            var content = '<h2 lang="'+jQuery(this).attr('lang')+'">'+jQuery(this).text()+'</h2>';
            jQ_modalPlacesDetailsContent.append(content);
        });
        if(currentLanguage == ''){
            jQ_modalPlacesDetailsContent.find('h2[lang="fr"]').addClass('active');
        }else{
            jQ_modalPlacesDetailsContent.find('h2[lang="'+currentLanguage+'"]').addClass('active');
        }
    }else{
        return false;
    }
}

//Change scene with a CSS transition
//@id - string - UID of the target scene
//@transitionClass - string - CSS class to apply
var goToScene = function(id,transitionClass = 'transition3'){
    var currentFov = viewer.camera.fov;
    var targetFov = currentFov / 1.2;
    var currentYaw = viewer.camera.yaw;
    var targetYaw = null;
    viewerControllers(true);
    viewer.camera.lookAt(targetYaw, null, null, targetFov, SV_viewerTransitionDuration, false, 'linear');
    jQ_forgeContainer.addClass(transitionClass);

    setTimeout(function(){
        viewer.story.loadScene(id);
        currentFov = viewer.camera.fov;
        currentYaw = viewer.camera.yaw;
        //Movement effect on start
        if(id == 'paris'){
            targetFov = null;
            targetYaw = null;
        }else{
            currentFov = 80;
            targetFov = currentFov / 1.1;
            targetYaw = currentYaw + 10;
        }
        // jQ_forgeContainer.addClass('step2');
        viewer.camera.lookAt(targetYaw, null, null, targetFov, SV_viewerTransitionDuration*3, false, 'easeOutCubic');
        setTimeout(function(){
            jQ_forgeContainer.removeClass(transitionClass+' step2 step3 step4 step5 step6');
        },SV_viewerTransitionDuration);
    },SV_viewerTransitionDuration);
}

//Open a point of interest
//@id - string - UID of the target scene
var openPoi = function(id){
    if(id !== undefined){
        var transitionClass;
        //If POI already opened
        if(jQ_modalFloorPlan.hasClass('active')){
            transitionClass = 'transition3';
            jQ_modalFloorPlan.removeClass('active');
        //If currently closed
        }else{
            transitionClass = 'transition2';
        }
        activeSpotManagement(id);

        modal('places-details','hide');
        goToScene(id,transitionClass);
        setTimeout(function(){
            poiContent(id);
            modal('floor-plan','show');
            setTimeout(function(){
                modal('places-details','show');
                jQ_modalFloorPlan.addClass('active');
                //Update page title
                document.title = jQ_navPointsOfInterest.find('a[href="#'+id+'"]>span').text();
                _gaq.push(['_trackEvent','Point of interest',document.title]);
            },SV_viewerTransitionDuration);
        },SV_viewerTransitionDuration);
    }
}

//Close any point of interest if opened
//@goBackTo - string - 'spot'(:default) to go back to the Paris POI hotspot opened. 'home' to only go to the place
var closePoi = function(goBackTo = 'spot'){
    //If viewer is in opened state
    if(jQ_modalPlacesDetails.hasClass('active')){
        jQ_forgeContainer.addClass('step4');
        jQ_modalFloorPlan.removeClass('active');

        modal('places-details','hide');
        var currentSceneId = viewer.story.sceneUid;
        goToScene('paris','transition2');
        _gaq.push(['_trackEvent','Point of interest','Go to Gigapixel']);
        setTimeout(function(){

            if(goBackTo == 'spot'){
                kickMeTo(currentSceneId,0,0);
            }else if(goBackTo == 'home'){
                jQ_hotspotsPoi.removeClass('active');
                kickMeTo(currentSceneId,null,null,null,null,false);
            }else if(goBackTo == 'home-full'){
                jQ_hotspotsPoi.removeClass('active');
                viewer.camera.lookAt(-22, -13, null, 40, 2000, false, 'easeInOutCubic');
            }
        },SV_viewerTransitionDuration * 1.6); //1.2 to wait gotoscene ends
    }
}

//Show hide POI info + toolbar
var modalPlacesDetails = function(cmd){
    if(cmd === undefined){
        if(jQ_modalPlacesDetails.hasClass('visible')){
            jQ_modalPlacesDetails.removeClass('visible');
        }else{
            jQ_modalPlacesDetails.addClass('visible');
        }
    }else if(cmd == 'show'){
        jQ_modalPlacesDetails.addClass('visible');
    }else if(cmd == 'hide'){
        jQ_modalPlacesDetails.removeClass('visible');
    }
}
//Modals
//Open close modals with its associated backdrop
var modal = function(id,command){
    if(id !== undefined && command !== undefined){
        if(command == 'hide'){
            if(id == 'all'){
                jQuery('.modal, .backdrop:not(.header):not(.places):not(.mobile-menu)').removeClass('active');
            }else{
                jQuery('.modal.'+id+', .backdrop.'+id).removeClass('active');
            }
            //Verify if there is any hotspot opened
            //if yes, then disable controllers
            //otherwise enable controllers
            if(jQ_hotspotsPoi.hasClass('active') && viewer.story.sceneUid == 'paris'){
                viewerControllers(false);
            }else{
                viewerControllers(true);
            }
        }else if(command == 'show'){
            jQuery('.modal.'+id+', .backdrop.'+id).addClass('active');
        }
        //Exceptions
        if(id == 'share'){
            if(command == 'show'){
                //Disable controllers
                viewerControllers(false);
                _gaq.push(['_trackEvent','Share','Opened']);
            }else if(command == 'hide'){
                //Reset
                jQ_modalShare
                    .removeClass('loaded congratulations')
                    .find('.image').css('background-image','none');
                //Remove what has to be removed
                jQ_modalShare.find('.content .include').remove();
                jQ_modalShare.find('textarea').val('');
            }
        }
    }else{
        return false;
    }
}

//Active hotspot management
//Lazy load previews and snapshots for the floor plan and the #learn-more button in the spots descriptions
//@id - string - optional argument to activate a specific spot id
var activeSpotManagement = function(id){
    var jQcurrentActiveSpot;
    if(id !== undefined){
        jQcurrentActiveSpot = jQuery('.hotspot[id*="hotspot-dom-'+id+'"]');
    }else{
        jQcurrentActiveSpot = jQuery('.hotspot:not(.easter-egg):not(.media-style__cache).active').eq(0);
    }

    if(jQcurrentActiveSpot.length > 0){
        var rawId = jQcurrentActiveSpot.attr('id'),
            id = rawId.substring(12,14),
            snapshotUrl = SV_assetsRootUrl+'img/poi/snapshots/thumbs/'+id+'.jpg',
            previewUrl = SV_assetsRootUrl+'img/poi/previews/thumbs/'+id+'.jpg',
            snapshotImg = '<img src="'+snapshotUrl+'">',
            previewImg = '<img src="'+previewUrl+'">',
            jQsnapshotImg = jQuery(snapshotImg),
            jQpreviewImg = jQuery(previewImg),
            jQlearnMore = jQcurrentActiveSpot.find('a[href="#learn-more"]'),
            jQimgs = jQcurrentActiveSpot.find('.content img[data-src]');
        //Lazy load preview image
        jQpreviewImg.on('load',function(){
            jQlearnMore.each(function(){
                if(!jQuery(this).hasClass('active')){
                    jQimgs.attr('src',previewUrl);
                    jQuery(this).addClass('active');
                }
            });
        });

        //Lazy load floor plan image
        jQsnapshotImg.on('load',function(){
            jQuery('.modal.floor-plan').css('background-image','url('+snapshotUrl+')');
        });
    }else{
        // console.log('no active spot');
    }


}


//Easter eggs management
var easterEggsStates = {
    reblochon: false,
    ovni: false,
    tortue: false,
    team: false,
    marmotte: false,
    grenouille: false,
    plaque: false,
    publicite: false,
    feu: false,
    pi: false
};
var easterEggsData = {
    reblochon: [-17.97331848138829, -36.48614130774447, 0.9],
    ovni: [76.25825895217281, 6.03811805210122, 0.9],
    tortue: [-33.544400674007214, -13.313836139075569, 0.9],
    team: [-82.07452108258549, -12.062552784590402, 0.9],
    marmotte: [-66.05246936843554, -21.84537690624756, 0.9],
    grenouille: [-50.794738767970124, -21.695324023030583, 0.9],
    plaque: [0.8730910858899684, -9.802741454522154, 0.9],
    publicite: [0.588852535896853, -3.2081624881142443, 0.9],
    feu: [1.2135669601361578, -2.8239205912434944, 0.9],
    pi: [60.0018079024584, -18.030562125316482, 0.9]
}

var allTrue = function(obj){
    for(var o in obj)
        if(!obj[o]) return false;

    return true;
}

//Count the number of already found easter eggs
//Returns an array with numbers [number of easter eggs found, total number of easter eggs]
var easterEggsCount = function(){
    var numberOfFound = 0;
    for(var o in easterEggsStates){
        if(easterEggsStates[o]){
            numberOfFound++;
        }
    }
    return [numberOfFound,Object.keys(easterEggsStates).length];
}
//Triggered from Forge config.json
var easterEggStatusCheck = function(id){
    if(id !== undefined){
        if(id == 'reblochon' || id == 'ovni' || id == 'tortue' || id == 'team' || id == 'marmotte' || id == 'grenouille' || id == 'plaque' || id == 'publicite' || id == 'pi' || id == 'feu'){
            if(easterEggsStates[id] == false){
                jQuery('#hotspot-dom-easter-egg-'+id+', nav.easter-eggs a[href="#'+id+'"]').addClass('checked');
                easterEggsStates[id] = true;
                setCookie('Paris26g_EasterEgg_'+id,'true',365);
                var jQeasterEgg = jQuery('nav.easter-eggs a[href="#'+id+'"]');
                jQeasterEgg.detach();
                jQuery('nav.easter-eggs').prepend(jQeasterEgg);
                jQeasterEgg.closest('.content').scrollTop(0);

                //Found all??
                if(easterEggsCount()[0] == easterEggsCount()[1]){
                    congratulations('show');
                    _gaq.push(['_trackEvent','Easter Eggs','All found']);
                    // notificationPush('<span lang="fr">Félicitations! Vous avez trouvé tous les objets cachés</span><span lang="en">Congratulations! You found it all!</span><span lang="es">¡Felicitaciones! ¡Lo encontraste todo!</span>','dismissable');
                //If found one
                }else{
                    var plural = '';
                    if(easterEggsCount()[0] > 1){
                        plural = 's';
                    }
                    notificationPush('<span lang="fr">Félicitations! Vous avez trouvé '+easterEggsCount()[0]+' objet'+plural+' caché'+plural+' sur '+easterEggsCount()[1]+'</span><span lang="en">Congratulations! You found '+easterEggsCount()[0]+' easter egg'+plural+' out of '+easterEggsCount()[1]+'!</span><span lang="es">Felicitaciones! encontraste  '+easterEggsCount()[0]+' de '+easterEggsCount()[1]+'!</span>','dismissable');
                    _gaq.push(['_trackEvent','Easter Eggs','Found: '+id]);
                }
            }else{
                notificationPush('<span lang="fr">Déjà trouvé</span><span lang="en">Already found!</span><span lang="es">Ya encontrado</span>','autohide','warning','icon-alert-circle');
            }
            toggleMenu('show');
            tabulation('#easter-eggs');
        }
    }else{

    }
};

//Congratulation you have found all easter eggs
var congratulations =  function(cmd){
    if(cmd = 'show'){
        jQ_modalShare.addClass('loaded congratulations');
        jQ_modalShare.children('.image').css('background-image','url('+SV_assetsRootUrl+'img/paris26-socials.jpg)');
        var content = jQuery('aside.congratulations').html();
        content = '<div class="include">'+content+'</div>';
        jQ_modalShare.children('.content').prepend(content);
        var socialMessageText = jQ_modalShare.children('.content').find('.social-message.active').text();

        jQ_modalShare.find('textarea').val(socialMessageText);
        var currentDomainPath = window.location.origin+window.location.pathname;
        currentDomainPath = currentDomainPath.replace('share.php','');
        var share_pseudo_url = currentDomainPath+'share.php?title='+encodeURIComponent(socialMessageText);
        var share_facebook_url = 'https://facebook.com/sharer/sharer.php?u='+share_pseudo_url;
        var share_twitter_url =  'https://twitter.com/intent/tweet/?text='+encodeURIComponent(socialMessageText)+'&url='+encodeURIComponent(currentDomainPath);
        var share_google_url = 'https://plus.google.com/share?url='+share_pseudo_url;
        var share_pinterest_url = 'https://pinterest.com/pin/create/button/?url='+encodeURIComponent(currentDomainPath)+'&description='+encodeURIComponent(socialMessageText)+'&media='+encodeURIComponent(SV_assetsRootUrl+'img/paris26-socials.jpg');
        jQ_modalShare.find('a.link-facebook').attr('href',share_facebook_url);
        jQ_modalShare.find('a.link-twitter').attr('href',share_twitter_url);
        jQ_modalShare.find('a.link-google').attr('href',share_google_url);
        jQ_modalShare.find('a.link-pinterest').attr('href',share_pinterest_url);
        jQ_modalShare.find('a[href="#copy-link"]').attr('data-clipboard-text',currentDomainPath);
        jQ_modalShare.perfectScrollbar();
        modal('share','show');

    }else if(cmd == 'hide'){
        modal('share','hide');
    }

}

//Notifications
//@text - string - Text to display
//@type - string - Type of behavior: 'autohide': disappear automatically and on click, 'dismissable': click makes it disappear
//@style - string - CSS style (success, warning, alert, info)
var notificationPush = function(text = '<span lang="fr">Message fr</span><span lang="en">Message en</span><span lang="es">Message es</span>', type = 'dismissable', style = 'success', iconclass = 'icon-thumbs-up'){
    var cookieLanguage = getCookie('Paris26g_Language');
    var currentLanguage = jQuery('a[href*="#language"].active').text();
    jQ_notificationBarPopup
        .find('span.text')
        .html(text)
        .find('span')
        .removeClass('active');

    jQ_notificationBarPopup
        .find('span[lang="'+currentLanguage+'"]')
        .addClass('active');
    jQ_notificationBarPopup.children().find('span:first-child').eq(0).attr('class',iconclass);
    jQ_notificationBarPopup
        .addClass('active '+type+' '+style)
        .on('click',function(e){
            jQuery(this)
                .removeClass('active '+type+' '+style)
                .off();

        })
        .on('animationend',function(e){
            if(type == 'autohide'){
                jQuery(this)
                    .removeClass('active '+type+' '+style)
                    .off();
            }
        });

}

//Hotspot DOM display management with FOV depending
//FOV max for easter eggs spots
var fovLimitForEasterEggs = 7;
//Camera idle management, to wait an amount of time before checking FOV value
var cameraIdle = 0;
var cameraIdleThreshold = 24; //In ms
setInterval(function(){
    cameraIdle++;
},1);
var hotspotsDOMDisplayManagement = function(){
    var fov = viewer.camera.fov;
    if(fov > 10){
        jQ_cache.removeClass('active');
    }else{
        jQ_cache
            .addClass('active')
            .find('.hotspot-zone')
            .css('width', - 23.8 * fov + 190 +'px')
            .css('height', - 23.8 * fov + 190 +'px');
    }
    if(fov > fovLimitForEasterEggs){
        jQuery('.hotspot.easter-egg').removeClass('active');
    }else{
        var fovCeil = Math.ceil(fov);
        var commonSelector = '.hotspot.easter-egg';
        // var selectors =  commonSelector+'1,'+commonSelector+'2,'commonSelector+'3,';
        if(fovCeil == 1){
            jQuery(commonSelector).addClass('active');
            // jQuery(selectorOff).removeClass('active');
        }else if(fovCeil == 2){
            jQuery(commonSelector+':not(.fov1)').addClass('active');
            jQuery(commonSelector+'.fov1').removeClass('active');
        }else if(fovCeil == 3){
            jQuery(commonSelector+':not(.fov1):not(.fov2)').addClass('active');
            jQuery(commonSelector+'.fov1,'+commonSelector+'.fov2').removeClass('active');
        }else if(fovCeil == 4){
            jQuery(commonSelector+':not(.fov1):not(.fov2):not(.fov3)').addClass('active');
            jQuery(commonSelector+'.fov1,'+commonSelector+'.fov2,'+commonSelector+'.fov3').removeClass('active');
        }else if(fovCeil == 5){
            jQuery(commonSelector+':not(.fov1):not(.fov2):not(.fov3):not(.fov4)').addClass('active');
            jQuery(commonSelector+'.fov1,'+commonSelector+'.fov2,'+commonSelector+'.fov3,'+commonSelector+'.fov4').removeClass('active');
        }else if(fovCeil == 6){
            jQuery(commonSelector+':not(.fov1):not(.fov2):not(.fov3):not(.fov4):not(.fov6)').addClass('active');
            jQuery(commonSelector+'.fov1,'+commonSelector+'.fov2,'+commonSelector+'.fov3,'+commonSelector+'.fov4,'+commonSelector+'.fov5').removeClass('active');
        }else if(fovCeil == 7){
            jQuery(commonSelector+'.fov7').addClass('active');
            jQuery(commonSelector+':not(.fov7)').removeClass('active');
        }
    };
    cameraIdle = 0;
};

//To avoid mousewheel zoom + and - stop when cursor hovers a spot
var idleCount = 0,
    jQhotspotZones = jQuery('.hotspot-zone'),
    idleCameraInterval = setInterval(function(){
        idleCount++;
        if(idleCount>30){
            jQhotspotZones.css('pointer-events','auto');
        }else{
            jQhotspotZones.css('pointer-events','none');
        }
    },16);



//Share view
var shareView = function(){
    // jQ_loadingThumbnailContainer.addClass('active');
    jQ_modalShare.scrollTop(0);
    modal('share','show');
    var imageData = viewer.canvas.capture(FORGE.Canvas.formats.DATA);
    var img = new Image();
    img.src = imageData;
    // console.log(document.body.appendChild(img));
    //Pour voir l'image dans la console
    // console.log(document.body.appendChild(img));
    var currentViewUrl = window.location.href;
    // var currentViewUrlEncoded = encodeURIComponent(currentViewUrl);
    var currentDomainPath = window.location.origin+window.location.pathname;
    // console.log(currentDomainPath);
    var currentYaw = viewer.camera.yaw;
    var currentPitch = viewer.camera.pitch;
    var currentFov = viewer.camera.fov;
    var currentSceneUid = viewer.story.sceneUid;
    var currentSceneTitle = jQ_navPointsOfInterest.find('a[href="#'+currentSceneUid+'"]>span').text();
    if(currentSceneTitle == ''){
        currentSceneTitle = document.title;
    }
    jQuery
        .ajax({
            method: "POST",
            url: "upload2.php",
            data: { filename: imageData, browser: utilities.browser, isiOS: utilities.iOS }
        })
        .done(function(data) {
            var temp = data.split('uploads/');
            temp = temp[1].split('.');
            var hash = temp[0];
            var screenshotUrl = currentDomainPath.replace('share.php','')+'uploads/'+hash+'.jpg';
            var share_get_parameters = '?id='+hash+'&uid='+currentSceneUid+'&yaw='+currentYaw+'&pitch='+currentPitch+'&fov='+currentFov+'&title='+encodeURIComponent(currentSceneTitle);
            var share_pseudo_url = currentDomainPath+share_get_parameters;
            share_pseudo_url = share_pseudo_url
                                    .replace('share.php','')
                                    .replace('?','share.php?');
            var share_facebook_url =  'https://facebook.com/sharer/sharer.php?u='+encodeURIComponent(share_pseudo_url);
            var share_twitter_url =  'https://twitter.com/intent/tweet/?url='+encodeURIComponent(share_pseudo_url);
            var share_google_url = 'https://plus.google.com/share?url='+encodeURIComponent(share_pseudo_url);
            var share_pinterest_url = 'https://pinterest.com/pin/create/button/?url='+encodeURIComponent(share_pseudo_url)+'&media='+encodeURIComponent(screenshotUrl);
            jQ_modalShare.find('.image')
                .css('background-image','url('+screenshotUrl+')')
                .attr('data-id',hash);
            window.history.pushState(currentSceneTitle, null, share_get_parameters);
            jQ_modalShare.addClass('loaded');
            jQ_modalShare.find('a.link-facebook').attr('href',share_facebook_url);
            jQ_modalShare.find('a.link-twitter').attr('href',share_twitter_url);
            jQ_modalShare.find('a.link-google').attr('href',share_google_url);
            jQ_modalShare.find('a.link-pinterest').attr('href',share_pinterest_url);
            jQ_modalShare.find('a[href="#copy-link"]').attr('data-clipboard-text',share_pseudo_url);
            // jQ_loadingThumbnailContainer.removeClass('active');

        });
};

//When user clicks on a spot
var clickSpot = function(id){
    if(id !== undefined){

    }
}

//Cookies management
var cookies = ['Paris26g','Paris26g_cookiesAccepted','Paris26g_Intro','Paris26g_Language','Paris26g_MenuItem','Paris26g_MenuStatus','Paris26g_EasterEgg_reblochon','Paris26g_EasterEgg_ovni','Paris26g_EasterEgg_tortue','Paris26g_EasterEgg_team','Paris26g_EasterEgg_marmotte','Paris26g_EasterEgg_grenouille','Paris26g_EasterEgg_plaque','Paris26g_EasterEgg_publicite','Paris26g_EasterEgg_pi','Paris26g_EasterEgg_feu'];

var acceptCookies = function(order){
    if(order == true){
        var d = new Date();
        var exdays = 360;
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = "Paris26g=true;" + expires + ";path=/";
        // var currentMenuItemId = jQ_sidebarPrimary.find('a.active').attr('href');
        // var currentMenuStatus = jQ_sidebarMain.hasClass('active');
        // setCookie('Paris26g_MenuItem',currentMenuItemId,365);
        // setCookie('Paris26g_MenuStatus',currentMenuStatus,365);
        // tabulation(currentMenuItemId);
    }else{
        // if(getCookie('Paris26g') == 'true'){
        //     jQuery('.notification-bar.cookies').removeClass('active');
        //     return true;
        // }
    }
    if(getCookie('Paris26g_cookiesAccepted') != 'true'){
        jQuery('.notification-bar.cookies').addClass('active');
    }
}

var setCookie = function(cname, cvalue, exdays) {
    if(cname !== undefined && cvalue !== undefined && exdays !== undefined){
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }else{
        return false;
    }

}

var getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var deleteCookie = function(cname){
    if(cname !== undefined){
        if(cname == 'all'){
            cookies.forEach(function(coo){
                document.cookie = coo+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            });
        }else{
            document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }

    }
}

//Tabulation
//@id - string - id of the POI '#01 to #20' - If id == 'hide', remove any active tab from cookies
var tabulation = function(id){
    if(id !== undefined){
        jQuery('[data-tab],.sidebar.primary a.link-toolbar').removeClass('active');
        jQuery('.sidebar.main, [data-tab="'+id+'"]').addClass('active');
        jQ_sidebarPrimary.find('p.toolbar a[href="'+id+'"]').addClass('active');
        setCookie('Paris26g_MenuItem',id,365);
        setCookie('Paris26g_MenuStatus','true',365);
        if(id == 'hide'){
            // deleteCookie('Paris26g_MenuItem');
            // setCookie('Paris26g_MenuStatus','false',365);
        }else{

        }
    }
}

//Language
var languageRange = function(lang){
    if(lang == 'fr' || lang == 'en' || lang == 'es'){
        return true;
    }else{
        return false;
    }
}
var language = function(lang){
    if(lang === undefined){
        //return current settings
        return jQuery('a[href*="#language-"].active').text();
    }else{
        //Check if requested language is supported
        if(languageRange(lang)){
            jQuery('body [lang], a[href*="#language-"]').removeClass('active');
            jQuery('body [lang="'+lang+'"], a[href="#language-'+lang+'"]').addClass('active');
            jQuery('[data-tooltip]').each(function(){
                var currentText = jQuery(this).attr('data-tooltip-'+lang);
                if(currentText !== undefined){
                    jQuery(this).find('span.tooltip-content').remove();
                    jQuery(this).append('<span class="tooltip-content">'+currentText+'</span>');
                }
            });
            //Only for input placeholder
            jQuery('[placeholder]').each(function(){
                var currentText = jQuery(this).attr('data-placeholder-'+lang);
                if(currentText !== undefined){
                    jQuery(this).attr('placeholder',currentText);
                }
            });
            setCookie('Paris26g_Language',lang,365);
        }
    }
}

//Fullscreen management
var isFullscreen = false;
var toggleFullScreen = function(){
    var elem = document.getElementById('wrapper');
    if(isFullscreen){
        if(document.cancelFullScreen){
            document.cancelFullScreen();
        }else if(document.mozCancelFullScreen){
            document.mozCancelFullScreen();
        }else if(document.webkitCancelFullScreen){
            document.webkitCancelFullScreen();
        }
        isFullscreen = false;
        jQ_aFullscreen.find('span[class*="icon-"]').attr('class','icon-maximize');
    }else{
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
        isFullscreen = true;
        jQ_aFullscreen.find('span[class*="icon-"]').attr('class','icon-minimize');
    }
}

//Toogle main menu
//@command - boolean - true: force show, false: force hide, undefined makes toggle
var toggleMenu = function(command){
    var show = function(){
            jQ_sidebarMain.addClass('active');
            jQ_responsiveToolbarLinks.addClass('visible');
            jQ_mobileMenuBackdrop.addClass('active');
            setCookie('Paris26g_MenuStatus','true',365);
        },
        hide = function(){
            jQ_sidebarMain.removeClass('active');
            jQ_responsiveToolbarLinks.removeClass('visible active');
            jQ_mobileMenuBackdrop.removeClass('active');
            deleteCookie('Paris26g_MenuStatus');
        };
    //Force show
    if(command == 'show'){
        show();
    //Force hide
    }else if(command == 'hide'){
        hide();
    //Toggle show hide is command is empty
    }else if(command === undefined){
        if(jQ_sidebarMain.hasClass('active')) {
            hide();
        }else{
            show();
        }
    }else{
        return false;
    }
}
