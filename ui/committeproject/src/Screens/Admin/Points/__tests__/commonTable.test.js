import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { PendingData } from "../../admincommittee/testData";
import PointCommon from "../PendingAndReported/PointCommon";
import React from "react";
jest.mock("react-helmet-async");

describe("Admin CommonTable", () => {
  test("render EventTable", async () => {
    const columns = [
      { id: "EventName", label: "Event Name", minWidth: 150 },
      { id: "GroupName", label: "Group Name", minWidth: 150 },
      { id: "GameName", label: "Game Name", minWidth: 150 },
      { id: "Point", label: "Point", minWidth: 150 },
    ];
    const data = PendingData;
    const page = 1;
    const rowsPerPage = 10;
    const titile = "Common table";
    const status = 1;

    render(
      <Router>
        <PointCommon
          columns={columns}
          data={data}
          page={page}
          rowsPerPage={rowsPerPage}
          titile={titile}
          status={status}
        />
      </Router>
    );

    const testElement = screen.getByText("Event Name");
    expect(testElement).toBeInTheDocument();
  });
});
