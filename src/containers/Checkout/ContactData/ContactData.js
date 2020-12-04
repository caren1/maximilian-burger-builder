import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'

class componentName extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {

        //  alert('Continue with burger')
        // .json for correctly sending a request to firebase
        event.preventDefault();
        this.setState({ loading: true });

        const order = {
            ingredients: this.state.ingredients,
            // price should be caluclated on the server as well with production build
            price: this.state.price,
            // dummy data, for further improvement
            customer: {
                name: this.state.name,
                address: {
                    street: this.state.address.street,
                    zipCode: this.state.address.postalCode,
                    country: 'Poland'
                },
                email: this.state.email,
                deliveryMethod: 'fastest'
            }
        }
        axios.post('/orders.json', order)
        .then((response) =>{ 
            this.setState({ loading : false })
            this.props.history.push('/');
        })
        .catch((error) => this.setState({ loading : false }))
    }

    render() {


        let form = (
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="Your e-mail"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
                </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default componentName;