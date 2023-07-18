import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { LocalData } from "../../admincommittee/testData";
import ReportedPost from "../ReportedPost";
import store from "../../../../Store";
import { Provider } from "react-redux";
import {
  DeleteReportedPost,
  GetSinglePost,
} from "../../../../api/ServiceFile/ApiServiceAlwin";
import { ReportPost, ReportPostData2 } from "../../Adminfeed/_tests_/testData";

jest.mock("react-helmet-async");

jest.mock("sweetalert2", () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));

jest.mock("../../../../api/ServiceFile/ApiServiceAlwin", () => ({
  GetSinglePost: jest.fn(),
  DeleteReportedPost: jest.fn(),
}));
describe("Admin ReportedPost", () => {
  test("render ReportedPost", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    GetSinglePost.mockResolvedValue({ data: ReportPost });
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <ReportedPost />
          </Router>
        </Provider>
      );
    });
    const ReportedPostPage = screen.getByTestId("reportedPost-page");
    expect(ReportedPostPage).toBeInTheDocument();
  });

  test("render ReportedPost commmitee", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    GetSinglePost.mockResolvedValue({ data: ReportPostData2 });
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <ReportedPost />
          </Router>
        </Provider>
      );
    });
    const ReportedPostPage = screen.getByTestId("reportedPost-page");
    expect(ReportedPostPage).toBeInTheDocument();
  });

  test("render ReportedPos redir", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    GetSinglePost.mockResolvedValue({ data: ReportPost });
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <ReportedPost />
          </Router>
        </Provider>
      );
    });
    const redir = await screen.findByTestId("redir-btn");
    expect(redir).toBeInTheDocument();
    fireEvent.click(redir);
  });

  test("clicks on read more buttons", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    GetSinglePost.mockResolvedValue({ data: ReportPost });
    DeleteReportedPost.mockResolvedValue({ data: "post deleted" });

    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <ReportedPost />
          </Router>
        </Provider>
      );
    });

    const ReadMore = await screen.findAllByTestId("report_btn");
    expect(ReadMore.length).toBeGreaterThan(0);

    ReadMore.forEach((button) => {
      fireEvent.click(button);
    });
  });

  test("render ReportedPost with text", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    GetSinglePost.mockResolvedValue({ data: ReportPost });
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <ReportedPost />
          </Router>
        </Provider>
      );
    });

    const findByText = async (text) => {
      try {
        return await screen.findByText(text);
      } catch (error) {
        // Handle error or return null if the text is not found
        return null;
      }
    };

    const testElement = await findByText("alwin kc");
    expect(testElement).toBeInTheDocument();
  });
});

