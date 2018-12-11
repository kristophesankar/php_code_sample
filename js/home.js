var Home = function() {
    this.navbar = document.getElementById("navbarSupportedContent");
    this.main = document.getElementById("navbar");
    this.sticky = this.getScreenHeight();
    this.initSlick();
    this.initSlide();
};

Home.prototype.truncateText = function (text,maxLength) {
  var truncated = text;

  if (truncated.length > maxLength) {
      truncated = truncated.substr(0,maxLength) + '...';
  }
  return truncated;
};

Home.prototype.initSlide = function () {
  $(function () {

      $(".loadmore").slice(0, 4).show();
      $("#loadMore").on('click', function (e) {

          e.preventDefault();
          $(".loadmore:hidden").slice(0, 2).slideDown();
          if ($(".loadmore:hidden").length == 0) {
              $("#load").fadeOut('slow');
          };
      });
  });

  $('a[href=#top]').click(function () {
      $('body,html').animate({
          scrollTop: 0
      }, 600);
      return false;
  });

  $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
          $('.totop a').fadeIn();
      } else {
          $('.totop a').fadeOut();
      }
  });
};

Home.prototype.stickyNavbar = function() {
    if (window.pageYOffset >= this.sticky) {
        this.navbar.classList.add("sticky");
    } else {
        this.navbar.classList.remove("sticky");
    }
};

Home.prototype.getScreenHeight = function() {
    var windowheight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var headPad = Math.floor(windowheight * 91 / 100);
    return headPad;
}

Home.prototype.initSlick = function() {

    $(document).ready(function() {

        $('.slickitems').slick({
            autoplay: true,
            autoplaySpeed: 5000,
            dots: false,
            infinite: true,
            speed: 1000,
            fade: true,
        });

        $('.magazines-slider').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 4,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 486,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

    });

};


