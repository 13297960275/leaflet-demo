/**
 * UI v1.1.0
 * Copyright 2017-2018 Muyao
 * Licensed under the Muyao License 1.0 
 */
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
