
![](https://cdn.forgejs.org/grav/images/ForgeJS-logo-650x200.png)

# ForgeJS Samples

This repository contains simple samples, demonstrating the capabilities of ForgeJS.

## Setup

Prior to the sample execution you have to setup the `plugins` directory which contains ForgeJS plugins used into the samples

1. Create a `plugins` directory in the root folder of the `forgejs-samples` local repository.
2. Clone the [ForgeJS Plugins](https://github.com/gopro/forgejs-plugins) project.
3. Copy and paste the content of the forgejs-plugins repository into the `plugins` directory of the `forgejs-samples` local repository.

Then you have to setup the `lib` directory which contains the ForgeJS library and all required external libraries.

1. Clone the [ForgeJS](https://github.com/gopro/forgejs project).
2. Build ForgeJS with the help of the ```grunt min``` command.
3. Copy and paste the `lib` directory into the `forgejs-samples` local repository.
4. Copy and paste the content of the `build` directory into the new `lib` directory of the `forgejs-samples` local repository.

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
