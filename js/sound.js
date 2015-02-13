/* global define, window */
define([], function(){
    var soundContext = (function(){
        if(typeof window.AudioContext === 'function') {
            return new window.AudioContext();
        } else if (typeof window.webkitAudioContext === 'function') {
            return new window.webkitAudioContext();
        } else {
            throw new Error("Could not context audio");
        }
    })();
    
    var sound = function(waveTable){
        this.attackTime = 0.1;
        this.releaseTime = 0.1;
        this.vco = soundContext.createOscillator();
        this.setWaveTable(waveTable);
        this.vca = soundContext.createGain();
        this.vca.gain.value = 0;
        this.vco.connect(this.vca);
        this.vco.start(0);
        this.vca.connect(soundContext.destination);
        this.on = false;
    };
    
    sound.prototype.setWaveTable = function(waveTable) {
        if(waveTable && this.vco) {
            var wave = soundContext.createPeriodicWave(waveTable.real, waveTable.imag);
            this.vco.setPeriodicWave(wave);
        }
    };
    
    sound.prototype.freq = function(f){
        this.vco.frequency.setValueAtTime(f, soundContext.currentTime);
        this.vco.frequency.value = f;
    };
    
    sound.prototype.waveType = function(waveType) {
        this.vco.type = waveType;
    };
    
    sound.prototype.envelopeStart = function(){
        var now = soundContext.currentTime;
        var attack = now + this.attackTime;
        this.vca.gain.cancelScheduledValues(now);
        this.vca.gain.setValueAtTime(0, now);
        this.vca.gain.linearRampToValueAtTime(1, attack);
    };
    
    sound.prototype.envelopeStop = function(){
        var now = soundContext.currentTime;
        var release = now + this.releaseTime;
        this.vca.gain.cancelScheduledValues(now);
        this.vca.gain.setValueAtTime(1, now);
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
    
    var create = function(waveTable) {
        return new sound(waveTable);
    };
        
    return { create: create };
});