import React, { Component } from "react";
import { connect } from "react-redux";
// import * as actionTypes from "../../store/actions";
import * as burgerBuilderActions from "../../store/actions/index";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

class BurgerBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //     }
  // }

  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingredientKey) => {
        return ingredients[ingredientKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push({ pathname: "/checkout" });
  };

  render() {
    const diasbledInfo = {
      ...this.props.ings,
    };

    for (let key in diasbledInfo) {
      diasbledInfo[key] = diasbledInfo[key] <= 0;
    }

    let orderSummary = null;

    if (this.props.ings) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded.</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            price={this.props.price}
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabled={diasbledInfo}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Auxiliary>
      );
    }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredientName) =>
      dispatch(burgerBuilderActions.addIngredient(ingredientName)),

    onRemoveIngredient: (ingredientName) =>
      dispatch(burgerBuilderActions.removeIngredient(ingredientName)),

    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
