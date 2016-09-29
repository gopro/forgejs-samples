# KEN Samples

This repository contains very simple samples, demonstrating the capatibilities of Kolor Eyes Next.

## List of projects

### [Simpliest project](01-simple-tour/)

It is the simpliest possible project : a very tiny webpage, a tiny configuration, and only one image to display. This is an example of the minimum required to run a project.

### [Littleplanet view](02-littleplanet/)

The previous project, with a different view, the little planet one.

### [Multiple scenes](03-multiple-scenes/)

A simple example showing how to navigate through scenes, using two buttons, *Next* and *Previous*.

## Test it

Run a server in the root folder of this repository. If you have Python installed, you can run 
````bash
python -m SimpleHTTPServer

# OR

python -m http.server
````

You can then browse [your localhost](http://localhost:8000).

## Update KEN in all projects

````bash
./update-ken.sh

# OR

npm run update
````