// how do we create a saga, and what is it?
// it is a kind of a function
// adding * to a function keyword will make it a 'generator' which is a
// nextgen JS feature, which are function that can be execuited incremently
// you can pause during the execution and ie. wait for some async operations

import { put } from 'redux-saga/effects'
// will in the end dispatch a new action

import * as actionTypes from '../actions/actionTypes'

function* logout (action) {
    //each call within the generator function should be proceeded with 'yield' keyword
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("expirationDate");
    yield localStorage.removeItem("userId");
    // it means that each step will wait for it to be executed completely
    // if code'd be async it would wait for the result

    yield put ({
        type: actionTypes.AUTH_LOGOUT,
      });
}