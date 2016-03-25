/**
 * Created by kmjungersen on 9/1/15.
 */

var homePageHandler = (function() {
    function Handler() {
        var _self = this;

        _self.fullScreenElements = [
            // '.landing-page',
            '.location-wrapper'
        ]

        _self.init = function() {
            $(".flyIn-section").addClass("flyIn-init");
            $("section.active").addClass("flyIn-animate");

            _self.setFullScreenPageSizes();
            _self.setupScroller();
            _self.setVideoTitle();
            _self.waitForResize();
            // _self.waitForScroll();
        }

        _self.setupClickEvents = function() {
            var clickableArea = $(".click-down");
            clickableArea.click(function() {
               scroller.moveDown();
            });
        }

        _self.setFullScreenPageSizes = function() {
            var windowHeight = $(window).height();

            $.each(_self.fullScreenElements, function(i, element) {
                $(element).css('height', windowHeight);
            });
        }

        _self.setVideoTitle = function() {
            var $videoTitle = $('#section-3 article');

            var windowHeight = $(window).height();
            var newHeight = 2 * windowHeight;

            $videoTitle.css('top', newHeight.toString() + 'px');
        }

        _self.setupScroller = function() {
            var scroller = $("#main-page");

            scroller.onepage_scroll({
                sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
                easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                                 // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
                animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
                pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
                updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
                beforeMove: function (index) {
                    var activePanel = $('.active');

                    activePanel.addClass('flyIn-init');
                    activePanel.removeClass('flyIn-animate');
                },  // This option accepts a callback function. The function will be called before the page moves.
                afterMove: function (index) {
                    $('.active').addClass('flyIn-animate');
                },   // This option accepts a callback function. The function will be called after the page moves.
                loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
                keyboard: true,                  // You can activate the keyboard controls
                responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
                // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                // the browser's width is less than 600, the fallback will kick in.
                direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
            });
        }

        _self.waitForResize = function() {
            $(window).resize(function() {
                _self.setFullScreenPageSizes();
            });
        }

        _self.waitForScroll = function() {
            var $landingPageWrapper = $('.location-wrapper');
            var height = 0;
            var scrollDistance = 0;
            var fadeTrigger = 0;
            var opacity = 0;
            var offset = 0;

            $(document).scroll(function() {
                height = $landingPageWrapper.height();
                scrollDistance = $(document).scrollTop();
                offset = height / 2;
                fadeTrigger = height - offset;

                if (scrollDistance >= fadeTrigger && scrollDistance <= height) {
                    opactiy = (height - scrollDistance) / offset;
                    $landingPageWrapper.css('opacity', opactiy);
                } else {
                    $landingPageWrapper.css('opacity', 1);
                }
            })
        }
    }

    return {
        Handler: Handler
    }

})();

var entryPoint =  new homePageHandler.Handler();

$(document).ready(function() {
    entryPoint.init();
});
