// it accepts the celsius temperature as a prop, and prints whether 
// it is enough to boil the water

import React from 'react';

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil</p>;
    }
    return <p>The water would not boil</p>;
}

export default BoilingVerdict;