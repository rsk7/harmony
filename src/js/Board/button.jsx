var React = require("react");

var Button = React.createClass({
    getDefaultProps: function() {
        return {
            offColor: "#FFFFFF",
            onColor: "#E0E0E0",
            noteName: "?",
            keyBinding: "?",
            octaveNumber: "?",
            textColor: "#C8C8C8"
        };
    },

    getInitialState: function() {
        return {
            on: false
        };
    },

    toggle: function() {
        this.setState({ on: !this.state.on});
    },

    getStyles: function() {
        if(this.state.on) {
            return {
                backgroundColor: this.props.onColor,
                color: this.props.textColor
            };
        } else {
            return {
                backgroundColor: this.props.offColor,
                color: this.props.textColor
            };
        }
    },

    render: function() {
        return (
            <div className="button" 
                onMouseDown={this.toggle} 
                onMouseUp={this.toggle}
                onTouchStart={this.toggle}
                onTouchEnd={this.toggle}>
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