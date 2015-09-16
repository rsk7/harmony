var _ = require("underscore");
var p2p = require("../p2p.js");
var assign = require("object-assign");
var map = require("./data/buttonmap.js");
var colors = require("./data/colors.js");
var emitter = require("events").EventEmitter;

// setting generated attributes
var initialize = _.once(function() {
	map.filter(function(row) {
		return row.data.note;
	}).forEach(function(row) {
		row.onColor = colors.random();
	});
});

var playNote = function(data) {
    var noteRow = map.find(function(note) {
        return note.key === data.key;
    });
	noteRow.on = true;
};

var stopNote = function(data) {
    var noteRow = map.find(function(note) {
        return note.key === data.key;
    });
	delete noteRow.on;
};

var shiftOctaveUp = function(actionData) {
	_.where(map, {group: actionData.data.group})
		.forEach(function(noteRow) {
			noteRow.data.octave++;
		});
};

var shiftOctaveDown = function(actionData) {
	_.where(map, {group: actionData.data.group})
		.forEach(function(noteRow) {
			noteRow.data.octave--;
		});
};

var CHANGE_EVENT = "change";

var ButtonManager = assign({}, emitter.prototype, {
	state: function() {
		initialize();
		return map;
	},

	getOnNotes: function() {
		return _.where(map, {on: true})
			.map(function(row) {
				return row.data.note + row.data.octave
			});
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback)  {
		this.removeListener(callback);
	}
});

p2p.addReceiver(function(msg) {
    if(msg.type === "button-dispatch") {
        dispatch(msg.actionName, msg.data);
    }
});

var dispatch = function(actionName, data) {
	var ACTION_MAP = {
		"play-note": playNote,
		"stop-note": stopNote,
		"shift-octave-down": shiftOctaveDown,
		"shift-octave-up": shiftOctaveUp
	};

	ACTION_MAP[actionName](data);
	ButtonManager.emitChange();
};


ButtonManager.dispatch = function(actionName, data) {
    p2p.send({
        type: "button-dispatch",
        actionName: actionName,
        data: data
    });

    dispatch(actionName, data);
};

module.exports = ButtonManager;
