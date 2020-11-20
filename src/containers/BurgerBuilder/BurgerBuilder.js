import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary'

class BurgerBuilder extends Component {

    render() {
        return (
            <Auxiliary>
                <div className="">Buurger</div>
                <div className="">Build Controls</div>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;