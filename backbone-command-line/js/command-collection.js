var CommandModel = require("./command-model.js");

var CommandCollection = Backbone.Collection.extend({
    model: CommandModel
});

module.exports = CommandCollection;