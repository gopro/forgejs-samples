# Step by step

We are going to make a full tour, starting from nothing.

The first thing to do is to start by copying the `00-example/` folder and renaming it with the name of your project. In here are a basic webpage and the `tour.json`, which is the core of our tour. In it is described the complete tour, from scenes to plugins, hotspots to the behavior of the camera.

You don't have to touch the webpage in this tutorial, only the `tour.json`. To learn more how to configure the `KEN.Viewer` object, please consult the [documentation of the API]().

# Completing the tour.json file

````json
{
    "uid": "example-tour",
    "name": "Example Tour",
    "slug": "example-tour",
    "description": "This is an example tour"
}
````

This is what your `tour.json` file is looking like at the start. It got four elements:

+ uid
+ name
+ slug
+ description

## Add a scene

The first thing to do is to add a scene to the tour. A scene is at least composed with a media, either an image or a video. The media will be projected onto the background, and will be adapt to a 360° view. We will see later how to add others things to a scene.

So let's add a scene to our tour by adding two properties to the root of the tour :

````json
"default": "scene-0",

"scenes":
[
    {
        "uid": "scene-0",
        "name": "First scene",
        "slug": "first-scene",
        "description": "This is the first scene",
    
        "media": {}
    }
]
````

+ *default* - the uid of the scene to load by default at the opening of the webpage
+ *scenes* - an array containing scenes

In this array, what is more interesting is how is composed the object we added :

+ *uid* - the unique identifier of the scene, will be used as a reference across the whole tour
+ *name* -
+ *slug* - the slug for the current scene to display in the URL bar
+ *description* -
+ *media* - an object where the media will be set

## Load a media

Now that we have a scene, we can specify the media we want to add. First, let's create two folders where we will put our media : one for images, another for videos. We can then complete the `media` part with the strict minimum :

````json
"media":
{
    "uid": "scene-0-media-0",
    "type": "image",
    "format": "equi",

    "source": "images/image-scene-0.jpg"
}
````

+ *uid* - the unique identifier of the media, will be used as a reference across the whole tour
+ *type* - specify the type of media we're loading, either `image` or `video`
+ *format* - the format of the media : for now we will only learn about the most classic one, `equi` (for [equirectangular](https://en.wikipedia.org/wiki/Equirectangular_projection))
+ *source* - the source of the media : for now we will only set the path to our media, it can be local, but it can be an http address as well

Above is the code to load an image, and below is for a video :

````json
"media":
{
    "uid": "scene-0-media-0",
    "type": "video",
    "format": "equi",

    "source": "videos/video-scene-0.mp4"
}
````

Note that you can set only one media in a scene. We'll see later how to handle multiple scenes and multiples media.

If you now open your browser, you should see your media visible in the player. Use your mouse to move it !

## Controlling the camera

### A different view

If you try to scroll in the page, you'll see a change in the field of view (fov), and a deformation on the edge of the player. The current type of view is called **Rectilinear**. It can be changed to another type of view, called the **GoPro** view.

To change it, add this property at the root of the `tour.json` file :

````json
"view":
{
    "type": "GoPro"
}
````

Refresh your page, and play with the scroll and move inside the media, you should see the new view.

### Limiting the movement

You can also limit the movement on your scene, for example if you don't want the user to be able to look down, up or behind him. Add this object to the root of the `tour.json` file :

````json
"camera":
{
    "yaw":
    {
        "default": 0,
        "min": -180, 
        "max": 180 
    },

    "pitch": 
    { 
        "default": 0,
        "min": 0, 
        "max": 0
    },
    
    "fov": 
    { 
        "default": 80,
        "min": 80,
        "max": 80
    }
}
````

You can set three properties : `yaw`, `pitch` and `fov`. **Yaw** is the horizontal movement, **Pitch** is the vertical movement, and the **FOV** is the field of view, that can be changed using the scroll of the mouse. Each of those properties has three properties :

+ *default* - the default value to set on the launch of the player
+ *min* - the minimum value that can be set; a pitch with a minimum value of 0 disables the possibility to view the bottom of the scene
+ *max* - the maximum value that can be set; a pitch with a maximum value of 0 disables the possibility to view the top of the scene

By adding the configuration above, you shouldn't be able to move the view beside the horizontal movement. Try to modify the other values to view the effect it as on the movement of the camera.

## Load multiple scenes

A tour cannot be a tour without multiple scene to view. Let's add other scenes, and a navigation system with it.

### Adding other scenes

If we go back to our `scenes` object, we can see it is in fact an array. So we can set multiple `scene` object inside this array. We can have something like that:

````json
"scenes": [
{
    "uid": "scene-1",
    "name": "First scene",
    "slug": "first-scene",
    "description": "This is the first scene",

    "media":
    {
        "uid": "scene-1-media-0",
        "type": "image",
        "format": "equi",

        "source":
        {
            "url": "images/image-scene-1.jpg"
        }
    }
},

{
    "uid": "scene-2",
    "name": "Second scene",
    "slug": "second-scene",
    "description": "This is the second scene",

    "media":
    {
        "uid": "scene-2-pano-0",
        "type": "image",
        "format": "equi",

        "source":
        {
            "url": "images/image-scene-2.jpg"
        }
    }
},

{
    "uid": "scene-3",
    "name": "Third scene",
    "slug": "third-scene",
    "description": "This is the third and last scene",

    "media":
    {
        "uid": "scene-3-media-0",
        "type": "video",
        "format": "equi",

        "source":
        {
            "url": "videos/video-scene-3.mp4"
        }
    }
}]
````

As you can see, we now have three scenes: two with a panorama, and one with a video.

To navigate through each scene, open the web developer tools of your browser, and type in the console `viewer.tour.nextScene()` or `viewer.tour.previousScene()`.

### Work locally on each scene

One of the points we can take advantage of having multiple scenes, is to specify some configuration locally, in each scene. For example, let's say we want to limit the camera only in the second scene, and have a *GoPro* view in the third one. We can put directly those two objects inside each scene object :

````json
"scenes": [
{
    "uid": "scene-1",
    ...
},

{
    "uid": "scene-2",
    "name": "Second scene",
    "slug": "second-scene",
    "description": "This is the second scene",

    "media": { ... },
    
    "camera":
    {
        "yaw":
        {
            "default": 0,
            "min": -90, 
            "max": 90 
        },
    
        "pitch": 
        { 
            "default": 0,
            "min": 0, 
            "max": 0
        }
    }
},

{
    "uid": "scene-3",
    "name": "Third scene",
    "slug": "third-scene",
    "description": "This is the third and last scene",

    "media": { ... },
    
    "view":
    {
        "type": "GoPro"
    }
}]
````

Even if there is a global configuration for those objects, the configuration inside the scenes overrides the global one. This system works for certains parts only :

+ the `view`
+ the `camera` limitation
+ the `plugins` section (see [Plugins](#Plugins))
+ the `director`'s cut section (see [Director](#Director))

## Plugins

One of the purpose of the KEN player, is to allow people to customize it using plugins they developed or acquired. Without any plugin, the player is only a simple player, without even an interface, even for a video.

### Include our first plugin

Now that we have multiple scenes, we want to navigate through them without having to open the console, because it will be a burden for our users. Let's add two buttons, one for going to the next scene, and the other one to the previous scene.

In our root folder, let's create a `plugins` folder. Then, go in the `plugins` folder of the samples repository to copy the *SimpleButton* plugin inside our own folder.

For the first (and only) time we are going to edit the `index.html` of our project, and especially the javascript part.

````js
// Options for the viewer
var options =
{
    plugins: {
        prefix: "plugins/"
    }
};

// Create a viewer
var viewer = new KEN.Viewer(options, "container", {
    boot: boot
});

// What to do on boot time
function boot()
{
    // Load the tour configuration
    viewer.tour.load('tour.json');
}

// Start the viewer
viewer.boot();
````

We edited two things :

+ create an `options` containing a description for the plugins global location, with the root reference being this folder
+ change the `null` option of the viewer to this `options` object

### Engine

First we're going to add an engine, which will be the basis of a plugin. This engine will be used as a reference for each instance of the plugin, as a plugin can be present multiple times in the tour and also in the same scene.

````json
"plugins":
{
    "engines": [
    {
        "uid": "com.pluginmaker.simplebutton",
        "url": "SimpleButton/",
        "manifest": "manifest.json"
    }]
}
````

+ *uid* - the uid of the plugin, the one specified in the manifest
+ *url* - where to find the plugin and its source
+ *manifest* - the manifest of the plugin, containing its description
+ *prefix* - an optional prefix (actually not present), to override the global one (set above)

Note that the `engines` property is an array, and so multiple plugins and their engines can be added. Only one engine by plugin can be added.

### Instance

Now that we have an engine, we can instantiate our plugin. Let's start with our *Previous* button.

````json
"plugins":
{
    "engines": [ ... ],
    
    "instances": [
    {
        "uid": "simplebutton-previous",
        "engine": "com.pluginmaker.simplebutton",

        "options": {},
        
        "events": {}
    }]
}
````

+ `uid` is the uid of the instance
+ `engine` is the uid of the engine that will be used
+ `options` is an object containing all the options specific to the plugin and this instance
+ `events` is an object containing the events and their handlers for this plugin, like a mouse click or double click

In `options`, we have all the options related to the plugin we are instanciating. All the available options should be written in the manifest of the plugin. For the *SimpleButton*, if we consult the manifest, we have :

````json
"options":
{
    "top": null,
    "right": null,
    "bottom": null,
    "left": null,
    "horizontalCenter": false,
    "verticalCenter": false,

    "width": null,
    "height": null,

    "value": null,

    "skin": {
        "out": null,
        "over": null,
        "down": null
    }
}
````

We can see that we have six properties for the position, two for the size, one for the value and three for the skins. We are going to set some values to place our button on the left side of the screen, with a label set to *Previous* :

````json
"options":
{
    "left": 0,
    "verticalCenter": true,
    "value": "Previous"
}
````

If we go back to the tour, we can now see a button on the left side of the page.

Note that here the `instances` property is also an array (like `engines`), so we will add another instance, for our *Next* button. It is almost the same as the *Previous* button, but placed on the right side of the page.

````json
"plugins":
{
    "engines": [ ... ],
    
    "instances": [
    {
        "uid": "simplebutton-previous",
        ...
    },

    {
        "uid": "simplebutton-next",
        "engine": "com.pluginmaker.simplebutton",

        "options":
        {
            "right": 0,
            "verticalCenter": true,
            "value": "Next"
        }
        
        "events": {}
    }]
}
````

### Bind an action

The previously added buttons do nothing for now: they need to be bind to an action. An action is a description of a method to execute in reaction to an event.

First let's add an action. For this, we can add one on the root of the `tour.json`:

````json
"actions":
[
    {
        "uid": "action-previous",
        "target": "viewer.tour",
        "method":
        {
            "name": "previousScene"
        }
    }
]
````

In an action, we have access to all the public API of the library. See the full documentation to see all available methods. In `target` is an object or a chain of objects. For example, here we want to affect the `tour`, so we will get something we know, the `viewer`, and get the `tour` from it. Then we can call a method on it. The `method` object is here for that: we are calling the `previousScene` in our example.

When this action will be called by its uid, it will trigger a changement in the current scene, and show the previous scene. We can add then a similar action, but for going to the next scene.

````json
"actions":
[
    {
        "uid": "action-previous",
        ...
    },

    {
        "uid": "action-next",
        "target": "viewer.tour",
        "method":
        {
            "name": "nextScene"
        }
    }
]
````

These two actions can now be called ! To trigger an action, we need to bind it to an event. Let's consult the list of available events on a *SimpleButton*: 

````json
"events":
{
    "onClick": null,
    "onOver": null,
    "onOut": null,
    "onDown": null
}
````

There are four events we can react to, the most basic ones for a button. The most appropriate event for our case is the click on a button. In the configuration of the *Previous* button, we can edit the `events` object for something like that :

````json
"events":
{
    "onClick": "action-previous"
}
````

We simply assign the `uid` of the action to the event we want. We can do the same for the *Next* button :

````json
"events":
{
    "onClick": "action-next"
}
````

And now we have a tour that can have multiple scene and is navigable !
