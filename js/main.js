/* global require */
require.config({
    paths: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        text: 'lib/text',
        JSXTransformer: 'lib/JSXTransformer',
        react: 'lib/react-with-addons',
    },

    jsx: {
        fileExtension: '.jsx',
        harmony: true,
        stripTypes: true
    },
    
    shim: {
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        underscore: {
            exports: "_"
        }
    }
});

require(['react', 'jsx!components/CommentBox'], function(React, CommentBox) {
  var start = new Date();
  var CommentBox = React.createFactory(CommentBox);

  var data = [
      {author: "Pete Hunt", text: "This is one comment"},
      {author: "Jordan Walke", text: "This is *another* comment"}
  ];

  // Mount the JSX component in the app container
  React.render(
      CommentBox({data: data}),
      document.getElementById('harmony'));
});
