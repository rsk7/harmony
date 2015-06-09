var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount; 
var timeDataArray = new Uint8Array(bufferLength);
var freqDataArray = new Uint8Array(bufferLength);


var oscillator = audioCtx.createOscillator();
oscillator.type = "square";
oscillator.connect(analyser);
analyser.connect(audioCtx.destination);
// oscillator.start(0);
analyser.getByteTimeDomainData(timeDataArray);

module.exports = {
	timeDomainDataArray: function() {
		return timeDataArray;
	},

	bufferLength: function() {
		return bufferLength;
	},

	addChangeListener: function() {

	},

	removeChangeListener: function() {

	}
};


// var canvasCtx


// // distortion stuff
// function makeDistortionCurve(amount) {
// 	var k = typeof amount === 'number' ? amount : 50;
// 	var n_samples = 44100;
// 	var curve = new Float32Array(n_samples);
// 	var deg = Math.PI / 180;
// 	for(var i = 0; i < n_samples; i++) {
// 		var x = i * 2 / n_samples - 1;
// 		curve[i] = ( 3 + k ) * x * 20 * deg / (Math.PI + k * Math.abs(x));
// 	}
// 	return curve;
// };

// var distortion = audioCtx.createWaveShaper();
// distortion.curve = makeDistortionCurve(400);

// var biquadFilter = audioCtx.createBiquadFilter();
