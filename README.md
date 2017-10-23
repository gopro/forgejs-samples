
![](https://cdn.forgejs.org/grav/images/ForgeJS-logo-650x200.png)

# ForgeJS Samples

This repository contains simple samples, demonstrating the capabilities of ForgeJS.

## Setup

Prior to the sample execution you have to setup the `plugins` directory which contains ForgeJS plugins used into the samples

1. Create a `plugins` directory in the root folder of the `forgejs-samples` local repository.
2. Clone the [ForgeJS Plugins](https://github.com/gopro/forgejs-plugins) project.
3. Copy and paste the content of the forgejs-plugins repository into the `plugins` directory of the `forgejs-samples` local repository.

Then you have to setup the `lib` directory which contains the ForgeJS library and all required external libraries.

1. Clone the [ForgeJS](https://github.com/gopro/forgejs) project.
2. Copy and paste the `lib` directory of the `forgejs` repository at the root of the `forgejs-samples` local repository.
3. Build ForgeJS library with the help of the ```grunt min``` command (more informations [here](https://github.com/gopro/forgejs/blob/master/README.md)).
4. Copy and paste the generated `build` directory into the previously pasted `lib` directory of the `forgejs-samples` local repository.
5. Rename  `lib/build` directory to `lib/forge`.

## Test it

Run a server in the root folder of this directory. The index contain a list of available samples.

If you have Python installed, you can either run:

```bash
python -m SimpleHTTPServer
```

OR

```bash
python -m http.server
```

If you have Node.js installed, you can run these commands to install `http-server`, a simple zero-configuration command-line http server.

```bash
npm install http-server -g
http-server -p 8000
```

You can then browse [your localhost](http://localhost:8000).

## Terms of Use - ForgeJS Sample Resources

All audio, image and video files are the property of GoPro, Inc.

You may not use the material for commercial purposes.

All other specific copyrights are available in each sample's directory.
