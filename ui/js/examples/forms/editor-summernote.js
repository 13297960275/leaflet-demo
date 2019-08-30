/**
 * UI v1.1.0
 * Copyright 2017-2018 Muyao
 * Licensed under the Muyao License 1.0 
 */
(function (document, window, $) {
    'use strict';

    window.edit = function () {
        $('.click2edit').summernote($.po('summernote', {
            lang: 'zh-CN'
        }));
    };
    window.save = function () {
        $('.click2edit').destroy();
    };

})(document, window, jQuery);
