var CommandModel = Backbone.Model.extend({
    default: {
        name: '',
        messages: []
    }
});

module.exports = CommandModel;