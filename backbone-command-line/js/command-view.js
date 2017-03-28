var commandTemplate = require('html!../templates/commandTemplate.html');

var CommandView = Backbone.View.extend({
    tagName: 'span',

    template: _.template(commandTemplate),

    initialize: function (prompt) {
        this.prompt = prompt;
        this.render();
    },

    render: function () {
        this.$el.html(this.template({prompt: this.prompt}));
        return this;
    }

});

module.exports = CommandView;