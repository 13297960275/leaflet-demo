
(function (window, document, $) {
    "use strict";

    var table = $('#dataTableExample').DataTable($.po('dataTable'));

    $(document).on('click', '#dataTableExample tbody tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $(document).on('click', '#DTDelRow', function () {
        table.row('.selected').remove().draw(false);
    });

})(window, document, jQuery);

