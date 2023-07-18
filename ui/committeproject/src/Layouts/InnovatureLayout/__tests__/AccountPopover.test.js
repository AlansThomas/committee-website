import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AccountPopover from "../dashboard/header/AccountPopover";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../Store";
import {
  curUserDetail,
  LocalData,
} from "../../../Screens/Admin/TagedUserProfiles/testData";
import { userDetails } from "../../../api/ServiceFile/ApiServiceInno";

jest.mock("../../../api/ServiceFile/ApiServiceInno", () => ({
  userDetails: jest.fn(),
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

describe("Admin AccountPopover", () => {
  test("render AccountPopover", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    localStorage.setItem("LoggedInUserType", 1);
    userDetails.mockResolvedValue({ data: curUserDetail });
    render(
      <Provider store={store}>
        <Router>
          <AccountPopover />
        </Router>
      </Provider>
    );
    const OpenBtn = screen.getByTestId("Open-Btn");
    expect(OpenBtn).toBeInTheDocument();
    fireEvent.click(OpenBtn);

    const ProfileBtn = screen.getByTestId("profile-Btn");
    expect(ProfileBtn).toBeInTheDocument();
    fireEvent.click(ProfileBtn);

    const CommiteeBtn = screen.getByTestId("switch-Btn");
    expect(CommiteeBtn).toBeInTheDocument();
    fireEvent.click(CommiteeBtn);

    const logoutBtn = screen.getByTestId("logout-Btn");
    expect(logoutBtn).toBeInTheDocument();
    fireEvent.click(logoutBtn);
  });


  test("render AccountPopover null", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    userDetails.mockResolvedValue({ data: curUserDetail });
    render(
      <Provider store={store}>
        <Router>
          <AccountPopover />
        </Router>
      </Provider>
    );
    const OpenBtn = screen.getByTestId("Open-Btn");
    expect(OpenBtn).toBeInTheDocument();
    fireEvent.click(OpenBtn);
  });
});
