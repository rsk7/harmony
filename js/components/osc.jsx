define(['react'], function(React) {
    var osc = React.createClass({
        getDefaultProps: function() {
            return {
                wavetypes: ['sine', 'square', 'sawtooth', 'triangle']
            };
        },

        render: function() {
            var waveselection = this.props.wavetypes.map(function(wavetype) {
                return (
                    <option value="{wavetype}">{wavetype}</option>
                );
            });

            return (
                <div className="osc">
                    <div className="display"></div>
                    <div className="configuration">
                        <form>
                            <input name="frequencey" type="number" placeholder="Frequency"/>
                            <label for="wavetype">Wave</label>
                            <select name="wavetype">
                                { waveselection }
                            </select>
                        </form>
                    </div>
                </div>
            );
        }
    });

    return osc;
});
