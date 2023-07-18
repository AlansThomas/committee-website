import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  getEventgameList,
  GetAllEvents,
} from "../../../../api/ServiceFile/ApiService";
import {
  gameListData,
  LocalData,
  PointListData,
} from "../../admincommittee/testData";
import History from "../History/History";
jest.mock("react-helmet-async");
jest.mock("../../../../api/ServiceFile/ApiService", () => ({
  GetAllEvents: jest.fn(),
  getEventgameList: jest.fn(),
}));
beforeEach(() => {
  jest.clearAllMocks();
});
describe("Admin History", () => {
  test("render History", () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    GetAllEvents.mockResolvedValue({ data: PointListData });
    getEventgameList.mockResolvedValue({ data: gameListData });
    render(
      <Router>
        <History />
      </Router>
    );
    const testElement = screen.getByText("Event name");
    expect(testElement).toBeInTheDocument();
  });
});

describe("Admin History", () => {
  test("render History", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    GetAllEvents.mockResolvedValue({ data: PointListData });
    getEventgameList.mockResolvedValue({ data: gameListData });
    render(
      <Router>
        <History />
      </Router>
    );
    const testElement = screen.getByText("Event name");
    expect(testElement).toBeInTheDocument();

    const AccordinBtn = await screen.findByTestId("accordinBtn_btn");
    expect(AccordinBtn).toBeInTheDocument();
    fireEvent.click(AccordinBtn);

    const testElement2 = await screen.findByText("Game Name");
    expect(testElement2).toBeInTheDocument();
  });
});
