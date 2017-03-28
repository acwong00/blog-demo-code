var app = app || {};

app.CommandView = Backbone.View.extend({
    tagName: 'span',

    template: _.template($('#commandTemplate').html()),

    initialize: function (prompt) {
        this.prompt = prompt;
        this.render();
    },

    render: function () {
        this.$el.html(this.template({prompt: this.prompt}));
        return this;
    }

});