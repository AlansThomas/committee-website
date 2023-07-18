import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  EventWisewinnerData,
  groupListData,
  LocalData,
} from "../../admincommittee/testData";
import EventWisePoint from "../EventWisePoint";
import React from "react";
import {
  eventWisewinner,
  FindEventgroupList,
} from "../../../../api/ServiceFile/ApiService";

jest.mock("react-helmet-async");

jest.mock("../../../../api/ServiceFile/ApiService", () => ({
  eventWisewinner: jest.fn(),
  FindEventgroupList: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Admin EventWisePoint", () => {
  test("render EventWisePoint", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    eventWisewinner.mockResolvedValue({ data: EventWisewinnerData });
    render(
      <Router>
        <EventWisePoint />
      </Router>
    );
    const GroupsPage = screen.getByTestId("event-wise-point");
    expect(GroupsPage).toBeInTheDocument();
  });
});

describe("Admin EventWisePointModal", () => {
  test("render EventWisePoint", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    eventWisewinner.mockResolvedValue({ data: EventWisewinnerData });
    FindEventgroupList.mockResolvedValue({ data: groupListData });

    render(
      <Router>
        <EventWisePoint />
      </Router>
    );
    const GroupsPage = screen.getByTestId("event-wise-point");
    expect(GroupsPage).toBeInTheDocument();

    const modalOpen = await screen.findByTestId("modal-Btn");
    expect(modalOpen).toBeInTheDocument();
    fireEvent.click(modalOpen);
  });
});

describe("Admin EventWisePointModalclose", () => {
  test("render EventWisePointModalclose", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    eventWisewinner.mockResolvedValue({ data: EventWisewinnerData });
    FindEventgroupList.mockResolvedValue({ data: groupListData });

    render(
      <Router>
        <EventWisePoint />
      </Router>
    );
    const GroupsPage = screen.getByTestId("event-wise-point");
    expect(GroupsPage).toBeInTheDocument();

    const modalOpen = await screen.findByTestId("modal-Btn");
    expect(modalOpen).toBeInTheDocument();
    fireEvent.click(modalOpen);

    const modalclose = await screen.findByTestId("modalclose-Btn");
    expect(modalclose).toBeInTheDocument();
    fireEvent.click(modalclose);
  });
});
