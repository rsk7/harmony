var _        = require("underscore");
var Backbone = require("backbone");
var Note     = require("./note.js");
var NoteData = require("../data/notedata.js");

var Notes = Backbone.Collection.extend({
	model: Note,

	createOctave: function(octave) {
		this.octave = octave;
		var noteData = NoteData.get({octave: octave});
		this.reset();
		_.each(noteData, function(data) {
			this.add({
				note: data.name,
				octv: data.octave,
				freq: data.frequency
			});
		}, this);
	},

	setWaveType: function(waveType) {
		this.each(function(note) {
			note.setWaveType(waveType);
		});
	},

	setWaveTable: function(waveTable) {
		this.each(function(note) {
			note.setWaveTable(waveTable);
		});
	},

	setGain: function(gain) {
		this.each(function(note) {
			note.setGain(gain);
		});
	},

	setAttackTime: function(attackTime) {
		this.each(function(note) {
			note.setAttackTime(attackTime);
		});
	},

	setReleaseTime: function(releaseTime) {
		this.each(function(note) {
			note.setReleaseTime(releaseTime);
		});
	},

	switchOctaveUp: function() {
		this.switchOctave(++this.octave);
		this.octave = this.at(0).get("octv");
	},

	switchOctaveDown: function() {
		this.switchOctave(--this.octave);
		this.octave = this.at(0).get("octv");
	},

	switchOctave: function(octave) {
		var noteData = NoteData.get({octave: octave});
		if(noteData !== undefined && noteData.length !== 0) {
			this.each(function(note) {
				var data = _.findWhere(noteData, {name: note.get("note")});
				note.set({
					octv: data.octave,
					freq: data.frequency
				});
			});
		}
	}
}, {
	createOctave: function(octave) {
		var notes = new Notes();
		notes.createOctave(octave);
		return notes;
	}
});

module.exports = Notes;