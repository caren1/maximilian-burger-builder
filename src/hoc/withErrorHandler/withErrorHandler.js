import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Auxiliary from '../Auxiliary'


// this HOC will be wrapping the export of component instead of JSX
// this function will take wrapped component as an input, and will return a function returning wrapped component with its props
// and will add error modal

// in order to be able to show the modal in a proper cases / scenarios we need 2nd argument of axios (not only wrapped component)
// there we'll set up the global error handler / interceptors

const withErrorHandler = (WrappedComponent, axios) => {
    
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                // clearing the error with any new request
                this.setState({ error: null })
                return req;
            })

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error })
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Auxiliary>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />     
                </Auxiliary>
                
            )
        }
     }
}

export default withErrorHandler
