
(function (window, document, $) {
    "use strict";

    $('#dataTableExample').DataTable($.po('dataTable', {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "http://www.marsgis.cn/employee/all/post",
            "crossDomain": true,
            "type": "POST",
            "dataType": "json"
        },
        "columns": [
            {"data": "name"},
            {"data": "title"},
            {"data": "base"},
            {"data": "age"},
            {"data": "hireDate"},
            {"data": "salary"}
        ]
    }));

})(window, document, jQuery);

