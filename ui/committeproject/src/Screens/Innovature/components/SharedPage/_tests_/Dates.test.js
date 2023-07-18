import React from "react";
import { render } from "@testing-library/react";
import Dates from "../Dates";

describe("Dates", () => {
  it('renders the formatted date as "Yesterday" when the createdAt date is yesterday', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const props = { createdAt: yesterday.toISOString() };

    const { getByText } = render(<Dates props={props} />);
    const formattedDate = getByText(/Yesterday at \d{1,2}:\d{2} (AM|PM)/);

    expect(formattedDate).toBeInTheDocument();
  });

  it('renders the formatted date as "just now" when the createdAt date is the current moment', () => {
    const today = new Date();
    const props = { createdAt: today.toISOString() };

    const { getByText } = render(<Dates props={props} />);
    const formattedDate = getByText("just now");

    expect(formattedDate).toBeInTheDocument();
  });

  // it('renders the formatted date in the correct format for other dates', () => {
  //   const date = new Date('2023-05-16T06:04:43.641Z');
  //   const props = { createdAt: date.toISOString() };

  //   const { getByText } = render(<Dates props={props} />);
  //   const formattedDate = getByText("May 16 at 11:34 AM");

  //   expect(formattedDate).toBeInTheDocument();
  // });

  // it('renders the formatted date in a custom format when provided with a custom formatter', () => {
  //   const date = new Date('2023-05-19T14:25:00Z');
  //   const props = {
  //     createdAt: date.toISOString(),
  //     formatter: (dateToFormat) => {
  //       return dateToFormat.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  //     }
  //   };

  //   const { getByText } = render(<Dates props={props} />);
  //   const formattedDate = getByText("May 19 at 7:55 PM");

  //   expect(formattedDate).toBeInTheDocument();
  // });
});
