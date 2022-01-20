import React from "react";
import Games from "./Games";
import store from "../../store";
import { Provider } from "react-redux";
import { mount } from "enzyme";

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: any;
  reduxStore: any;
}) => <Provider store={reduxStore}>{children}</Provider>;

describe("Game list testing", () => {
  const test = {
    params: {
      query: "test",
    },
  };
  const wrapper = (children: any) => (
    <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
  );

  let component: any;
  beforeEach(() => {
    component = mount(wrapper(<Games match={test} />))
  });
  afterEach(() => {
    component.unmount();
  });

  it("Loading test", () => {
    expect(component.find("img").html()).toContain(
      `<img src="Pulse-1s-200px.svg" alt="Loading..." style="width: 200px; margin: auto; display: block;">`
    );
  });
});
