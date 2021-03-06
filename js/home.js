/**
 * Initialised on all user facing pages
 * General Front end code goes here
 */

var Home = function () {
  this.navbar = document.getElementById('navbarSupportedContent')
  this.main = document.getElementById('navbar')
  this.sticky = this.getScreenHeight()
  this.initSlick()
  this.initFlipbook()
  this.initSlide()

  setTimeout(function () {
    $('#hideAll').addClass('hideAll-transition')
  }, 100)

  setTimeout(function () {
    document.getElementById('hideAll').style.display = 'none'
  }, 1000)

  $(document).ready(function () {
    // Handler for .ready() called.
    setTimeout(function () {
      $('html, body').animate(
        {
          scrollTop: $('#nav').offset().top
        },
        'fast'
      )
    }, 1000)
  })
}

Home.prototype.truncateText = function (text, maxLength) {
  var truncated = text

  if (truncated.length > maxLength) {
    truncated = truncated.substr(0, maxLength) + '...'
  }
  return truncated
}

Home.prototype.initSlide = function () {
  $(function () {
    $('.loadmore')
      .slice(0, 4)
      .show()
    $('#loadMore').on('click', function (e) {
      e.preventDefault()
      $('.loadmore:hidden')
        .slice(0, 2)
        .slideDown()
      if ($('.loadmore:hidden').length == 0) {
        $('#load').fadeOut('slow')
      }
    })
  })

  $('a[href=#top]').click(function () {
    $('body,html').animate(
      {
        scrollTop: 0
      },
      600
    )
    return false
  })

  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('.totop a').fadeIn()
    } else {
      $('.totop a').fadeOut()
    }
  })
}

Home.prototype.stickyNavbar = function () {
  if (window.pageYOffset >= this.sticky) {
    this.navbar.classList.add('sticky')
  } else {
    this.navbar.classList.remove('sticky')
  }
}

Home.prototype.getScreenHeight = function () {
  var windowheight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )
  var headPad = Math.floor((windowheight * 91) / 100)
  return headPad
}

Home.prototype.initSlick = function () {
  $(document).ready(function () {
    $('.slickitems').slick({
      autoplay: true,
      autoplaySpeed: 5000,
      dots: false,
      infinite: true,
      speed: 1000,
      fade: true
    })

    $('.magazines-slider').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      responsive: [
        {
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
    })
  })
}

Home.prototype.initFlipbook = function () {
  var MAGAZINE_DIRECTORY = './magazines/'

  var books = {
    book1: 'august_2018_magazine.pdf',
    book2: 'September_2018_Magazine_Final.pdf',
    book3: 'O_2018_M.pdf',
    book4: 'november_2018_magazine.pdf',
    book5: 'december_2018_final.pdf',
    book6: 'January-2019-Magazine-Final.pdf',
    book7: 'February_2019_Magazine.pdf',
    book8: 'march_2019_Magazine.pdf',
    book9: 'april_2019_magazine.pdf',
    book10: 'May_2019_Magazine_final.pdf',
    book11: 'june_2019_magazine.pdf',
    book12: 'july_2019_magazine_final.pdf',
    book13: 'august_2019_magazine.pdf',
    book14: 'september_2019_magazine_final.pdf',
    book15: 'October_2019_Magazine.pdf',
    book16: 'November_2019_Magazine_final.pdf'
  }

  window.jQuery(function () {
    var $ = window.jQuery

    var styleClb = function () {
      $('.fb3d-modal')
        .removeClass('light')
        .addClass('dark')
    }

    var booksOptions = {}

    Object.keys(books).forEach(function (key) {
      booksOptions[key] = {
        pdf: MAGAZINE_DIRECTORY + books[key],
        propertiesCallback: function (props) {
          props.page.depth /= 3
          return props
        },
        template: {
          html: './templates/default-book-view.html',
          styles: ['./css/black-book-view.css'],
          links: [
            {
              rel: 'stylesheet',
              href: './css/font-awesome.min.css'
            }
          ],
          script: './js/default-book-view.js',
          sounds: {
            startFlip: './sounds/start-flip.mp3',
            endFlip: './sounds/end-flip.mp3'
          }
        },
        styleClb: styleClb
      }
    })

    var instance = {
      scene: undefined,
      options: undefined,
      node: $('.fb3d-modal .mount-container')
    }

    var modal = $('.fb3d-modal')
    modal.on('fb3d.modal.hide', function () {
      instance.scene.dispose()
    })

    modal.on('fb3d.modal.show', function () {
      instance.scene = instance.node.FlipBook(instance.options)
      instance.options.styleClb()
    })

    $('.books')
      .find('.thumbnail')
      .click(function (e) {
        var target = $(e.target)
        while (target[0] && !target.attr('data-book-id')) {
          target = $(target[0].parentNode)
        }
        if (target[0]) {
          instance.options = booksOptions[target.attr('data-book-id')]
          $('.fb3d-modal').fb3dModal('show')
        }
      })

    $('.books')
      .find('.btn')
      .click(function (e) {
        var target = $(e.target)
        while (target[0] && !target.attr('data-book-id')) {
          target = $(target[0].parentNode)
        }

        if (target[0]) {
          instance.options = booksOptions[target.attr('data-book-id')]
          $('.fb3d-modal').fb3dModal('show')
        }
      })
  })
}
