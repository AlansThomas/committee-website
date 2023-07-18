import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  groupListData,
  grpPointData,
  LocalData,
} from "../../admincommittee/testData";
import Groupstandingtable from "../Groupstandingtable";
import React from "react";
import { getgrpPoint, grpPoint } from "../../../../api/ServiceFile/ApiService";

jest.mock("react-helmet-async");

jest.mock("../../../../api/ServiceFile/ApiService", () => ({
  grpPoint: jest.fn(),
  getgrpPoint: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Admin Groupstandingtable", () => {
  test("render Groupstandingtable", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    grpPoint.mockResolvedValue({ data: groupListData });
    getgrpPoint.mockResolvedValue({ data: grpPointData });
    render(
      <Router>
        <Groupstandingtable />
      </Router>
    );
    const GroupsPage = screen.getByTestId("Group-standings");
    expect(GroupsPage).toBeInTheDocument();
  });
});
