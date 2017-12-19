var clipPathSupport = false;


$(function() {

	var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  	if( areClipPathShapesSupported() && !isFirefox ) {
	  	clipPathSupport = true;
		$('.gallery .media .img').each(function() {
			$(this).wrap('<div class="parallax-inner-clip"></div>')
    	});
	}

	placeGalleryItems();

	$(document).on("scroll", function(){
		placeGalleryItems();
	});

	$( window ).resize(function() {
	  	placeGalleryItems();
	});

});

function placeGalleryItems(){
	if($("body").width() > 1100){
		var gallery = $("#page-gallery .gallery");
		var gallery_w = $("#page-gallery .gallery .media").width();
		if(gallery){
			var gallery_x = $("#page-gallery .gallery").offset().left - $(window).scrollLeft();
			var gallery_y = $("#page-gallery .gallery").offset().top - $(window).scrollTop();
			if(clipPathSupport){
				$(".gallery .media .img").css("left", gallery_x + "px");
				$(".gallery .media .img").css("top", gallery_y + "px");
			}else{
				$(".gallery .media .img").css("background-position", gallery_x + "px " + gallery_y + "px");
			}
			$(".gallery .media .img").css("width", gallery_w + "px");

			// WAY. TOO. SLOW.
			// var gallery_y = gallery.offset().top - $(document).scrollTop();
			//
			// $(".gallery .media").css("background-attachment", "initial");
			//
			// $(".gallery .media").each(function(){
			// 	var media_y = $(this).offset().top - $(document).scrollTop();
			// 	$(this).css("background-position", "0 " + -(media_y - gallery_y) + "px");
			// });
		}
	}
}

var areClipPathShapesSupported = function () {

	var base = 'clipPath',
		prefixes = [ 'webkit', 'moz', 'ms', 'o', '' ],
		properties = [ base ],
		testElement = document.createElement( 'testelement' ),
		attribute = 'polygon(50% 0%, 0% 100%, 100% 100%)';

	// Push the prefixed properties into the array of properties.
	for ( var i = 0, l = prefixes.length; i < l; i++ ) {
		var prefixedProperty = prefixes[i] + base.charAt( 0 ).toUpperCase() + base.slice( 1 ); // remember to capitalize!
		properties.push( prefixedProperty );
	}

	// Interate over the properties and see if they pass two tests.
	for ( var i = 0, l = properties.length; i < l; i++ ) {
		var property = properties[i];

		// First, they need to even support clip-path (IE <= 11 does not)...
		if ( testElement.style[property] === '' ) {

			// Second, we need to see what happens when we try to create a CSS shape...
			testElement.style[property] = attribute;
			if ( testElement.style[property] !== '' ) {
				return true;
			}
		}
	}

	return false;
};
