/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var AppView = __webpack_require__(1)

	$(function () {
	    var commands = [
	{
	    command: "test",
	    messages: [
	    {
	        message: "testtesttest",
	        color: "white"
	    },
	    {
	        message: "testtesttest",
	        color: "white"
	    }]
	},
	{
	    command: "test2",
	    messages: [
	        {
	            message: "test2test2test2test2",
	            color: "yellow"
	        },
	        {
	            message: "test2test2test2test2",
	            color: "yellow",
	            link: "http://acwong.org"
	        }
	    ]
	}],

	    greeting = [
	    {
	        message: "Welcome",
	    }];

	    new AppView(commands, "test >", greeting);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var CommandView = __webpack_require__(2);
	var CommandCollection = __webpack_require__(3);
	var MessageView = __webpack_require__(4);

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var commandTemplate = __webpack_require__(6);

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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var CommandModel = __webpack_require__(5);

	var CommandCollection = Backbone.Collection.extend({
	    model: CommandModel
	});

	module.exports = CommandCollection;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var messageTemplate = __webpack_require__(7);

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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var CommandModel = Backbone.Model.extend({
	    default: {
	        name: '',
	        messages: []
	    }
	});

	module.exports = CommandModel;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<label><%- prompt %></label>";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div <%= color ? ('style=\"color:' + color + '\"') : '' %>>\r\n    <%= link ? ('<a href=\"' + link + '\">') : '' %>\r\n        <%= message %>\r\n    <%= link ? ('</a>') : '' %>\r\n</div>";

/***/ }
/******/ ]);