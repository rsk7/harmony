var _ = require("underscore");
var React = require("react");
var manager = require("../state/buttonmanager.js");
var OctaveBoard   = require("./octaveboard.jsx");
var Configuration = require("./configuration.jsx");

var Board = React.createClass({
	getInitialState: function() {
		return this.getActiveState();
	},

	// listeners
	componentDidMount: function() {
		manager.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		manager.removeChangeListener(this._onChange);
	},

	getButtonGroup: function(groupName) {
		return _.where(this.state.buttonMap, {group: groupName});
	},

	render: function() {
		return (
			<div>
				<OctaveBoard octave={this.getButtonGroup("left")}/>
				<OctaveBoard octave={this.getButtonGroup("right")}/>
				<Configuration/>
			</div>
		);
	},

	getActiveState: function() {
		return {
			buttonMap: manager.state()
		};
	},

	_onChange: function() {
		this.setState(this.getActiveState());
	}
});

module.exports = Board;