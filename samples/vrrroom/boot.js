KEN.DEBUG = false;
KEN.WARNING = false;

var config =
{
    background: "#000",

    plugins:
    {
        enabled: true,
        prefix: "../../plugins/"
    }
};

var viewer = new KEN.Viewer(config, "container", {boot: boot, update: update});

function boot()
{
    viewer.onReady.add(onReadyHandler);
    viewer.tour.load('tour/tour.min.json');
}

function onReadyHandler()
{

}

function update()
{

}

function destroy()
{
    viewer.destroy();
    viewer = null;
}

viewer.boot();
