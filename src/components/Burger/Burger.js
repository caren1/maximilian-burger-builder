import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {


    const transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientKey => {
        return [...Array(props.ingredients[ingredientKey])]
        .map((_, i) => {
            return <BurgerIngredient key={ingredientKey + 1} type={ingredientKey}/>
        })
    });
    // transforms an object into the array of string of the keys

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default Burger
