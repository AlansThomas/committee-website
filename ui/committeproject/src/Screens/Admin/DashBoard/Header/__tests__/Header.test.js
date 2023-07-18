import React from "react";
import { render,screen } from "@testing-library/react";
import Header from "../header";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../../../Store";


describe("Admin Header", () => {
  test("render Admin Header", async () => {
    render(
      <Provider store={store}>

      <Router>
        <Header />
      </Router>
      </Provider>
    );

    const testElement = screen.getByText('Recreation');
    expect(testElement).toBeInTheDocument();
  });
});
