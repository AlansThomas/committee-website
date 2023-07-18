import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { groupListData, PointListData } from "../../admincommittee/testData";
import EventTable from "../AllEvents/EventTable";
import React from "react";

describe("Admin EventTable", () => {
  test("render EventTable", async () => {
    const PointList = PointListData;
    const page = 1;
    const rowsPerPage = 10;
    const expanded = "1";
    const handleChange = jest.fn();
    const EventClick = jest.fn();
    const gameList = groupListData;

    render(
      <Router>
        <EventTable
          PointList={PointList}
          page={page}
          rowsPerPage={rowsPerPage}
          expanded={expanded}
          handleChange={handleChange}
          EventClick={EventClick}
          gameList={gameList}
        />
      </Router>
    );

    const testElement = screen.getByText("Event name");
    expect(testElement).toBeInTheDocument();

    const AccordinBtn = screen.getByTestId("accordinBtn_btn");
    expect(AccordinBtn).toBeInTheDocument();
    fireEvent.click(AccordinBtn);

    const testElement2 = screen.getByText("Group name");
    expect(testElement2).toBeInTheDocument();
  });
});
