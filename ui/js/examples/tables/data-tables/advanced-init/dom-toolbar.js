
(function (window, document, $) {
    "use strict";

    $('#dataTableExample').dataTable($.po('dataTable', {
        "dom": '<"dt-dom-toolbar">frtip'
    }));

    $("div.dt-dom-toolbar").html('<b class="text-danger">自定义文字、图片等等</b>');

})(window, document, jQuery);

