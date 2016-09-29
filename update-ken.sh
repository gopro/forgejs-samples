#!/bin/sh

# Get last version of ken
echo "Downloading last version of KEN"
wget -q -O ken.min.js http://ken.com/release/ken.min.js

# Copy it in each folder
for D in */; do echo "Copying into $D" && cp ken.min.js $D/lib/; done

# Remove the downloaded version
rm ken.min.js