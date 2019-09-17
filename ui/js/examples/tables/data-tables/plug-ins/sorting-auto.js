
(function (window, document, $) {
    "use strict";

    $.fn.dataTable.ext.type.detect.unshift(
        function (d) {
            return d === '低' || d === '中' || d === '高' ?
                'salary-grade' :
                null;
        }
    );

    $.fn.dataTable.ext.type.order['salary-grade-pre'] = function (d) {
        switch (d) {
            case '低':
                return 1;
            case '中':
                return 2;
            case '高':
                return 3;
        }
        return 0;
    };

    $('#dataTableExample').DataTable($.po('dataTable'));

})(window, document, jQuery);

