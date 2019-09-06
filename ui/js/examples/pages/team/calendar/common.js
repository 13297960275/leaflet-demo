
(function (document, window, $) {
    'use strict';

    window.calendar = {
        handleSelective: function () {
            var member = [{
                id: 'uid_1',
                name: '刘松洋',
                avatar: '../../../../../img/portraits/1.jpg'
            }, {
                id: 'uid_2',
                name: '邓艳红',
                avatar: '../../../../../img/portraits/2.jpg'
            }, {
                id: 'uid_3',
                name: '张润展',
                avatar: '../../../../../img/portraits/3.jpg'
            }, {
                id: 'uid_4',
                name: '李吉琴',
                avatar: '../../../../../img/portraits/4.jpg'
            }];


            var items = [{
                id: 'uid_1',
                name: '赵振宁',
                avatar: '../../../../../img/portraits/1.jpg'
            }, {
                id: 'uid_2',
                name: '陈宝荣',
                avatar: '../../../../../img/portraits/2.jpg'
            }];

            $('[data-plugin="jquery-selective"]').selective({
                namespace: 'addMember',
                local: member,
                selected: items,
                buildFromHtml: false,
                tpl: {
                    optionValue: function (data) {
                        return data.id;
                    },
                    frame: function () {
                        return '<div class="' + this.namespace + '">' +
                            this.options.tpl.items.call(this) +
                            '<div class="' + this.namespace + '-trigger">' +
                            this.options.tpl.triggerButton.call(this) +
                            '<div class="' + this.namespace + '-trigger-dropdown">' +
                            this.options.tpl.list.call(this) +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    },
                    triggerButton: function () {
                        return '<div class="' + this.namespace + '-trigger-button"><i class="wb-plus"></i></div>';
                    },
                    listItem: function (data) {
                        return '<li class="' + this.namespace + '-list-item"><img class="avatar" src="' + data.avatar + '">' + data.name + '</li>';
                    },
                    item: function (data) {
                        return '<li class="' + this.namespace + '-item"><img class="avatar" src="' + data.avatar + '" title="' + data.name + '">' +
                            this.options.tpl.itemRemove.call(this) +
                            '</li>';
                    },
                    itemRemove: function () {
                        return '<span class="' + this.namespace + '-remove"><i class="wb-minus-circle"></i></span>';
                    },
                    option: function (data) {
                        return '<option value="' + this.options.tpl.optionValue.call(this, data) + '">' + data.name + '</option>';
                    }
                }
            });
        },
    };

})(document, window, jQuery);