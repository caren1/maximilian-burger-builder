import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions'
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
    purchaseable: false,
    purchasing: false,
    loading: false,
  };

  componentDidMount = () => {
    // axios
    //   .get("https://burger-builder-34d82.firebaseio.com/ingredients.json")
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

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

    this.setState({ purchaseable: sum > 0 });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.props.price);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
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

    let burger = <Spinner />;

    if (this.props.ings) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            price={this.props.price}
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabled={diasbledInfo}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler}
          />
        </Auxiliary>
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
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
        price: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
        onRemoveIngredient: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
