import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../navbar";
import React from "react";

jest.mock("react-helmet-async");

describe("Admin Navbar", () => {
  test("render AdminNavbar", async () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const NavbarPage = screen.getByTestId("admin-navbar");
    expect(NavbarPage).toBeInTheDocument();
  });
});
