<?php
    if(isset($_GET)){
        //Titile
        //Generic title
        $share_title_generic = 'Paris 26 Gigapixels 2018';
        $share_description = 'Paris 26 Gigapixels is an interactive experience of Paris most beautiful monuments.';
        $share_title = $share_title_generic;
        if(isset($_GET['title'])){
            $share_title = $_GET['title'];
        }
        //Share description
        if(strlen($_GET['description']) > 3){
            $share_description = $_GET['description'];
        }

        //id
        $share_id = $_GET['id'];
        //Scene uid
        if(isset($_GET['uid'])){
            $share_scene_uid = $_GET['uid'];
        }else{
            $share_scene_uid = 'paris';
        }

        //Check https or not
        if($_SERVER['HTTPS'] == 'on'){
            $connection_type = 'https://';
        }else{
            $connection_type = 'http://';
        }
        //Root url
        $share_root_url = $connection_type.$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']).'/';
        //thumbnail url
        //Make a difference between a share and an URL address bar copy
        //If there is an id/hash, this is a screenshot, then built from shareview
        if(isset($_GET['id'])){
            $share_thumbnail_url = $share_root_url.'uploads/'.$share_id.'.jpg';
        //Otherwise this is a URL address bar copy, then use generic screenshot per POI
        }else{
            if(isset($_GET['uid'])){
                if($_GET['uid'] == 'paris'){
                    $share_thumbnail_url = $share_root_url.'img/'.$share_scene_uid.'26-socials.jpg';
                }else{
                    $share_thumbnail_url = $share_root_url.'img/poi/previews/'.$share_scene_uid.'.jpg';
                }
            }

        }
        //Deep link url
        if(isset($_GET['uid']) && isset($_GET['yaw']) && isset($_GET['pitch']) && isset($_GET['fov'])){
            $share_view_url = $share_root_url.'?uid='.$_GET['uid'].'&yaw='.$_GET['yaw'].'&pitch='.$_GET['pitch'].'&fov='.$_GET['fov'];
        }else{
            $share_view_url = $share_root_url;
        }

    }else{
        echo 'nope';
    }
?><!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title><?php echo $share_title ?></title>
		<meta name="description" content="<?php echo $share_description ?>">
        <!-- Schema.org markup for Google+ -->
        <meta itemprop="name" content="<?php echo $share_title ?>">
        <meta itemprop="description" content="<?php echo $share_description ?>">
        <meta itemprop="image" content="<?php echo $share_thumbnail_url ?>">
        <!-- Address bar header color -->
        <meta name="theme-color" content="#123456">
        <meta name="msapplication-navbutton-color" content="#123456">
        <meta name="apple-mobile-web-app-status-bar-style" content="#123456">
        <!-- Open Graph data -->
        <meta property="og:title" content="<?php echo $share_title ?>">
        <meta property="og:type" content="website">
        <!-- <meta property="og:url" content="<?php //echo $share_root_url ?>"> -->
        <!-- <meta property="og:image" content="<?php //echo $share_thumbnail_url ?>"> -->
        <meta property="og:image" content="<?php echo $share_thumbnail_url ?>">
        <meta property="og:description" content="<?php echo $share_description ?>">
        <meta name="generator" content="Forge JS">
		<meta name="author" content="Forge JS Team">
		<meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui">
        <script>
			window.location.href = "<?php echo $share_view_url ?>";
		</script>
	<body>
        <?php echo $share_root_url ?><br>
        <?php echo $share_description ?><br>
        <?php echo $share_thumbnail_url ?><br>
        <?php echo $share_view_url ?><br>
        <?php echo $share_root_url ?><br>
        <pre>
            <?php echo $connection_type ?>
        </pre>
        <pre>
            <?php echo $share_root_url ?>
        </pre>
        <pre>
            <?php echo $share_thumbnail_url ?>
        </pre>
        <pre>
            <?php print_r($_SERVER) ?>
        </pre>
        <pre>
            <?php print_r($_GET) ?>
        </pre>
        <a href="<?php echo $share_view_url ?>" target="_blank">Test</a>
	</body>
</html>
