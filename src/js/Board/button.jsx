var React = require("react");
var Harmony = require("../harmony.js");

var Button = React.createClass({
    getDefaultProps: function() {
        return {
            offColor: "#FFFFFF",
            onColor: "#E0E0E0",
            noteName: "?",
            keyBinding: "?",
            octaveNumber: "?",
            offTextColor: "#C8C8C8",
            onTextColor: "#FFFFFF",
            on: false
        };
    },

    press: function() {
        Harmony.playByKey(this.props.keyBinding);
    },

    release: function() {
        Harmony.stopByKey(this.props.keyBinding);
    },

    getStyles: function() {
        if(this.props.on) {
            return {
                backgroundColor: this.props.onColor,
                color: this.props.onTextColor
            };
        } else {
            return {
                backgroundColor: this.props.offColor,
                color: this.props.offTextColor
            };
        }
    },

    render: function() {
        return (
            <div className="button" 
                onMouseDown={this.press} 
                onMouseUp={this.release}
                onTouchStart={this.press}
                onTouchEnd={this.release}>
                <div className="display" style={this.getStyles()}>
                    <span className="noteName">
                        {this.props.noteName}
                    </span>
                    <span className="octaveNumber">
                        {this.props.octaveNumber}
                    </span>
                    <span className="keyBinding">
                        {this.props.keyBinding}
                    </span>
                </div>
            </div>
        );
    }
});

module.exports = Button;