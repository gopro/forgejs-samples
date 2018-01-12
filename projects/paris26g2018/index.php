<?php
    //CDN enabled or not
    $cdn_enabled = true;
    //Title
    $title = 'Paris 26 Gigapixels 2018';
    $descriptions = array(
        'fr' => 'Paris 26 Gigapixels est une expérience interactive des plus beaux monuments de Paris.',
        'en' => 'Paris 26 Gigapixels is an interactive experience of Paris most beautiful monuments.',
        'es' => 'Paris 26 Gigapixel es una experiencia interactiva de los más bellos monumentos de Paris.'
    );

    //Description
    //Check https or not
    if($_SERVER['HTTPS'] == 'on'){
        $connection_type = 'https://';
    }else{
        $connection_type = 'http://';
    };
    //Website root url
    $root_url = $connection_type.$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']).'/';
    //Assets root URL
    $cdn_root_url = 'https://cdn.forgejs.org/samples/paris2018/';
    if($cdn_enabled){
        $asset_root_url = $cdn_root_url;
    }else{
        $asset_root_url = '';
    }
    //Default thumbnail URL
    $thumbnail_url = $asset_root_url.'img/paris26-socials.jpg';
    //Default language
    //Language for bots
    $language = 'en';
    $description = $descriptions['en'];
    if(isset($_GET['lang'])){
        if($_GET['lang'] == 'fr' || $_GET['lang'] == 'en' || $_GET['lang'] == 'es'){
            $description = $descriptions[$_GET['lang']];
            $language = $_GET['lang'];
        }
    }
?>
<!doctype html>
<html lang="<?php echo $language ?>" class="<?php if($cdn_enabled){ echo 'cdn'; } ?>">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta http-equiv="x-ua-compatible" content="IE=edge">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <title><?php echo $title ?></title>

    <meta property="og:title" content="<?php echo $title ?>">
    <meta property="og:description" content="<?php echo $description ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo $root_url ?>">
    <meta property="og:image" content="<?php echo $thumbnail_url ?>">
    <meta property="og:image:type" content="image/jpeg">

    <!-- Schema.org markup for Google+ -->
    <meta itemprop="name" content="<?php echo $title ?>">
    <meta itemprop="description" content="<?php echo $description ?>">
    <meta itemprop="image" content="<?php echo $thumbnail_url ?>">
    <!-- Address bar header color -->
    <meta name="theme-color" content="#123456">
    <meta name="msapplication-navbutton-color" content="#123456">
    <meta name="apple-mobile-web-app-status-bar-style" content="#123456">
    <link rel="apple-touch-icon" sizes="180x180" href="./libraries/favicon180x180.png">
    <link rel="icon" type="image/png" href="./libraries/favicon32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="./libraries/favicon16x16.png" sizes="16x16">

    <meta name="generator" content="Forge JS">
    <meta name="author" content="Forge JS Team">

    <!-- <link rel="stylesheet" href="libraries/normalize/normalize.css"> -->
    <link rel="stylesheet" href="libraries/css/main.css">
    <link rel="stylesheet" href="libraries/icomoon/style.css">
    <link rel="stylesheet" href="libraries/perfect-scrollbar/perfect-scrollbar.min.css">
    <script src="libraries/feature.js/feature.min.js"></script>
    <script type="text/javascript">
        feature.testAll();
    </script>
    <script type="text/javascript">

         var _gaq = _gaq || [];
         _gaq.push(['_setAccount', 'UA-112019058-1']);
         _gaq.push(['_trackPageview']);

         (function() {
           var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
           ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
           var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
         })();

    </script>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <!-- <script async src="https://www.googletagmanager.com/gtag/js?id=UA-112019058-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-112019058-1');
    </script> -->
</head>
<body>
    <div id="wrapper">
        <div id="container"></div>
        <main>
            <div class="sidebar primary active">
                <p class="toolbar">
                    <a  href="#home"
                        class="link-toolbar"
                        data-tooltip
                        data-tooltip-fr="Vue de départ"
                        data-tooltip-en="First view"
                        data-tooltip-es="Vista de inicio">
                    </a>
                    <a href="#toggle" class="link-toolbar"><span class="icon-menu"></span></a>
                    <a  href="#point-of-interest"
                        class="link-toolbar hideable"
                        data-tooltip
                        data-tooltip-fr="Points d'intérêt"
                        data-tooltip-en="Points of interest"
                        data-tooltip-es="Puntos de interés">
                        <span class="icon-map-pin"></span>
                    </a>
                    <a  href="#easter-eggs"
                        class="link-toolbar hideable"
                        data-tooltip
                        data-tooltip-fr="Objets cachés"
                        data-tooltip-en="Hidden objects"
                        data-tooltip-es="Objetos escondidos">
                        <span class="icon-flag"></span>
                    </a>
                    <a  href="#about"
                        class="link-toolbar hideable"
                        data-tooltip
                        data-tooltip-fr="A propos de cette expérience"
                        data-tooltip-en="About this experience"
                        data-tooltip-es="A propósito de esta experiencia">
                        <span class="icon-info"></span>
                    </a>
                </p>
            </div>

            <div class="sidebar main">
                <div class="content">
                    <div data-tab="#point-of-interest" class="active">
                        <nav class="points-of-interest">
                            <a href="#01" data-yaw="-103.28234811660693" data-pitch="4.247546530405285" data-fov="1.11">
                                <span>La Tour Eiffel</span>
                            </a>

                            <a href="#02" data-yaw="-103.37303098590493" data-pitch="-0.3593657800651679" data-fov="4.8">
                                <span>Les Invalides</span>
                            </a>

                            <a href="#03" data-yaw="-84.50128101837626" data-pitch="0.22646401895569757" data-fov="4.8">
                                <span>La Défense</span>
                            </a>

                            <a href="#04" data-yaw="-75.77923718452732" data-pitch="-0.25372218190090373" data-fov="2.11">
                                <span>L'Arc de triomphe</span>
                            </a>

                            <a href="#05" data-yaw="-70.6233707392022" data-pitch="-1.0451113481118803" data-fov="3.44">
                                <span>Le Grand Palais</span>
                            </a>

                            <a href="#06" data-yaw="-54.68264837441932" data-pitch="-2.5036821379097685" data-fov="5.1">
                                <span>Le Musée d'Orsay</span>
                            </a>

                            <a href="#07" data-yaw="-29.594013020339375" data-pitch="-0.5801597851921418" data-fov="2.31">
                                <span>Le Palais Garnier</span>
                            </a>

                            <!-- <a href="#08" data-yaw="-28.30907054152547" data-pitch="-5.563991033173633" data-fov="16.5">
                                <span lang="en">The abbey church of Saint-Germain-des-Prés</span>
                                <span lang="es"></span>
                                <span lang="fr">L'Eglise abbatiale de Saint-Germain-des-Prés</span>
                            </a> -->

                            <a href="#09" data-yaw="-21.12944020603937" data-pitch="-2.0939788861565036" data-fov="7.05">
                                <span>Le Musée du Louvre</span>
                            </a>

                            <a href="#10" data-yaw="-15.29432996545672" data-pitch="1.4022739003301679" data-fov="2.15">
                                <span>Le Sacré-Coeur</span>
                            </a>

                            <!-- <a href="#11" data-yaw="7.546870402145546" data-pitch="-0.6220323123815177" data-fov="3.44">
                                <span lang="en">The Church of Saint-Eustache</span>
                                <span lang="es"></span>
                                <span lang="fr">l'Eglise Saint-Eustache</span>
                            </a> -->

                            <!-- <a href="#12" data-yaw="28.388691041736973" data-pitch="-1.1464260649801519" data-fov="3">
                                <span lang="en">The Théâtre du Châtelet</span>
                                <span lang="es"></span>
                                <span lang="fr">Le Théâtre du Châtelet</span>
                            </a> -->

                            <a href="#13" data-yaw="30.325283656206338" data-pitch="-0.2016481144400114" data-fov="3.32">
                                <span>Centre Georges Pompidou</span>
                            </a>

                            <!-- <a href="#14" data-yaw="34.58102066099341" data-pitch="-0.9749129477350414" data-fov="2.02">
                                <span lang="en">The Théâtre de la Ville</span>
                                <span lang="es"></span>
                                <span lang="fr">Le Théâtre de la Ville</span>
                            </a> -->

                            <!-- <a href="#15" data-yaw="38.1786404202683" data-pitch="-1.0509838232041187" data-fov="2.64">
                                <span lang="en">The Holy Chapel</span>
                                <span lang="es"></span>
                                <span lang="fr">La Sainte-Chapelle</span>
                            </a> -->

                            <a href="#16" data-yaw="44.25545711876702" data-pitch="-0.4382420276654248" data-fov="3.41">
                                <span>Hôtel de Ville</span>
                            </a>

                            <a href="#17" data-yaw="57.55194895633712" data-pitch="-0.060215851675962655" data-fov="3.93">
                                <span>La Cathédrale Notre-Dame</span>
                            </a>

                            <a href="#18" data-yaw="73.40096059672635" data-pitch="-26.806891129444463" data-fov="19.96">
                                <span>L'Eglise Saint-Sulpice</span>
                            </a>

                            <!-- <a href="#19" data-yaw="99.68520905719149" data-pitch="-0.4166423412926299" data-fov="2.63">
                                <span lang="en">The Odéon-Théâtre de l'Europe</span>
                                <span lang="es"></span>
                                <span lang="fr">L'Odéon-Théâtre de l'Europe</span>
                            </a> -->

                            <a href="#20" data-yaw="103.65250965525608" data-pitch="2.2474840277792576" data-fov="3.85">
                                <span>Le Panthéon</span>
                            </a>
                        </nav>
                    </div>
                    <div data-tab="#easter-eggs">
                        <p lang="en" class="padded">We hid 10 surprises in this giant panorama! Try to find them all!</p>
                        <p lang="fr" class="padded">Nous avons caché 10 surprises dans le panorama géant. Essayez de les trouver!</p>
                        <p lang="es" class="padded">Hemos escondido 10 sorpresas en este gigante panorama. ¡Intenta encontrarlas todas!</p>

                        <nav class="easter-eggs">
                            <a href="#reblochon">
                                <span>
                                    <span class="thumbnail"></span>
                                    <span class="text">
                                        <span lang="en">Reblochon (cheese)</span>
                                        <span lang="es">Reblochon (queso)</span>
                                        <span lang="fr">Reblochon</span>
                                    </span>
                                    <span class="status"><span class="icon-check-circle"></span></span>
                                </span>
                            </a>
                            <a href="#ovni">
                                <span>
                                    <span class="thumbnail"></span>
                                    <span class="text">
                                        <span lang="en">UFO</span>
                                        <span lang="es">OVNI</span>
                                        <span lang="fr">OVNI</span>
                                    </span>
                                    <span class="status"><span class="icon-check-circle"></span></span>
                                </span>
                            </a>
                            <a href="#tortue">
                                <span>
                                    <span class="thumbnail"></span>
                                    <span class="text">
                                        <span lang="en">Turtle</span>
                                        <span lang="es">Tortuga</span>
                                        <span lang="fr">Tortue</span>
                                    </span>
                                    <span class="status"><span class="icon-check-circle"></span></span>
                                </span>
                            </a>
                            <a href="#team">
                                <span>
                                    <span class="thumbnail"></span>
                                    <span class="text">
                                        <span lang="en">Our Team</span>
                                        <span lang="es">Nuestro equipo</span>
                                        <span lang="fr">L'équipe</span>
                                    </span>
                                    <span class="status"><span class="icon-check-circle"></span></span>
                                </span>
                            </a>
                            <a href="#marmotte">
                                <span>
                                    <span class="thumbnail"></span>
                                    <span class="text">
                                        <span lang="en">Marmot</span>
                                        <span lang="es">Marmota</span>
                                        <span lang="fr">Marmotte</span>
                                    </span>
                                    <span class="status"><span class="icon-check-circle"></span></span>
                                </span>
                            </a>
                            <a href="#grenouille">
                                <span>
                                    <span class="thumbnail"></span>
                                    <span class="text">
                                        <span lang="en">Frog</span>
                                        <span lang="es">Rana</span>
                                        <span lang="fr">Grenouille</span>
                                    </span>
                                    <span class="status"><span class="icon-check-circle"></span></span>
                                </span>
                            </a>
                            <a href="#plaque">
                                <span>
                                    <span class="thumbnail"></span>
                                    <span class="text">
                                        <span lang="en">License Plate</span>
                                        <span lang="es">Placa de matrícula</span>
                                        <span lang="fr">Plaque d'immatriculation</span>
                                    </span>
                                    <span class="status"><span class="icon-check-circle"></span></span>
                                </span>
                            </a>
                            <a href="#publicite">
                                <span>
                                    <span class="thumbnail"></span>
                                    <span class="text">
                                        <span lang="en">Kolor Ad</span>
                                        <span lang="es">Publicidad de Kolor</span>
                                        <span lang="fr">Publicité Kolor</span>
                                    </span>
                                    <span class="status"><span class="icon-check-circle"></span></span>
                                </span>
                            </a>
                            <a href="#pi">
                                <span>
                                    <span class="thumbnail"></span>
                                    <span class="text">
                                        <span lang="en">Number Pi</span>
                                        <span lang="es">Numero 'Pi'</span>
                                        <span lang="fr">Nombre Pi</span>
                                    </span>
                                    <span class="status"><span class="icon-check-circle"></span></span>
                                </span>
                            </a>
                            <a href="#feu">
                                <span>
                                    <span class="thumbnail"></span>
                                    <span class="text">
                                        <span lang="en">Traffic light</span>
                                        <span lang="es">Semáforo</span>
                                        <span lang="fr">Feu tricolore</span>
                                    </span>
                                    <span class="status"><span class="icon-check-circle"></span></span>
                                </span>
                            </a>
                        </nav>
                    </div>
                    <div data-tab="#about" class="padded">
                        <div lang="fr">
                            <p class="baseline">Paris 26 Gigapixels est une expérience interactive des plus beaux monuments de Paris.</p>

                            <h3>Bienvenue à Paris !</h3>
                            <p>Explorez la capitale française à travers ce panorama géant, zoomez et visitez les plus beaux monuments de Paris à 360° et découvrez leur histoire.</p>
                            <p>Ceci est un projet à vocation artistique et non commerciale.</p>

                            <h3>Réalisation</h3>
                            <ul>
                                <li><strong>Expérience interactive</strong> L'équipe des logiciels <a href="http://www.kolor.com" class="link-highlight" target="_blank">Kolor</a>, avec le framework <a href="https://forgejs.org" class="link-highlight" target="_blank">ForgeJS</a></li>
                                <li><strong>Prise de vue panorama gigapixel</strong> <a href="http://www.arnaudfrichphoto.com/" class="link-highlight" target="_blank">Arnaud Frich</a></li>
                                <li><strong>Prise de vue photos 360° des monuments</strong> <a href="http://www.timographie360.fr/" class="link-highlight" target="_blank">Timothée Eisenegger</a></li>
                                <li><strong>Repérage</strong> <a href="http://www.martinloyer.fr/" class="link-highlight" target="_blank">Martin Loyer</a></li>
                            </ul>

                            <h3>Comment créer des expériences interactives?</h3>
                            <p>Si vous souhaitez réaliser des expériences interactives similaires à celle-ci, vous pouvez utiliser les logiciels Kolor pour créer des panoramas 360° puis le framework de développement ForgeJS, gratuit et open-source, pour créer l'expérience interactive.</p>
                            <p><a href="http://www.kolor.com" class="link-logo" target="_blank"><img src="<?php echo $asset_root_url ?>img/logo-kolor.svg" alt="logo Kolor"></a> <a href="https://forgejs.org" class="link-logo" target="_blank"><img src="<?php echo $asset_root_url ?>img/logo-forge-js.svg" alt="logo ForgeJS"></a></p>
                        </div>
                        <div lang="en">
                            <p class="baseline">Paris 26 Gigapixels is an interactive experience of Paris' most beautiful monuments.</p>

                            <h3>Welcome to Paris!</h3>
                            <p>Explore the French capital through this giant panorama. Zoom-in and visit Paris' most beautiful monuments in 360° and discover their stories.</p>

                            <h3>Credits</h3>
                            <ul>
                                <li><strong>Interactive experience</strong> <a href="http://www.kolor.com" class="link-highlight" target="_blank">Kolor</a> software team with <a href="https://forgejs.org" class="link-highlight" target="_blank">ForgeJS</a> framework</li>
                                <li><strong>Gigapixel panorama shots</strong> <a href="http://www.arnaudfrichphoto.com/" class="link-highlight" target="_blank">Arnaud Frich</a></li>
                                <li><strong>Monuments 360° shots</strong> <a href="http://www.timographie360.fr/" class="link-highlight" target="_blank">Timothée Eisenegger</a></li>
                                <li><strong>Tracking</strong> <a href="http://www.martinloyer.fr/" class="link-highlight" target="_blank">Martin Loyer</a></li>
                            </ul>

                            <h3>How to create interactive experiences?</h3>
                            <p>Use <a href="http://www.kolor.com" class="link-highlight"  target="_blank">Kolor</a> software to create 360° panoramas and <a href="https://forgejs.org" class="link-highlight"  target="_blank">ForgeJS</a> to create the interactive experience.</p>
                            <p><a href="http://www.kolor.com" class="link-logo" target="_blank"><img src="<?php echo $asset_root_url ?>img/logo-kolor.svg" alt="logo Kolor"></a> <a href="https://forgejs.org" class="link-logo" target="_blank"><img src="<?php echo $asset_root_url ?>img/logo-forge-js.svg" alt="logo ForgeJS"></a></p>
                        </div>
                        <div lang="es">
                            <p class="baseline">Paris 26 Gigapixel es una experiencia interactiva de los más bellos monumentos de Paris.</p>

                            <h3>¡Bienvenidos a Paris!</h3>
                            <p>Explora la capital de Paris a través de este gigante panorama. Haz zoom y visita los más bellos monumentos de Paris en 360° y descubra sus historias.</p>
                            <p>Ceci est un projet à vocation artistique et non commerciale.</p>

                            <h3>Realización</h3>
                            <ul>
                                <li><strong>Experiencia interactiva</strong> El equipo de los programas <a href="http://www.kolor.com" class="link-highlight" target="_blank">Kolor</a> con el framework <a href="https://forgejs.org" class="link-highlight" target="_blank">ForgeJS</a></li>
                                <li><strong>Grabación del panorama gigapixel</strong> <a href="http://www.arnaudfrichphoto.com/" class="link-highlight" target="_blank">Arnaud Frich</a></li>
                                <li><strong>Grabación de las fotografías 360° de los monumentos</strong> <a href="http://www.timographie360.fr/" class="link-highlight" target="_blank">Timothée Eisenegger</a></li>
                                <li><strong>Localización</strong> <a href="http://www.martinloyer.fr/" class="link-highlight" target="_blank">Martin Loyer</a></li>
                            </ul>

                            <h3>¿Como creer experiencias interactivas?</h3>
                            <p>Utiliza los programas <a href="http://www.kolor.com" class="link-highlight" target="_blank">Kolor</a> para creer panoramas de 360° y <a href="https://forgejs.org" class="link-highlight" target="_blank">ForgeJS</a> para creer la experiencia interactiva.</p>
                            <p><a href="http://www.kolor.com" class="link-logo" target="_blank"><img src="<?php echo $asset_root_url ?>img/logo-kolor.svg" alt="logo Kolor"></a> <a href="https://forgejs.org" class="link-logo" target="_blank"><img src="<?php echo $asset_root_url ?>img/logo-forge-js.svg" alt="logo ForgeJS"></a></p>
                        </div>

                    </div>
                </div>
            </div>

            <div class="scene">
                <header class="intro">
                    <div>
                        <h1><?php echo $title ?></h1>
                    </div>
                    <div>
                        <p>
                            <span lang="fr">Expérience interactive des plus beaux monuments de Paris</span>
                            <span lang="en">Interactive view of the most beautiful monuments of Paris</span>
                            <span lang="es">Experiencia interactiva de los más bellos monumentos de Paris</span>
                        </p>
                        <p>
                            <a href="#launch" class="link-button size-xl">
                                <span lang="fr">démarrer</span>
                                <span lang="en">start</span>
                                <span lang="es">Iniciar</span>
                            </a>
                        </p>
                    </div>


                </header>
                <div class="hotspots">
                    <div id="hotspot-dom-cache" class="hotspot media-style__cache">
                        <div class="hotspot-zone">

                        </div>
                    </div>
                    <div id="hotspot-dom-01-eiffel-tower" class="hotspot">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <input type="checkbox">
                            <!-- Icon/Text container -->
                            <p class="media" data-tooltip data-tooltip-fr="La Tour Eiffel">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                            <!-- Content of the hotspot -->
                            <div class="content">
                                <div class="padded">
                                    <h2 lang="fr">La Tour Eiffel</h2>
                                    <p lang="fr">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/01.jpg" alt="Tour Eiffel">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">voir le 360</span>
                                            </span>
                                        </a> La Tour Eiffel a été construite pour l’exposition universelle de 1889 par Gustave Eiffel. Elle culmine à 324 mètres. La tour est le monument payant le plus fréquenté au monde. Elle est inscrite au patrimoine mondial de l’UNESCO.
                                        <a href="http://www.toureiffel.paris/" target="_blank" class="link-description">Site officiel <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="en">La Tour Eiffel</h2>
                                    <p lang="en">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/01.jpg" alt="Tour Eiffel">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> The Eiffel Tower is one of Paris most famous and most emblematic monuments. Built for the 1889 Universal Exhibition by engineer Gustave Eiffel, who gave it his name, it is 324 meter high. «The iron lady» as it’s being called towers the city and has become the lead monument of the French capital city: it is the most visited paying monument in the world. It is, of course, because of its prominence, part of the UNESCO World Heritage.
                                        <a href="http://www.toureiffel.paris/" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="es">La Tour Eiffel</h2>
                                    <p lang="es">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/01.jpg" alt="Tour Eiffel">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> “La Tour Eiffel” es uno de los monumentos los más famosos y representativos de Paris. Fue construido para la exposición universal de 1889 por el ingeniero Gustave Eiffel. Con una altura de 324 metros, la “Dame de fer” (dama de hierra) es el monumento de pago más visitado del mundo. Dada su importancia, la UNESCO no tenía la opción de no registrarla al patrimonio mundial de la humanidad.
                                        <a href="http://www.toureiffel.paris/" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="hotspot-dom-02-invalids" class="hotspot">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <input type="checkbox">
                            <!-- Icon/Text container -->
                            <p class="media" data-tooltip-position="top" data-tooltip data-tooltip-fr="Les Invalides">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">

                                    </span>
                                </span>
                            </p>
                            <!-- Content of the hotspot -->
                            <div class="content">
                                <div class="padded">
                                    <h2 lang="fr">Les Invalides</h2>
                                    <p lang="fr">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/02.jpg" alt="Les Invalides">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">voir le 360</span>
                                            </span>
                                        </a> L’hôtel des Invalides est un monument construit au XVIIe siècle, pour accueillir les invalides de l’armée Française. Il abrite l’église Saint Louis des Invalides, une nécropole militaire, l’hôpital des armées et le musée des armées. Son dôme doré est un point de repère connu du paysage Parisien.
                                        <a href="http://www.invalides.org/" target="_blank" class="link-description">Site officiel <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="en">Les Invalides</h2>
                                    <p lang="en">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/02.jpg" alt="Les Invalides">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> “L’ Hôtel des Invalides” was built during the XVII century to cater for the disabled soldiers of the French army. Inside “Les Invalides” complex can be found the church of Saint-Louis des Invalides, a military necropolis, the Army Hospital of the Army Museum. Its golden dome is an important landmark in the Paris urban landscape.
                                        <a href="http://www.invalides.org/" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="es">Les Invalides</h2>
                                    <p lang="es">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/02.jpg" alt="Les Invalides">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> El “Hôtel des Invalides” fue construido en el siglo XVII. Su objetivo primer era de acoger los inválidos del ejercito Frances. Dentro de este edificio hay también la iglesia “Saint Louis des Invalides”, una necrópolis militar, el hospital de los ejércitos, así como el museo de los ejércitos. Su cúpula dorada es un punto de referencia muy conocido del paisaje de Paris.
                                        <a href="http://www.invalides.org/" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="hotspot-dom-03-defense" class="hotspot">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <input type="checkbox">
                            <!-- Icon/Text container -->
                            <p class="media" data-tooltip-position="top" data-tooltip data-tooltip-fr="La Défense">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                            <!-- Content of the hotspot -->
                            <div class="content">
                                <div class="padded">
                                    <h2 lang="fr">La Défense</h2>
                                    <p lang="fr">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/03.jpg" alt="La Défense">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">voir le 360</span>
                                            </span>
                                        </a> Premier quartier d’affaires Européen, la Défense est né d’un vaste projet d’aménagement urbain réalisé  et imposé par l’Etat à partir de 1958. Ce quartier est facilement reconnaissable de loin puisqu’il est hérissé de très nombreuses tours et s’inscrit dans le célèbre axe du pouvoir à Paris qui va du Palais du Louvre à la Défense, en passant par la place de la Concorde et l’Arc de Triomphe. Les bureaux sont particulièrement nombreux dans le quartier, mais des aménagements touristiques  (la célèbre Grande Arche et le CNIT) ont été dès le départ prévus. Cette volonté de n’être pas seulement un quartier de bureau paraît évidente quand on s’y promène tant la dalle piétonne de 31 hectares est parsemée de nombreuses œuvres d’art  à ciel ouvert.
                                        <a href="http://www.ladefense.fr/" target="_blank" class="link-description">Site officiel <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="en">La Défense</h2>
                                    <p lang="en">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/03.jpg" alt="La Défense">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> First European business district; "La Défense" was born as the result of a vast urban development program decided and carried out at the national level starting in 1958. The district can be seen from the distance because of its numerous high risers. "La Défense" is part of Paris famous axis of power, running from the Louvre to "La Défence", through "La place de la Concorde" and "l’Arc de Triomphe".  Office buildings are a vast majority in the district, but several touristy attractions were planned from the beginning such as the famous "Grande Arche de La Défence" and the CNIT. It is more obvious that the aim was not only for this district to be an office district as it is possible to admire while wandering around the central 31 hectares (62 acres) pedestrian square numerous outdoor pieces of art.
                                        <a href="http://www.ladefense.fr/" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="es">La Défense</h2>
                                    <p lang="es">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/03.jpg" alt="La Défense">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> Este bario es el primer distrito comercial europeo. Nació tras un proyecto de desarrollo urbano realizado por el estado a partir de 1958. Este bario es fácilmente reconocible gracias a las numerosas torres que lo componen. Además, está incluido en el famoso eje del poder de Paris que va del “Palais du Louvre” a la “Défense”, pasando por la “Place de la Concorde” e el “Arc de Triomphe”. Las oficinas son nemorosas en este barrio, pero algunos sitios turísticos (la “Grande Arche” e el CNIT) han sido previstos desde el inicio del proyecto.
                                        <a href="http://www.ladefense.fr/" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="hotspot-dom-04-triumphal-arch" class="hotspot">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <input type="checkbox">
                            <!-- Icon/Text container -->
                            <p class="media" data-tooltip-position="top" data-tooltip data-tooltip-fr="L'Arc de Triomphe">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                            <!-- Content of the hotspot -->
                            <div class="content">
                                <div class="padded">
                                    <h2 lang="fr">L’Arc de Triomphe</h2>
                                    <p lang="fr">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/04.jpg" alt="L’Arc de Triomphe">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">voir le 360</span>
                                            </span>
                                        </a> La place de l’Etoile déborde d’anciennes gloires avec son Arc de Triomphe qui commémore les victoires de l’Empire. Commencé sous Napoléon et achevé sous Louis-Philippe, c’est le lieu de la France militaire qui se célèbre, mais aussi de celle qui se souvient avec la tombe du Soldat inconnu, témoin muet de la Grande guerre. Monument gigantesque, haut de 55 mètres pour 45 mètres de large, il allie grandeur et simplicité et offre une vue unique sur la capitale : on voit loin quand on est perché sur les épaules de l’Empire.
                                        <a href="http://arc-de-triomphe.monuments-nationaux.fr/" target="_blank" class="link-description">Site officiel <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="en">L'Arc de Triomphe</h2>
                                    <p lang="en">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/04.jpg" alt="Arc de Triomphe">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> "La Place de l’Étoile" is inhabited with ancient glories with its imposing triumphal arch celebrating Napoleon’s empire military victories. The construction started under Napoleon’s reign and was completed under Louis-Philippe’s. This is the place to celebrate the French military but also a place of remembrance as the arch hosts at its feet the tomb of the French Unknown Soldier, silent witness of WWI. This gigantic monument, 55 meters tall and 45 meters wide, is a combination of greatness and simplicity. It also offers a very unique view on the city from its top: you can see in the far distance while sitting on the Empire’s shoulders.
                                        <a href="http://arc-de-triomphe.monuments-nationaux.fr/" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="es">L'Arc de Triomphe</h2>
                                    <p lang="es">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/04.jpg" alt="Arc de Triomphe">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> “La place de l’Etoile” lleva muchas glorias con su “Arc de Triomphe” que conmemora las victorias del Imperio. Comenzado con Napoleón y terminado con Louis-Philippe, este lugar celebra la Francia militaría y la memoria de esta, principalmente gracias a la tumba del soldado desconocido, testigo mudo de la primera guerra mundial. Con sus 55 metros de altura y 45 metros de largo, este monumento es gigantesco. Combinando grandeza y simplicidad, este edificio nos ofrece una vista única sobre la ciudad de Paris: se puede ver mucho más allá estando sentado en los hombros del Emporio.
                                        <a href="http://arc-de-triomphe.monuments-nationaux.fr/" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="hotspot-dom-05-great-palace" class="hotspot">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <input type="checkbox">
                            <!-- Icon/Text container -->
                            <p class="media" data-tooltip-position="top" data-tooltip data-tooltip-fr="Le Grand Palais">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                            <!-- Content of the hotspot -->
                            <div class="content">
                                <div class="padded">
                                    <h2 lang="fr">Le Grand Palais</h2>
                                    <p lang="fr">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/05.jpg" alt="Grand Palais">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">voir le 360</span>
                                            </span>
                                        </a> Edifié en 1897 en prévision de l’exposition universelle de 1900, le Grand Palais marque les esprits de sa silhouette. Son immense verrière de 240 mètres de long, surplombé par un dôme, dégage un vaste espace modulable destiné à accueillir des expositions ou des manifestations artistiques. C’est là sa fonction initiale comme le signale une inscription de l’un des frontons : « Monument consacré par la République à la gloire de l’art français ». L’exposition universelle est depuis longtemps achevée et c’est maintenant les arts de tous les pays et de toutes les époques qui sont accueillis sous ce dôme si reconnaissable.
                                        <a href="http://www.grandpalais.fr" target="_blank" class="link-description">Site officiel <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="en">Le Grand Palais</h2>
                                    <p lang="en">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/05.jpg" alt="Grand Palais">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> Built in 1897 for the 1900 Universal exhibition, "Le Grand Palais" with its very unique silhouette is an unforgettable building to whoever lay an eye upon him. The immense 240 meters long glass nave dominated by a glass dome bring natural light to a vast modular space now dedicated to art exhibitions and shows. It is its initial function as mentioned on one of its facades: “Monument dedicated by the republic the glory of the French art". The Universal Exhibition is over for a long time and the building is now dedicated to art exhibits from around the world and from all periods under his very distinctive glass roof.
                                        <a href="http://www.grandpalais.fr" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="es">Le Grand Palais</h2>
                                    <p lang="es">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/05.jpg" alt="Grand Palais">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> Fue edificado en 1897 para la exposición universal de 1900. El “Grand Palais” es conocido principalmente gracias a su silueta original. Su tremendo tragaluz de 240 metros y su cúpula pondrán a disposición un gran espacio modulable con objetivo de acoger exposiciones y manifestaciones artísticas. Además, uno de los frontones lleva une inscripción diciendo “Monumento consagrado por la Republica a la gloria del arte Frances”. Desde el fin de la exposición universal, este palacio acoge artes de todos los países y épocas.
                                        <a href="http://www.grandpalais.fr" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="hotspot-dom-06-orsay-museum" class="hotspot">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <input type="checkbox">
                            <!-- Icon/Text container -->
                            <p class="media" data-tooltip-position="top" data-tooltip data-tooltip-fr="Le Musée d'Orsay">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                            <!-- Content of the hotspot -->
                            <div class="content">
                                <div class="padded">
                                    <h2 lang="fr">Le Musée d'Orsay</h2>
                                    <p lang="fr">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/06.jpg" alt="Orsay">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">voir le 360</span>
                                            </span>
                                        </a> Aménagé dans l’ancienne gare ferroviaire de la compagnie Paris-Orléans, le musée d’Orsay est dédié à l’art Français et Européen de 1848 à 1914. Il a été construit par l’architecte Victor Laloux en 1898. Le bâtiment garde de nombreuses traces de son ancien passé ferroviaire, comme les grandes horloges où son plafond à caisson. <a href="http://www.musee-orsay.fr" target="_blank" class="link-description">Site officiel <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="en">Le Musée d'Orsay</h2>
                                    <p lang="en">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/06.jpg" alt="Orsay">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> Hosted in the old railway station of the Paris-Orléans train company, "Le Musée d’Orsay" is dedicated to French and European art from 1848 to 1914. It was built by architect Victor Laloux in 1898. The building still shows traces of its railway period such as the large clocks and its distinctive ceiling. <a href="http://www.musee-orsay.fr" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="es">Le Musée d'Orsay</h2>
                                    <p lang="es">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/06.jpg" alt="Orsay">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> Situado en la antigua estación ferroviaria de Paris-Orléans, el “Musée d’Orsay” está dedicado al arte Frances y Europeano de 1848 a 1914. Fue construido por el arquitecto Victor Laloux en 1898. Este edificio guarda numerosos rastros de du pasado ferroviario, como por ejemplo los grandes relojes y su alta techo.  <a href="http://www.musee-orsay.fr" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="hotspot-dom-07-palais-garnier" class="hotspot">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <input type="checkbox">
                            <!-- Icon/Text container -->
                            <p class="media" data-tooltip-position="top" data-tooltip data-tooltip-fr="L'Opéra Garnier">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                            <!-- Content of the hotspot -->
                            <div class="content">
                                <div class="padded">
                                    <h2 lang="fr">L'Opéra Garnier</h2>
                                    <p lang="fr">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/07.jpg" alt="Opéra Garnier">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">voir le 360</span>
                                            </span>
                                        </a> L’Opéra Garnier est l’un des deux opéras parisiens. Il a été construit sur l’ordre de Napoléon III, par l’architecte Charles Garnier entre les années 1861 et 1875. Doté d’une architecture typique de la seconde moitié du XIXè siècle, il est en cours de restauration, mais accueille tout de même des représentations régulières (ballets et opéras). <a href="http://www.operadeparis.fr" target="_blank" class="link-description">Site officiel <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="en">L'Opéra Garnier</h2>
                                    <p lang="en">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/07.jpg" alt="Opéra Garnier">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> "L’Opéra Garnier" is one of the two opera houses in Paris. It was built following Napoleon III orders by architect Charles Garnier between 1861 and 1875. Its architectural style is typical from the second half of the XIX century. It is actually being restored but still hosts shows on a regular schedule during the construction work. <a href="http://www.operadeparis.fr" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="es">L'Opéra Garnier</h2>
                                    <p lang="es">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/07.jpg" alt="Opéra Garnier">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> “L’Opéra Garnier”, es una de las dos óperas parisino. Fue construido por orden de Napoleón III, por el arquitecto Charles Garnier de 1861 hasta 1875. Este edificio tiene una arquitectura muy típica de la segunda mitad del siglo 19. Ahora se está restaurando, pero sigue funcionado como un opera clásico (principalmente con ballets y operas). <a href="http://www.operadeparis.fr" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="hotspot-dom-09-louvre-museum" class="hotspot">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <input type="checkbox">
                            <!-- Icon/Text container -->
                            <p class="media" data-tooltip-position="top" data-tooltip data-tooltip-fr="Le Musée du Louvre">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                            <!-- Content of the hotspot -->
                            <div class="content">
                                <div class="padded">
                                    <h2 lang="fr">Le Musée du Louvre</h2>
                                    <p lang="fr">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/09.jpg" alt="Le Musée du Louvre">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">voir le 360</span>
                                            </span>
                                        </a> Le musée du Louvre est le plus grand musée de Paris par sa surface, et l’un des plus importants du monde, accueillant des collections allant de l’Antiquité à nos jours, et de nombreux joyaux dont les plus connus sont sans doute la Joconde et la Vénus de Milo. Installé dans le Palais du Louvre, l’un des grands lieux de la France royale, il est le cœur symbolique de la capitale. Ses immenses dimensions montrent à quel point le pouvoir royal s’est ici donné à voir. Depuis Philippe Auguste dont les fondations de la forteresse sont toujours visibles dans les sous-sols du musée jusqu’à Louis XIV, ce palais était le cœur de la France. Très tôt, il a aussi été le lieu d’exposition des arts du royaume. Installer le plus grand musée français dans ce lieu toujours bien vivant puisqu’en 1989, on y construit la fameuse Pyramide du Louvre, était donc tout à fait compréhensible.
                                        <a href="http://www.louvre.fr" target="_blank" class="link-description">Site officiel <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="en">Le Musée du Louvre</h2>
                                    <p lang="en">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/09.jpg" alt="Louvre Museum">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> Le Musée du Louvre Paris largest museum in terms of surface, and one of the most prominent in the world. It hosts collections ranging from the Antiquity to the present and is home of numerous jewels such as the Mona Lisa and the Aphrodite (Venus de Milo) to name only two. Hosted in the "Palais du Louvre" (Palace of the Louvre), one of the great places of French royalty, the museum is the symbolic heart of Paris.  Its large dimensions show how the past royalty was eager to display its power and greatness through the building magnificence.  Starting with Philippe Auguste, the foundations of his fortress are still visible in the museum basement, and to Louis the XIV, this palace was the France’s beating heart. It was also early on a place to display the arts of the kingdom. It is then very naturally that this palace, who is still very much alive as the famous Pyramid of the Louvre was built there in 1989, hosts the largest museum in France.
                                        <a href="http://www.louvre.fr" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="es">Le Musée du Louvre</h2>
                                    <p lang="es">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/09.jpg" alt="Louvre Museum">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> “Le musée du Louvre” es el museo más grande de Paris con respecto a su superficie. Es también uno de los más importante del mundo gracias a sus colecciones que van de la antigüedad a la época actual, así como sus famosas obras como “La Joconde” o “La Vénus de Milo”. Ubicado en el “Palais du Louvre”, un lugar importante de la época real, este museo es considerado como el corazón simbólico de la capital. También, desde Philippe Auguste hasta Louis XIV, este palacio era considerado como el corazón de Francia. Sus tremendas dimensiones muestran la magnitud del poder real. Finalmente, siempre ha sido el lugar de exposiciones de los artes del reino. Por lo tanto, instalar el museo más grande de Francia aquí y construir la “Pyramide du Louvre” en 1989 tenía mucho sentido.
                                        <a href="http://www.louvre.fr" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="hotspot-dom-10-basilica-sacred-heart" class="hotspot">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <input type="checkbox">
                            <!-- Icon/Text container -->
                            <p class="media" data-tooltip-position="top" data-tooltip data-tooltip-fr="Le Sacré-Cœur">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                            <!-- Content of the hotspot -->
                            <div class="content">
                                <div class="padded">
                                    <h2 lang="fr">Le Sacré-Cœur</h2>
                                    <p lang="fr">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/10.jpg" alt="Sacré-Coeur">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">voir le 360</span>
                                            </span>
                                        </a> La basilique du Sacré-Cœur est un édifice catholique, construit entre 1875 et 1919 par l’architecte Paul Abadie pour expier les péchés de la Commune de Paris (1870-1871). Elle abrite la plus grosse cloche de France, pesant 18 tonnes. Elle est aussi connue pour sa pierre blanche, choisie par l’architecte pour ses qualités de résistance et d’auto-nettoiement naturel.
                                        <a href="http://www.sacre-coeur-montmartre.com" target="_blank" class="link-description">Site officiel <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="en">Le Sacré-Cœur</h2>
                                    <p lang="en">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/10.jpg" alt="Sacré-Coeur">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> "Le Sacré-Cœur" basilica is a catholic building built between 1975 and 1919 by architect Paul Abadie to expiate the sins of the Paris Commune (1870-1871). The building is home of the largest bell in France, 18 tons on the scale! The basilica is characterized by the white stone chosen by the architect because of its mechanical and self washing properties.
                                        <a href="http://www.sacre-coeur-montmartre.com" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="es">Le Sacré-Cœur</h2>
                                    <p lang="es">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/10.jpg" alt="Sacré-Coeur">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> “La basilique du Sacré-Cœur” es un edificio católico que fue construido entre 1875 y 1919 por el arquitecto Paul Abadie. El primer objetivo era de expiar los pecados de la ciudad de Paris (1870-1871). Esta basílica lleva la campana la más grande de Francia (18 toneladas). Está también conocida gracias a su piedra blanca que tiene como cualidades de ser muy resistente y auto-limpiante.
                                        <a href="http://www.sacre-coeur-montmartre.com" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="hotspot-dom-13-pompidou-center" class="hotspot">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <input type="checkbox">
                            <!-- Icon/Text container -->
                            <p class="media" data-tooltip-position="top" data-tooltip data-tooltip-fr="Centre Georges Pompidou">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                            <!-- Content of the hotspot -->
                            <div class="content">
                                <div class="padded">
                                    <h2 lang="fr">Centre Georges Pompidou</h2>
                                    <p lang="fr">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/13.jpg" alt="Pompidou">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">voir le 360</span>
                                            </span>
                                        </a> Grande œuvre de Renzo Piano et Richard Rogers, le centre Pompidou ou Beaubourg marque par son architecture colorée. Edifié entre 1971 et 1973, sa particularité est de réserver le maximum de places possibles à l’intérieur en rejetant à l’extérieur les différentes gaines techniques qui lui sont nécessaires. Le centre abrite le musée national d’art moderne et une bibliothèque publique, ainsi que des salles de cinéma.
                                        <a href="http://www.centrepompidou.fr/" target="_blank" class="link-description">Site officiel <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="en">Centre Georges Pompidou</h2>
                                    <p lang="en">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/13.jpg" alt="Pompidou">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> Masterpiece of Renzo Piano and Richard Rogers, "Le Centre Pompidou", also called Beaubourg, distinguishes himself by its colorful architecture. Built between 1971 and 1973 the building is very peculiar as the aims is to maximize the available space inside the building by rejecting all utilities such as electric, water, heating and air conditioning tubing along with visitor’s traffic commodities to the outside. The center is host of the National Contemporary Museum of Art, a public library, along with movie projection halls.
                                        <a href="http://www.centrepompidou.fr/" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="es">Centre Georges Pompidou</h2>
                                    <p lang="es">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/13.jpg" alt="Pompidou">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> Grande obra de Renzo Piano y Richard Rogers, el centro Pompidou (o Beaubourg) se diferencia por su arquitectura colorida. Edificado entre 1971 y 1973, su particularidad es ahorar el máximum de espacios al interior, rechazando por fuera los diferentes materiales de construcción que son necesarios. Este centro alberga el museo nacional de arte moderno, una biblioteca pública, así como salas de cine.
                                        <a href="http://www.centrepompidou.fr/" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="hotspot-dom-16-city-hall" class="hotspot">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <input type="checkbox">
                            <!-- Icon/Text container -->
                            <p class="media" data-tooltip-position="top" data-tooltip data-tooltip-fr="L'Hôtel de Ville">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                            <!-- Content of the hotspot -->
                            <div class="content">
                                <div class="padded">
                                    <h2 lang="fr">L’Hôtel de Ville</h2>
                                    <p lang="fr">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/16.jpg" alt="Hôtel de Ville">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">voir le 360</span>
                                            </span>
                                        </a> Siège des institutions municipales de Paris depuis 1357, l’hôtel de Ville a été détruit, puis reconstruit en 1874 et en 1882 selon  les plans des architectes Théodore Ballu et Édouard Deperthes. La façade est ornementée de bustes des personnages marquants de la ville de Paris : artistes, savants, industriels, politiciens…
                                        <a href="http://www.paris.fr" target="_blank" class="link-description">Site officiel <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="en">L’Hôtel de Ville</h2>
                                    <p lang="en">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/16.jpg" alt="Hôtel de Ville">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> Center of Paris municipal institutions since 1357, "L’ Hotel de Ville" was demolished then rebuilt in 1874 and 1882 based on the original plans from architects Théodore Ballu and Édouard Deperthes. The facade is ornamented with busts of personalities who had an impact on the city of Paris: artists, scholars, industrialists, politicians …
                                        <a href="http://www.paris.fr" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="es">L’Hôtel de Ville</h2>
                                    <p lang="es">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/16.jpg" alt="Hôtel de Ville">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> Sede de las instituciones municipales de Paris desde 1357, este edificio fue destruido y reconstruido en 1874 y 1882 según los planes de los arquitectos Thérodore Ballu e Edouard Deperthes. La fachada del “Hôtel de Ville” lleva los bustos de los personajes más conocidos e importante de la ciudad de Paris: artistas, sabios, industriales, políticos…
                                        <a href="http://www.paris.fr" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="hotspot-dom-17-notre-dame-cathedral" class="hotspot">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <input type="checkbox">
                            <!-- Icon/Text container -->
                            <p class="media" data-tooltip-position="top" data-tooltip data-tooltip-fr="La Cathédrale Notre-Dame">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                            <!-- Content of the hotspot -->
                            <div class="content">
                                <div class="padded">
                                    <h2 lang="fr">La Cathédrale Notre-Dame</h2>
                                    <p lang="fr">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/17.jpg" alt="Notre-Dame">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">voir le 360</span>
                                            </span>
                                        </a> Notre-Dame de Paris, l’immense cathédrale dont le nom dit tout. Mémoire de pierres taillées, elle rappelle le temps où Paris comptait, non pas deux îles, mais cinq, ce Paris médiéval un peu oublié, mais toujours présent. Témoin de ces temps, elle dont Charlemagne a posé la première pierre et Philippe Auguste la dernière, elle est grave et puissante ; familière aux parisiens, elle reste un peu terrifiante.  Il est difficile d’imaginer qu’elle doive tant à Victor Hugo qui a écrit pour elle et à Viollet le Duc qui a reconstruit pour elle. L’UNESCO ne s’y est pas trompé et a vu en elle une incarnation de Paris : l’église est désormais classée au patrimoine mondial de l’humanité.
                                        <a href="http://www.cathedraledeparis.com/" target="_blank" class="link-description">Site officiel <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="en">La Cathédrale Notre-Dame</h2>
                                    <p lang="en">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/17.jpg" alt="Notre-Dame">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> "La Cathédral Notre-Dame de Paris", the tremendous cathedral . Memory of carved stones, she reminds us of a time when Paris was made of not only 2 but 5 islands, a medieval Paris a bit forgotten now days but however still present. She is the witness of these times; Charlemagne laid down her first stone and Phillipe Auguste her last. She is solemn and powerful, familiar to the Parisians, she has something yet terrifying. It is hard to imagine that she owes so much to Victor Hugo who wrote for her and to Viollet le Duc who rebuilt for her. The UNESCO did not make any mistake on her case and saw in her the true incarnation of Paris: the church is henceforth part of the World Heritage.
                                        <a href="http://www.cathedraledeparis.com/" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="es">La Cathédrale Notre-Dame</h2>
                                    <p lang="es">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/17.jpg" alt="Notre-Dame">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> “Notre-Dame de Paris”, una tremenda catedral y una de las más famosas del mundo. Memoria de piedras talladas, nos recuerda el tiempo cuando Paris tenía cinco islas en vez de dos. Era la época medieval de Paris que ya está un poco olvidada, aunque sigue siendo importante. Testigo de esta época, era Carlomagno que había puesto la primera piedra, y Philippe Auguste la última. Detrás de su carácter poderoso, este edificio parece aterrador. A veces es difícil pensar el montón de obras que Víctor Hugo escribió para Notre-Dame de Paris, así como Viollet le Duc que la reconstruyo. Finalmente, la UNESCO la clasifico al patrimonio mundial de la humanidad porque la catedral representa una encarnación de Paris.
                                        <a href="http://www.cathedraledeparis.com/" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="hotspot-dom-18-church-saint-sulpice" class="hotspot">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <input type="checkbox">
                            <!-- Icon/Text container -->
                            <p class="media" data-tooltip-position="top" data-tooltip data-tooltip-fr="L'Eglise Saint-Sulpice">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                            <!-- Content of the hotspot -->
                            <div class="content">
                                <div class="padded">
                                    <h2 lang="fr">L'Eglise Saint-Sulpice</h2>
                                    <p lang="fr">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/18.jpg" alt="St-Sulpice">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">voir le 360</span>
                                            </span>
                                        </a> L’église Saint Sulpice est un édifice catholique, construit entre 1646 et 1870. Elle est connue pour ses vastes dimensions, son intérieur  raffiné (avec notamment une fresque de Delacroix dans la Chapelle des Saints-Anges) ainsi que son gnomon. C’est  aussi en haut de la tour Nord que nous avons réalisé ce record du monde !
                                        <a href="http://www.paroisse-saint-sulpice-paris.org" target="_blank" class="link-description">Site officiel <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="en">L'Eglise Saint-Sulpice</h2>
                                    <p lang="en">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/18.jpg" alt="St-Sulpice">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> The Saint Sulpice Church is a catholic building built between 1646 and 1870. The church is known for its large dimensions, its sophisticated interior (with among others a fresco from Delacroix in the Saints-Anges Chapel) and its gnomon. It is from the top of its north tower that we established this world record!
                                        <a href="http://www.paroisse-saint-sulpice-paris.org" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                    <h2 lang="es">L'Eglise Saint-Sulpice</h2>
                                    <p lang="es">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/18.jpg" alt="St-Sulpice">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> “L’église Saint Sulpice” es un edificio católico que fue construido entre 1646 y 1870. Esta conocida por sus grandes dimensiones, su interior refinado (con un mural de Delacroix en la “Chapelle des Saints-Anges”), así como su gnomon. ¡Es también al tope de la torre norte que hemos realizado este récord mundial!
                                        <a href="http://www.paroisse-saint-sulpice-paris.org" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="hotspot-dom-20-pantheon" class="hotspot">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <input type="checkbox">
                            <!-- Icon/Text container -->
                            <p class="media" data-tooltip-position="right" data-tooltip data-tooltip-fr="Le Panthéon">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                            <!-- Content of the hotspot -->
                            <div class="content">
                                <div class="padded">
                                    <h2 lang="fr">Le Panthéon</h2>
                                    <p lang="fr">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/20.jpg" alt="Panthéon">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">voir le 360</span>
                                            </span>
                                        </a> Construit à l’origine comme une église, ce monument honore maintenant les personnages et événements ayant marqués l’histoire de France. Initialement construit à partir de 1764, l’église est profondément modifiée pour devenir un panthéon avec les travaux de Quatremère de Quincy. Le bâtiment mesure 83 m de haut et est le Temple républicain de la patrie reconnaissante envers ses grands hommes.
                                         <a href="http://pantheon.monuments-nationaux.fr/" target="_blank" class="link-description">Site officiel <span class="icon-external-link"></span></a>
                                     </p>

                                    <h2 lang="en">Le Panthéon</h2>
                                    <p lang="en">
                                        <a href="#learn-more">
                                            <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/20.jpg" alt="Panthéon">
                                            <span>
                                                <span class="icon-eye"></span>
                                                <span class="text">view 360</span>
                                            </span>
                                        </a> Built as the origin as a church, this monument now honors the great characters and events who forged the French history. The church was first built starting in 1764 then was drastically remodeled to become a pantheon under the direction of architect Quatremère de Quincy. The building is 83 meters tall and is the republican temple of the nation paying respects to its great men.
                                        <a href="http://pantheon.monuments-nationaux.fr/" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                    </p>

                                   <h2 lang="es">Le Panthéon</h2>
                                   <p lang="es">
                                       <a href="#learn-more">
                                           <img data-src="<?php echo $asset_root_url ?>img/previews/thumbs/20.jpg" alt="Panthéon">
                                           <span>
                                               <span class="icon-eye"></span>
                                               <span class="text">view 360</span>
                                           </span>
                                       </a> “La Tour Eiffel” es uno de los monumentos los más famosos y representativos de Paris. Fue construido para la exposición universal de 1889 por el ingeniero Gustave Eiffel. Con una altura de 324 metros, la “Dame de fer” (dama de hierra) es el monumento de pago más visitado del mundo. Dada su importancia, la UNESCO no tenía la opción de no registrarla al patrimonio mundial de la humanidad.
                                       <a href="http://pantheon.monuments-nationaux.fr/" target="_blank" class="link-description">Official website <span class="icon-external-link"></span></a>
                                   </p>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="hotspot-dom-easter-egg-reblochon" class="hotspot easter-egg fov3">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <!-- <input type="checkbox"> -->
                            <!-- Icon/Text container -->
                            <p class="media">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div id="hotspot-dom-easter-egg-ovni" class="hotspot easter-egg fov3">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <!-- <input type="checkbox"> -->
                            <!-- Icon/Text container -->
                            <p class="media">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div id="hotspot-dom-easter-egg-tortue" class="hotspot easter-egg fov5">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <!-- <input type="checkbox"> -->
                            <!-- Icon/Text container -->
                            <p class="media">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div id="hotspot-dom-easter-egg-team" class="hotspot easter-egg fov3">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <!-- <input type="checkbox"> -->
                            <!-- Icon/Text container -->
                            <p class="media">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div id="hotspot-dom-easter-egg-marmotte" class="hotspot easter-egg fov3">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <!-- <input type="checkbox"> -->
                            <!-- Icon/Text container -->
                            <p class="media">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div id="hotspot-dom-easter-egg-grenouille" class="hotspot easter-egg fov3">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <!-- <input type="checkbox"> -->
                            <!-- Icon/Text container -->
                            <p class="media">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div id="hotspot-dom-easter-egg-plaque" class="hotspot easter-egg fov2">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <!-- <input type="checkbox"> -->
                            <!-- Icon/Text container -->
                            <p class="media">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div id="hotspot-dom-easter-egg-publicite" class="hotspot easter-egg fov3">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <!-- <input type="checkbox"> -->
                            <!-- Icon/Text container -->
                            <p class="media">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div id="hotspot-dom-easter-egg-feu" class="hotspot easter-egg fov2">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <!-- <input type="checkbox"> -->
                            <!-- Icon/Text container -->
                            <p class="media">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div id="hotspot-dom-easter-egg-pi" class="hotspot easter-egg fov7">
                        <div class="hotspot-zone">
                            <!-- Toggle -->
                            <!-- <input type="checkbox"> -->
                            <!-- Icon/Text container -->
                            <p class="media">
                                <!-- What you see into the hotspot, centered horizontally and vertically -->
                                <span class="centered">
                                    <span class="content">
                                    </span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <!-- <footer>
                    <div class="footer">
                        &copy; copyright
                    </div>
                </footer> -->
            </div>

            <div class="sidebar secondary active">
                <div class="toolbar">
                    <a href="#fullscreen"
                        class="link-toolbar"
                        data-tooltip
                        data-tooltip-fr="Bascule mode plein écran"
                        data-tooltip-en="Toggle fullscreen mode"
                        data-tooltip-es="Pantalla completa"
                        data-tooltip-position="right">
                        <span class="icon-maximize"></span>
                    </a>
                    <a href="#share-view"
                        class="link-toolbar"
                        data-tooltip
                        data-tooltip-fr="Partager cette vue"
                        data-tooltip-en="Share this view"
                        data-tooltip-es="Compartir esta vista"
                        data-tooltip-position="right">
                        <span class="icon-share"></span>
                    </a>
                    <a href="#zoom-in"
                        class="link-toolbar"
                        data-tooltip
                        data-tooltip-fr="Zoom +"
                        data-tooltip-en="Zoom +"
                        data-tooltip-es="Zoom +"
                        data-tooltip-position="right">
                        <span class="icon-zoom-in"></span>
                    </a>
                    <a href="#zoom-out"
                        class="link-toolbar"
                        data-tooltip
                        data-tooltip-fr="Zoom -"
                        data-tooltip-en="Zoom -"
                        data-tooltip-es="Zoom -"
                        data-tooltip-position="right">
                        <span class="icon-zoom-out"></span>
                    </a>
                    <span class="selector"
                            data-tooltip
                            data-tooltip-fr="Sélection de la langue de l'interface"
                            data-tooltip-en="Select langage of the interface"
                            data-tooltip-es="Selección del idioma del interfaz"
                            data-tooltip-position="right">
                        <a href="#language-fr" class="link-language">fr</a>
                        <a href="#language-en" class="link-language">en</a>
                        <a href="#language-es" class="link-language">es</a>
                    </span>
                    <!-- <hr>
                    <a href="#delete-cookies" class="link-toolbar" onclick="deleteCookie('all')"><span class="icon-trash"></span></a> -->


                </div>
            </div>
        </main>

        <div    class="modal credits"
                data-tooltip
                data-tooltip-fr="Propulsé par ForgeJS"
                data-tooltip-en="Powered by ForgeJS"
                data-tooltip-es="Creado con ForgeJS"
                data-tooltip-position="right">
            <p>
                <a href="#forgejs.org" class="link-forge-js">ForgeJS</a>
            </p>
        </div>

        <div class="modal forgejs">
            <p lang="fr">Cette expérience interactive a été réalisée en utilisant le framework de développement <a href="https://forgejs.org" class="link-forge-js black" target="_blank">ForgeJS</a></p>

            <p lang="en">This interactive experience has been created using <a href="https://forgejs.org" class="link-forge-js black" target="_blank">ForgeJS</a> development framework</p>

            <p lang="es">This interactive experience has been created using <a href="https://forgejs.org" class="link-forge-js black" target="_blank">ForgeJS</a> development framework</p>

            <a href="#close-forgejs-modal" class="link-button icon">
                <span class="icon-x"></span>
            </a>
        </div>

        <div class="modal places-details">
            <div class="content">
            </div>
        </div>

        <div    class="modal floor-plan"
                data-tooltip
                data-tooltip-fr="Retour au gigapixel"
                data-tooltip-en="Back to gigapixel"
                data-tooltip-es="Volver al gigapixel">
        </div>

        <div class="modal hero-image"></div>

        <div class="modal loader-container">
            <!-- <div class="orbit-spinner">
                <div class="orbit"></div>
                <div class="orbit"></div>
                <div class="orbit"></div>
            </div> -->
            <span class="loader tour-eiffel"></span>
        </div>

        <div class="modal cookies">


        </div>

        <aside class="congratulations">
            <h3>
                <!-- <span class="icon-award"></span> -->
                <span>
                    <span lang="en">Congratulations!</span>
                    <span lang="fr">Félicitations!</span>
                    <span lang="es">¡Enhorabuena!</span>
                </span>
            </h3>
            <p lang="en">Vous avez trouvé toutes les surprises!</p>
            <p lang="en">Share your result with your friends!</p>
            <p lang="en" class="social-message">I have found the 10 surprises hidden in the Paris 26 Gigapixels website!</p>

            <p lang="fr">Vous avez trouvé toutes les surprises!</p>
            <p lang="fr">Partagez votre résultat avec vos amis!</p>
            <p lang="fr" class="social-message">J'ai trouvé les 10 surprises cachées dans le site Paris 26 Gigapixels!</p>

            <p lang="es">Has encontrado todas las sorpresas.</p>
            <p lang="es">¡Comparta su resultado con sus amigos!</p>
            <p lang="es" class="social-message">¡Encontré las 10 sorpresas ocultas en el sitio web de Paris 26 Gigapixels!</p>
        </aside>

        <div class="modal share">
            <p class="image">
                <!-- <span class="orbit-spinner primary size-md">
                    <span class="orbit"></span>
                    <span class="orbit"></span>
                    <span class="orbit"></span>
                </span> -->
                <span class="loader tour-eiffel fixed-size"></span>
            </p>
            <div class="content">
                <p>
                    <textarea   rows="4"
                                placeholder=""
                                data-placeholder-fr="Vous pouvez ajouter une description (optionnel)" data-placeholder-en="You can enter a description (optional)"
                                data-placeholder-es="Puedes agregar una descripción (opcional)"
                                name="description"></textarea>
                </p>

                <p class="links">
                    <!-- Sharingbutton Facebook -->
                    <a  class="link-social link-facebook"
                        href="#"
                        target="_blank"
                        data-tooltip
                        data-tooltip-fr="Partager sur Facebook"
                        data-tooltip-en="Share on Facebook"
                        data-tooltip-es="Compartir en Facebook">
                        <img src="<?php echo $asset_root_url ?>img/social/facebook.svg" alt="Facebook">
                    </a>

                    <!-- Sharingbutton Twitter -->
                    <a  class="link-social link-twitter"
                        href="#"
                        target="_blank"
                        data-tooltip
                        data-tooltip-fr="Partager sur Twitter"
                        data-tooltip-en="Share on Twitter"
                        data-tooltip-es="Compartir en Twitter">
                        <img src="<?php echo $asset_root_url ?>img/social/twitter.svg" alt="Twitter">
                    </a>

                    <!-- Sharingbutton Google+ -->
                    <a  class="link-social link-google"
                        href="#"
                        target="_blank"
                        data-tooltip
                        data-tooltip-fr="Partager sur Google Plus"
                        data-tooltip-en="Share on Google+"
                        data-tooltip-es="Compartir en Google Plus">
                        <img src="<?php echo $asset_root_url ?>img/social/google.svg" alt="Google+">
                    </a>

                    <!-- Sharingbutton Pinterest -->
                    <a  class="link-social link-pinterest"
                        href="#"
                        target="_blank"
                        data-tooltip
                        data-tooltip-fr="Partager sur Pinterest"
                        data-tooltip-en="Share on Pinterest"
                        data-tooltip-es="Compartir en Pinterest">
                        <img src="<?php echo $asset_root_url ?>img/social/pinterest.svg" alt="Pinterest">
                    </a>

                    <a  class="link-social link-copy"
                        href="#copy-link"
                        data-tooltip
                        data-tooltip-fr="Copier le lien"
                        data-tooltip-en="Copy the link"
                        data-tooltip-es="Copiar el link"
                        data-clipboard-text=""
                        data-tooltip-position="right">
                        <img src="<?php echo $asset_root_url ?>img/social/link.svg" alt="Copy link">
                    </a>
                </p>
                <p class="commands">
                    <a href="#close-shareview" class="link-button icon">
                        <span class="icon-x"></span>
                    </a>
                </p>
            </div>
        </div>

        <div class="backdrop share"></div>

        <div class="backdrop places"></div>

        <div class="backdrop header"></div>

        <div class="backdrop mobile-menu"></div>

        <div class="backdrop congratulations"></div>

        <div class="backdrop cookies"></div>

        <div class="navbar mobile">
            <div class="toolbar">
                <a  href="#fullscreen"
                    class="link-toolbar inline-flex">
                    <span class="icon-maximize"></span>
                </a>
                <a  href="#share-view"
                    class="link-toolbar inline-flex">
                    <span class="icon-share"></span>
                </a>
            </div>
        </div>

        <div class="notification-bar cookies">
            <p class="flex">
                <span class="fill">
                    <span class="icon-alert-triangle"></span>
                    <span lang="fr">Ce site utilise des cookies pour vous proposer la meilleure expérience de navigation. <a href="#cookies-learn-more" class="link-soft">En savoir plus</a></span>
                    <span lang="en">This website uses cookies to offer you the best browsing experience. <a href="#cookies-learn-more" class="link-soft">See more</a></span>
                    <span lang="es">Este sitio utiliza cookies para mejorar su experiencia de navegación. <a href="#cookies-learn-more" class="link-soft">Más información</a></span>
                </span>
                <span>
                    <a href="#i-accept-cookies" class="link-button">ok</a>
                </span>
                <!-- <span>
                    <a href="#dismiss" class="link-button icon"><span class="icon-x"></span></a>
                </span> -->

            </p>
            <div class="full-text">
                <p lang="fr">Ce site utilise des cookies à plusieurs occasions, comme par exemple pour enregistrer les préférences des visiteurs du site et pour enregistrer les informations de session comme les pages visitées, les interactions avec les composants du site internet, le temps passé sur le site internet, les préférences de langue. Nous pouvons aussi utiliser les cookies pour adapter le contenu du site internet aux préférences du visiteur et optimiser l͛exécution du site internet et les campagnes de publicité en ligne.</p>
                <p lang="fr">Ce site permet aussi aux tiers de collecter à partir du site internet des données ne permettant pas de vous identifier directement personnellement au moyen de cookies et web beacons. Ce site ne permet pas aux tiers de collecter des données, pour leurs finalités promotionnelles propres. Cette politique couvre l͛utilisation des cookies par ce site et les partenaires désignés pour la diffusion d͛annonces, l͛affichage du site et l͛analyse et ne couvre pas l͛utilisation de cookies par des annonceurs tiers.</p>
                <p lang="fr">Vous êtes en mesure de configurer votre navigateur pour accepter et rejeter les cookies, en partie ou en totalité, ou vous notifier quand un cookie est installé — chaque navigateur étant différent, consultez la rubrique "Aide" de votre navigateur pour savoir comment changer vos préférences de cookies. Vous devez cependant   You may be able to configure your browser to accept or reject all or some cookies, or notify you when a cookie is set — each browser is different, so check the ͞Help͟ menu of your browser to learn how to change your cookie preferences. You must, however, enable cookies from this website in order to use most functions on the website.</p>

                <p lang="en">This website uses cookies to store visitors͛ preferences and to record session information, such as pages visited, interactions with website features, time spent on the website, language preference, to tailor website content according to visitor preferences. We do not link the information we store in cookies to any personal information you submit to us.</p>
                <p lang="en">This website allows third parties to collect non-personal information by way of cookies, web beacons. It does not enable third parties to collect any personal information directly for their own promotional purposes. This policy covers the use of cookies by this website and relevant ad serving, website feature, and analytics partners, and does not cover the use of cookies by 3rd party advertisers.</p>
                <p lang="en">You may be able to configure your browser to accept or reject all or some cookies, or notify you when a cookie is set — each browser is different, so check the ͞Help͟ menu of your browser to learn how to change your cookie preferences. You must, however, enable cookies from this website in order to use most functions on the website.</p>

                <p lang="es"></p>
                <p lang="es"></p>
                <p lang="es"></p>
            </div>
        </div>

        <div class="notification-bar popup">
            <p>
                <span class="icon-thumbs-up"></span>
                <span class="text"></span>
            </p>
            <aside>
                <div class="found-one">
                    <span lang="fr">Bravo! Vous avez trouvé une nouvelle surprise</span>
                    <span lang="en">Congrats! You have found a new surprise!</span>
                    <span lang="es">¡Bravo! Has encontrado una nueva sorpresa.</span>
                </div>
                <div class="already-found">
                    <span lang="fr">Déjà trouvé</span>
                    <span lang="en">Already found!</span>
                    <span lang="es">Ya encontrado</span>
                </div>
                <div class="copied-to-clipboard">
                    <span lang="fr">Lien copié dans le presse-papier</span>
                    <span lang="en">Link copied to clipboard</span>
                    <span lang="es">Copiado al portapapeles</span>
                </div>


            </aside>
        </div>


    </div>

    <aside class="toolbar-hotspot">
        <div class="toolbar">
            <a  href="#close-hotspot"
                class="link-icon"
                data-tooltip
                data-tooltip-position="right"
                data-tooltip-fr="Fermer"
                data-tooltip-en="Close">
                <span class="icon-x"></span>
            </a>
            <a  href="#previous-poi"
                class="link-icon"
                data-tooltip
                data-tooltip-position="right"
                data-tooltip-fr="Monument précedent"
                data-tooltip-en="Previous monument">
                <span class="icon-chevron-left"></span>
            </a>
            <a  href="#next-poi"
                class="link-icon"
                data-tooltip
                data-tooltip-fr="Monument suivant"
                data-tooltip-en="Next monument">
                <span class="icon-chevron-right"></span>
            </a>
        </div>
    </aside>

    <!-- Include the threejs custom build -->
    <script src="libraries/three.js/three.r86.custom.min.js"></script>

    <!-- Include the Hammer.js library -->
    <script src="libraries/hammer.js/hammer.min.js"></script>

    <!-- Include the ForgeJS library -->
    <script type="text/javascript" src="libraries/forge/forge.min.0.9.5.js" ></script>

    <!-- Start ForgeJS -->
    <script type="text/javascript">
        // Create a viewer
        var viewer = new FORGE.Viewer("container", "config.json");
    </script>

    <script type="text/javascript" src="libraries/jquery/jquery.2.1.4.min.js" ></script>
    <script type="text/javascript" src="libraries/perfect-scrollbar/perfect-scrollbar.jquery.min.js"></script>
    <script type="text/javascript" src="libraries/js/functions.js" ></script>
    <script type="text/javascript" src="libraries/js/start.js" ></script>
    <script type="text/javascript" src="libraries/dev.js" ></script>
    <script type="text/javascript" src="libraries/clipboard.js/clipboard.min.js" ></script>
    <script type="text/javascript">

        jQuery(document).ready(function(){
            acceptCookies(true);

            jQuery('a[href="#cookies-learn-more"]').on('click',function(e){
                e.preventDefault();
                jQuery('.notification-bar.cookies .full-text').toggleClass('active');
                _gaq.push(['_trackEvent','Cookies','Learn more']);
            });

            //Keep in mind language priority is cookie language / browser language / english
            var cookieLanguage = getCookie('Paris26g_Language');
            //If cookie is set, use cookie language
            if(cookieLanguage != ''){
                language(cookieLanguage);
            //If not, use browser language if supported
            }else{
                //Browser language is supported
                if(languageRange(utilities.browserLanguage)){
                    language(utilities.browserLanguage);
                //Browser language is not supported, use english
                }else{
                    language('<?php echo $language ?>');
                }
            }

            jQuery('a[href*="#language"]').on('click',function(e){
                e.preventDefault();
                var targetLanguage = jQuery(this).text();
                language(targetLanguage);
                _gaq.push(['_trackEvent','User sets language',targetLanguage]);
                //On small devices, automatically close after click
                if(jQ_aToggle.css('display') != 'none' && !jQuery(this).parent().hasClass('hover')){
                    jQuery(this).parent().addClass('hover');
                }else{
                    jQuery(this).parent().removeClass('hover');
                }
            });

            jQ_sidebarMain.find('.content')
                .perfectScrollbar()
                .on('touchmove',function(e){
                    e.preventDefault(); //to avoid pull down refresh
                });
            jQuery('.hotspot p[lang]')
                .perfectScrollbar()
                .on('touchmove',function(e){
                    e.preventDefault(); //to avoid pull down refresh
                });


            cookies.forEach(function(cookie){
                // console.log(cookie.indexOf('EasterEgg'));
                //Filter easter eggs
                var thisCookieValue = getCookie(cookie);
                if(cookie.indexOf('EasterEgg') > 1 && thisCookieValue == 'true'){
                    var prefixEasters = 'Paris26g_EasterEgg_';
                    var easterEggId = cookie.replace(prefixEasters,'');
                    easterEggsStates[easterEggId] = true;
                    jQuery('nav.easter-eggs a[href="#'+easterEggId+'"],#hotspot-dom-easter-egg-'+easterEggId).addClass('checked');
                }
                if(cookie == 'Paris26g_MenuItem'){
                    jQ_sidebarPrimary.find('a').removeClass('active');
                    jQ_sidebarPrimary.find('a[href="'+thisCookieValue+'"]').addClass('active');

                }
                if(cookie == 'Paris26g_MenuStatus'){
                    if(thisCookieValue == 'true'){
                        tabulation(jQ_sidebarPrimary.find('p.toolbar>a.active').eq(0).attr('href'));
                        toggleMenu('show');
                    }else{
                        // jQ_sidebarMain.removeClass('active');
                        jQ_sidebarPrimary.find('p.toolbar>a').removeClass('active');
                    }
                }
                if(cookie == 'Paris26g_Intro'){
                    if(thisCookieValue == 'true'){
                        jQuery('.intro').removeClass('active');
                        jQ_sidebarPrimary.addClass('active');
                        if(!feature.touch){
                            jQ_sidebarSecondary.addClass('active');
                        }
                    }
                }
            });

            if(getCookie('Paris26g') == 'true'){
                var jQeasterEggsContainer = jQ_sidebarMain.find('nav.easter-eggs');
                var jQfoundEasterEggItems = jQeasterEggsContainer.find('a.checked');
                jQfoundEasterEggItems.each(function(){
                    jQuery(this).remove();
                    jQeasterEggsContainer.prepend(jQuery(this));
                });
            }

            //Deep link URL update
            jQuery('#wrapper').on('mouseleave',function(){
                //Update only if share modal is closed
                if(!jQ_modalShare.hasClass('active')){
                    deepLinkUpdater();
                }
            });

            jQuery('a[href="#launch"]').on('click',function(){
                launch();
            });

            //Include toolbar for each spot
            jQ_hotspotsPoi.each(function(){
                jQuery(this).find('.hotspot-zone>.content')
                    .prepend(jQuery('aside.toolbar-hotspot').html());
            });

            //Insert the toolbar for the monument details modal
            jQ_modalPlacesDetails.prepend(jQuery('aside.toolbar-hotspot').html());

            jQuery('a[href="#next-poi"], a[href="#previous-poi"]').on('click',function(e){
                e.preventDefault();
                var id = viewer.story.sceneUid;
                if(id == 'paris'){
                    var rawId = jQuery('.hotspot:not(.easter-egg):not(.media-style__cache).active').attr('id');
                    id = rawId.substring(12,14);
                }
                //Compute next/previous indexes for each POI
                var currentIndex = jQ_navPointsOfInterest.children('a[href="#'+id+'"]').index(),
                    numberOfPoi = jQ_navPointsOfInterest.children('a').length,
                    nextIndex = currentIndex + 1,
                    previousIndex = currentIndex - 1,
                    previousAnchor = jQ_navPointsOfInterest.children('a').eq(previousIndex).attr('href'),
                    previousPoiId,
                    nextAnchor = jQ_navPointsOfInterest.children('a').eq(nextIndex).attr('href'),
                    nextPoiId;
                //First/last management
                if(previousAnchor === undefined){
                    nextPoiId = nextAnchor.replace('#','');
                }else if(nextAnchor === undefined){
                    previousPoiId = previousAnchor.replace('#','');
                }else{
                    previousPoiId = previousAnchor.replace('#','');
                    nextPoiId = nextAnchor.replace('#','');
                }

                //If POI opened
                if(jQ_modalPlacesDetails.hasClass('active')){
                    if(jQuery(this).attr('href') == '#next-poi'){
                        openPoi(nextPoiId);
                    }else if(jQuery(this).attr('href') == '#previous-poi'){
                        openPoi(previousPoiId);
                    }
                //If no POI is opened
                }else{
                    if(jQuery(this).attr('href') == '#next-poi'){
                        kickMeTo(nextPoiId);
                    }else if(jQuery(this).attr('href') == '#previous-poi'){
                        kickMeTo(previousPoiId);
                    }
                }
            });

            jQuery('.hotspot a[href="#close-hotspot"]').on('click',function(e){
                e.preventDefault();
                jQuery(this).closest('.hotspot').removeClass('active');
                viewerControllers(true);
            });

            jQ_hotspotsPoi.find('.media').on('click',function(e){
                var jQspot = jQuery(this).parent().parent(),
                    rawId = jQuery(this).closest('.hotspot').attr('id'),
                    id = rawId.substring(12,14),
                    sceneUid = viewer.story.sceneUid;
                if(!jQspot.hasClass('active') && sceneUid == 'paris'){
                    kickMeTo(id);
                    var title = jQuery('a[href="#'+id+'"]').text();
                    _gaq.push(['_trackEvent','In Gigapixel, users clicks hotspot',title]);
                }
            });

            jQ_cache.on('click',function(){
                _gaq.push(['_trackEvent','Easter Eggs','PTP Mix']);
                jQuery('body').append('<iframe style="position:fixed; top:50%; left:50%; max-width:500px; transform: translateX(-50%) translateY(-50%);" width="100%" height="265" src="https://clyp.it/c3gz5i2a/widget" frameborder="0"></iframe>');
            });

            jQuery('a[href="#learn-more"]').on('click',function(e){
                e.preventDefault();
                var rawId = jQuery(this).closest('.hotspot').attr('id'),
                    targetSceneUid = rawId.substring(12,14);
                openPoi(targetSceneUid);
                _gaq.push(['_trackEvent','Hotspot opened','Click on learn more']);
            });

            jQuery('.modal a[href="#close-hotspot"], .modal a[href="#toggle-visible"]').on('click',function(e){
                e.preventDefault();
                modalPlacesDetails();
            });

            jQuery('.modal.floor-plan').on('click',function(e){
                e.preventDefault();
                closePoi('home');
            });

            jQ_navPointsOfInterest.children('a').on('click',function(e){
                e.preventDefault();
                var id = jQuery(this).attr('href'),
                    id = id.replace('#',''),
                    currentSceneUid = viewer.story.sceneUid,
                    text = jQuery(this).children('span').text(),
                    //Are we in xs/sm screen size?
                    displayType = jQ_aToggle.css('display');
                if(currentSceneUid == 'paris'){
                    kickMeTo(id);
                }else{
                    openPoi(id);
                }
                //Close menu is xs/sm device
                if(displayType != 'none'){
                    toggleMenu('hide');
                }
                _gaq.push(['_trackEvent','Menu',text]);
            });

            jQ_aToggle.on('click',function(e){
                e.preventDefault();
                toggleMenu();
            });

            jQuery('a[href="#point-of-interest"], a[href="#easter-eggs"], a[href="#about"]').on('click',function(e){
                e.preventDefault();
                //Are we in xs/sm screen size?
                var displayType = jQ_aToggle.css('display'),
                    tabId = jQuery(this).attr('href');
                //Display 'none' means large screens
                if(displayType == 'none'){
                    //If tabulation is already active, close menu
                    if(jQuery(this).hasClass('active')){
                        toggleMenu('hide');
                        jQuery(this).removeClass('active');
                        setCookie('Paris26g_MenuStatus','false',365);
                    //Otherwise open menu and tab
                    }else{
                        tabulation(tabId);
                    }
                //Otherwise it is small screens, just tabulate
                }else{
                    tabulation(tabId);
                }


            });

            jQuery('a[href="#home"]').on('click',function(e){
                e.preventDefault();
                viewerControllers(true);
                var currentSceneUid = viewer.story.sceneUid;
                if(currentSceneUid == 'paris'){
                    jQ_hotspotsPoi.removeClass('active');
                    viewer.camera.lookAt(-22, -13, null, 40, 2000, false, 'easeInOutCubic');
                }else{
                    closePoi('home-full');
                }
                _gaq.push(['_trackEvent','Home button','click']);
            });

            //Share view
            jQuery('a[href="#share-view"]').on('click',function(e){
                e.preventDefault();
                shareView();
            });

            //Change share URL on optional description change
            jQ_modalShare.find('textarea').on('change',function(){
                //Get input change
                var text = jQuery(this).val();
                //Get current links
                var jQfacebookLink = jQ_modalShare.find('a.link-facebook');
                var jQtwitterLink = jQ_modalShare.find('a.link-twitter');
                var jQgoogleLink = jQ_modalShare.find('a.link-google');
                var jQpinterestLink = jQ_modalShare.find('a.link-pinterest');
                var jQcopyLink = jQ_modalShare.find('a[href="#copy-link"]');
                //Add description to links
                var new_share_facebook_url = jQfacebookLink.attr('href')+encodeURIComponent('&description='+text);
                var new_share_twitter_url = jQtwitterLink.attr('href')+'&text='+encodeURIComponent(text);
                var new_share_google_url = jQgoogleLink.attr('href')+encodeURIComponent('&description='+text);
                var new_share_pinterest_url = jQpinterestLink.attr('href')+'&description='+encodeURIComponent(text);
                var new_share_link_url = jQcopyLink.attr('data-clipboard-text')+'&description='+encodeURIComponent(text);
                //Include new links
                jQfacebookLink.attr('href',new_share_facebook_url);
                jQtwitterLink.attr('href',new_share_twitter_url);
                jQgoogleLink.attr('href',new_share_google_url);
                jQpinterestLink.attr('href',new_share_pinterest_url);
                jQcopyLink.attr('data-clipboard-text',new_share_link_url);
            });

            //Close share modal management, check if user has clicked a sharing network
            var userHasShared = false;
            jQuery('a[href="#close-shareview"], .backdrop.share').on('click',function(e){
                e.preventDefault();
                var id = jQ_modalShare.find('.image').attr('data-id');
                //User has shared, then reset
                if(userHasShared){
                    userHasShared = false;
                //Or delete unused screenshot
                }else{
                    jQuery.ajax({
                        method: "POST",
                        url: "delete.php",
                        data: { id: id }
                    });
                }
                modal('share','hide');
            });
            //User clicks on a social network, then update status
            jQuery('a.link-social').on('click',function(e){
                userHasShared = true;
                var text = jQuery(this).attr('data-tooltip-fr');
                _gaq.push(['_trackEvent','Share','Click on '+text]);
            });

            //Clipboard management
            var clipboard = new Clipboard('a[href="#copy-link"]');
            clipboard.on('success', function(e) {
                notificationPush('<span lang="fr">Lien copié dans le presse-papier</span><span lang="en">Link copied to clipboard</span><span lang="es">Enlace copiado al portapapeles</span>','autohide','success','icon-clipboard');
                e.clearSelection();
            });

            //Zoom management
            var mouseStillDown = false;
            var interval;
            var intervalDuration = 100;
            jQuery('a[href*="#zoom"]').on('mousedown mouseup',function(e){
                e.preventDefault();
                viewerControllers(true);
                var currentFov = viewer.camera.fov,
                    destinationFov,
                    coef,
                    isZoomIn = false,
                    yaw = viewer.camera.yaw,
                    pitch = viewer.camera.pitch;

                //Zoom in
                if(jQuery(this).attr('href').indexOf('-in') > 1){
                    coef = 0.95;
                    isZoomIn = true;
                //Zoom out
                }else{
                    coef = 1.05;
                }
                if(e.type == 'mousedown'){
                    mouseStillDown = true;
                    destinationFov = currentFov * coef;
                    viewer.camera.lookAt(yaw, pitch, 0, destinationFov, intervalDuration, false);
                    currentFov = destinationFov;
                    interval = setInterval(function(){
                        if(mouseStillDown){
                            destinationFov = currentFov * coef;
                            viewer.camera.lookAt(yaw, pitch, 0, destinationFov, intervalDuration, false);
                            currentFov = destinationFov;
                        }
                    },intervalDuration);
                }else{
                    mouseStillDown = false;
                    clearInterval(interval);
                }
            });

            jQuery('.easter-eggs>a').on('click',function(e){
                e.preventDefault();
                viewerControllers(true);

                var currentEgg = jQuery(this).attr('href');
                var delay = SV_viewerTransitionDuration * 2;
                currentEgg = currentEgg.replace('#','');
                //If already found
                if(easterEggsStates[currentEgg]){
                    //Are we in xs/sm screen size?
                    var displayType = jQ_aToggle.css('display');
                    //Close menu is xs/sm device
                    if(displayType != 'none'){
                        toggleMenu('hide');
                    }
                    //If currently on main scene, adjust delay to go directly to easter egg
                    if(viewer.story.sceneUid == 'paris'){
                        delay = 0;
                    //If current scene is not paris, got to paris
                    }else{
                        closePoi('home-full');
                        goToScene('paris');
                    }

                    setTimeout(function(){
                        viewer.camera.lookAt(easterEggsData[currentEgg][0],easterEggsData[currentEgg][1],null,easterEggsData[currentEgg][2],3000);
                    },delay);
                }
            });

            //Notifications
            jQuery('a[href="#i-accept-cookies"]').one('click',function(e){
                e.preventDefault();
                setCookie('Paris26g_cookiesAccepted','true',365);
                jQuery('.notification-bar.cookies').removeClass('active');
                _gaq.push(['_trackEvent','Cookies','Accepted']);
            });

            jQuery('a[href="#forgejs.org"]').on('click',function(e){
                e.preventDefault();
                modal('forgejs','show');
                _gaq.push(['_trackEvent','About','ForgeJS']);
                jQuery('a[href="#close-forgejs-modal"]').on('click',function(e){
                    e.preventDefault();
                    modal('forgejs','hide');
                    jQuery(this).off();
                });
            });

            jQ_aFullscreen.on('click',function(e){
                e.preventDefault();
                toggleFullScreen();
            });

            jQuery(window).on('load',function(){
                if(easterEggsCount()[0] == easterEggsCount()[1]){
                    congratulations('show');
                }
                jQuery('#container canvas').on('dblclick',function(e){
                    var screenPosition = FORGE.Pointer.getRelativeMousePosition(e);
                    var stw = viewer.view.screenToWorld(screenPosition);
                    var spherical = FORGE.Math.cartesianToSpherical(stw.x, stw.y, stw.z, FORGE.Math.DEGREES);
                    var yaw = spherical.theta,
                        pitch = spherical.phi;
                        destinationFov = 1;
                    viewer.camera.lookAt(yaw, pitch, 0, destinationFov, 1000, false);
                });
            });

            //Deactivate tab key
            document.onkeydown = function(e) {
               if (e.defaultPrevented) return;
               var keyCode = e.keyCode || e.which;
               if (keyCode === 9) {
                   e.preventDefault();
                   return false;
               }
            };
        });
    </script>

    <!-- Ruler -->
    <!-- <div style="position:fixed; top:0; left:0; z-index:1000; width:50vw; height: 50vh; border-right:1px dashed white; border-bottom:1px dashed white; pointer-events:none;"></div>
    <div style="position:fixed; top:50vh; left:50vw; z-index:1000; width:50vw; height: 50vh; border-left:1px dashed white; border-top:1px dashed white; pointer-events:none;"></div> -->
</body>
</html>
