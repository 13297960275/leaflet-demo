
(function (document, window) {
    'use strict';

    App.extend({
        run: function (next) {
            window.calendar.handleSelective();

            next();
        }
    });

    App.run();

})(document, window);