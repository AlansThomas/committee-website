import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ReportedPoints } from "../../../../api/ServiceFile/ApiService";
import { ReportedData, LocalData } from "../../admincommittee/testData";
import Reported from "../PendingAndReported/Reported";

jest.mock("react-helmet-async");

jest.mock("../../../../api/ServiceFile/ApiService", () => ({
    ReportedPoints: jest.fn(),
}));
beforeEach(() => {
  jest.clearAllMocks();
});

describe("Admin Reported", () => {
  test("render Reported", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ReportedPoints.mockResolvedValue({ data: ReportedData });
    render(
      <Router>
        <Reported />
      </Router>
    );
    const testElement = screen.getByText("Event Name");
    expect(testElement).toBeInTheDocument();
  });
});
