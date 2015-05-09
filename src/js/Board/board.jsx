var React = require("react");
var OctaveBoard = require("./octaveboard.jsx");

var Board = React.createClass({
	render: function() {
		return (
			<div>
				<OctaveBoard/>
				<OctaveBoard/>
			</div>
		);
	}
});

module.exports = Board;