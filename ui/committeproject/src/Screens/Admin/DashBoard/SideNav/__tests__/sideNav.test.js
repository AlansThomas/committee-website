import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SideNav from "../SideNav";
import React from "react";

jest.mock("react-helmet-async");

describe("Admin SideNav", () => {
  test("render AdminSideNav", async () => {
    render(
      <Router>
        <SideNav />
      </Router>
    );
    const SideNavPage = screen.getByTestId("sideNav-page");
    expect(SideNavPage).toBeInTheDocument();
  });
});
