var soundContext = (function(){
    if(typeof window.AudioContext === 'function') {
        return new window.AudioContext();
    } else if (typeof window.webkitAudioContext === 'function') {
        return new window.webkitAudioContext();
    } else {
        throw new Error("Could not context audio");
    }
})();

var sound = function(){
    this.attackTime = 0.1;
    this.releaseTime = 0.5;
    this.amplitude = 1;
    this.vco = soundContext.createOscillator();
    this.vca = soundContext.createGain();
    this.vca.gain.value = 0;
    this.vco.connect(this.vca);
    this.vco.start(0);
    this.vca.connect(soundContext.destination);
    this.on = false;
};

sound.prototype.freq = function(f){
    this.vco.frequency.setValueAtTime(f, soundContext.currentTime);
    this.vco.frequency.value = f;
};

sound.prototype.waveType = function(waveType) {
    this.vco.type = waveType;
};

sound.prototype.setWaveTable = function(table) {
    var length = table.real.length;
    var real = new Float32Array(length);
    var imag = new Float32Array(length);
    for(var i = 0; i < length; i++) {
        real[i] = table.real[i];
        imag[i] = table.imag[i];
    }
    this.vco.setPeriodicWave(soundContext.createPeriodicWave(real, imag));
};

sound.prototype.envelopeStart = function(){
    var now = soundContext.currentTime;
    var attack = now + this.attackTime;
    this.vca.gain.cancelScheduledValues(now);
    this.vca.gain.setValueAtTime(0, now);
    this.vca.gain.linearRampToValueAtTime(this.amplitude, attack);
};

sound.prototype.envelopeStop = function(){
    var now = soundContext.currentTime;
    var release = now + this.releaseTime;
    this.vca.gain.cancelScheduledValues(now);
    this.vca.gain.setValueAtTime(this.amplitude, now);
    this.vca.gain.linearRampToValueAtTime(0, release);
};

sound.prototype.play = function(frequency) {
    this.freq(frequency);
    this.on = true;
    this.envelopeStart();
};

sound.prototype.stop = function(){
    this.on = false;
    this.envelopeStop();
};

module.exports = sound;

