import React from "react";
import { render, screen } from "@testing-library/react";
import Page404 from "../Page404";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("react-helmet-async");

describe("404 page", () => {
  test("render 404 page", async () => {
    render(
      <Router>
        <Page404 />
      </Router>
    );

    expect(
      await screen.findByText("Sorry, page not found!")
    ).toBeInTheDocument();

    const linkEl = screen.getByRole("link", { name: "Go to Home" });

    expect(linkEl).toHaveAttribute("href", "/");
  });

  test("render 404 page", async () => {
    localStorage.setItem("Logintype", 0);
    render(
      <Router>
        <Page404 />
      </Router>
    );
    expect(
      await screen.findByText("Sorry, page not found!")
    ).toBeInTheDocument();
  });

  test("render 404 page", async () => {
    localStorage.setItem("Logintype", 1);
    render(
      <Router>
        <Page404 />
      </Router>
    );
    expect(
      await screen.findByText("Sorry, page not found!")
    ).toBeInTheDocument();
  });
});
