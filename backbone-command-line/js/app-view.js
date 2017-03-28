var CommandView = require("./command-view.js");
var CommandCollection = require("./command-collection.js");
var MessageView = require("./message-view.js");

var AppView = Backbone.View.extend({
    el: '#terminal',

    events: {
        'click': 'inputFocus',
        'keypress #commandInput': 'runCommand'
    },

    errorMessage: [{
        message: "I'am sorry, there is no such command.",
        color: "red"
    }],

    initialize: function(commands, prompt, greeting) {
        // 获得 DOM 对象
        this.$printEl = this.$('#terminalPrint');
        this.$input = this.$('#commandInput');
        this.$command = this.$('#command');

        // 初始化命令输入行
        this.commandView = new CommandView(prompt);
        this.$command.prepend(this.commandView.render().el);

        this.messages = greeting;
        this.renderMessage();

        this.collection = new CommandCollection(commands);
    },

    inputFocus: function() {
        // 点击鼠标输入框获得焦点
        this.$input.trigger('focus');
    },

    runCommand: function(e) {
        // 输出信息超过30行自动删除
        if (this.$printEl.children('div').length > 30) {
            var len = this.$printEl.children('div').length - 30;
            for (var i = 0; i < len; i++) {
                this.$printEl.children('div').eq(i).remove();
            }
        }

        if (e.which === 13) {
            // 打印输入的命令
            var value = this.$input.val().trim();
            this.$printEl.append("<div>" + this.commandView.prompt + " " + value + "</div>");
            this.$input.val('');

            if (value === '') {
                return;
            }


            if (this.collection.findWhere({
                    command: value
                })) {
                // 获得相应命令对应的信息
                this.model = this.collection.findWhere({
                    command: value
                });
                this.messages = this.model.get("messages");
            } else {
                this.messages = this.errorMessage;
            }
            this.renderMessage();
        }
    },

    renderMessage: function(value) {
        for (var i = 0; i < this.messages.length; i++) {
            this.messageView = new MessageView(this.messages[i]);
            this.$printEl.append(this.messageView.render().el);
        }
    }
});

module.exports = AppView;