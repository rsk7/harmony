module.exports = [
    { key: 'q', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'C' , octave: 3 }, group: 'left' },
    { key: 'w', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'C#', octave: 3 }, group: 'left' },
    { key: 'e', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'D' , octave: 3 }, group: 'left' },
    { key: 'r', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'D#', octave: 3 }, group: 'left' },
    { key: 'a', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'E' , octave: 3 }, group: 'left' },
    { key: 's', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'F' , octave: 3 }, group: 'left' },
    { key: 'd', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'F#', octave: 3 }, group: 'left' },
    { key: 'f', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'G' , octave: 3 }, group: 'left' },
    { key: 'z', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'G#', octave: 3 }, group: 'left' },
    { key: 'x', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'A' , octave: 3 }, group: 'left' },
    { key: 'c', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'A#', octave: 3 }, group: 'left' },
    { key: 'v', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'B' , octave: 3 }, group: 'left' },

    { key: 'u', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'C' , octave: 4 }, group: 'right' },
    { key: 'i', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'C#', octave: 4 }, group: 'right' },
    { key: 'o', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'D' , octave: 4 }, group: 'right' },
    { key: 'p', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'D#', octave: 4 }, group: 'right' },
    { key: 'j', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'E' , octave: 4 }, group: 'right' },
    { key: 'k', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'F' , octave: 4 }, group: 'right' },
    { key: 'l', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'F#', octave: 4 }, group: 'right' },
    { key: ';', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'G' , octave: 4 }, group: 'right' },
    { key: 'n', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'G#', octave: 4 }, group: 'right' },
    { key: 'm', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'A' , octave: 4 }, group: 'right' },
    { key: ',', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'A#', octave: 4 }, group: 'right' },
    { key: '.', action: { start: 'play-note', end: 'stop-note' }, data: { note: 'B' , octave: 4 }, group: 'right' },

    { key: 'g', action: { start: 'shift-octave-down' }, data: { group: 'left'  }},
    { key: 'h', action: { start: 'shift-octave-down' }, data: { group: 'right' }},

    { key: 'shift-g', action: { start: 'shift-octave-up' }, data: { group: 'left'  }},
    { key: 'shift-h', action: { start: 'shift-octave-up' }, data: { group: 'right' }}
];
