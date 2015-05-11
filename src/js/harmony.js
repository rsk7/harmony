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
	this.setGain(this.configuration.gain);
	this.setAttackTime(this.configuration.attack);
	this.setReleaseTime(this.configuration.release);
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
	this.configuration.gain = gain;
	_.each(this.allPositions, function(noteCollection) {
		noteCollection.setGain(gain);
	});
};

Harmony.prototype.setAttackTime = function(attackTime) {
	this.configuration.attackTime = attackTime;
	_.each(this.allPositions, function(noteCollection) {
		noteCollection.setAttackTime(attackTime);
	});
};

Harmony.prototype.setReleaseTime = function(releaseTime) {
	this.configuration.releaseTime = releaseTime;
	_.each(this.allPositions, function(noteCollection) {
		noteCollection.setReleaseTime(releaseTime);
	});
};

Harmony.prototype.setWaveType = function(waveType) {
	this.configuration.waveType = waveType;
	_.each(this.allPositions, function(noteCollection) {
		noteCollection.setWaveType(waveType);
	});
};

Harmony.prototype.setWaveTable = function(waveTableName) {
	this.configuration.waveTable = waveTableName;
	var waveTable = WaveTableMap[waveTableName];
	if(waveTable === undefined) return;
	_.each(this.allPositions, function(noteCollection) {
		noteCollection.setWaveTable(waveTable);
	});
};

Harmony.prototype.switchOctaveUp = function(position) {
	this.positions[position].switchOctaveUp();
	this.signalChange();
};

Harmony.prototype.switchOctaveDown = function(position) {
	this.positions[position].switchOctaveDown();
	this.signalChange();
};


// ????
// yup, just one
Harmony.prototype.addChangeListener = function(callback) {
	this.signalChange = callback;
};

Harmony.prototype.removeChangeListener = function(callback) {
	this.signalChange = null;	
};


Harmony.prototype.configuration = {
	waveTypes: ["sine", "square", "sawtooth", "triangle"],
	waveType: "sine",
	gain: 0.15,
	attack: 0.1,
	release: 0.1,
	waveTables: ["none", "wurlitzer", "wurlitzer2", "organ2", "warmsaw", "piano", "celesta"],
	waveTable: "none"
};

// wave table map
var WaveTableMap = {
	"wurlitzer"	: require("./data/wavetables/wurlitzer.js"),
	"wurlitzer2": require("./data/wavetables/wurlitzer2.js"),
	"organ2"    : require("./data/wavetables/organ2.js"),
	"warmsaw"   : require("./data/wavetables/warmsaw.js"),
	"piano"     : require("./data/wavetables/piano.js"),
	"celesta"   : require("./data/wavetables/celesta.js")
};

module.exports = new Harmony;


