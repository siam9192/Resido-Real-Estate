(function ($) {
    ("use strict");

    // START - LOCATION SUGGESTION FROM OPENSTREET DATABASE

    $('.get-location-js').each(function (id, elm) {
        $(this).focusout(function () {
            setTimeout(function () {
                $('.location_result').hide();
            }, 500);
        });
        $(elm).on('keyup', function (event) {
            event.preventDefault();
            if (event.keyCode !== 40 && event.keyCode !== 38) {
                var search = $(elm).val();
                $('.location_result').css({ 'display': 'block' });
                if (search === "") {
                    $('.location_result').css({ 'display': 'none' });
                }
                var res = "";
                $.ajax({
                    url: `https://nominatim.openstreetmap.org/?q=${search}&format=json`,
                    type: 'POST',
                    data: {},
                    success: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            res += `<div class="location_single"><i class="fas fa-map-marker-alt"></i><a href="javascript:void(0)" data-lat=${data[i].lat} data-lon=${data[i].lon}>${data[i].display_name}</a></div>`
                        }
                        if (data.length > 0) {
                            $('.location_result').html('<div class="results">' + res + '</div>');
                        } else {
                            $('.location_result').html('<div class="results"></div>');
                        }
                        
                    }
                });
            }
        });
    })

    // ADDING VALUE ON THE INPUT FIELD FROM THE SUGGESTED LIST

    $(document).on('click', '.location_single a', function (e) {
        e.preventDefault();
        $('.get-location-js').val($(this).text());
        $('.location_result').css({ 'display': 'none' });
    })

    // END - LOCATION SUGGESTION FROM OPENSTREET DATABASE

    // LOCATION MAP
    $(document).ready(function () {
        
        let data_options = $("#map").data('map_data');
        if (typeof data_options !== "undefined") {
            let default_lat     = data_options.default_latitude ? data_options.default_latitude : 32.780927;
            let default_lon     = data_options.default_longitude ? data_options.default_longitude :  -96.798205;
            let default_zoom    = data_options.default_zoom ? data_options.default_zoom : 6;
            let location        = data_options.enable_geolocation ? data_options.enable_geolocation : false;
            let geo_markup      = data_options.geo_markup ? data_options.geo_markup : 'You are within {{radius_value}} meters from this point';

            var Lmap = L.map('map').setView([default_lat, default_lon], default_zoom);
            // SET COPYRIGHT MARK
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 18
            }).addTo(Lmap);

            var markers = new L.MarkerClusterGroup();

            
            if( typeof location === 'undefined' || location === true ){
                Lmap.locate({ setView: true, maxZoom: default_zoom });
                function onLocationFound(e) {
                    var radius = e.accuracy;
                    var output = geo_markup.replace(/{{radius_value}}/g, radius)
                    L.marker(e.latlng).addTo(Lmap).bindPopup("<div class=\"listing-popup\">" + output + "</div>").openPopup();
                    L.circle(e.latlng, radius).addTo(Lmap);
                }
                Lmap.on('locationfound', onLocationFound);
            }
            
            // GET LISTING DATA
            let listing_data = [];
            $(".listing_data").each(function () {
                // let data_listing    = JSON.parse(atob($(this).data('listing')));
                let data_listing    = JSON.parse(decodeURIComponent( $(this).data('listing') ));
                let listing_value   = JSON.parse(data_listing);
                listing_data.push(listing_value);
            });

            listing_data.forEach(function (data) {
                var address_markup = '';
                if(data["address"]){
                    var address_markup = '<p><i class=\"fas fa-map-marker-alt\"></i> ' + data["address"] + '</p>';
                }
                
                let data_html = "<div class=\"listing-popup\"><div class=\"thumbnail\"><img src=\""+ data["img_url"] +"\"><span class=\"map_pricing\">"+ data["price"] +"</span></div><h6><a href=\""+ data["url"] +"\">"+ data["title"] +"</a></h6>" + address_markup + "</div>";
                // ---------------- MAP WITH MARKER CLUSTER ----------------
                markers.addLayer(L.marker([data["latitude"], data["longitude"]]).bindPopup(data_html));
                Lmap.panTo(new L.LatLng(data["latitude"], data["longitude"])); // set center of map according to last lat lon data
                // ---------------- MAP WITHOUT MARKER CLUSTER ----------------
                // let id = 'listing_' + data["id"];
                // id = L.marker([data["latitude"], data["longitude"]]).addTo(Lmap);// -- adding marker on map
                // id.bindPopup(data_html).openPopup();// -- popup information
                // ---------------- MAP WITHOUT MARKER CLUSTER ----------------
            });
            // add layer to marker cluster
            Lmap.addLayer(markers);
        }
    });
    // GET LISTING DATA

    // Dashboard change  marker on location map Leaflet | Openstreet
    $(document).ready(function () {

        if($('#map-ed').length){
            let lat = $('#cl-meta-text-input-lat').val();
            let lon = $('#cl-meta-text-input-lon').val();
            var Lmap = L.map('map-ed').setView([lat, lon], 4);
            // SET COPYRIGHT MARK
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 14,
                // noWrap: true
            }).addTo(Lmap);
    
            var mapMarker = L.marker([lat, lon], {draggable: true}).addTo(Lmap).on('dragend', function() {
                var coord = String(mapMarker.getLatLng()).split(',');
                var lat = coord[0].split('(');
                var lng = coord[1].split(')');
                $('#cl-meta-text-input-lat').val(lat[1]);
                $('#cl-meta-text-input-lon').val(lng[0]);
            });
    
            function updateMarker() {
                let lat = $('#cl-meta-text-input-lat').val();
                let lon = $('#cl-meta-text-input-lon').val();
                var newLatLng = new L.LatLng(lat, lon);
                mapMarker.setLatLng(newLatLng); 
            }
            
            $("#cl-meta-text-input-lat").on("change", function () {
                updateMarker();
            })
    
            $("#cl-meta-text-input-lon").on("change", function () {
                updateMarker();
            })
        }
        

    });


})(jQuery);