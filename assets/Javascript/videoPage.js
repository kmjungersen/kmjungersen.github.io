/**
 * Created by kmjungersen on 9/2/15.
 */
$(function () {
    function videoPageClass(player, selector) {

        var self = this;
        self.player = player;
        self.selector = selector;
        self.baseUrl = "https://s3.amazonaws.com/staging.kmjungersen.github.io/assets/videos/";

        function init() {

        }

        function changeVideo(videoSelection) {

            var selection = self.videoMetaData[videoSelection];

            //changeTitle(selection.title);
            changeVideoSrc(selection.url);
        }

        function changeVideoSrc(url) {


            var videoJs = videojs(self.player[0], {}, function (){
                console.log("foo");
            });
            //var video = $("videoPlayer");
            var fullUrl = self.baseUrl + url;

            //video.attr("src", fullUrl);
            //video.load();

            videoJs.src(fullUrl);
            self.player.load();
        }

        function changeTitle(title) {

            var element = $("title");

            element.text = title
        }

        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        self.videoPlayer = $(player);
        self.videoSelector = $(selector);

        var queryStringSelection = getParameterByName("video");
        var initialSelection = self.videoSelector.val();

        self.videoSelection = (queryStringSelection.length > 1) ? queryStringSelection : initialSelection;

        self.videoMetaData = {
            carnage: {
                url: "carnage_on_the_slopes.mp4",
                title: "Carnage on the Slopes"
            },
            tennis: {
                url: "tennis_demo.mp4",
                title: "Tennis GoPro Demo"
            },
            zombie: {
                url: "zombie_defense.mp4",
                title: "Zombie Defense Training Camp"
            },
            teddy: {
                url: "teddy.mp4",
                title: "Teddy"
            },
            fryNight: {
                url: "fry_night.mp4",
                title: "Friday Night Fish Fry"
            }
        };

        changeVideo(self.videoSelection);

        self.videoSelector.change(function () {
            changeVideo(self.videoSelector.val())
        });

    }

    var player = $("#videoPlayer");
    var selector = $("#videoSelector");

    videoPageClass(player, selector)
});