(function ($) {
    "use strict";
    var explore_property_slide = function ($scope, $) {
        //Sponsors Carousel
        if ($('.property-slide').length) {
          var column = $('.property-slide').data('column');
          $('.property-slide').not('.slick-initialized').slick({
            slidesToShow:column,
            arrows: false,
            dots: true,
            autoplay:true,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  arrows: false,
                  slidesToShow:2
                }
              },
              {
                breakpoint: 600,
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
        elementorFrontend.hooks.addAction('frontend/element_ready/explore_property.default', explore_property_slide);
    });
})(window.jQuery);