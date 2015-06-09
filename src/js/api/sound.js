var soundContext = new (window.AudioContext || window.webkitAudioContext)();

var sound = function(){
    this.attackTime = 0.75;
    this.releaseTime = 0.75;
    this.amplitude = 0.10;
    this.vco = soundContext.createOscillator();
    this.vca = soundContext.createGain();
    this.vca.gain.value = 0;
    this.vco.connect(this.vca);
    this.vco.start(0);
    this.vca.connect(soundContext.destination);
    this.on = false;
};

sound.prototype.detune = function(d) {
    this.vco.detune.setValueAtTime(d, soundContext.currentTime);
    this.vco.detune.value = d;
};

sound.prototype.freq = function(f){
    this.vco.frequency.setValueAtTime(f, soundContext.currentTime);
    this.vco.frequency.value = f;
};

sound.prototype.waveType = function(waveType) {
    this.vco.type = waveType;
};

var getWaveTableData = function(table) {
    var length = table.real.length;
    var real = new Float32Array(length);
    var imag = new Float32Array(length);
    for(var i = 0; i < length; i++) {
        real[i] = table.real[i];
        imag[i] = table.imag[i];
    }
    return soundContext.createPeriodicWave(real, imag);
};

sound.prototype.setWaveTable = function(table) {
    this.vco.setPeriodicWave(getWaveTableData(table));
};

sound.prototype.envelopeStart = function(){
    var now = soundContext.currentTime;
    var attack = now + this.attackTime;
    this.vca.gain.cancelScheduledValues(now);
    this.vca.gain.setValueAtTime(0, now);
    this.vca.gain.linearRampToValueAtTime(this.amplitude, attack);
};

sound.prototype.envelopeStop = function(callback){
    var now = soundContext.currentTime;
    var release = now + this.releaseTime;
    this.vca.gain.cancelScheduledValues(now);
    this.vca.gain.setValueAtTime(this.amplitude, now);
    this.vca.gain.linearRampToValueAtTime(0, release);
    setTimeout(callback, this.releaseTime * 1000);
};

sound.prototype.play = function(frequency) {
    if(frequency) this.freq(frequency);
    this.on = true;
    this.envelopeStart();
};

sound.prototype.stop = function(){
    this.on = false;
    this.envelopeStop(function() {
        this.vco.disconnect();
        this.vca.disconnect(); 
    }.bind(this));
};

module.exports = sound;

