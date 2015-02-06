/* global require */
require.config({
    paths: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        text: 'lib/text',
        react: 'lib/react-with-addons',
        JSXTransformer: 'lib/JSXTransformer'
    },
    
    shim: {
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        underscore: {
            exports: "_"
        }
    },

    jsx: {
        fileExtension: '.jsx',
        harmony: true, 
        stripTypes: true
    }
});

require(['react', 'jsx!components/Timer'], function(React, Timer) {
    var start = new Date();
    Timer = React.createFactory(Timer);

    React.render(
        Timer({start: start}),
        document.getElementById('js-app-container'));
});

