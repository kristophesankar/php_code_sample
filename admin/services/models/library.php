<?php

namespace com\services\objects {

	class Constants {

		const DB_HOST = 'HOST';
		const DB_NAME = 'NAME';
		const DB_USER_NAME = 'UNAME';
		const DB_USER_PASSWORD = 'PW';

		public static function getdbhost() {
			return self::DB_HOST;
		}

		public static function getdbconnectionname() {
			return self::DB_NAME;
		}

		public static function getdbusername() {
			return self::DB_USER_NAME;
		}

		public static function getdbuserpassword() {
			return self::DB_USER_PASSWORD;
		}

	}

}

namespace com\services\repository {

	use \com\services\objects\Constants;

	class Returnobject {

		public $message;
		public $status;
		public $data;
		public $template;

	}

	class ConnectionRepository {

		public $dbconnection = null;

		public function __construct() {
			try {
				$this->dbconnection = new \PDO("mysql:host=" . Constants::getdbhost() . ";dbname=" . Constants::getdbconnectionname(), Constants::getdbusername(), Constants::getdbuserpassword());
			} catch (\PDOException $e) {

				echo json_encode($e->getMessage());
			}
		}

	}

	class BlogRepository extends ConnectionRepository {

		public function __construct() {
			parent::__construct();
		}

		public function getAll() {

			try {
				$sql = "SELECT * FROM blog_posts;";
				$statement = $this->dbconnection->prepare($sql);
				$statement->execute();
				$response = $statement->fetchAll();
				return $response;
			} catch (\PDOException $e) {
				echo $e->getMessage();
				return;
			}
		}

		public function get($id) {
			$returnobject = new Returnobject();
			$returnobject->status = 0;
			try {
				$sql = "SELECT * FROM blog_posts where blogpostid = :id;";
				$statement = $this->dbconnection->prepare($sql);
				$statement->execute(
					array(
						':id' => $id,
					));
				$response = $statement->fetchAll();
				$returnobject->data = $response;
				return $returnobject;
			} catch (\PDOException $e) {
				echo $e->getMessage();
				return;
			}
		}

		public function toggleActive($id, $isactive) {
			$returnobject = new Returnobject();
			$returnobject->status = 0;

			try {
				$ids = (int) $id;
				$sql = "UPDATE ctc.blog_posts SET modifieddatetime=CURRENT_TIMESTAMP, isactive=:isactive WHERE blogpostid = :id;";

				$statement = $this->dbconnection->prepare($sql);
				$statement->execute(
					array(
						':id' => $ids,
						':isactive' => $isactive,
					));
				$response = $statement->fetchAll();
				$returnobject->data = $response;
				$returnobject->message = "Success";
				return $returnobject;
			} catch (\PDOException $e) {
				echo $e->getMessage();
				return;
			}
		}

		public function toggleVisible($id, $isvisible) {

			try {
				$sql = "UPDATE blog_posts SET isvisible = :isvisible where blogpostid = :id;";
				$statement = $this->dbconnection->prepare($sql);
				$statement->execute(
					array(
						':id' => $id,
						':isvisible' => $isactive,
					));
				$response = $statement->fetchAll();
				return $response;
			} catch (\PDOException $e) {
				echo $e->getMessage();
				return;
			}
		}

		public function save($title, $subtitle, $type, $datepicker, $author, $content, $editcontrol, $isvisible, $isactive, $tags) {

			$returnobject = new Returnobject();
			$returnobject->status = 0;
			try {

				if ($editcontrol === "") {

					$blogpost = "blog" . time() . ".txt";
					$filename = '../../posts/' . $blogpost;
					$filecontent = $content;

					try {

						if (file_put_contents($filename, $filecontent) !== false) {
						} else {
						}

					} catch (\Exception $e) {
						echo $e->getMessage();
						return;
					}

					$sql = "INSERT INTO ctc.blog_posts (title, subtitle, `text`, blogtypecd, tags, author, blogdate, createdatetime, modifieddatetime, isvisible, isactive) VALUES(:title, :subtitle, :content, :typecd, :tags, :author, :blogdate, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, :isvisible, :isactive);";
					$statement = $this->dbconnection->prepare($sql);
					$statement->execute(
						array(
							':title' => $title,
							':subtitle' => $subtitle,
							':content' => $filename,
							':typecd' => $type,
							':tags' => $tags,
							':author' => $author,
							':blogdate' => $datepicker,
							':isvisible' => $isvisible,
							':isactive' => $isactive,
						));
					$returnobject->message = "Blog Saved!";

				} else {

					$returnobject = $this->get($editcontrol); //get object
					$oldfilepath = $returnobject->data[0]["text"];
					$newfilepath = $oldfilepath . '.old' . time();
					rename($oldfilepath, $newfilepath);
					$filename = $oldfilepath;
					$filecontent = $content;

					try {

						if (file_put_contents($filename, $filecontent) !== false) {
						} else {
						}

					} catch (\Exception $e) {
						return $returnobject->message = $e->getMessage();
					}

					$sql = "UPDATE ctc.blog_posts SET title = :title, subtitle = :subtitle, blogimagepath = :blogimagepath, `text` = :content, blogtypecd = :typecd, tags = :tags, author = :author, blogdate = :blogdate, modifieddatetime = CURRENT_TIMESTAMP, isvisible = :isvisible, isactive = :isactive  WHERE blogpostid=:id;";
					$statement = $this->dbconnection->prepare($sql);
					$statement->execute(
						array(
							':id' => $editcontrol,
							':title' => $title,
							':subtitle' => $subtitle,
							':blogimagepath' => $filepath,
							':content' => $filename,
							':typecd' => $type,
							':tags' => $tags,
							':author' => $author,
							':blogdate' => $datepicker,
							':blogdate' => $datepicker,
							':isvisible' => $isvisible,
							':isactive' => $isactive,
						));
					$returnobject->message = "Edit Successful!";
				}

				$response = $statement->fetchAll();
				return $returnobject;
			} catch (\PDOException $e) {
				echo $e->getMessage();
				return;
			}
		}

		public function saveImage($id, $imagename) {

			$returnobject = new Returnobject();
			$returnobject->status = 0;
			try {

				$sql = "UPDATE ctc.blog_posts SET blogimagepath = :blogimagepath, modifieddatetime = CURRENT_TIMESTAMP WHERE blogpostid=:id;";
				$statement = $this->dbconnection->prepare($sql);
				$statement->execute(
					array(
						':id' => $id,
						':blogimagepath' => $imagename,
					));
				$returnobject->message = "Edit Successful!";
				$response = $statement->fetchAll();
				$returnobject->data = $response;

				return $returnobject;
			} catch (\PDOException $e) {
				echo $e->getMessage();
				return;
			}}

	}

}
