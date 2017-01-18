# Step by step

We are going to make a full tour, starting from nothing.

The first thing to do is to start by copying the `projects/empty-tour/` folder and renaming it with the name of your project. In here are a basic webpage and the `tour.json`, which is the core of our tour. In it is described the complete tour, from scenes to plugins, hotspots to the behavior of the camera.

You don't have to touch the webpage in this tutorial, only the `tour.json`. To learn more how to configure the `FORGE.Viewer` object, please consult the [documentation of the API]().

# Completing the tour.json file

```js
{
    "tour":
    {
        "uid": "example-tour",
        "name": "Example Tour",
        "slug": "example-tour",
        "description": "This is an example tour",
        "scenes": []
    }
}
```

This is what your `tour.json` file is looking like at the start. It got four elements:

+ `uid` - The uid of the tour.
+ `name` - The name of the tour.
+ `slug` - The slug of the tour.
+ `description` - The description of the tour.
+ `scenes` - The array where our scenes will be declared.

## Add a scene

The first thing to do is to add a scene to the tour. A scene is at least composed with a media, either an image or a video. The media will be projected onto the background, and will be adapt to a 360° view. We will see later how to add others things to a scene.

So let's add a scene to our tour by adding two properties to the tour object :

```js
{
    "tour":
    {
        ...

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
    }

}
```

+ `default` - the uid of the scene to load by default at the opening of the webpage
+ `scenes` - an array containing scenes

In this array, what is more interesting is how is composed the object we added :

+ `uid` - The unique identifier of the scene, will be used as a reference across the whole tour.
+ `name` - The name of the scene.
+ `slug` - The slug for the current scene to display in the URL bar.
+ `description` - The description of the scene.
+ `media` - An object where the media will be set.

## Load a media

Now that we have a scene, we can specify the media we want to add. First, let's create two folders where we will put our media : one for images, another for videos. We can then complete the `media` part with the strict minimum :

```js
{
    "media":
    {
        "uid": "media-0",
        "type": "image",
        "format": "equi",

        "source": "01-forest.png"
    }
}
```

+ `uid` - The unique identifier of the media, will be used as a reference across the whole tour.
+ `type` - Specify the type of media we're loading, either `image` or `video`.
+ `format` - The format of the media : for now we will only learn about the most classic one, `equi` (for [equirectangular](https://en.wikipedia.org/wiki/Equirectangular_projection)).
+ `source` - The source of the media : for now we will only set the path to our media, it can be local, but it can be an http address as well.

Above is the code to load an image, and below is for a video :

```js
{
    "media":
    {
        "uid": "media-0",
        "type": "video",
        "format": "equi",

        "source": "1080p_HD.mp4"
    }
}
```

Note that you can set only one media in a scene. We'll see later how to handle multiple scenes and multiples media.

If you now open your browser, you should see your media visible in the player. Use your mouse to move it !

## Controlling the camera

### A different view

If you try to scroll in the page, you'll see a change in the field of view (fov), and a deformation on the edge of the player. The default type of view is called **Rectilinear**. It can be changed to another type of view, called the **GoPro** view.

To change the view type, add the following `view` object to the root of the configuration. If you want to specify a view for a single `scene` you can add this view object to a one of your `scene`.

```js
{
    "view":
    {
        "type": "GoPro"
    }
}
```

Refresh your page, and play with the scroll and move inside the media, you should see the new view.

### Limiting the movement

You can also limit the movement on your scene, for example if you don't want the user to be able to look down, up or behind him. Add this object to the tour object :

```js
{
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
}
```

You can set three properties : `yaw`, `pitch` and `fov`. **Yaw** is the horizontal movement, **Pitch** is the vertical movement, and the **FOV** is the field of view, that can be changed using the scroll of the mouse. Each of those properties has three properties :

+ `default` - The default value to set on the launch of the player.
+ `min` - The minimum value that can be set; a pitch with a minimum value of 0 disables the possibility to view the bottom of the scene.
+ `max` - The maximum value that can be set; a pitch with a maximum value of 0 disables the possibility to view the top of the scene.

By adding the configuration above, you shouldn't be able to move the view beside the horizontal movement. Try to modify the other values to view the effect it as on the movement of the camera.

## Load multiple scenes

A tour cannot be a tour without multiple scene to view. Let's add other scenes, and a navigation system with it.

### Adding other scenes

If we go back to our `scenes` object, we can see it is in fact an array. So we can set multiple `scene` object inside this array. We can have something like that:

```js
{
    "scenes": [
    {
        "uid": "scene-1",
        "name": "First scene",
        "slug": "first-scene",
        "description": "This is the first scene",

        "media":
        {
            "uid": "media-1",
            "type": "image",
            "format": "equi",

            "source":
            {
                "url": "02-sand.png"
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
            "uid": "media-2",
            "type": "image",
            "format": "equi",

            "source":
            {
                "url": "03-snow.png"
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
            "uid": "media-1",
            "type": "video",
            "format": "equi",

            "source":
            {
                "url": "720p_HD.mp4"
            }
        }
    }]
}
```

As you can see, we now have three scenes: two with a panorama, and one with a video.

To navigate through each scene, open the web developer tools of your browser, and type in the console `viewer.tour.nextScene()` or `viewer.tour.previousScene()`.

### Work locally on each scene

One of the points we can take advantage of having multiple scenes, is to specify some configuration locally, in each scene. For example, let's say we want to limit the camera only in the second scene, and have a *GoPro* view in the third one. We can put directly those two objects inside each scene object :

```js
{
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
}
```

Even if there is a global configuration for those objects, the configuration inside the scenes overrides the global one. This system works for certains parts only :

+ the `view`
+ the `camera` limitation
+ the `plugins` section (see [Plugins](#Plugins))
+ the `director`'s cut section
+ the `audio` and `playlists` sections

## Plugins

One of the purpose of the ForgeJS player, is to allow people to customize it using plugins they developed or acquired. Without any plugin, the player is only a simple player, without even an interface, even for a video.

### Include our first plugin

Now that we have multiple scenes, we want to navigate through them without having to open the console, because it will be a burden for our users. Let's add two buttons, one for going to the next scene, and the other one to the previous scene.

In our root folder, let's create a `plugins` folder. Then, go in the `plugins` folder of the samples repository to copy the *SimpleButton* plugin inside our own folder.

### Plugins object in JSON

In the JSON file we have to add a `plugins` object to set options, declare where are located plugin engines and configure plugins instances.

```js
{
    "plugins":
    {
        "enabled": true,
        "prefix": "./plugins/",
        "engines": [],
        "instances": []
    }
}
```

+ `enabled` - Global enabled switch, if set to false you will have no plugins, usefull for debug mainly. It's true by default.
+ `prefix` - This is the root plugin folder. In our case we put the *SimpleButton* plugin in the `./plugins/` folder.
+ `engines` - Declaration of the different engines that will be used in our project.
+ `instances` - Configuration of the different plugins instances.

### Engines

First we're going to add an engine, which will be the basis of a plugin. This engine will be used as a reference for each instance of the plugin, as a plugin can be present multiple times in the tour and also in the same scene.

```js
{
    "plugins":
    {
        "prefix": "./plugins/",
        "engines":
        [
            {
                "uid": "gopro.forge.simplebutton",
                "url": "SimpleButton/",
                "manifest": "manifest.json"
            }
        ]
    }
}
```

+ `uid` - The uid of the plugin, the one specified in the manifest.
+ `url` - Where to find the plugin and its source.
+ `manifest` - The manifest of the plugin, containing its description.
+ `prefix` - An optional prefix (actually not present), to override the global one (set above).

Note that the `engines` property is an array, and so multiple plugins and their engines can be added. Only one engine by plugin can be added.

### Instance

Now that we have an engine, we can instantiate our plugin. Let's start with our *Previous* button.

```js
{
    "plugins":
    {
        "prefix": "./plugins/",
        "engines": [ ... ],
        "instances":
        [
            {
                "uid": "simplebutton-previous",
                "engine": "gopro.forge.simplebutton",
                "options": {},
                "events": {}
            }
        ]
    }
}
```

+ `uid` - The uid of the instance.
+ `engine` - The uid of the engine that will be used.
+ `options` - An object containing all the options specific to the plugin and this instance.
+ `events` - An object containing the events and their handlers for this plugin, like a mouse click or double click.

In `options`, we have all the options related to the plugin we are instanciating. All the available options should be written in the manifest of the plugin. For the *SimpleButton*, if we consult the manifest, we have :

```js
{
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

        "skin":
        {
            "out": null,
            "over": null,
            "down": null
        }
    }
}
```

We can see that we have six properties for the position, two for the size, one for the value and three for the skins. We are going to set some values to place our button on the left side of the screen, with a label set to *Previous* :

```js
{
    "options":
    {
        "left": 0,
        "verticalCenter": true,
        "value": "Previous"
    }
}
```

If we go back to the tour, we can now see a button on the left side of the page.

Note that here the `instances` property is also an array (like `engines`), so we will add another instance, for our *Next* button. It is almost the same as the *Previous* button, but placed on the right side of the page.

```js
{
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
            "engine": "gopro.forge.simplebutton",

            "options":
            {
                "right": 0,
                "verticalCenter": true,
                "value": "Next"
            },

            "events": {}
        }]
    }
}
```

### Bind an action

The previously added buttons do nothing for now: they need to be bind to an action. An action is a description of a method to execute in reaction to an event.

First let's add an action. For this, we can add one on the root of the `tour.json`:

```js
{
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
}
```

In an action, we have access to all the public API of the library. See the full documentation to see all available methods. In `target` is an object or a chain of objects. For example, here we want to affect the `tour`, so we will get something we know, the `viewer`, and get the `tour` from it. Then we can call a method on it. The `method` object is here for that: we are calling the `previousScene` in our example.

When this action will be called by its uid, it will trigger a changement in the current scene, and show the previous scene. We can add then a similar action, but for going to the next scene.

```js
{
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
}
```

These two actions can now be called ! To trigger an action, we need to bind it to an event. Let's consult the list of available events on a *SimpleButton*:

```js
{
    "events":
    {
        "onClick": null,
        "onOver": null,
        "onOut": null,
        "onDown": null
    }
}
```

There are four events we can react to, the most basic ones for a button. The most appropriate event for our case is the click on a button. In the configuration of the *Previous* button, we can edit the `events` object for something like that :

```js
{
    "events":
    {
        "onClick": "action-previous"
    }
}
```

We simply assign the `uid` of the action to the event we want. We can do the same for the *Next* button :

```js
{
    "events":
    {
        "onClick": "action-next"
    }
}
```

And now we have a tour that have multiple scenes and is navigable !
