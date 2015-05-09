var $ = require("jquery");
var React = require("react");
var Osc = require("./osc.jsx");
var Button = require("./Board/button.jsx");
var OctaveBoard = require("./Board/octaveboard.jsx");

$(function() {
    React.render(<OctaveBoard/>, document.getElementById("harmony"));
});




