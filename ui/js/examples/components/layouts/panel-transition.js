
(function (document, window, $) {
    'use strict';


    App.run();

    $(document).on('click.panel.transition', '[data-type]', function () {
        var type = $(this).data('type');

        $('#exampleTransition').data('animateList').run(type);
    });

})(document, window, jQuery);