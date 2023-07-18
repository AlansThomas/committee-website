import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { LocalData } from "../../admincommittee/testData";
import AdminPost from "../AdminPost";
import React from "react";

jest.mock("react-helmet-async");

describe("Admin AdminPostTag", () => {
  test("render AdminPostTag", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    render(
      <Router>
        <AdminPost props={[{ Postlist: [1, 2],userlist:[1,2] }]} />
      </Router>
    );
    const GroupsPage = screen.getByTestId("admin-postTag");
    expect(GroupsPage).toBeInTheDocument();
  });
});
