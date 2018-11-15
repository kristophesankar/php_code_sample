<!DOCTYPE HTML>
<html>

<head>
	<title>CoffeeTable Coven</title>

	<!-- Top Scripts -->
	<?php include './includes/top-imports.php'; ?>

</head>

<body class="homepage">

	<!-- Header -->
	<?php include './includes/home-slider.php'; ?>

	<!-- Top Navigation -->
	<?php include './includes/navbar.php'; ?>

	<!-- Blog Posts -->
	<div id="main">
		<header id="main-header">
			<h2>Latest Posts</h2>
		</header>

		<div class="row inf-container" id="blog_content"	>

		</div>
		<div class="col-md-12" style="text-align: center; margin-top: 2em;">
			<button type="button"  id="loadMore" class="btn btn-primary view-more-button">Load More</button>
			<a data-scroll href="#nav" id="toTop" class="btn btn-outline-primary view-more-button">To Top</a>
		</div>
	</div>

	<!-- Magazines -->
	<div id="magazine-section">
		<div style="padding: 0em 1em 0em 1em;">
			<header id="main-header">
				<h2>Latest Magazine Issues</h2>
			</header>
			<div class="row">
				<!-- <div class="head-description" style="text-align: center !important;">
					<p class="col-lg-12 hidden-lg-down text-center" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus venenatis, sapien nec ornare interdum, quam ante posuere eros, sed fringilla est risus vel diam. Duis nec libero enim.</p>
				</div> -->
				<div class="col-lg-12 magazines-slider books">
<div class="magazine-container thumbnail text center" data-book-id="book2">
							<h5>Magazine #2</h5>
						<img class="magazine-preview img-fluid" src="./images/magazines/20.jpg" alt="">
					</div>
				<div class="magazine-container thumbnail" data-book-id="book1">
<h5>Magazine #1</h5>
						<img data-book-id="book1" class="magazine-preview img-fluid" src="./proto/images/magazines/10.jpg" alt="">
				</div>
				</div>
				
				<div class="col-md-12" style="text-align: center; margin-top: 1em;">
					<a href="./magazines.php#nav" class="btn btn-primary">View More</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<?php include './includes/footer.php';?>

	<!-- Import Scripts -->
	<script src="js/home.js"></script>
	<script src="js/services/blog.js"></script>
	<script src="./node_modules/slick-carousel/slick/slick.js"></script>

	<!-- Flipbook imports -->
  <script src="./js/flipbook/html2canvas.min.js"></script>
  <script src="./js/flipbook/three.min.js"></script>
  <script src="./js/flipbook/pdf.min.js"></script>
  <script src="./js/flipbook/3dflipbook.min.js"></script>
  <script src="./js/flipbook/lightbox.js"></script>


	<!-- Page Level JS -->
	<script type="text/javascript">
		var home = new Home();
		var blogs = new Blog();
		blogs.getAll();
		window.onscroll = function() {
			home.stickyNavbar();
		};
		// $(window).bind("load", function () {
		//     	blogs.getLatestBlog();
		// });

		var scroll = new SmoothScroll('a[href*="#"]');
	</script>
	<script src="./js/latest-script.js"></script>

</body>

</html>
