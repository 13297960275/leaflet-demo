
(function (window, document, $) {
    "use strict";

    $.extend(true, $.fn.dataTable.defaults, $.po('dataTable'), {
        "searching": false,
        "ordering": false
    });

    $('#dataTableExample').DataTable();

})(window, document, jQuery);

