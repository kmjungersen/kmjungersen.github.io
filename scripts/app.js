
var homePageHandler = (function() {
    function Handler() {
        var _self = this;

        _self.fullScreenElements = [
            // '.landing-page',
            '.location-wrapper'
        ]

        _self.init = function() {
            _self.setFullScreenPageSizes();
            _self.waitForResize();
            // _self.waitForScroll();
        }

        _self.setFullScreenPageSizes = function() {
            var windowHeight = $(window).height();

            $.each(_self.fullScreenElements, function(i, element) {
                $(element).css('height', windowHeight);
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

        _self.init();
    }

    return {
        Handler: Handler
    }

})();

var entryPoint =  new homePageHandler.Handler();
