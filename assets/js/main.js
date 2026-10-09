/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 1);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return breakpoints.active('<=small') ? 0 : $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href');

						// External link? Bail.
							if (id.charAt(0) != '#')
								return;

						var $section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

			// Mobile toggle.
				var $navToggle = $('#nav-toggle');

				var setNavOpen = function(open) {

					$nav.toggleClass('is-open', open);

					$navToggle
						.attr('aria-expanded', open ? 'true' : 'false')
						.toggleClass('fa-bars', !open)
						.toggleClass('fa-times', open);

				};

				$navToggle.on('click', function(event) {

					event.stopPropagation();
					setNavOpen(!$nav.hasClass('is-open'));

				});

				// Close on link click, outside click, Escape, or widening past mobile.
					$nav_a.on('click', function() {
						setNavOpen(false);
					});

					$body.on('click', function(event) {
						if ($(event.target).closest('#nav').length == 0)
							setNavOpen(false);
					});

					$window.on('keydown', function(event) {
						if (event.key == 'Escape')
							setNavOpen(false);
					});

					breakpoints.on('>small', function() {
						setNavOpen(false);
					});

				// Contrast: dark icon over the white content, light over the background.
					var updateNavToggleContrast = function() {

						if (!breakpoints.active('<=small'))
							return;

						var	rect = $navToggle[0].getBoundingClientRect(),
							x = rect.left + rect.width / 2,
							y = rect.top + rect.height / 2,
							$under = $(document.elementsFromPoint(x, y))
								.not('#nav-toggle, #nav, #nav *')
								.first();

						$navToggle.toggleClass('on-light',
							$under.closest('#main').length > 0 && !$under.is('img, .image, .image *'));

					};

					$window.on('scroll resize load', updateNavToggleContrast);

					updateNavToggleContrast();

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});

})(jQuery);