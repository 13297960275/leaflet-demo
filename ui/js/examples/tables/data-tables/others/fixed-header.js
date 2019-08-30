/**
 * UI v1.1.0
 * Copyright 2017-2018 Muyao
 * Licensed under the Muyao License 1.0 
 */
(function (window, document, $) {
    'use strict';

    var table = $('#exampleFixedHeader').DataTable($.po('dataTable', {
        pagingType: 'full_numbers',
        fixedHeader: {
            header: true,
            headerOffset: 0
        }
    }));

    if (Breakpoints.is('xs')) {
        table.fixedHeader.disable();
    }

    Breakpoints.on('xs', 'leave', function () {
        table.fixedHeader.enable();
    });

    Breakpoints.on('sm', 'leave', function () {
        table.fixedHeader.disable();
    });

})(window, document, jQuery);