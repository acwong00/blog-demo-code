var app = app || {};

app.CommandCollection = Backbone.Collection.extend({
    model: app.CommandModel
});