// LIFTING STATE APP example

// Often several components need to reflect the same changing data. 
// Lifting the shared state up to their closests ansestor is a good idea. 

// 1. We will create a temperature calculator that calculates whether the water would boil 
// at a given temperature. 
// - we will build the component called BoilingVerdict. It accepts celsius temperature as a prop,
// and prints whether it is enough to boil the water. 
// - we will create a component called Calculator. It renders an <input> that lets you enter the temperature
// and keeps its value in this.state.temperature
// Additionally it renders the BoilingVerdict for the current input value. 
// - we will add a second input - in addition to a celsius input, we provide a Farenheit input, and they are kept in sync
// - we can start by extracting a TemperatureInput component from Calculator. We will add a new scale
// prop to it that can either be "c" or "f";
// - now change the Calculator to render two separate temperature inputs
// - we have two inputs now, but when you enter the temperature in one of them, the other doesn't update.
// this contradicts our requirement: we want to keep them in SYNC
// - we also can't display BoilingVerdict componet from Calculator. The Calculator doesn't know the current
// temperature because it is hidden inside the TemperatureInput Component. 
// - first, let's write two functions to convert from Celsius to Farenheit and back

function toCelsius(farenheit) {
    return (farenheit - 32) * 5 / 9;
}

function toFarenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}
// these two functions convert numbers. We will write another function that takes a string temperature and a 
// converter function as arguments and returns a string. We will use it to calculate the value of one 
// input based on the other input.

// it returns an empty string on a invalid temperature, and it keeps the output 
// rounded to the third decimal place.

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

// For example, tryConvert('abc', toCelsius) returns an empty string, and tryConvert('10.22', toFaremheit) returns '50.678.

// LIFTING STATE UP --> currently both TemperatureInput components independently keep 
// their values in the local state --> we want these two inputs to be in SYNC with each other.
// when we update the Celsius input, the Farenheit input should reflect the converted temperature, and vice versa

// Sharing state is accomplished but moving it up to the closests common ancestorr of the components that need it.
// "LIFTING STATE UP" --> we will remove the local state from TemperatureInput and move it into
// the Calculator instead. 

// If the Calculator owns the shared state, it becomes the "source of truth" for the current 
// temperature in bith inputs. It can instruct them both to have values that are consistent with 
// each other. Since the props of both TemperatureInput components are coming from the same parent
// Calculator component, the two inputs will always be in sync. 

// - we have removed the local state from the TemperatureInput component, and instead of having
// this.state.temperature, we now have this.props.temperature. Instead of calling this.setState() when 
// we want to make a change, we now call this.props.onTemperatureChange(), which will be provided by 
// the Calculator

// Let's now go back to the Calculator component --> we will store current input's temperature and scale 
// in its local state. This is the state we "lifted up" from the inputs, and it will serve as the 
// "source of truth" for both of them. It is the minimal representation of all the data we need to know 
// in order to render both inputs. 
// For example, if we enter 37 into the Celsius input, the state of the Calculator component will be:

{
    temperature: '37',
    scale: 'c'
}

// if we later edit the Farenheit field to be 212, the state of the Calculator will be:

{
    temperature: '212',
    scale: 'f'
}

// We can store the value of both inputs, but it turns out to be unnecessary. It is enough to 
// store the value of the most recently changed input, and the scale that it represents. 
// We can then infer the value of the other input based on the current temperature and scale alone.

// The inputs stay sync because their values are computed from the same state

// No matter which input you edit, this.state.temperature and this.state.scale in the Calculator
// get updated. One of the inputs is preserved, and the other input value is always recalculated based on it.


// RECAP of what happened when we edited an input:
// - react calls the function specified as onChange on the DOM <input>. In our case, this is
// the handleChange method in the TemperatureInput component. 
// The handleChange method in the TemperatureInput component calls this.props.onTemperatureChange() with the
// new desired value. Its props, including onTemperatureChange, were provided by its parent component, the Calculator. 
// When it previously rendered, the Calculator has specified that onTemperatureChange of the Celsius
// TemperatureInput is the Calculator's handleCelsiusChange method, and onTemperatureChange of the Fahrenheit
// TemperatureInput is the Calculator's handleFahrenheitChange method. So either of these two Calculator
// methods gets called depending on which input we edited.
// Inside these methods, the Calculator component asks React to re-render itself by calling
// this.setState() with the new input value and the current scale of the input we just edited. 
// React calls the Calculator component's render method to learn what the UI should look like.
// The values of both inputs are recomputed based on the current temperature and the active scale. 
// The temperature conversion is performed here. 
// React calls the render method of the BoilingVerdict component, passing the temperature in Celsius as its props. 
// React DOM updates the DOM with the boiling verdict and to match the desired input values. 
// The input we just edited recieves its current value, and the other input is updated to the 
// temperature after conversion. 

// Every update goes through the same steps so the inputs stay in sync. 

// There should be a single "source of truth" for any data that changes in React app.
// Usually the srare is first added to the component that needs it for rendering. Then, 
// if other components also need it, you can lift it up to their closest ancestor. Instead of 
// trying to sync the state between different components, you should rely on the TOP-DOWN DATA FLOW.

// Lifting state involves writing more "boilerplate" code than TWO-WAY BINDING approaches, but as
// a benefit, it takes less work to find and isolate bugs. Since any state "lives" in some component and that 
// component alone can change it, the surface area for bugs is greatly reduced. Additionally, you can implement any 
// custom logic to reject or transform user input. 

// If something CAN BE DERIVED FROM EITHER PROPS OR STATE, IT PROBABLY SHOULD NOT BE IN THE STATE.
// For example, instead of storing both celsiusValue and FahrenheitValue, we store just THE LAST
// EDITED temperature and its SCALE. The value of the other input can always be calculated
// from them in the render() method. This lets us clear or apply rounding to the other field without losing any precision in the user input.

// When you see something wrong in the UI, you can use REACT DEVELOPER TOOLS to inspect the props and move up
// the tree until you find the component responsible for updating the state. This lets you trace the bugs to their source.





