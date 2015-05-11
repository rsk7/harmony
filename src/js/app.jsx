var $        = require("jquery");
var React    = require("react");
var Harmony  = require("./harmony.js");
var Keyboard = require("./keyboard.js");
var Board    = require("./Board/board.jsx");

var initialize = function() {
	var harmony = new Harmony();
	var keyboard = new Keyboard(harmony);
	React.render(<Board/>, document.getElementById("harmony"));
	keyboard.setup($(window));
	window.harmony = harmony;
};

$(initialize);




