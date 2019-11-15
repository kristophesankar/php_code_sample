<!DOCTYPE HTML>
<html>
<head>
  <?php
    header("Cache-Control: no-cache, must-revalidate");
    header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
  ?>
  <title>CoffeeTable Coven</title>
  <meta name="description" content="CoffeeTable Coven is a free non-profit online
    magazine, dedicated to bringing you diverse and inclusive content centering
    on all things witchcraft and paganism.">
  <meta name="keywords" content="witch, witches, magik, coven, magazine, witchy
    website, witchblr, witchesofinstagram, wicca, wiccan, traditional witchcraft,
    voodoo, voodou, hoodoo, santeria">
  <meta name="robots" content="noindex, follow">
  <!-- Top Scripts -->
  <?php include './includes/top-imports.php'; ?>
</head>
<body class="homepage">
  <div id="hideAll"></div>
  <!-- Header -->
  <?php include './includes/home-slider.php'; ?>
  <!-- Top Navigation -->
  <?php include './includes/navbar.php'; ?>
  <!-- Blog Posts -->
  <div id="main">
    <header id="main-header">
      <h2>Latest Posts</h2>
    </header>
    <div class="row inf-container" id="blog_content"  >
    </div>
    <div class="col-md-12" style="text-align: center; margin-top: 2em;">
      <button type="button"  id="loadMore" class="btn btn-primary view-more-button">
        Load More
      </button>
      <a data-scroll href="#nav" id="toTop" class="btn btn-outline-primary view-more-button">
        To Top
      </a>
    </div>
  </div>
  <!-- Magazines -->
  <div id="magazine-section">
    <div style="padding: 0em 1em 0em 1em;">
      <header id="main-header">
        <h2>Latest Magazine Issues</h2>
      </header>
      <div class="row">
        <div class="col-lg-12 magazines-slider books">
          <div class="magazine-container thumbnail text center" data-book-id="book16">
            <h5>Magazine #16</h5>
            <img class="magazine-preview img-fluid" src="./images/magazines/116.png" alt="">
          </div>
          <div class="magazine-container thumbnail text center" data-book-id="book15">
            <h5>Magazine #15</h5>
            <img class="magazine-preview img-fluid" src="./images/magazines/115.png" alt="">
          </div>
          <div class="magazine-container thumbnail text center" data-book-id="book14">
            <h5>Magazine #14</h5>
            <img class="magazine-preview img-fluid" src="./images/magazines/114.jpg" alt="">
          </div>
          <div class="magazine-container thumbnail text center" data-book-id="book13">
            <h5>Magazine #13</h5>
            <img class="magazine-preview img-fluid" src="./images/magazines/112.png" alt="">
          </div>
          <div class="magazine-container thumbnail text center" data-book-id="book12">
            <h5>Magazine #12</h5>
            <img class="magazine-preview img-fluid" src="./images/magazines/111.png" alt="">
          </div>
          <div class="magazine-container thumbnail text center" data-book-id="book11">
            <h5>Magazine #11</h5>
            <img class="magazine-preview img-fluid" src="./images/magazines/110.png" alt="">
          </div>
          <div class="magazine-container thumbnail text center" data-book-id="book10">
            <h5>Magazine #10</h5>
            <img class="magazine-preview img-fluid" src="./images/magazines/100.png" alt="">
          </div>
          <div class="magazine-container thumbnail text center" data-book-id="book9">
            <h5>Magazine #9</h5>
            <img class="magazine-preview img-fluid" src="./images/magazines/90.png" alt="">
          </div>
          <div class="magazine-container thumbnail text center" data-book-id="book8">
            <h5>Magazine #8</h5>
            <img class="magazine-preview img-fluid" src="./images/magazines/80.png" alt="">
          </div>
          <div class="magazine-container thumbnail text center" data-book-id="book7">
            <h5>Magazine #7</h5>
            <img class="magazine-preview img-fluid" src="./images/magazines/70.png" alt="">
          </div>
          <div class="magazine-container thumbnail text center" data-book-id="book6">
            <h5>Magazine #6</h5>
            <img class="magazine-preview img-fluid" src="./images/magazines/60.png" alt="">
          </div>
          <div class="magazine-container thumbnail text center" data-book-id="book5">
            <h5>Magazine #5</h5>
            <img class="magazine-preview img-fluid" src="./images/magazines/50.jpg" alt="">
          </div>
          <div class="magazine-container thumbnail text center" data-book-id="book4">
            <h5>Magazine #4</h5>
            <img class="magazine-preview img-fluid" src="./images/magazines/40.jpg" alt="">
          </div>
          <div class="magazine-container thumbnail text center" data-book-id="book3">
            <h5>Magazine #3</h5>
            <img class="magazine-preview img-fluid" src="./images/magazines/30.jpg" alt="">
          </div>
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
    var scroll = new SmoothScroll('a[href*="#"]');
  </script>
  <script src="./js/latest-script.js"></script>
</body>
</html>
