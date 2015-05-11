var _ = require("underscore");
var Notes = require("./sound/notes.js");
var NoteCharBindingData = require("./data/notecharbindingdata.js");

// music synth (not a synth yet!)
var Harmony = function() {
	// there's another binding, so just picking the first one for now
	this.keyBindings = NoteCharBindingData.typeA;

	this.positions = {
		"left" : Notes.createOctave(3, this.keyBindings.left),
		"right": Notes.createOctave(4, this.keyBindings.right)
	};

	this.allPositions = [this.positions.left, this.positions.right];
};

Harmony.prototype.getNote = function(noteName, position) {
	return this.positions[position].findWhere({note: noteName});
};

// bit of hack because of the data model
Harmony.prototype.getNoteNameByKey = function(keyName) {
	var noteChar = _.findWhere(this.keyBindings.left, {character: keyName});
	noteChar = noteChar || _.findWhere(this.keyBindings.left, {displayName: keyName});
	var position = "left";
	if(noteChar === undefined) {
		noteChar = _.findWhere(this.keyBindings.right, {character: keyName});
		noteChar = noteChar || _.findWhere(this.keyBindings.right, {displayName: keyName});
		position = "right";
	}
	return {noteName: noteChar.note, position: position};
};

Harmony.prototype.play = function(noteName, position) {
	this.getNote(noteName, position).play();
	this.signalChange();
};

Harmony.prototype.playByKey = function(keyName) {
	var noteData = this.getNoteNameByKey(keyName);
	this.play(noteData.noteName, noteData.position);
};

Harmony.prototype.stop = function(noteName, position) {
	this.getNote(noteName, position).stop();
	this.signalChange();
};

Harmony.prototype.stopByKey = function(keyName) {
	var noteData = this.getNoteNameByKey(keyName);
	this.stop(noteData.noteName, noteData.position);
};

Harmony.prototype.setGain = function(gain) {
	_.each(this.allPositions, function(noteCollection) {
		noteCollection.setGain(gain);
	});
};

Harmony.prototype.setAttackTime = function(attackTime) {
	_.each(this.allPositions, function(noteCollection) {
		noteCollection.setAttackTime(attackTime);
	});
};

Harmony.prototype.setReleaseTime = function(releaseTime) {
	_.each(this.allPositions, function(noteCollection) {
		noteCollection.setReleaseTime(releaseTime);
	});
};

Harmony.prototype.setWaveType = function(waveType) {
	_.each(this.allPositions, function(noteCollection) {
		noteCollection.setWaveType(waveType);
	});
};

Harmony.prototype.setWaveTable = function(waveTable) {
	_.each(this.allPositions, function(noteCollection) {
		noteCollection.setWaveTable(waveTable);
	});
};

Harmony.prototype.switchOctaveUp = function(position) {
	this.positions[position].switchOctaveUp();
};

Harmony.prototype.switchOctaveDown = function(position) {
	this.positions[position].switchOctaveDown();
};


// ????
// yup, just one
Harmony.prototype.addChangeListener = function(callback) {
	this.signalChange = callback;
};

Harmony.prototype.removeChangeListener = function(callback) {
	this.signalChange = null;	
};

module.exports = new Harmony;


