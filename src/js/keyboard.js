var _ = require("underscore");
var $ = require("jquery");
var KeyCodeData = require("./data/keycodedata.js");
var NoteCharBindingData = require("./data/notecharbindingdata.js");
var Harmony = require("./harmony.js");

var Keyboard = function() {
	this.binding = Harmony.keyBindings;
};

var searchNote = function(binding, character) {
	var noteChar = _.findWhere(binding.left, {character: character});
	if(noteChar !== undefined) {
		return {
			noteName: noteChar.note,
			position: "left"
		};
	}

	noteChar = _.findWhere(binding.right, {character: character});
	if(noteChar !== undefined) {
		return {
			noteName: noteChar.note,
			position: "right"
		};
	}
};

Keyboard.prototype.notePressHandler = function(event) {
	var character = KeyCodeData.KeyNumberName[event.which];
	var notePosition = searchNote(this.binding, character);
	if(notePosition !== undefined) {
		Harmony.play(notePosition.noteName, notePosition.position);
	}
};

Keyboard.prototype.noteReleaseHandler = function(event) {
	var character = KeyCodeData.KeyNumberName[event.which];
	var notePosition = searchNote(this.binding, character);
	if(notePosition !== undefined) {
		Harmony.stop(notePosition.noteName, notePosition.position);
	}
};

// make this more configurable
Keyboard.prototype.octaveSwitchHandler = function(event) {
	var character = KeyCodeData.KeyNumberName[event.which];
	if(event.shiftKey && character === "g") {
		Harmony.switchOctaveUp("left");
	} else if(character === "g") {
		Harmony.switchOctaveDown("left");
	} else if(event.shiftKey && character === "h") {
		Harmony.switchOctaveUp("right");
	} else if(character === "h") {
		Harmony.switchOctaveDown("right");
	}
};

Keyboard.prototype.setup = function(listenToThis) {
	listenToThis.on("keydown", _.bind(this.notePressHandler   , this));
	listenToThis.on("keyup"  , _.bind(this.noteReleaseHandler , this));
	listenToThis.on("keydown", _.bind(this.octaveSwitchHandler, this));
};

module.exports = new Keyboard;