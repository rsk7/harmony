var React = require("react");

var Configuration = React.createClass({
	render: function() {
		var waveSelection = this.props.waveTypes.map(function(waveType) {
			return (
				<option value="{waveType}">{waveType}</option>
			);	
		});

		return (
			<div className="configuration">
				<label for="waveType">Wave</label>
				<select name="waveType">
					{waveSelection}
				</select>
			</div>
		);
	}
});

module.exports = Configuration;