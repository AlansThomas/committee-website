import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import Adminpost from "../AdminPost/Adminpost";
import { GetPosts } from "../../../../api/ServiceFile/ApiServiceAlwin";
import { LocalData } from "../../admincommittee/testData";
import { postDataArray } from "./testData";

jest.mock("react-helmet-async");
jest.mock("../../../../api/ServiceFile/ApiServiceAlwin", () => ({
  GetPosts: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("AdminFeed", () => {
  it("renders without crashing", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    GetPosts.mockResolvedValue({ data: postDataArray });

    await act(async () => {
      render(<Adminpost />);
    });

    const testElements = screen.getAllByText("Alans Thomas");
    expect(testElements.length).toBeGreaterThan(0);
  });

  it("clicks on delete buttons", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    GetPosts.mockResolvedValue({ data: postDataArray });

    await act(async () => {
      render(<Adminpost />);
    });

    const deleteButtons = await screen.findAllByTestId("delete_btn");
    expect(deleteButtons.length).toBeGreaterThan(0);

    deleteButtons.forEach((button) => {
      fireEvent.click(button);
      // Add your assertions or additional logic here read_more_btn
    });
  });

  it("clicks on delete buttons", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    GetPosts.mockResolvedValue({ data: postDataArray });

    await act(async () => {
      render(<Adminpost />);
    });

    const image = screen.queryByAltText("Image Alt Text");

    expect(image).toBeNull();
  });

  // it("clicks on read more buttons", async () => {
  //   localStorage.setItem("Profile", JSON.stringify(LocalData));
  //   GetPosts.mockResolvedValue({ data: postDataArray });

  //   await act(async () => {
  //     render(<Adminpost />);
  //   });

  //   const ReadMore = await screen.findAllByTestId("read_more_btn");
  //   expect(ReadMore.length).toBeGreaterThan(0);

  //   ReadMore.forEach((button) => {
  //     fireEvent.click(button);
  //   });
  // });
});
