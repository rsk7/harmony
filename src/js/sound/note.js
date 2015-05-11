var _				= require("underscore");
var Backbone        = require("backbone");
var Sound           = require("./sound.js");
var Colors  		= require("../data/colors.js");
var WaveTypes       = ["sine", "sawtooth", "triangle", "square"];

var zeroToOne = function(value) {
	return (value < 0) ? 0 : (value > 1) ? 1 : value;
};

var keyBindingFinder = function(keyBinding, noteName) {
	return _.findWhere(keyBinding, {note: noteName});
};

var Note = Backbone.Model.extend({
	defaults: {
		note 		: null,
		freq		: null,
		octv 		: null,
		on  		: false,
		keyBinding  : null,
		onColor		: "#E0E0E0",
		offColor	: "#FFFFFF",

		// this is the left or right data set for keybinding
		keyBindings    : null
	},

	initialize: function() {
		this.sound = new Sound();
		this.set("onColor", Colors.randomColor());
		this.listenTo(this, "change:note", this.updateBinding);
		this.updateBinding();
	},

	updateBinding: function() {
		var keyBindings = this.get("keyBindings");
		var keyBinding = _.findWhere(keyBindings, {note: this.get("note")});
		this.set("keyBinding", keyBinding.displayName || keyBinding.character);
	},

	setWaveType: function(waveType) {
		this.sound.waveType(waveType);
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
	},

	getState: function() {
		return {
			offColor     : this.get("offColor"),
			onColor 	 : this.get("onColor"),
			noteName	 : this.get("note"),
			keyBinding   : this.get("keyBinding"),
			octaveNumber : this.get("octv"),
			on           : this.get("on")
		}
	}
}, {
	WaveTypes: WaveTypes
});

module.exports = Note;




