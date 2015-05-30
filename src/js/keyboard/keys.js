var _ = require("underscore");
var manager = require("../state/buttonmanager.js");
var keycodes = require("./data/keycodedata.js").keycodes;

var shiftActionExists = function(character) {
	return _.find(manager.state(), {key: "shift-" + character});
};

var getKey = function(event) {
	var character = keycodes[event.which];
	return (event.shiftKey && shiftActionExists(character)) ?
		"shift-" + character : 
		character;
};

var dispatch = function(event, actionNameProvider) {
	var actionData = _.find(manager.state(), {key: getKey(event)});
	if(actionData && actionNameProvider(actionData)) {
		manager.dispatch(actionNameProvider(actionData), actionData);
	}
};

var keydown = function(event) {
	dispatch(event, function(actionData) {
		return actionData.action.start;
	});
};

var keyup = function(event) {
	dispatch(event, function(actionData) {
		return actionData.action.end;
	});
};

module.exports = {
	keyup: keyup,
	keydown: keydown
};
