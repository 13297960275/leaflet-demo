/**
 * UI v1.1.0
 * Copyright 2017-2018 Muyao
 * Licensed under the Muyao License 1.0 
 */
(function (document, window, $) {
    'use strict';


    App.run();

    $(document).on('click.panel.transition', '[data-type]', function () {
        var type = $(this).data('type');

        $('#exampleTransition').data('animateList').run(type);
    });

})(document, window, jQuery);