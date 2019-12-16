
(function (window, document, $) {
    "use strict";

    var lastIdx = null,
        table = $('#dataTableExample').DataTable($.po('dataTable'));

    $(document).on('mouseover', '#dataTableExample tbody td', function () {
        var colIdx = table.cell(this).index().column;
        if (colIdx !== lastIdx) {
            $(table.cells().nodes()).removeClass('highlight');
            $(table.column(colIdx).nodes()).addClass('highlight');
        }
    })
        .on('mouseleave', '#dataTableExample tbody', function () {
            $(table.cells().nodes()).removeClass('highlight');
        });

})(window, document, jQuery);

