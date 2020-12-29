import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const { onInitIngredients } = props;

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing({ purchasing: true });
    } else {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingredientKey) => {
        return ingredients[ingredientKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  const purchaseCancelHandler = () => {
    setPurchasing({ purchasing: false });
  };

  const purchaseContinueHandler = () => {
    props.onPurchaseInit();
    props.history.push({ pathname: "/checkout" });
  };

  const diasbledInfo = {
    ...props.ings,
  };

  for (let key in diasbledInfo) {
    diasbledInfo[key] = diasbledInfo[key] <= 0;
  }

  let orderSummary = null;

  if (props.ings) {
    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        price={props.price}
      />
    );
  }

  let burger = props.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

  if (props.ings) {
    burger = (
      <Auxiliary>
        <Burger ingredients={props.ings} />
        <BuildControls
          price={props.price}
          ingredientAdded={props.onAddIngredient}
          ingredientRemoved={props.onRemoveIngredient}
          disabled={diasbledInfo}
          isAuth={props.isAuthenticated}
          purchaseable={updatePurchaseState(props.ings)}
          ordered={purchaseHandler}
        />
      </Auxiliary>
    );
  }

  return (
    <Auxiliary>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Auxiliary>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredientName) =>
      dispatch(actions.addIngredient(ingredientName)),

    onRemoveIngredient: (ingredientName) =>
      dispatch(actions.removeIngredient(ingredientName)),

    onInitIngredients: () => dispatch(actions.initIngredients()),

    onPurchaseInit: () => dispatch(actions.purchaseInit()),

    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
