var React = require("react");
var Sound = require("./sound");

var Configuration = React.createClass({
    getDefaultProps: function() {
        return {
            wavetypes: ["sine", "square", "sawtooth", "triangle"]
        };
    },

    render: function() {
        var waveselection= this.props.wavetypes.map(function(wavetype) {
            return (
                <option value="{wavetype}">{wavetype}</option>
            );
        })  ;

        return (
            <div className="configuration">
                <form>
                    <div>
                        <label for="frequency">Frequency</label>
                        <input name="frequency" type="number" placeholder="Frequency"/>
                    </div>
                    <div>
                        <label for="wavetype">Wave</label>
                        <select name="wavetype">
                            {waveselection}
                        </select>
                    </div>
                </form>
            </div>
        );
    }
}); 

var Osc = React.createClass({
    componentDidMount: function() {
        this.sound = new Sound();
    },

    getInitialState: function() {
        return {
            showConfiguration: false
        };
    },

    getDefaultProps: function() {
        return {
            wavetypes: ['sine', 'square', 'sawtooth', 'triangle']
        };
    },

    setupClick: function() {
        this.setState({ showConfiguration: !this.state.showConfiguration });
    },

    displayMouseDown: function() {
        this.sound.play(440);
    },

    displayMouseUp: function() {
        this.sound.stop();
    },

    render: function() {
        return (
            <div className="osc">
                <div className="display"
                    onMouseDown={ this.displayMouseDown }
                    onMouseUp={ this.displayMouseUp }>
                    OSC
                </div>
                <div className="configure" onClick={ this.setupClick }>setup</div>
                {this.state.showConfiguration ? <Configuration/> : null}
            </div>
        );
    }
});

module.exports = Osc;