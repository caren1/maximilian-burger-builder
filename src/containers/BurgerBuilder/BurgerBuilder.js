import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildsControls'

const INGREDIENT_PRICES  = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
}

class BurgerBuilder extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //     }
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = updatedCount;

        // in order to be able to calculate the total for the burger
        // we need to keep track of the cost of specific ingredient 
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = updatedCount;

        // in order to be able to calculate the total for the burger
        // we need to keep track of the cost of specific ingredient 
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    }

    render() {

        const diasbledInfo = {
            ...this.state.ingredients
        }

        for (let key in diasbledInfo) {
            diasbledInfo[key] = diasbledInfo[key] <= 0
        }

        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                 ingredientAdded={this.addIngredientHandler}
                 ingredientRemoved={this.removeIngredientHandler} 
                 disabled={diasbledInfo}/>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;