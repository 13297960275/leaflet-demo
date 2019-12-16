
(function (window, document, $) {
    "use strict";

    $('#dataTableExample').DataTable($.po('dataTable', {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "http://www.marsgis.cn/employee/all",
            "dataType": "jsonp",
            "data": function (d) {
                d.myKey = "myValue";
                // d.custom = $('#myInput').val();
                // ……
            }
        }
    }));

})(window, document, jQuery);

