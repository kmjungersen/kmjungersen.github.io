/**
 * Created by kmjungersen on 9/1/15.
 */

$(function () {

    function prepareTooltips() {

        var paginationTabs = $(".onepage-pagination").find("a");

        $.each(paginationTabs, function (i, e) {

            var element = $(e);
            var index = element.attr("data-index");

            var tooltipData = panelInfo[index].tooltip;

            element.addClass("tooltipped");
            element.attr("data-position", "left");
            element.attr("data-tooltip", tooltipData);
        });

        $(".tooltipped").tooltip({
            delay: 0
        });
    }

    var panelInfo = {
        "1": {
            tooltip: "Hello"
        },
        "2": {
            tooltip: "Work"
        },
        "3": {
            tooltip: "Play"
        },
        "4": {
            tooltip: "School"
        },
        "5": {
            tooltip: "Github"
        },
        "6": {
            tooltip: "Contact"
        }
    };

    prepareTooltips();


    function stickyFooter(footerElement) {

        var self = this;
        self.element = $(footerElement);
        self.viewWindow = $(window);

        placeFooter(self);

        self.viewWindow.resize(function () {
            placeFooter(self)
        });

        function placeFooter(self) {
            var windowHeight = self.viewWindow.height();
            var elementHeight = self.element.height();

            var difference = windowHeight - elementHeight;

            element.css("top", difference);
        }
    }

    var footerElement = $(".page-footer");
    stickyFooter(footerElement);

});