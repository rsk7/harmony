var React = require("react");
var analyser = require("../api/analyser.js");

var Oscilloscope = React.createClass({
	getInitialState: function() {
		return { 
			dataArray: analyser.timeDomainDataArray(),
			bufferLength: analyser.bufferLength()
		};
	},

	componentDidMount: function() {
		analyser.addChangeListener(this._onChange);
		var container = React.findDOMNode(this);
		this.canvas = React.findDOMNode(this.refs.canvas);
		this.canvas.height = container.offsetHeight;
		this.canvas.width = container.offsetWidth;
		this.ctx = this.canvas.getContext("2d");
		this.draw();
	},

	componentWillUnmount: function() {
		analyser.removeChangeListener(this._onChange);
	},

	drawSetup: function() {
		window.requestAnimationFrame(this.draw);
		this.ctx.fillStyle = "rgb(200, 200, 200)";
		this.ctx.fillRect(0, 0, this.canvas.height, this.canvas.width);
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = "rgb(200, 200, 200)";
	},

	draw: function() {
		this.drawSetup();

		var sliceWidth = this.canvas.width * 1.0 / this.state.bufferLength;
		var x = 0;
		for(var i = 0; i < this.state.bufferLength; i++) {
			var v = this.state.dataArray[i] / 128.0;
			var y = v * this.canvas.height / 2;
			if(i === 0) {
				this.ctx.moveTo(x, y);
			} else {
				this.ctx.lineTo(x, y);
			}
			x += sliceWidth;
		}

		this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
		this.ctx.stroke();
	},

	_onChange: function() {
		this.setState({
			dataArray: analyser.timeDomainDataArray(),
			bufferLength: analyser.bufferLength()
		});
	},

	render: function() {
		return (
			<div id="oscilloscope">
				<canvas ref="canvas"/>
			</div>
		);
	}
});

module.exports = Oscilloscope;