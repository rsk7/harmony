var _        = require("underscore");
var React    = require("react");
var Button   = require("./button.jsx");
var NoteData = require("../data/notedata.js");
var Colors   = require("../data/colors.js");

var OctaveBoard = React.createClass({
    getStyles: function() {
        var onNote = this.props.octave.where({on: true});
        if(onNote.length > 0) {
            return {
                boxShadow: "0px 2px 50px 5px " + onNote[0].get("onColor")
            };
        } else {
            return {
                boxShadow: "0px 2px 30px 5px #EEE"
            }
        }
    },

    render: function() {
        var buttons = this.props.octave.map(function(note) {
            var buttonProps = note.getState();
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


