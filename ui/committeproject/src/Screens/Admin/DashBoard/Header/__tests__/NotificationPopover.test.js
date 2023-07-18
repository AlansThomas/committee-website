import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import NotificationsPopover from "../NotificationsPopover";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../../../Store";
import { Provider } from "react-redux";
import {
  LocalData,
  readData,
  ReportedNotyData1,
  ReportedNotyData2,
  ReportedNotyData3,
  ReportedNotyData4,
  ReportedNotyData5,
  ReportedNotyData6,
} from "../testData";
import {
  Read,
  rReportedPostNoty,
} from "../../../../../api/ServiceFile/ApiService";

jest.mock("../../../../../api/ServiceFile/ApiService", () => ({
  Read: jest.fn(),
  rReportedPostNoty: jest.fn(),
}));

jest.mock("react-redux", () => {
  const ActualReactRedux = jest.requireActual("react-redux");
  return {
    ...ActualReactRedux,
    useSelector: jest.fn().mockImplementation(() => {
      return mockState;
    }),
  };
});

describe("NotificationPopover", () => {
  test("render NotificationPopover", () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    rReportedPostNoty.mockResolvedValue({ data: ReportedNotyData1 });
    render(
      <Provider store={store}>
        <Router>
          <NotificationsPopover />
        </Router>
      </Provider>
    );

    const notificationBtn = screen.getByTestId("notification_btn");
    expect(notificationBtn).toBeInTheDocument();
    fireEvent.click(notificationBtn);

    const testElement = screen.getByText("Notifications");
    expect(testElement).toBeInTheDocument();
  });

  test("render NotificationPopover unread", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    rReportedPostNoty.mockResolvedValue({ data: ReportedNotyData6 });
    render(
      <Provider store={store}>
        <Router>
          <NotificationsPopover />
        </Router>
      </Provider>
    );

    const notificationBtn = screen.getByTestId("notification_btn");
    expect(notificationBtn).toBeInTheDocument();
    fireEvent.click(notificationBtn);

    const testElement = screen.getByText("Notifications");
    expect(testElement).toBeInTheDocument();
  });

  test("render NotificationPopover commitee", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    rReportedPostNoty.mockResolvedValue({ data: ReportedNotyData3 });
    render(
      <Provider store={store}>
        <Router>
          <NotificationsPopover />
        </Router>
      </Provider>
    );

    const notificationBtn = screen.getByTestId("notification_btn");
    expect(notificationBtn).toBeInTheDocument();
    fireEvent.click(notificationBtn);
  });

  test("render NotificationPopover typ2", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    rReportedPostNoty.mockResolvedValue({ data: ReportedNotyData4 });
    render(
      <Provider store={store}>
        <Router>
          <NotificationsPopover />
        </Router>
      </Provider>
    );

    const notificationBtn =  screen.getByTestId("notification_btn");
    expect(notificationBtn).toBeInTheDocument();
    fireEvent.click(notificationBtn);

    const testElement = screen.getByText("Notifications");
    expect(testElement).toBeInTheDocument();
  });

  test("render NotificationPopover  br2", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    rReportedPostNoty.mockResolvedValue({ data: ReportedNotyData5 });
    render(
      <Provider store={store}>
        <Router>
          <NotificationsPopover />
        </Router>
      </Provider>
    );

    const notificationBtn = screen.getByTestId("notification_btn");
    expect(notificationBtn).toBeInTheDocument();
    fireEvent.click(notificationBtn);

    const testElement = screen.getByText("Notifications");
    expect(testElement).toBeInTheDocument();
  });

  test("render NotificationPopover err", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    rReportedPostNoty.mockResolvedValue({ data: [] });
    render(
      <Provider store={store}>
        <Router>
          <NotificationsPopover />
        </Router>
      </Provider>
    );

    const notificationBtn = screen.getByTestId("notification_btn");
    expect(notificationBtn).toBeInTheDocument();
    fireEvent.click(notificationBtn);
  });

  test("render MarkAs read", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    rReportedPostNoty.mockResolvedValue({ data: ReportedNotyData1 });
    Read.mockResolvedValue({ data: readData });
    render(
      <Provider store={store}>
        <Router>
          <NotificationsPopover />
        </Router>
      </Provider>
    );

    const notificationBtn = screen.getByTestId("notification_btn");
    expect(notificationBtn).toBeInTheDocument();
    fireEvent.click(notificationBtn);

    const readBtn = await screen.findByTestId("read-Btn");
    expect(readBtn).toBeInTheDocument();
    fireEvent.click(readBtn);
  });
});

describe("NotificationPopover Branch", () => {
  test("render NotificationPopover posted", () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    rReportedPostNoty.mockResolvedValue({ data: ReportedNotyData2 });
    render(
      <Provider store={store}>
        <Router>
          <NotificationsPopover />
        </Router>
      </Provider>
    );

    const notificationBtn = screen.getByTestId("notification_btn");
    expect(notificationBtn).toBeInTheDocument();
    fireEvent.click(notificationBtn);

    const testElement = screen.getByText("Notifications");
    expect(testElement).toBeInTheDocument();
  });
});
