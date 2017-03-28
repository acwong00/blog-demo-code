var messageTemplate = require('html!../templates/messageTemplate.html');

var MessageView = Backbone.View.extend({
    tagName: 'div',

    template: _.template(messageTemplate),

    initialize: function (model) {
        var defaults = {
            messages: "",
            color: "rgb(57, 219, 31)",
            link: ""
        };

        this.model = $.extend(defaults, model);
    },

    render: function () {
        this.$el.html(this.template(this.model));
        return this;
    }
});

module.exports = MessageView;