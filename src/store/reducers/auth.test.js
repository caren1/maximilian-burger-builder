// we dont need to import react, since we test functions not react related

import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("Auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should store a token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "some-token",
          userId: "some-user-id",
        }
      )
    ).toEqual({
        token: 'some-token',
        userId: 'some-user-id',
        error: null,
        loading: false,
        authRedirectPath: "/",
    });
  });
});
