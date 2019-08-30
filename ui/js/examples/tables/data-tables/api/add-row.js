/**
 * UI v1.1.0
 * Copyright 2017-2018 Muyao
 * Licensed under the Muyao License 1.0 
 */
(function (window, document, $) {
    "use strict";

    var t = $('#dataTableExample').DataTable($.po('dataTable')), counter = 1;

    $(document).on('click', '#DTAddRow', function () {
        t.row.add([
            counter + '.1',
            counter + '.2',
            counter + '.3',
            counter + '.4',
            counter + '.5'
        ]).draw(false);

        counter++;
    });

    // 自动添加第一行的数据
    $('#DTAddRow').click();

})(window, document, jQuery);

