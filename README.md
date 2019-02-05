# Arjuna Sankar PHP Code Sample
Sample PHP Code.

## Data Flow
The website uses a custom MVC structure.

- **View**: `HTML` files. These send `AJAX` requests to controllers in the `services` directory via JS helpers.

- **Helpers**: `Javascript` files that contain many helper functions. Handles Requests/Responses and data formatting for the view.

- **Controllers**: These receive requests and calls functions from the Model in the `library.php` file. A response object is then returned to the view. 

- **Models**: Contains connection to database and `CRUD` functions.

## Data Flow Example
To walk through the flow of data follow the example.

- **index.html**

```javascript
    var home = new Home();
		var blogs = new Blog();
		blogs.getAll();
```

- **/js/services/blog.js**

```javascript
    Blog.prototype.getAll = function() {

    var requestid = 1;
    var formdata = {
        "requestid": requestid
    };

    $.ajax({
        type: "POST",
        url: './services/controllers/blogcontroller.php',
        data: formdata,
        ...
```

- **/services/controllers/blogcontroller.php**

```php
      switch ($requestid) {
       
        case $GETALL:
        $repo = new repository\BlogRepository();
        $response = $repo->getAll();
        echo json_encode($response);
        break;
```

- **/services/models/library.php**

```php
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
```
