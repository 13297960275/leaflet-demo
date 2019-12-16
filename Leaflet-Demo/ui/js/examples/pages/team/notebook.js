
(function (window, document, $) {
    'use strict';

    App.extend({
        run: function (next) {
            var $actionBtn = $('.site-action').actionBtn({
                    toggleSelector: '.list-group-item',
                    listSelector: '.site-action-buttons'
                }).data("actionBtn"),
                $noteList = $(".list-group-item");

            $actionBtn.show();

            $(document).on("click", '.site-action-toggle', function (e) {
                if (!$noteList.hasClass("active")) {
                    $('#addNewNote').modal('show');

                    e.stopPropagation();
                } else {
                    $(".list-group-item").removeClass("active");
                    $actionBtn.hide();
                }

            });

            $(document).on("click", ".list-group-item", function () {
                $(this).addClass("active").siblings().removeClass("active");

                if ($(this).hasClass("active")) {
                    $actionBtn.show();
                }
            });

            next();
        }
    });

    App.run();

}(window, document, jQuery));
