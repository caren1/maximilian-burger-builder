import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const BuildControls = (props) => {
  const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
  ];

  return (
    <div className={classes.BuildControls}>
      <p>
        Current price: <strong>{props.price.toFixed(2)}$</strong>
      </p>
      {controls.map((control) => (
        <BuildControl
          key={control.label}
          label={control.label}
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)}
          disabled={props.disabled[control.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.ordered}
      >
        {props.isAuth ? 'Order now!' : 'SIGN UP TO ORDER'}
      </button>
    </div>
  );
};

export default BuildControls;
