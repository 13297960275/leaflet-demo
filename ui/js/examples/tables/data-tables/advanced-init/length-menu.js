
(function (window, document, $) {
    "use strict";

    $('#dataTableExample').DataTable($.po('dataTable', {
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    }));

})(window, document, jQuery);

