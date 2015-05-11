var React         = require("react");
var Harmony       = require("../harmony.js");
var OctaveBoard   = require("./octaveboard.jsx");
var Configuration = require("./configuration.jsx");

var Board = React.createClass({
	getInitialState: function() {
		return Harmony.positions;
	},

	// listeners
	componentDidMount: function() {
		Harmony.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		Harmony.removeChangeListener(this._onChange);
	},

	render: function() {
		return (
			<div>
				<OctaveBoard octave={this.state.left}/>
				<OctaveBoard octave={this.state.right}/>
				<Configuration/>
			</div>
		);
	},

	_onChange: function() {
		this.setState(Harmony.positions);
	}
});

module.exports = Board;