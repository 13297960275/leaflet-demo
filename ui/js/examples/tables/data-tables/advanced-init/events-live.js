/**
 * UI v1.1.0
 * Copyright 2017-2018 Muyao
 * Licensed under the Muyao License 1.0 
 */
(function (window, document, $) {
    "use strict";

    var table = $('#dataTableExample').DataTable($.po('dataTable'));

    App.run();

    $(document).on('click', '#dataTableExample tbody tr', function () {
        var data = table.row(this).data();
        toastr.info('您单击了"' + data[0] + '"的行');
    });

})(window, document, jQuery);

