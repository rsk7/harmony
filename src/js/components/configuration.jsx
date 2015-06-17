var React = require("react");
var _ = require("underscore");
var h = require("h-audio");
var wavetablenames = require("../state/data/wavetablenames.js");

var polymerInitialize = function() {
	document.addEventListener("WebComponentsReady", function() {
		document.querySelector("#gainslider").addEventListener("change", function(event) {
			h.configure({ gain: event.target.value / 10000 });
		});

		document.querySelector("#attackslider").addEventListener("change", function(event) {
			h.configure({ attack: event.target.value / 1000 });
		});

		document.querySelector("#releaseslider").addEventListener("change", function(event) {
			h.configure({ release: event.target.value / 1000 });
		});
	});
};

var Configuration = React.createClass({
	getInitialState: function() {
		return h.configuration();
	},

	componentDidMount: function() {
		polymerInitialize();
	},

	waveTypeChange: function(e) {
		h.configure({ wave: { type: e.target.value, data: null }});
		this.setState(h.configuration());
	},

	gainChange: function(e) {
		h.configure({ gain: e.target.value / 500 });
		this.setState(h.configuration());
 	},

 	attackChange: function(e) {
 		h.configure({ attack: e.target.value / 500 });
 		this.setState(h.configuration());
 	},

 	releaseChange: function(e) {
 		h.configure({ release: e.target.value / 500 });
 		this.setState(h.configuration());
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
					<paper-slider id="gainslider" min="10" max="1000" value="110"></paper-slider>
				</div>
				<div>
					<label for="attack">Attack</label>
					<paper-slider id="attackslider" min="10" max="1000" value="110"></paper-slider>
				</div>
				<div>
					<label for="release">Release</label>
					<paper-slider id="releaseslider" min="10" max="1000" value="110"></paper-slider>
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