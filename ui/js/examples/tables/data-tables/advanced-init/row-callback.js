
(function (window, document, $) {
    "use strict";

    $('#dataTableExample').dataTable($.po('dataTable', {
        "createdRow": function (row, data) {
            if (data[5].replace(/[\¥,]/g, '') * 1 > 400000) {
                $('td', row).eq(5).css('font-weight', "bold").css("color", "red");
            }
        }
    }));

})(window, document, jQuery);

