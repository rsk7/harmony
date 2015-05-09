var $ = require("jquery");
var React = require("react");
var Osc = require("./osc.jsx");
var Board = require("./Board/board.jsx");

$(function() {
    React.render(<Board/>, document.getElementById("harmony"));
});




