//Listener on Forge config load
viewer.onConfigLoadComplete.add(function(e){

    //Experience start point
    var fullUrl = window.location.href;
    // var url = new URL(fullUrl);
    // var currentSceneUid = url.searchParams.get("uid");
    // var currentYaw = url.searchParams.get("yaw");
    // var currentPitch = url.searchParams.get("pitch");
    // var currentFov = url.searchParams.get("fov");
    var currentSceneUid = getQueryString('uid',fullUrl);
    var currentYaw = getQueryString('yaw',fullUrl);
    var currentPitch = getQueryString('pitch',fullUrl);
    var currentFov = getQueryString('fov',fullUrl);
    //If landing (no URL params)
    if(currentSceneUid == null){
        //If no start cookie, start with intro splash screen
        if(getCookie('Paris26g_Intro') == ''){
            jQuery('.intro').addClass('active');
            jQ_forgeContainer.addClass('dimmed');
        }
    //If params
    }else{
        setTimeout(function(){
            if(currentSceneUid != 'paris'){
                launch();
                viewer.story.loadScene(currentSceneUid);
                activeSpotManagement(currentSceneUid);
                poiContent(currentSceneUid);
                modal('floor-plan','show');
                modal('places-details','show');
            }
            viewer.camera.lookAt(currentYaw, currentPitch, null, currentFov, 2000, false, 'easeInOutCubic');
        },1);
    }

    //Make DOM hotspots routines
    setTimeout(function(){
        hotspotsDOMDisplayManagement();
    },1000);

    //On camera change event
    viewer.camera.onChange.add(function(){
        if(cameraIdle > cameraIdleThreshold){
            hotspotsDOMDisplayManagement();
        }
        idleCount = 0;
    });

    //On scene load
    // viewer.story.onSceneLoadComplete.add(function(){
    //
    // });
});
