import { render, screen,act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { LocalData } from "../../admincommittee/testData";
import AdminFeed from "../AdminFeed/adminfeed";
import React from "react";

jest.mock("react-helmet-async");

describe("Admin AdminFeed", () => {
  test("render AdminFeed", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
  

    await act(async () => {
      render(
        <Router>
          <AdminFeed />
        </Router>
      )
    });

    const GroupsPage = screen.getByTestId("admin-post");
    expect(GroupsPage).toBeInTheDocument();
  });
});
