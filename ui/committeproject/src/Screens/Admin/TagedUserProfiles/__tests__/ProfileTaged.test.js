import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  LocalData,
  UserDetails,
  TestPostOfUser,
  UserDetailsGroup,
  getCommittepost,
} from "../testData";
import ProfileTaged from "../ProfileTaged";
import React from "react";
import {
  getPostUserApi,
  getCommettePost,
  userDetails,
} from "../../../../api/ServiceFile/ApiServiceAlwin";

jest.mock("react-helmet-async");
jest.mock("../../../../api/ServiceFile/ApiServiceAlwin", () => ({
  getTaggedPostUser: jest.fn(),
  getPostUserApi: jest.fn(),
  getCommettePost: jest.fn(),
  userDetails: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Admin ProfileTaged", () => {
  test("render ProfileTaged", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    userDetails.mockResolvedValue({ data: UserDetails });
    getPostUserApi.mockResolvedValue({ data: TestPostOfUser });

    render(
      <Router>
        <ProfileTaged />
      </Router>
    );
    const testElements = await screen.findByText("Group Members");
    expect(testElements).toBeInTheDocument();
  });

  test("render ProfileTaged", async () => {
    userDetails.mockResolvedValue({ data: UserDetailsGroup });
    getPostUserApi.mockResolvedValue({ data: TestPostOfUser });
    getCommettePost.mockResolvedValue({ data: getCommittepost });
  });
});
