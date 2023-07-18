import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { LocalData, pointPublishData } from "../../admincommittee/testData";
import Grouppoints from "../GroupPoints/Grouppoints";
import React from "react";
import {
  deletePub,
  pointforPublish,
  publishToInnovator,
} from "../../../../api/ServiceFile/ApiService";

jest.mock("react-helmet-async");

jest.mock("../../../../api/ServiceFile/ApiService", () => ({
  pointforPublish: jest.fn(),
  publishToInnovator: jest.fn(),
  deletePub: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Admin Grouppoints", () => {
  test("render Grouppoints", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    pointforPublish.mockResolvedValue({ data: pointPublishData });
    render(
      <Router>
        <Grouppoints />
      </Router>
    );
    const GroupsPage = screen.getByTestId("group-points");
    expect(GroupsPage).toBeInTheDocument();
  });
});

describe("Admin Grouppoints revert", () => {
  test("render Grouppoints revert", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    pointforPublish.mockResolvedValue({ data: pointPublishData });
    deletePub.mockResolvedValue({ data: "Points Reverted" });
    render(
      <Router>
        <Grouppoints />
      </Router>
    );
    const GroupsPage = screen.getByTestId("group-points");
    expect(GroupsPage).toBeInTheDocument();

    const deleteBtn = await screen.findByTestId("delete-btn");
    expect(deleteBtn).toBeInTheDocument();
    fireEvent.click(deleteBtn);
  });
});

describe("Admin Grouppoints publish", () => {
  test("render Grouppoints publish", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    pointforPublish.mockResolvedValue({ data: pointPublishData });
    publishToInnovator.mockResolvedValue({ data: [] });
    render(
      <Router>
        <Grouppoints />
      </Router>
    );
    const GroupsPage = screen.getByTestId("group-points");
    expect(GroupsPage).toBeInTheDocument();

    const pubBtn = await screen.findByTestId("pub-Btn");
    expect(pubBtn).toBeInTheDocument();
    fireEvent.click(pubBtn);
  });
});
