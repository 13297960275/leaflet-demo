
(function (document, window, $) {
    'use strict';

    var article = {
        affixHandle: function () {
            $('#articleAffix').affix({
                offset: {
                    top: 210
                }
            });
        },
        scrollHandle: function () {
            $('body').scrollspy({
                target: '#articleAffix'
            });
        },
        run: function () {
            this.scrollHandle();
            this.affixHandle();

        }
    };

    article.run();

})(document, window, jQuery);
