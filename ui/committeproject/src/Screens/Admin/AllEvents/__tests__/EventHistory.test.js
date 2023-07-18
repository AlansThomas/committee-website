import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  getEventGroupGameList,
  GsetQuarterEvents,
  GetEventWiseGroup,
} from "../../../../api/ServiceFile/ApiService";
import {
  groupListforEventHisory,
  LocalData,
  PointListData,
  gameListforEventHisory,
} from "../../admincommittee/testData";
import EventHistory from "../EventHisory/EventHistory";

jest.mock("react-helmet-async");

jest.mock("../../../../api/ServiceFile/ApiService", () => ({
  GsetQuarterEvents: jest.fn(),
  GetEventWiseGroup: jest.fn(),
  getEventGroupGameList: jest.fn(),
}));
beforeEach(() => {
  jest.clearAllMocks();
});

describe("Admin EventHistory", () => {
  test("render EventHistory", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    GsetQuarterEvents.mockResolvedValue({ data: PointListData });
    render(
      <Router>
        <EventHistory />
      </Router>
    );
    const testElement = screen.getByText("Events");
    expect(testElement).toBeInTheDocument();
  });
});

describe("Admin EventHistoryModal", () => {
  test("render EventHistoryModalOpen", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    GsetQuarterEvents.mockResolvedValue({ data: PointListData });
    GetEventWiseGroup.mockResolvedValue({ data: groupListforEventHisory });
    getEventGroupGameList.mockResolvedValue({ data: gameListforEventHisory });

    render(
      <Router>
        <EventHistory />
      </Router>
    );
    const testElement = screen.getByText("Events");
    expect(testElement).toBeInTheDocument();

    const MOdalOpenBtn = await screen.findByTestId("modalopn_btn");
    expect(MOdalOpenBtn).toBeInTheDocument();
    fireEvent.click(MOdalOpenBtn);

    const testElement3 = screen.getByText("Groups");
    expect(testElement3).toBeInTheDocument();
  });
});


describe("Admin EventHistoryPointPublish", () => {
  test("render EventHistoryPointPublish", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    GsetQuarterEvents.mockResolvedValue({ data: PointListData });
    GetEventWiseGroup.mockResolvedValue({ data: groupListforEventHisory });
    getEventGroupGameList.mockResolvedValue({ data: gameListforEventHisory });

    render(
      <Router>
        <EventHistory />
      </Router>
    );
    const testElement = screen.getByText("Events");
    expect(testElement).toBeInTheDocument();

    const MOdalOpenBtn = await screen.findByTestId("modalopn_btn");
    expect(MOdalOpenBtn).toBeInTheDocument();
    fireEvent.click(MOdalOpenBtn);

    const PointPub = await screen.findByTestId("pub_btn");
    expect(PointPub).toBeInTheDocument();
    fireEvent.click(PointPub);
  });
});

describe("Admin EventHistoryModalclose", () => {
  test("render EventHistoryModalclose", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    GsetQuarterEvents.mockResolvedValue({ data: PointListData });
    GetEventWiseGroup.mockResolvedValue({ data: groupListforEventHisory });
    getEventGroupGameList.mockResolvedValue({ data: gameListforEventHisory });

    render(
      <Router>
        <EventHistory />
      </Router>
    );
    const testElement = screen.getByText("Events");
    expect(testElement).toBeInTheDocument();

    const MOdalOpenBtn = await screen.findByTestId("modalopn_btn");
    expect(MOdalOpenBtn).toBeInTheDocument();
    fireEvent.click(MOdalOpenBtn);

    const MOdalCloseBtn = await screen.findByTestId("modalclose_btn");
    expect(MOdalCloseBtn).toBeInTheDocument();
    fireEvent.click(MOdalCloseBtn);
  });
});
