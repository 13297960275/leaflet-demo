/**
 * UI v1.1.0
 * Copyright 2017-2018 Muyao
 * Licensed under the Muyao License 1.0 
 */
(function (document, window, $) {
    'use strict';

    $('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
    });

})(document, window, jQuery);