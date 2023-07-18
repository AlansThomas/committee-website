import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { PendingsList } from "../../../../api/ServiceFile/ApiService";
import { PendingData, LocalData } from "../../admincommittee/testData";
import PendingList from "../PendingAndReported/PendingList";

jest.mock("react-helmet-async");

jest.mock("../../../../api/ServiceFile/ApiService", () => ({
  PendingsList: jest.fn(),
}));
beforeEach(() => {
  jest.clearAllMocks();
});

describe("Admin Pendinglist", () => {
  test("render Pendinglist", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    PendingsList.mockResolvedValue({ data: PendingData });
    render(
      <Router>
        <PendingList />
      </Router>
    );
    const testElement = screen.getByText("Event Name");
    expect(testElement).toBeInTheDocument();
  });
});
