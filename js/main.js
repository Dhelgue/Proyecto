var $mainNav = $("header") ;
var $ventana = $(window) ;
var topVentana = $mainNav.offset().top ;
$ventana.scroll( menuFijado );
var $botonSubir = $('.subir');


function menuFijado() {
    
    var scrolled = $ventana.scrollTop() ;
    
        if ( scrolled >= topVentana ) {
            $mainNav.addClass("fija") ;
        }

        else {
            $mainNav.removeClass("fija") ;    
        }
}



$(document).ready(function(){
    $('.parallax').each(function(){
        var $this = $(this);
        $ventana.scroll(function() {
            var y = -($ventana.scrollTop() / $this.data('movimiento')); 
            var xy = '50% '+ y + 'px';
            $this.css({ backgroundPosition: xy });
       });
    });
    
    $botonSubir.click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});
 
	$ventana.scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$botonSubir.slideDown(300);
		} else {
			$botonSubir.slideUp(300);
		}
	});
});


            // When the window has finished loading create our google map below
            google.maps.event.addDomListener(window, 'load', init);
        
            function init() {
                // Basic options for a simple Google Map
                // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                var mapOptions = {
                    // How zoomed in you want the map to start at (always required)
                    zoom: 15,
                    scrollwheel: false,

                    center: new google.maps.LatLng(40.4039757, -3.6706855,17), // Adelfas

                    styles: [{"featureType":"all","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"},{"saturation":"-100"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40},{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"lightness":21}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#7f8d89"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#2b3638"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2b3638"},{"lightness":17}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.icon","stylers":[{"visibility":"off"}]}]
                };

                var mapElement = document.getElementById('map');
                var map = new google.maps.Map(mapElement, mapOptions);

                // Let's also add a marker while we're at it
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(40.4039757, -3.6706855),
                    map: map,
                    title: 'Adelfas CF!'
                });
            };

function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getNames(Equipos){

    var equipoSelect = document.getElementById("equipoSelect");
    var listado = document.getElementById("listEquipo");
    var equipoJson = "../equipos.json" ;
    
    listado.innerHTML = "";
        
    ajax_get(equipoJson, function(data) {

        for (var i=0; i < data.Equipos.length; i++) {

            var nombre = "<div class='nombre'>" + data.Equipo + "</div>";
  
            listado += nombre ;
        }
            
    });
}

function initEquipo(){

    var equipoSelect = document.getElementById("equipoSelect");
    var equipoName = document.getElementById("equipoName");
  
    if(equipoSelect.value !== ""){
    
        equipoName.innerHTML = equipoSelect.value;
        getNames(equipoSelect.value);
        
    } else {
        
        equipoName.innerHTML = "";
    }
}

initEquipo();















