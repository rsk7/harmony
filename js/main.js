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

require(['react', 'jsx!components/osc'], function(React, osc) {
    var Osc = React.createFactory(osc);
    React.render(
        Osc(),
        document.getElementById('js-app-container'));
});

