import React from "react";
import { render,screen } from "@testing-library/react";
import Footer from "../footer";
import { BrowserRouter as Router } from "react-router-dom";


describe("Admin Footer", () => {
  test("render Admin Footer", async () => {
    render(
      <Router>
        <Footer />
      </Router>
    );

    const testElement = screen.getByText('Recreation');
    expect(testElement).toBeInTheDocument();
  });

});
