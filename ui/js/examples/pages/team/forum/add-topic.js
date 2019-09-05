
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
