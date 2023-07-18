import React from "react";
import { render, screen,act } from "@testing-library/react";
import DashboardAppPage from "../DashboardAppPage";
import {
  GraphData} from "../../../../api/ServiceFile/ApiServiceAlwin";
import {
  GraphDataDummy,
  LocalData
} from "./testData";

jest.mock("react-helmet-async");
jest.mock("../../../../api/ServiceFile/ApiServiceAlwin", () => ({
  GraphData: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("DashboardAppPage", () => {
  it("renders loading image when datas is empty", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    GraphData.mockResolvedValue({ data: GraphDataDummy });
    await act(async () => {
      render(<DashboardAppPage />);
    });
    const testElement = screen.getByText("Event");
    expect(testElement).toBeInTheDocument();
  });
});
