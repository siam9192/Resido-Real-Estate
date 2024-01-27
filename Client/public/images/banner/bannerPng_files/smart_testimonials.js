(function ($) {
    "use strict";
    var smart_textimonials = function ($scope, $) {
        //Sponsors Carousel
        if ($('#smart-textimonials').length) {
          var column = $('#smart-textimonials').data('column');

          $('#smart-textimonials').not('.slick-initialized').slick({
              slidesToShow:column,
              infinite: true,
              arrows: false,
              autoplay:true,
              responsive: [
                {
                  breakpoint: 1199,
                  settings: {
                    arrows: false,
                    slidesToShow:2
                  }
                },
                {
                  breakpoint: 767,
                  settings: {
                    arrows: false,
                    slidesToShow:1
                  }
                }
              ]
          });
        }

    }
    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/smart_testimonials.default', smart_textimonials);
    });
})(window.jQuery);