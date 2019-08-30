/**
 * UI v1.1.0
 * Copyright 2017-2018 Muyao
 * Licensed under the Muyao License 1.0 
 */
(function (document, window, $) {
    'use strict';

    App.extend({
        handleProject: function () {
            $(document).on('click', '[data-tag=project-delete]', function (e) {
                var $target = $(e.target);

                parent.layer.alert("您确定要删除这个项目吗？", {icon: 4}, function (index) {
                    $target.closest('.list-group-item').remove();
                    parent.layer.close(index);
                });
            });
        },
        run: function (next) {
            this.handleProject();

            next();
        }
    });

    App.run();

})(document, window, jQuery);
