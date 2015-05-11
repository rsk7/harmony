var _        = require("underscore");
var React    = require("react");
var Button   = require("./button.jsx");
var NoteData = require("../data/notedata.js");

var OctaveBoard = React.createClass({
    render: function() {
        var buttons = this.props.octave.map(function(note) {
            var buttonProps = note.getState();
            return (
                <Button {...buttonProps}/>
            );
        });

        return (
            <div className="board shadow">
                <div className="octaveBoard">
                    {buttons}
                </div>
            </div>
        );
    }
});

module.exports = OctaveBoard;


