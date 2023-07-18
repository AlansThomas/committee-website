import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  groupListData,
  LocalData,
  PointListData,
} from "../../admincommittee/testData";
import CurrentEvents from "../AllEvents/CurrentEvents";
import React from "react";
import {
  FindEventgroupList,
  GetCurrentEvents,
} from "../../../../api/ServiceFile/ApiService";

jest.mock("react-helmet-async");

jest.mock("../../../../api/ServiceFile/ApiService", () => ({
  GetCurrentEvents: jest.fn(),
  FindEventgroupList: jest.fn(),
}));
beforeEach(() => {
  jest.clearAllMocks();
});

describe("Admin CurrentEvents", () => {
  test("render CurrentEvents", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    GetCurrentEvents.mockResolvedValue({ data: PointListData });
    FindEventgroupList.mockResolvedValue({ data: groupListData });
    render(
      <Router>
        <CurrentEvents />
      </Router>
    );
    const testElement = screen.getByText("Event name");
    expect(testElement).toBeInTheDocument();

    const AccordinBtn = await screen.findByTestId("accordinBtn_btn1");
    expect(AccordinBtn).toBeInTheDocument();
    fireEvent.click(AccordinBtn);
  });
});
