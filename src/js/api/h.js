// HARMOVY
var _ = require("underscore");
var Sound = require("./sound.js");
var NoteDictionary = require("./data/notedata.js");

var activeNotes = {};

var config = {
    gain: 0.25,
    attack: 0.1,
    release: 0.1,
    detune: null,
    wave: {
        type: "sine",
        data: null // wavetable data
    }
};

var getNoteIds = function(noteDsl) {
    return noteDsl.split(",").map(function(id) {
        return id.trim();  
    });
};

var getNote = function(noteId) {
    var name = noteId.slice(0, -1);
    var octave = noteId.slice(-1);
    return NoteDictionary.getNote({
        name: name,
        octave: parseInt(octave)
    });
};

var getActiveNote = function(noteId) {
    return {noteId: noteId, note: activeNotes[noteId]};
};

var getId = function(noteData) {
    return noteData.name + noteData.octave;
};

var playNote = function(noteData) {
    var sound = new Sound();
    var noteId = getId(noteData);
    activeNotes[noteId] = sound;
    configure(getActiveNote(noteId));
    sound.play(noteData.frequency);
};

var stopNote = function(activeNote) {
    if(activeNote) activeNote.note.stop();
    delete activeNotes[activeNote.noteId];
};

var configure = function(activeNote) {
    var sound = activeNote.note;
    sound.amplitude = config.gain;
    sound.attackTime = config.attack;
    sound.releaseTime = config.release;
    sound.detune(config.detune);
    sound.waveType(config.wave.type);
    if(config.wave.data) sound.setWaveTable(config.wave.data);
};

var getActiveNotes = function() {
    return _.keys(activeNotes).map(function(key) {
        return {noteId: key, note: activeNotes[key]};
    });
};

var h = {
    play: function(dsl) {
        getNoteIds(dsl).map(getNote).forEach(playNote);
    },

    stop: function(dsl) {
        if(dsl) getNoteIds(dsl).map(getActiveNote).forEach(stopNote);
        else getActiveNotes().forEach(stopNote);
    },

    configure: function(options) {
       config = _.extend(config, options);
       getActiveNotes().forEach(configure);
    },

    configuration: function() {
        return config;
    },

    activeNotes: function() {
        return activeNotes;
    },

    activeNoteIds: function() {
        return _.keys(activeNotes);
    }
};

module.exports = h;