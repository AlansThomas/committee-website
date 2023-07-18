import { render, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { LocalData } from "../../../../Admin/admincommittee/testData";
import pointTableLive from "../pointTableLive";
import React from "react";

jest.mock("react-helmet-async");

describe("Admin AdminFeed", () => {
  test("render AdminFeed", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));

    await act(async () => {
      render(
          <Router>
            <pointTableLive />
          </Router>
      );
    });

  });
});
