/**
 * UI v1.1.0
 * Copyright 2017-2018 Muyao
 * Licensed under the Muyao License 1.0 
 */
(function (document, window, $) {
    'use strict';

    if ($('.list-group[data-plugin="nav-tabs"]').length) {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $(e.target).addClass('active').siblings().removeClass('active');
        });
    }

})(document, window, jQuery);