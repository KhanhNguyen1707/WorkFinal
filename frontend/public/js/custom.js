(function (window, $) {
  "use strict";

  /* ..............................................
       Loader
       ................................................. */
  $(window).on("load", function () {
    $(".preloader").fadeOut();
    $("#preloader").delay(550).fadeOut("slow");
    $("body").delay(450).css({
      overflow: "visible",
    });

    // Initialize the slider here to ensure it runs after images are fully loaded
    $("#slides-shop").superslides({
      inherit_width_from: ".cover-slides",
      inherit_height_from: ".cover-slides",
      play: 5000,
      animation: "fade",
    });

    // Add overlay background for each slide
    $(".cover-slides ul li").append("<div class='overlay-background'></div>");
  });

  /* ..............................................
       Fixed Menu
       ................................................. */
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 50) {
      $(".main-header").addClass("fixed-menu");
    } else {
      $(".main-header").removeClass("fixed-menu");
    }
  });

  /* ..............................................
       Gallery
       ................................................. */
  $(document).ready(function () {
    $(".cover-slides ul li").append("<div class='overlay-background'></div>");
  });

  /* ..............................................
       Map Full
       ................................................. */
  $(document).ready(function () {
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 100) {
        $("#back-to-top").fadeIn();
      } else {
        $("#back-to-top").fadeOut();
      }
    });

    $("#back-to-top").click(function () {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        600
      );
      return false;
    });
  });

  /* ..............................................
       Special Menu
       ................................................. */
  $(document).ready(function () {
    const Container = $(".container");
    Container.imagesLoaded(function () {
      const portfolio = $(".special-menu");
      portfolio.on("click", "button", function () {
        $(this).addClass("active").siblings().removeClass("active");
        const filterValue = $(this).attr("data-filter");
        $grid.isotope({
          filter: filterValue,
        });
      });

      const $grid = $(".special-list").isotope({
        itemSelector: ".special-grid",
      });
    });
  });

  /* ..............................................
       BaguetteBox
       ................................................. */
  $(document).ready(function () {
    baguetteBox.run(".tz-gallery", {
      animation: "fadeIn",
      noScrollbars: true,
    });
  });

  /* ..............................................
       Offer Box
       ................................................. */
  $(document).ready(function () {
    $(".offer-box").inewsticker({
      speed: 3000,
      effect: "fade",
      dir: "ltr",
      font_size: 13,
      color: "#ffffff",
      font_family: "Montserrat, sans-serif",
      delay_after: 1000,
    });
  });

  /* ..............................................
       Tooltip
       ................................................. */
  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  /* ..............................................
       Owl Carousel Instagram Feed
       ................................................. */
  $(document).ready(function () {
    $(".main-instagram").owlCarousel({
      loop: true,
      margin: 0,
      dots: false,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      navText: [
        "<i class='fas fa-arrow-left'></i>",
        "<i class='fas fa-arrow-right'></i>",
      ],
      responsive: {
        0: {
          items: 2,
          nav: true,
        },
        600: {
          items: 4,
          nav: true,
        },
        1000: {
          items: 8,
          nav: true,
          loop: true,
        },
      },
    });
  });

  /* ..............................................
       Featured Products
       ................................................. */
  $(document).ready(function () {
    $(".featured-products-box").owlCarousel({
      loop: true,
      margin: 0,
      dots: false,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      navText: [
        "<i class='fas fa-arrow-left'></i>",
        "<i class='fas fa-arrow-right'></i>",
      ],
      responsive: {
        0: {
          items: 1,
          nav: true,
        },
        600: {
          items: 3,
          nav: true,
        },
        1000: {
          items: 4,
          nav: true,
          loop: true,
        },
      },
    });
  });

  /* ..............................................
       Slider Range
       ................................................. */
  // $(document).ready(function() {
  // 	$("#slider-range").slider({
  // 		range: true,
  // 		min: 0,
  // 		max: 4000,
  // 		values: [1000, 3000],
  // 		slide: function(event, ui) {
  // 			$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
  // 		}
  // 	});
  // 	$("#amount").val("$" + $("#slider-range").slider("values", 0) +
  // 		" - $" + $("#slider-range").slider("values", 1));
  // });

  /* ..............................................
       NiceScroll
       ................................................. */
  // $(document).ready(function() {
  // 	$(".brand-box").niceScroll({
  // 		cursorcolor: "#9b9b9c",
  // 	});
  // });
})(window, window.jQuery);
