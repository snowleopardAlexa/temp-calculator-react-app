// We extract TempeatureInput component from Calculator. 
// We will add a new scale prop to it that can either be "c" or "f"

import React from 'react';

const scaleNames = {
    c: 'Celsius',
    f: 'Farenheit'
};

class TemperatureInput extends React.Component {
    constructor(props) {
        super (props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        // TemperatureInput keeps its values in the local state
        // Before: this.setState({temperature: e.target.value});
        // We make component "controlled". TemperatureInput accepts both temperature
        // and onTemperatureChange PROPS from its parent Calculator.
        // When TemperatureInput wants to update its temperature, it calls
        this.props.onTemperatureChange(e.target.value);

        // the onTemperatureChange propl will be provided together with the temperature
        // prop by the parent Calculator component. It will handle the change by modifying its 
        // own local state, thus re-rendering both inputs with the new values. 

    }

    render() {
        // TemperatureInput keeps its values in the local state
        // PROPS ARE READ ONLY - when the temperature was in the local state, the 
        // TemperatureInput could call this.setState() to change it. However
        // now that the temperature is coming from the parent as PROP, the TemperatureInput 
        // has no control over it. 
        // Before: const temperature = this.state.temperature;
        const temperature = this.props.temperature;

        const scale = this.props.scale;

        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature} onChange={this.handleChange} />
            </fieldset>
        );
    }
}

export default TemperatureInput;
