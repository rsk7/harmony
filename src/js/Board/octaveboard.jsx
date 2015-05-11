var _ = require("underscore");
var React = require("react");
var Button = require("./button.jsx");
var NoteData = require("../data/notedata.js");

var OctaveBoard = React.createClass({
    getDefaultProps: function() {
        return {
            waveTypes: ["sine", "square", "sawtooth", "triangle"]
        };
    },

    getInitialState: function() {
        return {
            buttonData: _.map(NoteData.get({octave: 3}), function(datum){
                return {
                    noteName: datum.name,
                    octaveNumber: datum.octave
                };
            })
        };
    },

    render: function() {
        var waveselection = this.props.waveTypes.map(function(waveType) {
            return (
                <option value="{waveType}">{waveType}</option>
            );
        });

        var buttons = this.state.buttonData.map(function(buttonProps) {
            return (
                <Button {...buttonProps}/>
            );
        });

        return (
            <div className="board shadow">
                <div className="octaveBoard">
                    {buttons}
                </div>
                <div className="configuration">
                    <label for="waveType">Wave</label>
                    <select name="waveType">
                        {waveselection}
                    </select>
                </div>
            </div>
        );
    }
});

module.exports = OctaveBoard;


