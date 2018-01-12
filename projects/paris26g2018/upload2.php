<?php
    // Quality is a number between 0 (best compression) and 100 (best quality)
    function png2jpg($originalFile, $outputFile, $quality) {
        $image = imagecreatefrompng($originalFile);
        imagejpeg($image, $outputFile, $quality);
        imagedestroy($image);
    }
    //Generate a random string
    function random_string($length) {
        $key = '';
        $keys = array_merge(range(0, 9), range('a', 'z'));

        for ($i = 0; $i < $length; $i++) {
            $key .= $keys[array_rand($keys)];
        }

        return $key;
    }

    if(isset($_POST['filename'])) {
        if(isset($_POST['browser'])) {
            $browser = $_POST['browser'];
        }
        if(isset($_POST['isiOS'])) {
            $isiOS = $_POST['isiOS'];
        }

        //Get image data
        $data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $_POST['filename']));
        //Generate a random filename
        $filename = random_string(20);
        //Upload Directory
        $upload_dir = 'uploads';
        //Image path
        $png_path = $upload_dir.'/'.$filename.'.png';
        //Save file to png
        file_put_contents($png_path, $data);
        //FIX is safari
        if($isiOS == 'true' || ($isiOS == 'false' && $browser == 'safari')){
            //Create image
            $im = imagecreatefrompng($png_path);
            //Flip image
            imageflip($im, IMG_FLIP_VERTICAL);
            //Save image
            imagepng($im, $upload_dir.'/'.$filename.'_flip.png', 0);
            //Change path name for deletion
            $png_path = $upload_dir.'/'.$filename.'_flip.png';
        }

        //Generate final thumbnail
        png2jpg($png_path,$upload_dir.'/'.$filename.'.jpg',50);
        //Delete temp png
        unlink($png_path);
        //Return final jpg img
        // sleep(2);
        echo '<img src="'.$upload_dir.'/'.$filename.'.jpg" alt="Paris 26 2018 screen" id="'.$filename.'">';
    }
?>
