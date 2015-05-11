var $        = require("jquery");
var React    = require("react");
var Keyboard = require("./keyboard.js");
var Board    = require("./Board/board.jsx");
var Harmony  = require("./harmony.js");

var initialize = function() {
	React.render(<Board/>, document.getElementById("harmony"));
	Keyboard.setup($(window));

	// for fun
	window.harmony = Harmony;
};

$(initialize);




