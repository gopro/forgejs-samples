<?php
    if(isset($_POST['id'])) {
        unlink('uploads/'.$_POST['id'].'.jpg');
    }
?>
