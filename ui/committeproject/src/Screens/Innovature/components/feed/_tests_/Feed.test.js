import { render,  act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { LocalData } from "../../../../Admin/admincommittee/testData";
import Feed from "../Feed";
import React from "react";
import { Provider } from "react-redux";
import store from "../../../../../Store";

jest.mock("react-helmet-async");
jest.mock("../../PstSender/Notification3.mp3", () => "mocked-audio-file");

describe("Admin AdminFeed", () => {
  test("render AdminFeed", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));

    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <Feed />
          </Router>
        </Provider>
      );
    });


  });
});
