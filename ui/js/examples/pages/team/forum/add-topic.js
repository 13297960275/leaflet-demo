/**
 * UI v1.1.0
 * Copyright 2017-2018 Muyao
 * Licensed under the Muyao License 1.0 
 */
(function (document, window, $) {
    'use strict';

    App.extend({
        run: function (next) {
            $('.markdown-edit').markdown({
                language: 'zh',
                iconlibrary: 'fa'
            });

            next();
        }
    });

    App.run();

})(document, window, jQuery);
