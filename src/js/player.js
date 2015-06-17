var _ = require("underscore");
var h = require("h-audio");
var manager = require("./state/buttonmanager.js");

var startNotes = function(notesToStart) {
	if(notesToStart && notesToStart.length) {
		h.play(notesToStart);
	}
};

var stopNotes = function(notesToStop) {
	if(notesToStop && notesToStop.length) {
		h.stop(notesToStop);
	}
};

var play = function() {
	var notesBeingPlayed = h.activeNoteIds();
	var notesRequested = manager.getOnNotes();
	var notesAlreadyPlaying = _.intersection(notesRequested, notesBeingPlayed);
	var newNotesToBePlayed = _.difference(notesRequested, notesBeingPlayed);
	var requestedAndBeingPlayed = _.union(notesRequested, notesBeingPlayed);
	var notesToStopPlaying = _.difference(requestedAndBeingPlayed, notesRequested);
	startNotes(newNotesToBePlayed.join(","));
	stopNotes(notesToStopPlaying.join(","));
};

var start = function() {
	manager.addChangeListener(play);
};

var stop = function() {
	manager.removeChangeListener(stop);
};

module.exports = {
	start: start,
	stop: stop
};

