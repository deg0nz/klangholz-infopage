(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict

function showImprint() {
  $("#imprint").css("display", "");
}

// Scripting for the map

// Get the HTML DOM element that will contain your map
// We are using a div with id="map" seen below in the <body>
var mapElement = document.getElementById('map');

var lon = 12.8678;
var lat = 52.0949;

var styles = {
'icon': new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0.5, 1],
    src: 'https://www.openstreetmap.org/assets/images/marker-icon-574c3a5cca85f4114085b6841596d62f00d7c892c7b03f28cbfa301deb1dc437.png'
  })
})
};

var vectorSource = new ol.source.Vector({
  //create empty vector
});

var iconFeature = new ol.Feature({
  geometry: new  ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
  name: 'Klangholz',
  population: 4000,
  rainfall: 500
});

vectorSource.addFeature(iconFeature);

var iconStyle = new ol.style.Style({
  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    opacity: 1,
    src: 'https://www.openstreetmap.org/assets/images/marker-icon-574c3a5cca85f4114085b6841596d62f00d7c892c7b03f28cbfa301deb1dc437.png'
  }))
});

var vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  style: iconStyle
});

var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    vectorLayer
  ],
  target: mapElement,
  controls: ol.control.defaults({
    attributionOptions: {
      collapsible: false
    }
  }),
  view: new ol.View({
    center: [0, 0],
    zoom: 15,
    center: ol.proj.fromLonLat([lon, lat])
  }),
  interactions: ol.interaction.defaults({mouseWheelZoom:false})
});
