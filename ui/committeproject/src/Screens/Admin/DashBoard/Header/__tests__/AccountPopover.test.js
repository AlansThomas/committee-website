import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AccountPopover from "../AccountPopover";
import { BrowserRouter as Router } from "react-router-dom";

describe("Admin AccountPopover", () => {
  test("render AccountPopover", async () => {
    render(
      <Router>
        <AccountPopover />
      </Router>
    );

    const ProfileBtn = screen.getByTestId("profile-btn");
    expect(ProfileBtn).toBeInTheDocument();
    fireEvent.click(ProfileBtn);

    const testElement = screen.getByText("Logout");
    expect(testElement).toBeInTheDocument();

    const logoutBtn = screen.getByTestId("logout-Btn");
    expect(logoutBtn).toBeInTheDocument();
    fireEvent.click(logoutBtn);
  });
});
