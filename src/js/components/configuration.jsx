var React = require("react");
var _ = require("underscore");
var h = require("../api/h.js");
var wavetablenames = require("../api/data/wavetablenames.js");

var Configuration = React.createClass({
	getInitialState: function() {
		return h.configuration();
	},

	waveTypeChange: function(e) {
		h.configure({ wave: { type: e.target.value, data: null }});
		this.setState(h.configuration());
	},

	gainChange: function(e) {
		h.configure({ gain: e.target.value / 100 });
		this.setState(h.configuration());
 	},

 	attackChange: function(e) {
 		h.configure({ attack: e.target.value / 100 });
 	},

 	releaseChange: function(e) {
 		h.configure({ release: e.target.value / 100 });
 	},

 	waveTableChange: function(e) {
 		h.configure({ wave: { type: "custom", data: wavetablenames[e.target.value]}});
 		this.setState(h.configuration());
 	},

	render: function() {
		var waveSelection = ["sine", "square", "sawtooth", "triangle"].map(function(waveType) {
			return (
				<option value={waveType}>{waveType}</option>
			);	
		});

		var waveTableSelection = _.keys(wavetablenames).map(function(waveTable) {
			return (
				<option value={waveTable}>{waveTable}</option>
			);
		});

		return (
			<div className="configuration">
				<div>
					<label for="gain">Gain</label>
					<input type="number" onChange={this.gainChange}/>
				</div>
				<div className="waveType">
					<label for="waveType">Wave Type</label>
					<select name="waveType" value={this.state.waveType} onChange={this.waveTypeChange}>
						{waveSelection}
					</select>
				</div>
				<div className="waveTable">
					<label for="waveTable">Wave Table</label>
					<select name="waveTable" value={this.state.waveTable} onChange={this.waveTableChange}>
						{waveTableSelection}
					</select>
				</div>
				<div>
					Wave Tables found here: http://chromium.googlecode.com/svn/trunk/samples/audio/wave-tables/
				</div>
				<div className="info">
			        Try this with <a target="_blank" href="http://typedrummer.com/7hpt2b">typedrummer</a>
				</div>
			</div>
		);
	}
});

module.exports = Configuration;