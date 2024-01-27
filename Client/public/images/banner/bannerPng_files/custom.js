(function ($) {
    ("use strict");
  
    $("#resistration_to_login").on("click", function (e) {
      $("#signup").modal("hide");
    });
  
    $("#forgot_pass").on("click", function (e) {
      $("#login").modal("hide");
      $("#reset").modal("show");
    });
  
    $("#login_to_resistration").on("click", function (e) {
      $("#login").modal("hide");
      $("#signup").modal("show");
    });
  
    // Perform AJAX forget password on form submit
    $("form#forgot_password").on("submit", function (e) {
      e.preventDefault();
      $("p.status", this).show().text("Sending...");
      var ctrl = $(this);
	    var user_login = $('[name="user_login"]').val();
		
      $.ajax({
        type: "POST",
        dataType: "json",
        url: ajax_obj.ajax_url,
        data: {
          action: "ajaxforgotpassword",
          user_login: user_login,
          security: $("#forgotsecurity").val(),
        },
        success: function (data) {
          $("p.status").text(data.message);
        },
      });
      //e.preventDefault();
      return false;
    });



    $("a#make-featured").on("click", function (e) {
      var id = $(this).data("listing-id");
      $.ajax({
        type: "POST",
        url: ajax_obj.ajax_url,
        data: {
          action: "resido-make-featured",
          listing_id: id,                                                                       
        },
        success: function (res) {
          //window.location = window.location.href;
          if (res) {
            alert(res);
            window.location = window.location.href;
          } else {
            alert("Something wrong goes here");
          }
        },
      });
    });
    

    var slider = document.getElementById("search_distance");
    if (slider !== null) {
      var output = document.getElementById("distance");
      output.innerHTML = slider.value; // Display the default slider value
      // Update the current slider value (each time you drag the slider handle)
      slider.oninput = function () {
        output.innerHTML = this.value;
      };
    }
  
    $(".delete-message").on("click", function () {
      var id = $(this).data("message-id");
      $.ajax({
        type: "POST",
        url: ajax_obj.ajax_url,
        data: {
          action: "resido-delete-message",
          message_id: id,
        },
        success: function (res) {
          if (res) {
            window.location = window.location.href;
          } else {
            alert("Something wrong goes here");
          }
        },
      });
    });

    $('#list_loc').select2();
     //  $('#listing_cate').select2();
    $('#add_listings_property').select2();
    $('#add_listing_location').select2();
    $('#add_listing_status').select2();
    $('#listing_agency').select2();
    $('#listing_agent').select2();
 

})(jQuery);
  
(function ($) {
    $(document).ready(function () {
      var file_frame; // variable for the wp.media file_frame
  
      // attach a click event (or whatever you want) to some element on your page
      $("#frontend-button").on("click", function (event) {
        event.preventDefault();
  
        // if the file_frame has already been created, just reuse it
        if (file_frame) {
          file_frame.open();
          return;
        }
  
        file_frame = wp.media.frames.file_frame = wp.media({
          title: $(this).data("uploader_title"),
          button: {
            text: $(this).data("uploader_button_text"),
          },
          multiple: false, // set this to true for multiple file selection
        });
  
        file_frame.on("select", function () {
          attachment = file_frame.state().get("selection").first().toJSON();
          // do something with the file here
          //$("#frontend-button").hide();
          $("#frontend-image").attr("src", attachment.url);
          $("#frontend_rlfeaturedimg").val(attachment.id);
        });

        file_frame.open();
      });
    });
})(jQuery);
  
  
// Calculation Widget Portion
(function ($) {
  
    $('#dash_nav_eng').on('click', function() {
      document.getElementById("filter_search").style.display = "block";
    });
    
    $('#dash_nav_dis').on('click', function() {
      document.getElementById("filter_search").style.display = "none";
    });
  
    $(".login-attri").on("click", function(e) {
      $(".login-attri .dropdown-menu").addClass("show");
      e.stopPropagation()
    });

    $(document).on("click", function(e) {
      if ($(e.target).is(".login-attri .dropdown-menu") === false) {
        $(".login-attri .dropdown-menu").removeClass("show");
      }
    });
  
})(jQuery);
  
  
  
(function ($) {
  
  $('#calc_price').on('change', function() {
    if( !$("#calc_price").val() ) {
      $( ".btn_calculator" ).fadeOut( 500 );
    }else{
        $( ".btn_calculator" ).fadeIn( 500 );
    }
  });
  
  if ($('.calculator_area').length) {
        $('.btn_calculator').on('click', function(e) {
            e.preventDefault();
            var fields = $(this).closest('#calculate_form')
            var data = [];
            var flag = 1;
            fields = fields.serializeArray();
            $.each(fields, function(i, field) {
                if (field.value == '') {
                    $('input[name="' + field.name + '"]').focus();
                    flag = 0;
                    return false;
                }
                data[field.name] = field.value;
            });
            if (flag == 1) {
                $(".monthly_result").empty();
                $(".tot__down_result").empty();
                $(".tot_result").empty();
                $(".interest_result").empty();
                console.log(fields);
  
                var property_price = parseFloat(data["calc_price"]);
                var down_payment = parseFloat(data["down_payment"]);
                var interest_rate = parseFloat(data["interest_rate"]);
                if (isNaN(interest_rate) || interest_rate == "") {
                    interest_rate = 0;
                }
  
                console.log(interest_rate);
                interest_rate = interest_rate / 1200;
                var period = parseFloat(data["period"]);
                var currency = $( "#compare_get_currency" ).val();
                var monthly = 0;
                var interest = 0;
                var total = 0;
                var total_d = 0;
  
                if (interest_rate == 0) {
                    monthly = (property_price - down_payment) / period;
                    total = down_payment + (monthly * period);
                    total = down_payment + (monthly * period);
                    total = total.toFixed(2);
                    total_d = (monthly * period);
                    total_d = total_d.toFixed(2);
                } else {
                    monthly = (property_price - down_payment) * interest_rate * Math.pow(1 + interest_rate, period);
                    monthly = monthly / ((Math.pow(1 + interest_rate, period)) - 1);
                    monthly = monthly.toFixed(2);
                    total = down_payment + (monthly * period);
                    total = total.toFixed(2);
                    total_d = (monthly * period);
                    total_d = total_d.toFixed(2);
                    interest = total - property_price;
                    interest = interest.toFixed(2);
                }
  
                $(".monthly_result").append(currency + monthly);
                $(".tot__down_result").append(currency + total_d);
                $(".tot_result").append(currency + total);
                $(".interest_result").append(currency + interest);
                $('.calculator_box,.calculator_area').addClass('open');
  
                return false;
            }
        });
        $('.calculator_area').on('click', function() {
            $('.calculator_box,.calculator_area').removeClass('open')
        })
    }

})(jQuery);
  

  document.addEventListener('DOMContentLoaded', function() {
    (function ($) {
      const image = document.querySelector('#frontend-image');
      if (image) {
        image.onerror = function() {
          image.style.display = 'none';
        };
        image.onload = function() {
          image.style.display = 'inline-block';
        };
      }
    })(jQuery);
  });
  
