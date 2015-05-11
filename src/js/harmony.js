var _ = require("underscore");
var Notes = require("./sound/notes.js");

// music synth (not a synth yet!)
var Harmony = function() {
	this.positions = {
		"left" : Notes.createOctave(3),
		"right": Notes.createOctave(4)
	};

	this.allPositions = [this.positions.left, this.positions.right];
};

Harmony.prototype.getNote = function(noteName, position) {
	return this.positions[position].findWhere({note: noteName});
};

Harmony.prototype.play = function(noteName, position) {
	this.getNote(noteName, position).play();
};

Harmony.prototype.stop = function(noteName, position) {
	this.getNote(noteName, position).stop();
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

module.exports = Harmony;


