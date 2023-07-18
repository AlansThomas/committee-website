import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { LocalData } from "../../admincommittee/testData";
import PointsList from "../PointList/PointsList";
import React from "react";

jest.mock("react-helmet-async");

describe("Admin PointsListPage", () => {
  test("render PointsListPage", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    render(
      <Router>
        <PointsList />
      </Router>
    );
    const GroupsPage = screen.getByTestId("point-list-page");
    expect(GroupsPage).toBeInTheDocument();

    const chnBtn = await screen.findByTestId("point-Tab");
    expect(chnBtn).toBeInTheDocument();
    fireEvent.click(chnBtn);
  });
});
