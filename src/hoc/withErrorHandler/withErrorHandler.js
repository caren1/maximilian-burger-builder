import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../Auxiliary";
import useHttpErrorHandler from "../../hooks/http-error-handler";

// this HOC will be wrapping the export of component instead of JSX
// this function will take wrapped component as an input, and will return a function returning wrapped component with its props
// and will add error modal

// in order to be able to show the modal in a proper cases / scenarios we need 2nd argument of axios (not only wrapped component)
// there we'll set up the global error handler / interceptors

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Auxiliary>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>

        <WrappedComponent {...props} />
      </Auxiliary>
    );
  };
};

export default withErrorHandler;
