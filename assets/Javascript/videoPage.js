/**
 * Created by kmjungersen on 9/2/15.
 */
$(function () {

    var videoPageHandler = (function() {
        function Handler() {
            var _self = this;

            _self.youtubePlayer = '.youtube-player';
            _self.videoSelector = '#videoSelector';
            _self.aspectRatio = .5625;

            _self.baseUrl = 'https://www.youtube.com/embed/';

            _self.videoMetaData = {
                carnage: {
                    id: 'cmx3ouRT36I',
                    title: 'Carnage on the Slopes'
                },
                tennis: {
                    id: 'ZtDv_7-BgGQ',
                    title: 'Tennis GoPro Demo'
                },
                zombie: {
                    id: 'vivClBDyupE',
                    title: 'Zombie Defense Training Camp'
                },
                teddy: {
                    id: 'qzrjQj7mGmE',
                    title: 'Teddy'
                },
                fryNight: {
                    id: 'ND5ybEMpRyo',
                    title: 'Friday Night Fish Fry'
                }
            }

            _self.buildUrl = function(metaObject) {
                var id = metaObject.id;
                var url = _self.baseUrl + id;

                return url;
            }

            _self.getVideoUrl = function(selection) {
                var selectedObject = _self.videoMetaData[selection];
                var url = _self.buildUrl(selectedObject);

                return url;
            }

            _self.changeVideo = function(selection) {
                var newUrl = _self.getVideoUrl(selection);

                var $player = $(_self.youtubePlayer);
                $player.attr('src', newUrl);
            }

            _self.getParameterByName = function(name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
                var results = regex.exec(location.search);

                return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
            }

            _self.setPlayerHeight = function() {
                var $youtubePlayer = $(_self.youtubePlayer);
                var width = $youtubePlayer.width();
                var newHeight = width * _self.aspectRatio;

                $youtubePlayer.height(newHeight);
                console.log(newHeight);
            }

            _self.waitForResize = function() {
                var resizeTimer;

                $(window).resize(function(e) {
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(function() {
                        _self.setPlayerHeight();
                    }, 250);
                });
            }

            _self.getInitialSelection = function() {
                _self.$videoSelector = $(_self.videoSelector);
                _self.$videoSelector.material_select();

                var queryStringSelection = _self.getParameterByName('video');
                var initialSelection = _self.$videoSelector.val();

                var videoSelection = queryStringSelection || initialSelection;

                _self.changeVideo(videoSelection);

                //TODO - fix this
                _self.$videoSelector.val(videoSelection);
            }

            _self.waitForSelection = function() {
                _self.$videoSelector = $(_self.videoSelector);
                _self.$videoSelector.change(function () {
                    _self.changeVideo(_self.$videoSelector.val())
                });
            }

            _self.init = function() {
                _self.setPlayerHeight();
                _self.waitForResize();

                _self.getInitialSelection();
                _self.waitForSelection();

                var materialSelect = $(".select-wrapper").find(".caret");
                materialSelect.html("");
            }();

        }

        return {
            Handler: Handler
        }
    })();

    var videoHandler = new videoPageHandler.Handler();
});
