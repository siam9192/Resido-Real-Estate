
	
jQuery(document).ready(function ($) {

	// Hide unneeded elements. These are things that are required in case JS breaks or isn't present
	$('.cl-no-js').hide();
	$('a.cl-add-to-cart').addClass('cl-has-js');

	// Send Remove from Cart requests
	$(document.body).on('click.clRemoveFromCart', '.cl-remove-from-cart', function (event) {
		var $this  = $(this),
		item   = $this.data('cart-item'),
		action = $this.data('action'),
		id     = $this.data('listing-id'),
		nonce  = $this.data('nonce'),
		data   = {
			action: action,
			cart_item: item,
			nonce: nonce
		};
		$.ajax({
			type: "POST",
			data: data,
			dataType: "json",
			url: cl_scripts.ajaxurl,
			xhrFields: {
				withCredentials: true
			},
			success: function (response) {
				if (response.removed) {
					if ( ( parseInt( cl_scripts.position_in_cart, 10 ) === parseInt( item, 10 ) ) || cl_scripts.has_purchase_links ) {
						window.location = window.location;
						return false;
					}
					// Remove the selected cart item
					$('.cl-cart').each( function() {
						$(this).find("[data-cart-item='" + item + "']").parent().remove();
					});

					$('.cl-cart').each( function() {
						var cart_item_counter = 0;
						$(this).find("[data-cart-item]").each( function() {
							$(this).attr('data-cart-item', cart_item_counter);
							cart_item_counter = cart_item_counter + 1;
						});
					});
					// Check to see if the purchase form(s) for this listing is present on this page
					if( $( '[id^=cl_purchase_' + id + ']' ).length ) {
						$( '[id^=cl_purchase_' + id + '] .cl_go_to_checkout' ).hide();
						$( '[id^=cl_purchase_' + id + '] a.cl-add-to-cart' ).show().removeAttr('data-cl-loading');
						if ( cl_scripts.quantities_enabled == '1' ) {
							$( '[id^=cl_purchase_' + id + '] .cl_listing_quantity_wrapper' ).show();
						}
					}
					$('span.cl-cart-quantity').text( response.cart_quantity );
					$(document.body).trigger('cl_quantity_updated', [ response.cart_quantity ]);
					if ( cl_scripts.taxes_enabled ) {
						$('.cart_item.cl_subtotal span').html( response.subtotal );
						$('.cart_item.cl_cart_tax span').html( response.tax );
					}
					$('.cart_item.cl_total span').html( response.total );
					if( response.cart_quantity == 0 ) {
						$('.cart_item.cl_subtotal,.cl-cart-number-of-items,.cart_item.cl_checkout,.cart_item.cl_cart_tax,.cart_item.cl_total,.cart_item.cl_cart_discount_row').hide();
						$('#cl_checkout_form_wrap').replaceWith('');
						$('.cl-cart').each( function() {
							var cart_wrapper = $(this).parent();
							if ( cart_wrapper.length ) {
								cart_wrapper.addClass('cart-empty')
								cart_wrapper.removeClass('cart-not-empty');
							}
							$(this).append('<li class="cart_item empty">' + cl_scripts.empty_cart_message + '</li>');
						});
					}
					$(document.body).trigger('cl_cart_item_removed', [ response ]);
				}
			}
		}).fail(function (response) {
			if ( window.console && window.console.log ) {
				console.log( response );
			}
		}).done(function (response) {

	});
	return false;
	});

	// Send Add to Cart request
	$(document.body).on('click.clAddToCart', '.cl-add-to-cart', function (e) {
		e.preventDefault();
		var $this = $(this), form = $this.closest('form');
		$this.prop('disabled', true);
		//var $spinner = $this.find('.cl-loading');
		var container = $this.closest('div');
		$this.attr('data-cl-loading', '');
		var form           = $this.parents('form').last();
		var listing       = $this.data('listing-id');
		var variable_price = $this.data('variable-price');
		var price_mode     = $this.data('price-mode');
		var nonce          = $this.data('nonce');
		var item_price_ids = [];
		var free_items     = true;
		if( variable_price == 'yes' ) {
			if ( form.find('.cl_price_option_' + listing + '[type="hidden"]').length > 0 ) {
				item_price_ids[0] = $('.cl_price_option_' + listing, form).val();
				if ( form.find('.cl-submit').data('price') && form.find('.cl-submit').data('price') > 0 ) {
					free_items = false;
				}
			} else {
				if( ! form.find('.cl_price_option_' + listing + ':checked', form).length ) {
					$this.removeAttr( 'data-cl-loading' );
					alert( cl_scripts.select_option );
					e.stopPropagation();
					$this.prop('disabled', false);
					return false;
				}
				form.find('.cl_price_option_' + listing + ':checked', form).each(function( index ) {
					item_price_ids[ index ] = $(this).val();
					if ( true === free_items ) {
						var item_price = $(this).data('price');
						if ( item_price && item_price > 0 ) {
							free_items = false;
						}
					}
				});
			}
		} else {
			item_price_ids[0] = listing;
			if ( $this.data('price') && $this.data('price') > 0 ) {
				free_items = false;
			}
		}
		if ( free_items ) {
			form.find('.cl_action_input').val('add_to_cart');
		}
		if( 'straight_to_gateway' == form.find('.cl_action_input').val() ) {
			form.submit();
			return true;
		}
		var action = $this.data('action');
		var data   = {
			action: action,
			listing_id: listing,
			price_ids : item_price_ids,
			post_data: $(form).serialize(),
			nonce: nonce,
			timestamp: $this.data( 'timestamp' ),
			token: $this.data( 'token' )
		};
		$.ajax({
			type: "POST",
			data: data,
			dataType: "json",
			url: cl_scripts.ajaxurl,
			xhrFields: {
				withCredentials: true
			},
			success: function (response) {
				if(response.cart_quantity!=0){
					var store_redirect = cl_scripts.redirect_to_checkout == '1';
					var item_redirect  = form.find( '.cl_redirect_to_checkout' ).val() == '1';
					if( ( store_redirect && item_redirect ) || ( ! store_redirect && item_redirect ) ) {
						console.log(item_redirect);
						window.location = cl_scripts.checkout_page;
					} else {
						if ( cl_scripts.taxes_enabled === '1' ) {
							$('.cart_item.cl_subtotal').show();
							$('.cart_item.cl_cart_tax').show();
						}
						$('.cart_item.cl_total').show();
						$('.cart_item.cl_checkout').show();
						if ($('.cart_item.empty').length) {
							$('.cart_item.empty').hide();
						}
						$('.widget_cl_cart_widget .cl-cart').each( function( cart ) {
							var target = $(this).find('.cl-cart-meta:first');
							$(response.cart_item).insertBefore(target);
							var cart_wrapper = $(this).parent();
							if ( cart_wrapper.length ) {
								cart_wrapper.addClass('cart-not-empty')
								cart_wrapper.removeClass('cart-empty');
							}
						});
						if ( cl_scripts.taxes_enabled === '1' ) {
							$('.cl-cart-meta.cl_subtotal span').html( response.subtotal );
							$('.cl-cart-meta.cl_cart_tax span').html( response.tax );
						}
						$('.cl-cart-meta.cl_total span').html( response.total );
						//var items_added = $( '.cl-cart-item-title', response.cart_item ).length;
						$('span.cl-cart-quantity').each(function() {
							$(this).text(response.cart_quantity);
							$(document.body).trigger('cl_quantity_updated', [ response.cart_quantity ]);
						});
						if ( $('.cl-cart-number-of-items').css('display') == 'none') {
							$('.cl-cart-number-of-items').show('slow');
						}
						if( variable_price == 'no' || price_mode != 'multi' ) {
							$('a.cl-add-to-cart', container).toggle();
							$('.cl_go_to_checkout', container).css('display', 'inline-block');
						}
						if ( price_mode == 'multi' ) {
							$this.removeAttr( 'data-cl-loading' );
						}
						if( $( '.cl_listing_purchase_form' ).length && ( variable_price == 'no' || ! form.find('.cl_price_option_' + listing).is('input:hidden') ) ) {
							var parent_form = $('.cl_listing_purchase_form *[data-listing-id="' + listing + '"]').parents('form');
							$( 'a.cl-add-to-cart', parent_form ).hide();
							if( price_mode != 'multi' ) {
								parent_form.find('.cl_listing_quantity_wrapper').slideUp();
							}
							$( '.cl_go_to_checkout', parent_form ).show().removeAttr( 'data-cl-loading' );
						}
						var target = $('.cl-cart-meta:first');
						$(response.cart_item).insertBefore(target);
						if( response != 'incart' ) {
							$('.cl-cart-added-alert', container).fadeIn();
							setTimeout(function () {
								$('.cl-cart-added-alert', container).fadeOut();
							}, 3000);
						}
						$this.prop('disabled', false);
						$(document.body).trigger('cl_cart_item_added', [ response ]);
					}
				}else{

					$('.cl-cart-added-alert').after("<p class='something_wrong'>Something Wrong!</p>");
					$this.removeAttr( 'data-cl-loading' );
					$this.prop('disabled', false);
					setTimeout(function () {
						$('.something_wrong').replaceWith();
					}, 3000);

				}
				
			}
		}).fail(function (response) {
			if ( window.console && window.console.log ) {
				console.log( response );
			}
			$this.prop('disabled', false);
		}).done(function (response) {});
		return false;
	});

	// Show the login form on the checkout page
	$('#cl_checkout_form_wrap').on('click', '.cl_checkout_register_login', function () {
		var $this = $(this),
			data = {
				action: $this.data('action'),
				nonce: $this.data('nonce'),
			};
		$('.cl-cart-ajax').show();
		$.post(cl_scripts.ajaxurl, data, function (checkout_response) {
			$('#cl_checkout_login_register').html(cl_scripts.loading);
			$('#cl_checkout_login_register').html(checkout_response);
			$('.cl-cart-ajax').hide();
		});
		return false;
	});

	// Process the login form via ajax
	$(document).on('click', '#cl_purchase_form #cl_login_fields input[type=submit]', function(e) {
		e.preventDefault();
		var complete_purchase_val = $(this).val();
		$(this).val(cl_global_vars.purchase_loading);
		$(this).after('<span class="cl-loading-ajax cl-loading"></span>');
		var data = {
			action : 'cl_process_checkout_login',
			cl_ajax : 1,
			cl_user_login : $('#cl_login_fields #cl_user_login').val(),
			cl_user_pass : $('#cl_login_fields #cl_user_pass').val(),
			cl_login_nonce : $('#cl_login_nonce').val(),
		};
		$.post(cl_global_vars.ajaxurl, data, function(data) {
			if ( $.trim(data) == 'success' ) {
				$('.cl_errors').remove();
				window.location = cl_scripts.checkout_page;
			} else {
				$('#cl_login_fields input[type=submit]').val(complete_purchase_val);
				$('.cl-loading-ajax').remove();
				$('.cl_errors').remove();
				$('#cl-user-login-submit').before(data);
			}
		});
	});

	// Load the fields for the selected payment method
	$(document).on('change', 'select#cl-gateway, input.cl-gateway', function (e) {
		var payment_mode = $('#cl-gateway option:selected, input.cl-gateway:checked').val();
		if( payment_mode == '0' ) {
			return false;
		}
		cl_load_gateway( payment_mode );
		return false;
	});

	// Process checkout
	$(document).on('click', '#cl_purchase_form #cl_purchase_submit input[type=submit]', function(e) {

		var clPurchaseform = document.getElementById('cl_purchase_form');
		var gateway=$('input[name="payment-mode"]:checked').val(); 
		if( typeof clPurchaseform.checkValidity === "function" && false === clPurchaseform.checkValidity() ) {
			return;
		}
		e.preventDefault();
		var complete_purchase_val = $(this).val();
		$(this).attr('data-original-value', complete_purchase_val);
		$(this).val(cl_global_vars.purchase_loading);
		$(this).prop( 'disabled', true );
		$(this).after('<span class="cl-loading-ajax cl-loading"></span>');
		$.post(ajax_obj.ajax_url, $('#cl_purchase_form').serialize() + '&action=cl_process_checkout&cl_ajax=true', function(data) {
			if ( $.trim(data) == 'success' ) {
				$('.cl_errors').remove();
				$('.cl-error').hide();
				if(gateway!="stripe"){
					$(clPurchaseform).submit();
				}
			} else {
				$('#cl-purchase-button').val(complete_purchase_val);
				$('.cl-loading-ajax').remove();
				$('.cl_errors').remove();
				$('.cl-error').hide();
				$( cl_global_vars.checkout_error_anchor ).before(data);
				$('#cl-purchase-button').prop( 'disabled', false );
				$(document.body).trigger( 'cl_checkout_error', [ data ] );
			}
		});

	});

	// Update state field
	$(document.body).on('change', '#cl_cc_address input.card_state, #cl_cc_address select, #cl_address_country', update_state_field);

	function update_state_field() {
		var $this = $(this);
		var $form;
		var is_checkout = typeof cl_global_vars !== 'undefined';
		var field_name  = 'card_state';
		if ( $(this).attr('id') == 'cl_address_country' ) {
			field_name = 'cl_address_state';
		}
		var state_inputs = document.getElementById(field_name );
		// If the country is being changed, and there is a state field being shown...
		if( 'card_state' != $this.attr('id') && null != state_inputs ) {
			var nonce = $(this).data('nonce');
			// If the country field has changed, we need to update the state/province field
			var postData = {
				action: 'cl_get_shop_states',
				country: $this.val(),
				field_name: field_name,
				nonce: nonce,
			};
			$.ajax({
				type: "POST",
				data: postData,
				url: cl_scripts.ajaxurl,
				xhrFields: {
					withCredentials: true
				},
				success: function (response) {
					if ( is_checkout ) {
						$form = $("#cl_purchase_form");
					} else {
						$form = $this.closest("form");
					}
					var state_inputs = 'input[name="card_state"], select[name="card_state"], input[name="cl_address_state"], select[name="cl_address_state"]';
					if( 'nostates' == $.trim(response) ) {
						var text_field = '<input type="text" id=' + field_name + ' name="card_state" class="card-state cl-input required" value=""/>';
						$form.find(state_inputs).replaceWith( text_field );
					} else {
						$form.find(state_inputs).replaceWith( response );
					}
					if ( is_checkout ) {
						$(document.body).trigger('cl_cart_billing_address_updated', [ response ]);
					}
				}
			}).fail(function (data) {
				if ( window.console && window.console.log ) {
					console.log( data );
				}
			}).done(function (data) {
				if ( is_checkout ) {
					recalculate_taxes();
				}
			});
		} else {
			if ( is_checkout ) {
				recalculate_taxes();
			}
		}

		return false;
	}

	// If is_checkout, recalculate sales tax on postalCode change.
	$(document.body).on('change', '#cl_cc_address input[name=card_zip]', function () {
		if (typeof cl_global_vars !== 'undefined') {
			recalculate_taxes();
		}
	});

	if( cl_scripts.is_checkout == '1' ) {
			var chosen_gateway = false;
			var ajax_needed    = false;
			if ( $('select#cl-gateway, input.cl-gateway').length ) {
				chosen_gateway = $("meta[name='cl-chosen-gateway']").attr('content');
				ajax_needed    = true;
			}
			if( ! chosen_gateway ) {
				chosen_gateway = cl_scripts.default_gateway;
			}
			if ( ajax_needed ) {
				// If we need to ajax in a gateway form, send the requests for the POST.
				setTimeout( function() {
					cl_load_gateway( chosen_gateway );
				}, 200);
			} else {
				// The form is already on page, just trigger that the gateway is loaded so further action can be taken.
				$('body').trigger('cl_gateway_loaded', [ chosen_gateway ]);
			}
		}
});



// Load a payment gateway
function cl_load_gateway( payment_mode ) {
	// Show the ajax loader
	jQuery('.cl-cart-ajax').show();
	jQuery('#cl_purchase_form_wrap').html('<span class="cl-loading-ajax cl-loading"></span>');
	var nonce = document.getElementById( 'cl-gateway-' + payment_mode ).getAttribute( 'data-' + payment_mode + '-nonce' );
	var url   = cl_scripts.ajaxurl;
	if ( url.indexOf( '?' ) > 0 ) {
		url = url + '&';
	} else {
		url = url + '?';
	}
	url = url + 'payment-mode=' + payment_mode;
	jQuery.post(url, { action: 'cl_load_gateway', cl_payment_mode: payment_mode, nonce: nonce },
		function(response){
			jQuery('#cl_purchase_form_wrap').html(response);
			jQuery('.cl-no-js').hide();
			jQuery('body').trigger('cl_gateway_loaded', [ payment_mode ]);
		}
	);
}