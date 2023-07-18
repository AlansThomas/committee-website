import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AllEvents from "../AllEvents/AllEvents";
import { BrowserRouter as Router } from "react-router-dom";
import {
  groupListData,
  LocalData,
  PointListData,
} from "../../admincommittee/testData";
import {
  FindEventgroupList,
  GetAllEvents,
} from "../../../../api/ServiceFile/ApiService";

jest.mock("react-helmet-async");
jest.mock("../../../../api/ServiceFile/ApiService", () => ({
  GetAllEvents: jest.fn(),
  FindEventgroupList: jest.fn(),
}));
beforeEach(() => {
  jest.clearAllMocks();
});

describe("Admin AllEvents", () => {
  test("render AllEvents", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    GetAllEvents.mockResolvedValue({ data: PointListData });
    FindEventgroupList.mockResolvedValue({ data: groupListData });
    render(
      <Router>
        <AllEvents />
      </Router>
    );
    const testElement = await screen.findByText("Event name");
    expect(testElement).toBeInTheDocument();

    const AccordinBtn = await screen.findByTestId("accordinBtn_btn1");
    expect(AccordinBtn).toBeInTheDocument();
    fireEvent.click(AccordinBtn);
  });
});
