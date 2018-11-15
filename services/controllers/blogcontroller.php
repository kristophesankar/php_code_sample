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
$GETLATEST = 7;

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
	$blogposthtml = "";

	if (isset($_POST["latestrequest"])) {
		echo json_encode($response);
	} else {

		try {
			$blogposthtml = file_get_contents($response->data[0]["text"]);
			$response->template = $blogposthtml;
			echo json_encode($response);
		} catch (\Exception $e) {
			echo $e->getMessage();
			return;
		}
	}
	break;

case $GETLATEST:
	try {

		$repo = new repository\BlogRepository();
		$response = $repo->getLatest();
		$blogposthtml = "";
		echo json_encode($response);
	} catch (\Exception $e) {
		echo $e->getMessage();
		return;
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

		$title = $_POST["title"];
		$subtitle = $_POST["subtitle"];
		$datepicker = $_POST["datepicker"];
		$author = $_POST["author"];
		$content = $_POST["content"];
		$type = $_POST["type"];
		$editcontrol = $_POST["editcontrol"];
		$error = "";

		if ($error === "") {
			$response = $repo->save($title, $subtitle, $type, $datepicker, $author, $content, $editcontrol, 1, 1);
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

		$subid = $_POST["postid"];
		$error = "";

		if ($error === "") {
			$response = $repo->toggleActive($subid, 0);
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
