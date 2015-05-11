var note_char_binding = {
    
    left : [
        { note : 'C',  character : 'q' },
        { note : 'C#', character : 'w' },
        { note : 'D',  character : 'e' },
        { note : 'D#', character : 'r' },

        { note : 'E',  character : 'a' },
        { note : 'F',  character : 's' },
        { note : 'F#', character : 'd' },
        { note : 'G',  character : 'f' },

        { note : 'G#', character : 'z' },
        { note : 'A',  character : 'x' },
        { note : 'A#', character : 'c' },
        { note : 'B',  character : 'v' }
    ],

    right : [
        { note : 'C',  character : 'u' },
        { note : 'C#', character : 'i' },
        { note : 'D',  character : 'o' },
        { note : 'D#', character : 'p' },

        { note : 'E',  character : 'j' },
        { note : 'F',  character : 'k' },
        { note : 'F#', character : 'l' },
        { note : 'G',  character : 'semi_colon' },

        { note : 'G#', character : 'n' },
        { note : 'A',  character : 'm' },
        { note : 'A#', character : 'comma' },
        { note : 'B',  character : 'period' }
    ]
};

// alternate bindings
var alt_note_char_binding = {

    left : [
        { note : 'C',  character : 'q' },
        { note : 'D#', character : 'w' },
        { note : 'F#', character : 'e' },
        { note : 'A',  character : 'r' },

        { note : 'C#', character : 'a' },
        { note : 'E',  character : 's' },
        { note : 'G',  character : 'd' },
        { note : 'A#', character : 'f' },

        { note : 'D',  character : 'z' },
        { note : 'F',  character : 'x' },
        { note : 'G#', character : 'c' },
        { note : 'B',  character : 'v' }
    ],

    right : [
        { note : 'C',  character : 'u' },
        { note : 'D#', character : 'i' },
        { note : 'F#', character : 'o' },
        { note : 'A',  character : 'p' },

        { note : 'C#', character : 'j' },
        { note : 'E',  character : 'k' },
        { note : 'G',  character : 'l' },
        { note : 'A#', character : 'semi_colon' },

        { note : 'D',  character : 'n' },
        { note : 'F',  character : 'm' },
        { note : 'G#', character : 'comma' },
        { note : 'B',  character : 'period' }
    ]
};

module.exports = {
    typeA: note_char_binding,
    typeB: alt_note_char_binding
};







