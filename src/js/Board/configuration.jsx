var React = require("react");
var Harmony = require("../harmony.js");

var Configuration = React.createClass({
	getInitialState: function() {
		return Harmony.configuration;
	},

	waveTypeChange: function(e) {
		Harmony.setWaveType(e.target.value);
		this.setState(Harmony.configuration);
	},

	gainChange: function(e) {
		Harmony.setGain(e.target.value / 100);
		this.setState(Harmony.configuration);
 	},

 	attackChange: function(e) {
 		Harmony.setAttackTime(e.target.value / 100);
 	},

 	releaseChange: function(e) {
 		Harmony.setReleaseTime(e.target.value / 100);
 	},

 	waveTableChange: function(e) {
 		Harmony.setWaveTable(e.target.value);
 		this.setState(Harmony.configuration);
 	},

	render: function() {
		var waveSelection = this.state.waveTypes.map(function(waveType) {
			return (
				<option value={waveType}>{waveType}</option>
			);	
		});

		var waveTableSelection = this.state.waveTables.map(function(waveTable) {
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