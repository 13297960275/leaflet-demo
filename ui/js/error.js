/**
 * UI v1.1.0
 * Copyright 2017-2018 Muyao
 * Licensed under the Muyao License 1.0 
 */
(function (window, document) {
    'use strict';

    var btn;

    if (typeof $ === 'undefined') {
        btn = document.getElementById('closeTab');

        btn.innerHTML = '退回上一页';

        btn.onclick = function () {
            history.go(-1);
        };
    } else if (typeof $.site.contentTabs !== 'undefined') {
        $(document).on('click', '#closeTab', function () {
            $.site.contentTabs.closeTab();
        });
    }

})(window, document);