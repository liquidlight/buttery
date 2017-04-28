(function($){
	$.fn.buttery = function(options) {
		var defaults = {
			parallaxSelector: '.parallaxInner', // Class of the new div that gets created
			scale: 1.5, // If you want to scale the image
			height: 'image', // How high the box is (can be px, % or "image" to use the image height)
			scrollFraction: 2, // What speed the scrolling effect is
		};
		options = $.extend(defaults, options);

		// Calculate the position and scroll
		var butteryCalculation = function(window, item) {
			// Work out the scroll top & use fraction
			var scroll = window.scrollTop();
			//
			// If the element is out of view, add the scroll top
			if(item.wrapper.offset().top > (window.innerHeight())) {
				scroll = (window.scrollTop() + window.innerHeight() - item.wrapper.offset().top);
			}

			// Use the scroll "multiplier" for speed
			scroll = scroll / item.options.scrollFraction;

			// Check that the scroll amount isn't more than the bleed level
			var scrollAmount = (scroll > item.maxTransform) ?  item.maxTransform : (scroll < 0) ? 0 : scroll;

			// Move it
			item.object.css('transform', 'translate3d(0, -' + scrollAmount + 'px, 0) scale(' + item.options.scale + ')');
		};

		// Only run if the element exists
		var butteryMagic = function(parallaxWrapper) {
			// Reset the item options for each item
			var itemOptions = options;

			// Create the element
			parallaxWrapper.prepend('<div class="' + itemOptions.parallaxSelector.replace('.', '') + '" />');
			parallaxWrapper.css({
				'position': 'relative',
				'overflow': 'hidden',
				'zIndex': '1'
			});

			if(parallaxWrapper.is('[data-buttery-scale]')) {
				itemOptions.scale = parallaxWrapper.attr('[data-buttery-scale]');
			}
			if(parallaxWrapper.is('[data-buttery-scrollFraction]')) {
				itemOptions.scale = parallaxWrapper.attr('[data-buttery-scrollFraction]');
			}
			if(parallaxWrapper.is('[data-buttery-height]')) {
				itemOptions.height = parallaxWrapper.attr('[data-buttery-height]');
			}

			// If the "image" option was selected - work out the height
			if(itemOptions.height == 'image') {
				var background = parallaxWrapper.css('backgroundImage')
					.replace('url(','')
					.replace(')','')
					.replace(/['"]+/g, '');
				var bg = new Image();
				bg.src = background;
				var ratio = bg.width / bg.height;
				itemOptions.height = parallaxWrapper.outerWidth() / ratio;
			}

			// Find the newly created element and apply all the CSS
			var parallaxObject = parallaxWrapper.find(itemOptions.parallaxSelector);
			parallaxObject.css({
				'transform': 'translate3d(0, 0, 0) scale(' + itemOptions.scale + ')',
				'willChange': 'transform',
				'position': 'absolute',
				'top': '0',
				'left': '0',
				'width': '100%',
				'height': itemOptions.height,
				'transformOrigin': 'top center',
				'transition': 'transform 5ms linear',
				'zIndex': '-2',
				'backgroundSize': parallaxWrapper.css('backgroundSize'),
				'backgroundImage': parallaxWrapper.css('backgroundImage'),
				'backgroundPosition': parallaxWrapper.css('backgroundPosition'),
				'backgroundRepeat': parallaxWrapper.css('backgroundRepeat')
			});

			// Calculate the max amount of transform so you don't get bleed
			var maxTransform = (parallaxObject.innerHeight() * itemOptions.scale) - parallaxWrapper.innerHeight();

			var item = {
				options: itemOptions,
				wrapper: parallaxWrapper,
				object: parallaxObject,
				maxTransform: maxTransform
			};

			// The scroll bind
			$(window).on('scroll.buttery', function() {
				butteryCalculation($(this), item);
			});

			// Recalculate on resize
			$(window).on('resize.buttery', function() {
				butteryCalculation($(this), item);
			});

			// Calculate on page load
			$(window).on('load.buttery', function() {
				butteryCalculation($(this), item);
			});
		};

		// "this" is the object initialised with the plugin
		// loop through, in case there are multiple
		$(this).each(function(index, el) {

			// If the element actually exists on the page
			if($(this).length) {

				// Start the buttery magic
				butteryMagic($(this));
			}
		});
	};
})(jQuery);