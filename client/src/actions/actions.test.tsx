import store from "../store";

describe("Auth testing", () => {
    const test = {
        email: "test123@mail.ru",
        password: "12345678",
    }

    it("Login successed", () => {
        store.dispatch({ type: "LOGIN_SUCCESS", payload: "token" } );
        expect(store.getState().auth.isAuthenticated).toBe(true);
    })
    it("Login failed", () => {
        store.dispatch({ type: "LOGIN_FAIL", payload: "token" } );
        expect(store.getState().auth.isAuthenticated).toBe(false);
    })
});