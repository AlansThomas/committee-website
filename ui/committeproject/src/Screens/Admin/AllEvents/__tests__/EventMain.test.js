import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { LocalData } from "../../admincommittee/testData";
import EventsMain from "../EventsMain";

jest.mock("react-helmet-async");

describe("Admin EventMain", () => {
  test("render EventMain", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    render(
      <Router>
        <EventsMain />
      </Router>
    );
  });
});
