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

				echo $e->getTraceAsString();
			}
		}

	}

	class BlogRepository extends ConnectionRepository {

		public function __construct() {
			parent::__construct();
		}

		public function getAll() {

			try {
				$sql = "SELECT * FROM blog_posts where isactive = 1;";
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
		public function getLatest() {
			$returnobject = new Returnobject();
			$returnobject->status = 0;
			try {
				$sql = "SELECT * FROM blog_posts ORDER BY blogpostid DESC LIMIT 1;";
				$statement = $this->dbconnection->prepare($sql);
				$statement->execute();
				$response = $statement->fetchAll();
				$returnobject->data = $response;
				return $returnobject;
			} catch (\PDOException $e) {
				echo $e->getMessage();
				return;
			}
		}

		public function toggleActive($id, $isactive) {

			try {
				$sql = "UPDATE blog_posts SET isactive = :isactive where blogpostid = :id;";
				$statement = $this->dbconnection->prepare($sql);
				$statement->execute(
					array(
						':id' => $id,
						':isactive' => $isactive,
					));
				$response = $statement->fetchAll();
				return $response;
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

		public function save($title, $subtitle, $type, $datepicker, $author, $content, $editcontrol, $isvisible, $isactive) {

			$returnobject = new Returnobject();
			$returnobject->status = 0;
			echo $editcontrol;
			try {

				if ($editcontrol === "") {

					$blogpost = "blog" . time() . ".txt";
					$filename = '../../posts/' . $blogpost;
					$filecontent = $content;

					try {

						if (file_put_contents($filename, $filecontent) !== false) {
							//  echo "File created (" . basename($filename) . ")";
						} else {
							//  echo "Cannot create file (" . basename($filename) . ")";
						}

					} catch (\Exception $e) {
						echo $e->getMessage();
						return;
					}

					$sql = "INSERT INTO ctc.blog_posts (title, subtitle, `text`, blogtypecd, author, blogdate, createdatetime, modifieddatetime, isvisible, isactive) VALUES(:title, :subtitle, :content, :typecd, :author, :blogdate, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, :isvisible, :isactive);";
					$statement = $this->dbconnection->prepare($sql);
					$statement->execute(
						array(
							':title' => $title,
							':subtitle' => $subtitle,
							':content' => $filename,
							':typecd' => $type,
							':author' => $author,
							':blogdate' => $datepicker,
							':isvisible' => $isvisible,
							':isactive' => $isactive,
						));
					$returnobject->message = "Blog Saved!";

				} else {

					$blogobject = $this->get($id);

					$filename2 = $blogobject->data[0]["content"] . '.old' . time();
					rename($blogobject->data[0]["content"], $filename2);

					$blogpost = "blog" . time() . ".txt";
					$filename = $blogobject->data[0]["content"];
					$filecontent = $content;

					try {

						if (file_put_contents($filename, $filecontent) !== false) {
							// echo "File created (" . basename($filename) . ")";
						} else {
							// echo "Cannot create file (" . basename($filename) . ")";
						}

					} catch (\Exception $e) {
						echo $e->getMessage();
						return;
					}

					$sql = "UPDATE ctc.blog_posts SET `text` = :content WHERE blogpostid=:id;";
					$statement = $this->dbconnection->prepare($sql);
					$statement->execute(
						array(
							':content' => $filename,
							':id' => $editcontrol,

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

	}

}
