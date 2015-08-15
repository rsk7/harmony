var React = require("react");
var _ = require("underscore");
var manager = require("../state/buttonmanager.js");

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
            action: undefined,
            on: false
        };
    },

    press: function() {
        var actionData = _.find(manager.state(), {key: this.props.keyBinding});
        manager.dispatch(actionData.action.start, actionData);
    },

    release: function() {
        var actionData = _.find(manager.state(), {key: this.props.keyBinding});
        manager.dispatch(actionData.action.stop, actionData);
    },

    getStyles: function() {
        if(this.props.on) {
            return {
                backgroundColor: this.props.onColor,
                color: this.props.onTextColor,
                borderColor: this.props.onColor
            };
        } else {
            return {
                backgroundColor: this.props.offColor,
                color: this.props.offTextColor,
                borderColor: "#EFEFEF"
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