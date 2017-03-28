var app = app || {}; // 全局变量

app.CommandModel = Backbone.Model.extend({
    default: {
        name: '',
        messages: []
    }
});