var Backbone  = require("backbone");
var Sound     = require("./sound.js");
var WaveTypes = ["sine", "sawtooth", "triangle", "square"];

var zeroToOne = function(value) {
	return (value < 0) ? 0 : (value > 1) ? 1 : value;
};

var Note = Backbone.Model.extend({
	defaults: {
		note: null,
		freq: null,
		octv: null,
		on  : false
	},

	initialize: function() {
		this.sound = new Sound();
	},

	setWaveType: function(waveType) {
		this.sound.waveType = waveType;
	},

	setWaveTable: function(waveTable) {
		this.sound.setWaveTable(waveTable);
	},

	setGain: function(gain) {
		this.sound.amplitude = zeroToOne(gain);
	},

	setAttackTime: function(attackTime) {
		this.sound.attackTime = zeroToOne(attackTime);
	},

	setReleaseTime: function(releaseTime) {
		this.sound.releaseTime = zeroToOne(releaseTime);
	},

	play: function() {
		if(!this.get("on")) {
			this.sound.play(this.get("freq"));
			this.set("on", true);
		}
	},

	stop: function() {
		if(this.get("on")) {
			this.set("on", false);
			this.sound.stop();
		}
	}
}, {
	WaveTypes: WaveTypes
});

module.exports = Note;




