var _        = require("underscore");
var React    = require("react");
var Button   = require("./button.jsx");

var transformButtonData = function(button) {
    return {
        noteName: button.data.note,
        keyBinding: button.key,
        octaveNumber: button.data.octave,
        onColor: button.onColor,
        on: button.on
    };
};

var OctaveBoard = React.createClass({
    getStyles: function() {
        var onNote = _.where(this.props.octave, {on: true});
        if(onNote.length > 0) {
            return {
                boxShadow: "0px 2px 50px 5px " + onNote[0].onColor
            };
        } else {
            return {
                boxShadow: "0px 2px 30px 5px #EEE"
            }
        }
    },

    render: function() {
        var buttons = this.props.octave.map(function(button) {
            var buttonProps = transformButtonData(button);
            return (
                <Button {...buttonProps}/>
            );
        });

        return (
            <div className="board shadow" style={this.getStyles()}>
                <div className="octaveBoard">
                    {buttons}
                </div>
            </div>
        );
    }
});

module.exports = OctaveBoard;


