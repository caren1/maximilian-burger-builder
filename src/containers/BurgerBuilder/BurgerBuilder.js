import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  const dispatch = useDispatch();

  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });

  const price = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });

  const error = useSelector((state) => {
    return state.burgerBuilder.error;
  });

  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  const onAddIngredient = (ingredientName) =>
    dispatch(actions.addIngredient(ingredientName));

  const onRemoveIngredient = (ingredientName) =>
    dispatch(actions.removeIngredient(ingredientName));

  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredients()),
    [dispatch]
  );

  const onPurchaseInit = () => dispatch(actions.purchaseInit());

  const onSetAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing({ purchasing: true });
    } else {
      onSetAuthRedirectPath("/checkout");
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
    onPurchaseInit();
    props.history.push({ pathname: "/checkout" });
  };

  const diasbledInfo = {
    ...ings,
  };

  for (let key in diasbledInfo) {
    diasbledInfo[key] = diasbledInfo[key] <= 0;
  }

  let orderSummary = null;

  if (ings) {
    orderSummary = (
      <OrderSummary
        ingredients={ings}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        price={price}
      />
    );
  }

  let burger = error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

  if (ings) {
    burger = (
      <Auxiliary>
        <Burger ingredients={ings} />
        <BuildControls
          price={price}
          ingredientAdded={onAddIngredient}
          ingredientRemoved={onRemoveIngredient}
          disabled={diasbledInfo}
          isAuth={isAuthenticated}
          purchaseable={updatePurchaseState(ings)}
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

export default withErrorHandler(BurgerBuilder, axios);
