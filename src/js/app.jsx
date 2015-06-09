var $ = require("jquery");
var React = require("react");
var h = require("./api/h.js");
var keys = require("./keyboard/keys.js");
var player = require("./player.js");
var Board = require("./components/board.jsx");
var Oscilloscope = require("./components/oscilloscope.jsx");
// var analyser = require("./api/analyser.js");

var reactInitialize = function() {
	React.render(<Board/>, document.getElementById("harmony"));
	// React.render(<Oscilloscope/>, document.getElementById("harmony"));
};

var keyboardInitialize = function() {
	$(window).on("keyup", keys.keyup);
	$(window).on("keydown", keys.keydown);
};

var webcomponentsInitialize = function() {
	document.addEventListener("WebComponentsReady", function() {
		document.querySelector("#gainslider").addEventListener("change", function(event) {
			h.configure({ gain: event.target.value / 10000 });
		});

		document.querySelector("#attackslider").addEventListener("change", function(event) {
			h.configure({ attack: event.target.value / 1000 });
		});

		document.querySelector("#releaseslider").addEventListener("change", function(event) {
			h.configure({ release: event.target.value / 1000 });
		});
	});
};

var fun = function() {
	window.h = h;
};

var initialize = function() {
	reactInitialize();
	keyboardInitialize();
	webcomponentsInitialize();
	player.start();
	fun();
};

$(initialize);




