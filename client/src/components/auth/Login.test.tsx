import React from "react";
import {Login} from "./Login";
import store from "../../store";
import { mount, shallow } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

describe("Login page testing", () => {
  let component: any;
  let instance: any;
  let login: any;

  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <BrowserRouter>
          <Login login={login} isAuthenticated={false} />
        </BrowserRouter>
      </Provider>
    ).find(Login).dive();
  });

  it("Render test", () => {
    expect(component).toMatchSnapshot();
  });
  describe("Placeholder testing", () => {
    it("Test email placeholder", () => {
      const email = component.find("input").at(0).props().placeholder;
      expect(email).toBe("Email Address");
    });
    it("Test password placeholder", () => {
      const password = component.find("input").at(1).props().placeholder;
      expect(password).toBe("Password");
    });
  });
});
