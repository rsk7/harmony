var $ = require("jquery");
var h = require("h-audio");
var React = require("react");
var player = require("./player.js");
var keys = require("./keyboard/keys.js");
var Board = require("./components/board.jsx");

var reactInitialize = function() {
	React.render(<Board/>, document.getElementById("harmony"));
};

var keyboardInitialize = function() {
	$(window).on("keyup", keys.keyup);
	$(window).on("keydown", keys.keydown);
};

var fun = function() {
	window.h = h;
};

var initialize = function() {
	reactInitialize();
	keyboardInitialize();
	player.start();
	fun();
};

$(initialize);




