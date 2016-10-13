/**
 * ChromaKey worker
 * Run image processing routine to save CPU time in main thread
 */

function RGBToYCbCr(color)
{
    return {
        Y: 0 + 0.299 * color.r + 0.587 * color.g + 0.114 * color.b,
        Cr: 128 - 0.169 * color.r - 0.331 * color.g + 0.500 * color.b,
        Cb: 128 + 0.500 * color.r - 0.419 * color.g - 0.081 * color.b
    };
};

function YCbCrToRGB(color)
{
    color.Cr -= 128;
    color.Cb -= 128;

    return {
        r: 1.000 * color.Y + 0.000 * color.Cr + 1.400 * color.Cb,
        g: 1.000 * color.Y - 0.343 * color.Cr - 0.711 * color.Cb,
        b: 1.000 * color.Y + 1.765 * color.Cr + 0.000 * color.Cb
    };
};

function colorDesaturate(color, scale)
{
    var Cr = (color.Cr - 128) * scale + 128;
    var Cb = (color.Cb - 128) * scale + 128;

    return {
        Y: color.Y,
        Cr: Cr,
        Cb: Cb
    }
}

function colorDistance(a, b)
{
    return Math.sqrt((a.Cb - b.Cb) * (a.Cb - b.Cb) + (a.Cr - b.Cr) * (a.Cr - b.Cr));
};

function colorSubtractChroma(a, b)
{
    return {
        Y: a.Y,
        Cr: a.Cr - b.Cr,
        Cb: a.Cb - b.Cb
    }
};

function clamp(x, min, max)
{
    return Math.min(Math.max(x, min), max);
};

function smoothstep(edge0, edge1, x)
{
    x = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return x * x * (3 - 2 * x);
};

function mix(a, b, mix)
{
    return a * mix + b * (1 - mix);
};

function computeFrame(frame, width, height, background, threshold, smoothness)
{
    self.log("Compute frame");
    var w = width,
        h = height;

    for (var y = 0; y < h; y++)
    {
        for (var x = 0; x < w; x++)
        {
            var index = (x + y * w);

            var foregroundRGB = {
                r: frame.data[index * 4 + 0],
                g: frame.data[index * 4 + 1],
                b: frame.data[index * 4 + 2]
            };
            var foregroundYCrCb = RGBToYCbCr(foregroundRGB);

            var distance = colorDistance(foregroundYCrCb, background);

            var low = 2.55 * threshold * (1 - smoothness);
            var high = 2.55 * threshold * (1 + smoothness);

            // Better option: apply smoothstep on the green channel and on transparency
            var foregroundRatio = smoothstep(low, high, distance); // 0 if key color detected

            // Desaturate 70% and mix depending on distance to background
            var desaturated = colorDesaturate(foregroundYCrCb, 0.7);
            var desaturatedRGB = YCbCrToRGB(desaturated);

            var mixFactor = clamp(distance / 128, 0, 1);
            frame.data[index * 4 + 0] = mix(frame.data[index * 4 + 0], desaturatedRGB.r, mixFactor);
            frame.data[index * 4 + 1] = mix(frame.data[index * 4 + 1], desaturatedRGB.g, mixFactor);
            frame.data[index * 4 + 2] = mix(frame.data[index * 4 + 2], desaturatedRGB.b, mixFactor);

            // Perserve red and blue, dissolve green channel
            // frame.data[index * 4 + 1] = mix(0, frame.data[index * 4 + 1], (1 - foregroundRatio));

            // Set alpha channel depending on foreground/background mix
            frame.data[index * 4 + 3] = 255 * foregroundRatio;
        }
    }

    return true;
};



self.log = function(text)
{
    // console.log("[ChromaKey Worker] " + text);
};

self.onmessage = function(msg)
{
    self.log("Command received from main script : " + msg.data.action);

    switch (msg.data.action)
    {
        case "do":
            var success = computeFrame(msg.data.frame, msg.data.width, msg.data.height, msg.data.background, msg.data.threshold, msg.data.smoothness);
            postMessage(
            {
                success: success,
                frame: msg.data.frame
            });
            break;

        default:
            break;
    }

    // Terminate the worker calling close() method
    // close();
};