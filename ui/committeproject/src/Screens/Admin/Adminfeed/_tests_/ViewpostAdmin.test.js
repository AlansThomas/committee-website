import React from "react";
import { render, screen } from "@testing-library/react";
import ViewpostAdmin from "../ViewPost/ViewpostAdmin";
import { postData, postData2 } from "./testData";
jest.mock("react-helmet-async");
describe("viewPost", () => {
  it("renders a single post short discription", () => {
    const props = postData;

    render(<ViewpostAdmin post={props} />);
    const testElement = screen.getByText("hvbhfj");
    expect(testElement).toBeInTheDocument();
  });
  it("renders a single post long discription", () => {
    const props = postData2;

    render(<ViewpostAdmin post={props} />);
    const testElement = screen.getByText("Alans Thomas");
    expect(testElement).toBeInTheDocument();
  });
});
