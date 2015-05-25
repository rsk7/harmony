var oscillatorTypes = {
    "sine"     : "sine",
    "square"   : "square",
    "sawtooth" : "sawtooth",
    "triangle" : "triangle",
    "custom"   : "custom"
};

module.exports = {
    gain: 0.25,
    attack: 0.1,
    release: 0.1,
    detune: null,
    wave: {
        type: oscillatorTypes.sine,
        data: null // when custom use for waveTable
    }
};

