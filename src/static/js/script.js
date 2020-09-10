/*
 Author       	: Abubakar Siddique
 Template Name	: Lisa - Fitness Center, Gym and Yoga Template
 Version      	: 1.0
 */

(function ($)
{
    "use strict";


    //JQuery for page scrolling feature - requires JQuery Easing plugin
    $(document).on('ready', function () {
        var $mainNavLink = $('a.page-scroll'),
                $mainMenuList = $('.nav li'),
                $navBar = $('#navbar');

        $mainNavLink.on('click', function (event) {
            $mainMenuList.removeClass('active');
            $(this).parent().addClass('active');
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 900, 'easeInOutExpo');
            event.preventDefault();
        });

        $navBar.each(function () {
            $(this).jScrollPane({
                showArrows: $(this).is('.arrow')
            });
            var api = $(this).data('jsp');
            var throttleTimeout;
            $(window).on('resize', function () {
                if (!throttleTimeout) {
                    throttleTimeout = setTimeout(function () {
                        api.reinitialise();
                        throttleTimeout = null;
                    }, 50);
                }
            });
        });

        // Sidebar Opener
        var $menu = $('#menu'),
                $menuOpener = $('#menu .mobile-menu-opener'),
                $menuLink = $('#navbar li a'),
                $contentWrapper = $('.content-wrapper');

        $menuOpener.on('click', function (e) {
            e.preventDefault();
            if ($menu.css('left') === '-220px') {
                $menu.animate({
                    left: '0px'
                });
            } else {
                $menu.animate({
                    left: '-220px'
                });
            }
        });

        $menuLink.on('click', function (e) {
            e.preventDefault();
            $menu.animate({
                left: '-220px'
            });

        });
        $contentWrapper.on('click', function (e) {
            $menu.animate({
                left: '-220px'
            });

        });

  
        // Youtube Video
        $('.player').mb_YTPlayer();


        /*Contact Map*/
        var mapInfo = {"lat": "23.800446", "lon": "90.349832"}; //Change a map coordinate here!
        try {
            $('.map').gmap3({
                action: 'addMarker',
                latLng: [mapInfo.lat, mapInfo.lon],
                map: {
                    center: [mapInfo.lat, mapInfo.lon],
                    zoom: 15
                },
            },
                    {action: 'setOptions', args: [{scrollwheel: false}]}
            );
        } catch (err) {

        }
        /*End Contact Map*/


        //============= Counter section ============ 
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });

        /*============================== Back to top =========================*/
        $(".back-top").hide();

        $('.back-top a').on('click', function (event) {
            $('body,html').animate({scrollTop: 0}, 800);
            return false;
        });

    });

    $(window).on('scroll', function () {
        //=================== Back to top ===========================
        if ($(this).scrollTop() > 150) {
            $('.back-top').fadeIn();
        } else {
            $('.back-top').fadeOut();
        }
    });


    //=========== Slider Caption Animation ====================

})(jQuery);	