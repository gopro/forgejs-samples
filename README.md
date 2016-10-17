# KEN Samples

This repository contains very simple samples, demonstrating the capatibilities of Kolor Eyes Next. [Another document](EXPLANATIONS.md) goes into details about some of the projects. It is recommended to read it if it is your first time creating a project.

## List of sample projects

### [Simpliest project](samples/simple-tour/)

It is the simpliest possible project : a very tiny webpage, a tiny configuration, and only one image to display. This is an example of the minimum required to run a project.

### [Littleplanet view](samples/littleplanet/)

The previous project, with a different view, the little planet one.

### [Multiple scenes](samples/multiple-scenes/)

A simple example showing how to navigate through scenes, using two buttons, **Next** and **Previous**.

### [Simple video](samples/video/)

A very simple example with a video playing.

### [Multiple locales](samples/multiple-locales/)

Using the *LocaleSelector* plugin, it is possible to switch between the multiple locales present in this tour.

### [Changing the view](samples/change-view/)

Change the view in realtime, going to Rectilinear to Little Planet, without stopping the playing video and without changing the orientation of the camera.

### [Special effects](samples/special-effects/)

Apply a special effect on a scene, and toggle it to view how it affects the scene.

### [Audio playlists](samples/audio-playlists/)

Using playlists, it's possible to apply a background sound track to each scene.

### [Director's cut](samples/directors-cut/)

Change the orientation of the camera in realtime according to waypoints.

### [MPEG-DASH videos](samples/mpeg-dash/)

Video player based on MPEG-DASH technique.

### [Hotspots](samples/hotspots/)

Add hotspots to a scene.

### [Hotspots with spatialized sounds](samples/hotspots-sounds/)

Add hotspots with spatialized sounds to a scene.

### [Camera limitation](samples/camera-limits/)

Apply orientation and limits to the orientation and the field of view of the camera.

### [Camera parallax](samples/camera-parallax/)

Apply a camera parallax effect on the hotspots layer.

## Demonstration

[VRRROOM](samples/vrrroom/)

## Test it

Run a server in the root folder of this repository.

If you have Python installed, you can run
````bash
python -m SimpleHTTPServer

# OR

python -m http.server
````

If you have Node.js installed, you can run these commands to install `http-server`, a simple zero-configuration command-line http server.
````bash
npm install http-server -g

http-server -p 8000
````

You can then browse [your localhost](http://localhost:8000).
