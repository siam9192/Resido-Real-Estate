let objmapsjava = "";
(function($) {
    "use strict";
    
    var dloc = "";
    var markerIcon = {
        anchor: new google.maps.Point(22, 16),
        url: resido_map_object.RESIDO_IMG_URL + "/marker.png",
    };
    var geomarkerIcon = {
        anchor: new google.maps.Point(22, 16),
        url: resido_map_object.RESIDO_IMG_URL + "/pin-point.png",
    };

    var location_auto_search        = resido_map_object.location_auto_search;
    var listing_zoom_level          = resido_map_object.listing_zoom_level;
    var listing_center_latitude     = resido_map_object.listing_center_latitude;
    var listing_center_longitude    = resido_map_object.listing_center_longitude;
    var listing_gps_loc_en          = resido_map_object.listing_gps_loc_en;

    // Geo Location Data
    if(listing_gps_loc_en == 1){
        var geo_latitude	= 23.743538;
        var geo_longitude	= 23.743538;
        var x = document.getElementById("geo_loc_div");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
        
        function showPosition(position) {
            geo_latitude    = position.coords.latitude;
            geo_longitude   = position.coords.longitude;
        }
    }
    // Geo Location Data

    objmapsjava = function mainMap(dlocs) {
        function locationData(
            locationURL,
            locationImg,
            propertyprice,
            propertytype,
            propertyname,
            propertytime,
            bedrooms,
            bathrooms
        ) {
            return (
                '<div class="map-popup-wrap"><div class="map-popup"><div class="infoBox-close"><i class="fa fa-times"></i></div><div class="property-listing property-2"><div class="listing-img-wrapper"><div class="list-single-img"><a href="' +
                locationURL +
                '"><img src="' +
                locationImg +
                '" class="img-fluid mx-auto" alt="alt" /></a></div><span class="property-type">' +
                propertytype +
                '</span></div><div class="listing-detail-wrapper pb-0"><div class="listing-short-detail"><h4 class="listing-name"><a href="' +
                locationURL +
                '">' +
                propertyname +
                '</a><i class="list-status ti-check"></i></h4></div></div><div class="price-features-wrapper"><div class="listing-price-fx"><h6 class="listing-card-info-price">' +
                propertyprice +
                '</h6></div><div class="list-fx-features"></div></div></div></div></div>'
            );
        }
       
        var locations = [];
         
        if (dlocs !== "") {
            locations_obj = dlocs;
        }

        // Geo Location

        if (undefined !== locations_obj && locations_obj.length && listing_gps_loc_en == 1) {
            var x = locations_obj.length;
            locations[x] = [
                locationData(
                    'https://www.google.com/maps/place/'+ geo_latitude +','+ geo_longitude,
                    'https://maps.gstatic.com/tactile/pane/default_geocode-1x.png',
                    '',
                    '',
                    'View on Map'
                ),
                geo_latitude,
                geo_longitude,
                x,
                geomarkerIcon,
            ];
        }
        // Geo Location
        
        if (undefined !== locations_obj && locations_obj.length) {
            for (var i = locations_obj.length - 1; i >= 0; i--) {
                locations[i] = [
                    locationData(
                        locations_obj[i].url,
                        locations_obj[i].image,
                        locations_obj[i].price,
                        locations_obj[i].category,
                        locations_obj[i].title
                    ),
                    locations_obj[i].latitude,
                    locations_obj[i].longitude,
                    i,
                    markerIcon,
                ];
            }
        }

        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: parseInt(listing_zoom_level),
            scrollwheel: false,
            center: new google.maps.LatLng(listing_center_latitude, listing_center_longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            panControl: false,
            fullscreenControl: true,
            navigationControl: false,
            streetViewControl: false,
            animation: google.maps.Animation.BOUNCE,
            gestureHandling: "cooperative",
            styles: [{
                featureType: "administrative",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#444444",
                }, ],
            }, ],
        });

        var boxText = document.createElement("div");
        boxText.className = "map-box";
        var currentInfobox;
        var boxOptions = {
            content: boxText,
            disableAutoPan: true,
            alignBottom: true,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-145, -45),
            zIndex: null,
            boxStyle: {
                width: "260px",
            },
            closeBoxMargin: "0",
            closeBoxURL: "",
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false,
        };
        var markerCluster, marker, i;
        var allMarkers = [];
        var clusterStyles = [{
            textColor: "white",
            url: "",
            height: 50,
            width: 50,
        }, ];

        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                icon: locations[i][4],
                id: i,
            });
            allMarkers.push(marker);
            var ib = new InfoBox();

            google.maps.event.addListener(
                marker,
                "click",
                (function(marker, i) {
                    return function() {
                        ib.setOptions(boxOptions);
                        boxText.innerHTML = locations[i][0];
                        ib.close();
                        ib.open(map, marker);
                        currentInfobox = marker.id;
                        var latLng = new google.maps.LatLng(
                            locations[i][1],
                            locations[i][2]
                        );
                        map.panTo(latLng);
                        map.panBy(0, -180);
                        google.maps.event.addListener(ib, "domready", function() {
                            $(".infoBox-close").click(function(e) {
                                e.preventDefault();
                                ib.close();
                            });
                        });
                    };
                })(marker, i)
            );
        }
        var options = {
            imagePath: "img/",
            styles: clusterStyles,
            minClusterSize: 2,
        };
        markerCluster = new MarkerClusterer(map, allMarkers, options);
        google.maps.event.addDomListener(window, "resize", function() {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });

        $(".nextmap-nav").click(function(e) {
            e.preventDefault();
            map.setZoom(15);
            var index = currentInfobox;
            if (index + 1 < allMarkers.length) {
                google.maps.event.trigger(allMarkers[index + 1], "click");
            } else {
                google.maps.event.trigger(allMarkers[0], "click");
            }
        });
        $(".prevmap-nav").click(function(e) {
            e.preventDefault();
            map.setZoom(15);
            if (typeof currentInfobox == "undefined") {
                google.maps.event.trigger(allMarkers[allMarkers.length - 1], "click");
            } else {
                var index = currentInfobox;
                if (index - 1 < 0) {
                    google.maps.event.trigger(allMarkers[allMarkers.length - 1], "click");
                } else {
                    google.maps.event.trigger(allMarkers[index - 1], "click");
                }
            }
        });
        $(".map-item").click(function(e) {
            e.preventDefault();
            map.setZoom(15);
            var index = currentInfobox;
            var marker_index = parseInt($(this).attr("href").split("#")[1], 10);
            google.maps.event.trigger(allMarkers[marker_index], "click");
            if ($(this).hasClass("scroll-top-map")) {
                $("html, body").animate({
                        scrollTop: $(".map-container").offset().top + "-80px",
                    },
                    500
                );
            } else if ($(window).width() < 1064) {
                $("html, body").animate({
                        scrollTop: $(".map-container").offset().top + "-80px",
                    },
                    500
                );
            }
        });
        var zoomControlDiv = document.createElement("div");
        var zoomControl = new ZoomControl(zoomControlDiv, map);

        function ZoomControl(controlDiv, map) {
            zoomControlDiv.index = 1;
            map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(
                zoomControlDiv
            );
            controlDiv.style.padding = "5px";
            var controlWrapper = document.createElement("div");
            controlDiv.appendChild(controlWrapper);
            var zoomInButton = document.createElement("div");
            zoomInButton.className = "mapzoom-in";
            controlWrapper.appendChild(zoomInButton);
            var zoomOutButton = document.createElement("div");
            zoomOutButton.className = "mapzoom-out";
            controlWrapper.appendChild(zoomOutButton);
            google.maps.event.addDomListener(zoomInButton, "click", function() {
                map.setZoom(map.getZoom() + 1);
            });
            google.maps.event.addDomListener(zoomOutButton, "click", function() {
                map.setZoom(map.getZoom() - 1);
            });
        }
    }
    var map = document.getElementById("map");
    if (typeof map != "undefined" && map != null) {
        google.maps.event.addDomListener(window, "load", objmapsjava(dloc));
    }

    function singleMap() {
        var myLatLng = {
            lng: $("#singleMap").data("longitude"),
            lat: $("#singleMap").data("latitude"),
        };
        var single_map = new google.maps.Map(document.getElementById("singleMap"), {
            zoom: 5,
            center: myLatLng,
            scrollwheel: false,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            panControl: false,
            navigationControl: false,
            streetViewControl: false,
            styles: [{
                featureType: "landscape",
                elementType: "all",
                stylers: [{
                    color: "#f2f2f2",
                }, ],
            }, ],
        });
        var markerIcon2 = {
            url: resido_map_object.RESIDO_IMG_URL + "/marker.png",
        };

        var maptitle = $("#singleMap").data("maptitle");
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: single_map,
            icon: markerIcon2,
            title: maptitle,
        });
        var zoomControlDiv = document.createElement("div");
        var zoomControl = new ZoomControl(zoomControlDiv, single_map);

        function ZoomControl(controlDiv, single_map) {
            zoomControlDiv.index = 1;
            single_map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(
                zoomControlDiv
            );
            controlDiv.style.padding = "5px";
            var controlWrapper = document.createElement("div");
            controlDiv.appendChild(controlWrapper);
            var zoomInButton = document.createElement("div");
            zoomInButton.className = "mapzoom-in";
            controlWrapper.appendChild(zoomInButton);
            var zoomOutButton = document.createElement("div");
            zoomOutButton.className = "mapzoom-out";
            controlWrapper.appendChild(zoomOutButton);
            google.maps.event.addDomListener(zoomInButton, "click", function() {
                single_map.setZoom(single_map.getZoom() + 1);
            });
            google.maps.event.addDomListener(zoomOutButton, "click", function() {
                single_map.setZoom(single_map.getZoom() - 1);
            });
        }
    }
    var single_map = document.getElementById("singleMap");
    if (typeof single_map != "undefined" && single_map != null) {
        google.maps.event.addDomListener(window, "load", singleMap);
    }

    // use jQuery code inside this to avoid "$ is not defined" error
    $(".resido_loadmore_map").click(function() {
        console.log('gdfgf');
        var button = $(this),
            loc = typeof locations_obj !== "undefined" ? locations_obj : "",
            data = {
                action: "loadmore",
                layout: resido_loadmore_params.layout,
                query: resido_loadmore_params.posts, // that's how we get params from wp_localize_script() function
                page: resido_loadmore_params.current_page,
                locations_obj: loc,
                length: loc.length,
            };
        $.ajax({
            // you can also use $.post here
            url: resido_loadmore_params.ajaxurl, // AJAX handler
            data: data,
            type: "POST",
            beforeSend: function(xhr) {
                $("#archive_loop").addClass("loading-area");
            },
            success: function(data) {
                var obj = JSON.parse(data);
                if (obj.data) {
                    $("#archive_loop").append(obj.data);
                    $("#archive_loop").removeClass("loading-area");
                    button.text("Load More");
                    resido_map_object.current_page++;
                    if (
                        resido_loadmore_params.current_page ==
                        resido_loadmore_params.max_page
                    ) {
                        button.remove(); // if last page, remove the button
                    }
                    if (loc !== "" && typeof obj.loc != "undefined") {
                        dloc = obj.loc;
                        setTimeout(function() {
                            objmapsjava(dloc);
                        }, 100);
                    }
                } else {
                    button.remove(); // if no data, remove the button as well
                }
            },
            error: function() {},
        });
    });

    var ajaxurl = resido_map_object.ajax_url;
    var resido_nonce = resido_map_object.resido_advs_nonce;
    var resido_nonce_ajax = resido_map_object.resido_advs_nonce_ajax;

    function searchPosts() {
        var chkArray = [];
        // Look for all checkboxes that have a specific class and was checked
        $(".rlisting_features:checked").each(function() {
            chkArray.push($(this).val());
        });
        var rlfeatured;
        rlfeatured = chkArray.join(", ");
        $(".ffeatures-s").text(rlfeatured);

        // rlisting_location
        var rlocchkArray = [];
        $(".rlisting_location:checked").each(function() {
            rlocchkArray.push($(this).val());
        });
        var rloc;
        rloc = rlocchkArray.join(", ");
        $(".where-s").text(rloc);

        // rlisting_category
        var rlcatechkArray = [];
        $(".rlisting_category:checked").each(function() {
            rlcatechkArray.push($(this).val());
        });
        var rlcate;
        rlcate = rlcatechkArray.join(", ");
        $(".fptype-s").text(rlcate);

        // rlisting_status
        var rlstatechkArray = [];
        $(".rlisting_status:checked").each(function() {
            rlstatechkArray.push($(this).val());
        });
        var rlstate;
        rlstate = rlstatechkArray.join(", ");
        $(".fstatus-s").text(rlstate);

        // rlisting_bedval
        var rlbedvalchkArray = [];
        $(".rlisting_bedval:checked").each(function() {
            rlbedvalchkArray.push($(this).val());
        });
        var rlbedval;
        rlbedval = rlbedvalchkArray.join(", ");
        $(".fbedrooms-s").text(rlbedval);

        var modaration = [];
        $(".rlisting_moderation:checked").each(function() {
            modaration.push($(this).val());
        });

        var rmodaration;
        rmodaration = modaration.join(", ");

        // Run AJAX search.
        var page_num = $(".resido_loadmore_ajax").data("page_num");
        if (page_num == undefined) {
            var page_num = $(".ajax_page_number").text();
        }

        if (page_num == undefined) {
            page_num = 1;
        }
        var page_num = $("#paged_var").val();
        var loc = typeof locations_obj !== "undefined" ? locations_obj : "";

        return $.post(ajaxurl, {
            action: "resido_adv_search",
            resido_nonce: resido_nonce,
            name: $("#name").val(),
            page_num: page_num,
            lat: $("#lat").val(),
            long: $("#long").val(),
            distance: $("#search_distance").val(),
            is_radius: $("#is_radius").val(),
            layout: $("#layout").val(),
            category_slug: $("#category_slug").val(),
            location: $("#location").val(),
            listing_city: $("#listing_city").val(),
            rlcity: $(".rlcity").val(),
            listing_cate: $("#list-category").val(),
            sort_by_order: $("#sort_by_order").val(),

            rl_taxonomy: $("#rl_taxonomy").val(),
            rl_term: $("#rl_term").val(),

            rlisting_location: rloc,
            rlisting_category: rlcate,
            rlisting_status: rlstate,
            rlisting_features: rlfeatured,
            rlisting_bedval: rlbedval,
            rlisting_moderation: rmodaration,
            search_res: $("#advanced-searchform").serialize(),

            beforeSend: function(xhr) {
                $("#archive_loop").addClass("loading-area");
            },
        })

        .done(function(data) {
            var obj = JSON.parse(data);
            if (obj.data) {
                $("#archive_loop").html(obj.data);
            }
            $("#archive_loop").removeClass("loading-area");
            if (obj.page != null || obj.page != null) {
                $(".blogpagination").html(obj.page);
            }
            $(".change_item_count").text('Showing ' + obj.loc.length);
            if (loc !== "" && typeof obj.loc != "undefined") {
                dloc = obj.loc;
                setTimeout(function() {
                    objmapsjava(dloc);
                }, 100);
            }
        })
        .always(function() {});
    }

    function searchPostsAjax() {
        var chkArray = [];
        // Look for all checkboxes that have a specific class and was checked
        $(".rlisting_features:checked").each(function() {
            chkArray.push($(this).val());
        });
        var rlfeatured;
        rlfeatured = chkArray.join(",");

        var modaration = [];
        $(".rlisting_moderation:checked").each(function() {
            modaration.push($(this).val());
        });

        var rmodaration;
        rmodaration = modaration.join(",");

        // Run AJAX search.
        var page_num = $(".resido_loadmore_ajax").data("page_num");
        //alert($page_num);
        if (page_num == undefined) {
            page_num = 1;
        }
        var loc = typeof locations_obj !== "undefined" ? locations_obj : "";
        return $.post(ajaxurl, {
                action: "resido_adv_search_ajax",
                resido_nonce_ajax: resido_nonce_ajax,
                name: $("#name").val(),
                page_num: page_num,
                lat: $("#lat").val(),
                long: $("#long").val(),
                distance: $("#search_distance").val(),
                is_radius: $("#is_radius").val(),
                layout: $("#layout").val(),
                category_slug: $("#category_slug").val(),
                location: $("#location").val(),
                rlcity: $(".rlcity").val(),
                listing_cate: $("#list-category").val(),
                sort_by_order: $("#sort_by_order").val(),
                rlisting_features: rlfeatured,
                rlisting_moderation: rmodaration,
                locations_obj: loc,
                length: loc.length,
                beforeSend: function(xhr) {
                    $("#archive_loop").addClass("loading-area");
                },
            })
            .done(function(data) {
                var obj = JSON.parse(data);
                if (obj.data) {
                    $("#archive_loop").append(obj.data);
                }
                $("#load_more_button").remove();
                $("#archive_loop").removeClass("loading-area");
                if (loc !== "" && typeof obj.loc != "undefined") {
                    dloc = obj.loc;
                    setTimeout(function() {
                        objmapsjava(dloc);
                    }, 100);
                }
            })
            .always(function() {});
    }


    // Update Agent option on dashboard on changing agency value

    function get_city_o_country() {


        return $.post(ajaxurl, {
            action: "resido_city_change",
            resido_nonce_ajax: resido_nonce_ajax,
            country_id: $("#lcountry").val(),
        })

        .done(function(data) {
                var obj = JSON.parse(data);
                if (obj.data) {
                    $("#lcity").html(obj.data);
                }
            })
            .always(function() {});
    }

    // Update Floor plan values from the Dashboard

    function get_additionaldetails() {


        return $.post(ajaxurl, {
            action: "resido_additionaldetails",
            resido_nonce_ajax: resido_nonce_ajax,
            feature_ft_counter: $("#feature_ft_counter").val(),
        })

        .done(function(data) {
                var obj = JSON.parse(data);
                if (obj.data) {
                    $(".features_list").html(obj.data);
                }
            })
            .always(function() {});
    }


    // Update Floor plan values from the Dashboard

    function get_floorplan() {


        return $.post(ajaxurl, {
            action: "resido_get_floorplan",
            resido_nonce_ajax: resido_nonce_ajax,
            floor_counter: $("#floor_counter").val(),
        })

        .done(function(data) {
                var obj = JSON.parse(data);
                if (obj.data) {
                    $(".floor_list").html(obj.data);
                }
            })
            .always(function() {});
    }

    // Update Agent option on dashboard on changing agency value

    function get_agents() {


        return $.post(ajaxurl, {
            action: "resido_agent_add",
            resido_nonce_ajax: resido_nonce_ajax,
            agency_id: $("#rlagencyinfo").val(),
        })

        .done(function(data) {
                var obj = JSON.parse(data);
                if (obj.data) {
                    $("#agents").html(obj.data);
                }
            })
            .always(function() {});
    }
    // Update Agent option on dashboard on changing agency value

    $("#is_radius").change(function() {
        if (this.checked) {
            $("#is_radius").val(1).change();
        } else {
            $("#is_radius").val(0).change();
        }
    });

    $("#search_distance").on("change", function(e) {
        e.preventDefault();
        // Run AJAX search.
        searchPosts(this);
    });

    $("#name").on("keyup", function(e) {
        e.preventDefault();
        // Run AJAX search.
        searchPosts(this);
        // this.blur();
    });

    $("#location").on("keyup", function(e) {
        e.preventDefault();
        // Run AJAX search.
        searchPosts(this);
    });

    $("#lcountry").on("change", function(e) {
        e.preventDefault();
        get_city_o_country();
    });

    $("#run_ft_counter").on("click", function(e) {
        e.preventDefault();
        get_additionaldetails();
    });

    $("#run_counter").on("click", function(e) {
        e.preventDefault();
        get_floorplan();
    });


    $("#rlagencyinfo").on("change", function(e) {
        e.preventDefault();
        get_agents();
    });

    $(".rlcity").on("change", function(e) {
        e.preventDefault();
        var dd = $(".rlcity").val();
        // Run AJAX search.
        searchPosts(this);
    });

    $("#listing_city").on("change", function(e) {
        e.preventDefault();
        // Run AJAX search.
        searchPosts(this);
    });
    
    $("#listing_cate").on("change", function(e) {
        e.preventDefault();
        // Run AJAX search.
        searchPosts(this);
    });

    $("#list-category").on("change", function(e) {
        e.preventDefault();
        // Run AJAX search.
        searchPosts(this);
    });

    $(".rlisting_features:checkbox").on("change", function(e) {
        e.preventDefault();
        // Run AJAX search.
        searchPosts(this);
    });

    $(".rlisting_location:checkbox").on("change", function(e) {
        e.preventDefault();
        // Run AJAX search.
        searchPosts(this);
    });

    $(".rlisting_category:checkbox").on("change", function(e) {
        e.preventDefault();
        // Run AJAX search.
        searchPosts(this);
    });

    $(".rlisting_status:checkbox").on("change", function(e) {
        e.preventDefault();
        // Run AJAX search.
        searchPosts(this);
    });

    $(".rlisting_bedval:checkbox").on("change", function(e) {
        e.preventDefault();
        // Run AJAX search.
        searchPosts(this);
    });

    $(".rlisting_moderation:checkbox").on("change", function(e) {
        e.preventDefault();
        // Run AJAX search.
        searchPosts(this);
    });

    $("#sort_by_order").on("change", function(e) {
        e.preventDefault();
        location.reload(); /* Loadmore to last limit, changing sorting will not refresh the query for load more button */
        searchPosts(this);
    });

    $(".shorting-list li").on("click", function(e) {
        e.preventDefault();
        searchPosts(this);
    });

    $(document).on("click", ".resido_loadmore_ajax", function(e) {
        e.preventDefault();
        searchPostsAjax(this);
    });

    jQuery(document).on("click", ".blogpagination_ajax a", function(e) {
        e.preventDefault();
        var paged = /[\?&]paged=(\d+)/.test(this.href) && RegExp.$1;
        $(".ajax_page_number").text(paged);
        searchPosts();
    });

    function initialize() {
        var input = document.getElementById("location");
        if (input !== null) {
            var autocomplete = new google.maps.places.Autocomplete(input);
            google.maps.event.addListener(autocomplete, "place_changed", function() {
                var place = autocomplete.getPlace();
                if ($("#singleMap").length > 0) {
                    $("#singleMap").data("latitude", place.geometry.location.lat());
                    $("#singleMap").data("longitude", place.geometry.location.lng());
                    singleMap();
                }
                if ($("#lat").length > 0) {
                    document.getElementById("lat").value = place.geometry.location.lat();
                    document.getElementById("long").value = place.geometry.location.lng();
                }
            });
        }
    }

    if (location_auto_search == "yes") {
        google.maps.event.addDomListener(window, "load", initialize);
    }
})(jQuery);