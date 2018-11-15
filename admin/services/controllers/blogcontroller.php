<?php
require "../models/library.php";
include '../utilities/config.php';
use com\services\repository;

$GET = 0;
$GETALL = 1;
$INSERT = 2;
$EDIT = 3;
$REMOVE = 4;
$ADD = 5;
$DEFAULT = 6;
$EDITIMAGE = 8;

$formdata = null;
$requestid = $DEFAULT;

if (isset($_POST["requestid"])) {

	$formdata = $_POST["requestid"];
	$requestid = $_POST["requestid"];
}

switch ($requestid) {

case $GET:

	$postid = $_POST["blogpostid"];
	$repo = new repository\BlogRepository();
	$response = $repo->get($postid);
	try {
		$path = $response->data[0]["text"];
		$blogposthtml = file_get_contents($path);
		$response->template = $blogposthtml;

	} catch (\Exception $e) {
		echo $e->getMessage();
		return;
	}
	echo json_encode($response);

	break;

case $EDITIMAGE:
	$repo = new repository\BlogRepository();
	try {
		$blogidcontrol = $_POST['blogidcontrol'];
		$info = pathinfo($_FILES['p_image']['name']);
		$ext = $info['extension']; // get the extension of the file
		$newname = time() . "." . $ext;

		$target = '../../assets/blogimages/' . $newname;
		move_uploaded_file($_FILES['p_image']['tmp_name'], $target);

		$editcontrol = $_POST["imageeditcontrol"];
		$error = "";

		if ($error === "") {
			$response = $repo->saveImage($blogidcontrol, $newname);

			echo json_encode($response);
		} else {
			$response->message = $error;
			echo json_encode($response);
		}
	} catch (\Exception $e) {
		$response->message = $e->getMessage();
		echo json_encode($response);
	}

	break;

case $GETALL:
	$repo = new repository\BlogRepository();
	$response = $repo->getAll();
	echo json_encode($response);
	break;

case $INSERT:
	$repo = new repository\BlogRepository();

	try {

		$title = $_POST["p_title"];
		$subtitle = $_POST["p_subtitle"];
		$datepicker = $_POST["datepicker"];
		$author = $_POST["p_author"];
		$content = $_POST["content"];
		$type = $_POST["type"];
		$tags = $_POST["p_tags"];
		$editcontrol = $_POST["editcontrol"];
		$error = "";
		if ($error === "") {
			$response = $repo->save($title, $subtitle, $type, $datepicker, $author, $content, $editcontrol, 1, 1, $tags);
			echo json_encode($response);
		} else {
			$response->message = $error;
			echo json_encode($response);
		}

	} catch (\Exception $e) {
		$response->message = $e->getMessage();
		echo json_encode($response);
	}

	break;

case $REMOVE:
	$repo = new repository\BlogRepository();

	try {

		$blogpostid = $_POST["blogpostid"];
		$error = "";

		if ($error === "") {
			$response = $repo->toggleActive($blogpostid, 0);
			echo json_encode($response);
		} else {
			$response->message = $error;
			echo json_encode($response);
		}

	} catch (\Exception $e) {
		$response->message = $e->getMessage();
		echo json_encode($response);
	}

	break;

case $ADD:
	$repo = new repository\BlogRepository();

	try {

		$blogpostid = $_POST["blogpostid"];
		$error = "";

		if ($error === "") {
			$response = $repo->toggleActive($blogpostid, 1);
			echo json_encode($response);
		} else {
			$response->message = $error;
			echo json_encode($response);
		}

	} catch (\Exception $e) {
		$response->message = $e->getMessage();
		echo json_encode($response);
	}

	break;

case $DEFAULT:

	header('Location:' . URL . '/404.php');

	break;

default:

	break;
}

?>
