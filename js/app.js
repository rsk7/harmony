/* global define, window */
define([
    'sound'
], function(s) {
    return {
        initialize: function() {
            
            var real = new Float32Array(2);
            var imag = new Float32Array(2);
            
            real[0] = 0;
            real[1] = 0;
            imag[0] = 1;
            imag[1] = 0;
            
            window.s = s;
            window.sound = s.create({real: real, imag: imag});
        }
    };
});