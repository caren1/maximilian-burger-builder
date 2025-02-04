import React from "react";

import Auxiliary from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(
    (ingredientKey) => {
      return (
        <li key={ingredientKey}>
          <span style={{ textTransform: "capitalize" }}>{ingredientKey}</span> :{" "}
          {props.ingredients[ingredientKey]}
        </li>
      );
    }
  );

  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>A delicious burger with the ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        Total price: <em>{props.price.toFixed(2)}</em>$
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Auxiliary>
  );
};

export default OrderSummary;
