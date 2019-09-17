
(function (window, document, $) {
    "use strict";

    $('#dataTableExample').DataTable($.po('dataTable', {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "http://www.marsgis.cn/employee/all",
            "dataType": "jsonp"
        },
        "deferLoading": 57
    }));

})(window, document, jQuery);

