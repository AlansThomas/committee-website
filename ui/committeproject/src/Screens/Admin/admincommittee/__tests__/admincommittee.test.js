import React from "react";
import { fireEvent, render, screen,waitFor } from "@testing-library/react";
import Committee from "../Committee";
import { BrowserRouter as Router } from "react-router-dom";
import {
  LocalData,
  FindCommitteeDetails,
  ListCommitteeMemberResponse,
  AddCommitteeUserList,
  DesinationListResponse,
  SearchResponse,
  CommitteeMemberDeleteRes,
} from "../testData";
import {
  DeleteCommitteeMember,
  FindCommittee,
  ListCommitteeMember,
  ListUserToAddCommittee,
  ListDesignation,
  CommitteeSearch,
} from "../../../../api/ServiceFile/ApiService";

jest.mock("react-helmet-async");
jest.mock("../../../../api/ServiceFile/ApiService", () => ({
  DeleteCommitteeMember: jest.fn(),
  FindCommittee: jest.fn(),
  ListCommitteeMember: jest.fn(),
  ListUserToAddCommittee: jest.fn(),
  ListDesignation: jest.fn(),
  CommitteeSearch: jest.fn(),
}));
jest.mock("sweetalert2", () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));
describe("Admin Committee", () => {
  test("render AdminCommittee", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    FindCommittee.mockResolvedValue({ data: FindCommitteeDetails });
    ListCommitteeMember.mockResolvedValue({
      data: ListCommitteeMemberResponse,
    });
    ListUserToAddCommittee.mockResolvedValue({ data: AddCommitteeUserList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    CommitteeSearch.mockResolvedValue({ data: SearchResponse });
    render(
      <Router>
        <Committee />
      </Router>
    );
    const CommitteePage = screen.getByTestId("committee-id");
    expect(CommitteePage).toBeInTheDocument();
  });

  test("Search close button", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    FindCommittee.mockResolvedValue({ data: FindCommitteeDetails });
    ListCommitteeMember.mockResolvedValue({
      data: ListCommitteeMemberResponse,
    });
    ListUserToAddCommittee.mockResolvedValue({ data: AddCommitteeUserList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    CommitteeSearch.mockResolvedValue({ data: SearchResponse });
    render(
      <Router>
        <Committee />
      </Router>
    );
    const CloseBtn = screen.getByTestId("Close-btn-Search");
    expect(CloseBtn).toBeInTheDocument();
    fireEvent.click(CloseBtn);

    const testElement = screen.getByText("Search");
    expect(testElement).toBeInTheDocument();
  });

  test("Add new member", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    FindCommittee.mockResolvedValue({ data: FindCommitteeDetails });
    ListCommitteeMember.mockResolvedValue({
      data: ListCommitteeMemberResponse,
    });
    ListUserToAddCommittee.mockResolvedValue({ data: AddCommitteeUserList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    CommitteeSearch.mockResolvedValue({ data: SearchResponse });
    render(
      <Router>
        <Committee />
      </Router>
    );
    const AddMemberBtn = screen.getByTestId("New-member-btn");
    expect(AddMemberBtn).toBeInTheDocument();
    fireEvent.click(AddMemberBtn);

    const testElement = screen.getByText("Add Committee Member");
    expect(testElement).toBeInTheDocument();
  });
  test("textFiled search name", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    FindCommittee.mockResolvedValue({ data: FindCommitteeDetails });
    ListCommitteeMember.mockResolvedValue({
      data: ListCommitteeMemberResponse,
    });
    ListUserToAddCommittee.mockResolvedValue({ data: AddCommitteeUserList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    CommitteeSearch.mockResolvedValue({ data: SearchResponse });
    render(
      <Router>
        <Committee />
      </Router>
    );
    const CloseBtn = screen.getByTestId("Close-btn-Search");
    expect(CloseBtn).toBeInTheDocument();
    fireEvent.click(CloseBtn);

    const SearchTextFiled = screen.getByTestId("Textfield-search-name");
    expect(SearchTextFiled).toBeInTheDocument();
    fireEvent.change(SearchTextFiled, { target: { value: "aparna" } });
  });
  test("textFiled search email", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    FindCommittee.mockResolvedValue({ data: FindCommitteeDetails });
    ListCommitteeMember.mockResolvedValue({
      data: ListCommitteeMemberResponse,
    });
    ListUserToAddCommittee.mockResolvedValue({ data: AddCommitteeUserList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    CommitteeSearch.mockResolvedValue({ data: SearchResponse });
    render(
      <Router>
        <Committee />
      </Router>
    );
    const CloseBtn = screen.getByTestId("Close-btn-Search");
    expect(CloseBtn).toBeInTheDocument();
    fireEvent.click(CloseBtn);

    const SearchTextFiled = screen.getByTestId("Textfield-search-email");
    expect(SearchTextFiled).toBeInTheDocument();
    fireEvent.change(SearchTextFiled, { target: { value: "aparna" } });
  });
  test("textFiled search startDate", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    FindCommittee.mockResolvedValue({ data: FindCommitteeDetails });
    ListCommitteeMember.mockResolvedValue({
      data: ListCommitteeMemberResponse,
    });
    ListUserToAddCommittee.mockResolvedValue({ data: AddCommitteeUserList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    CommitteeSearch.mockResolvedValue({ data: SearchResponse });
    render(
      <Router>
        <Committee />
      </Router>
    );
    const CloseBtn = screen.getByTestId("Close-btn-Search");
    expect(CloseBtn).toBeInTheDocument();
    fireEvent.click(CloseBtn);

    const SearchDateeFiled = screen.getByTestId("Textfield-search-startDate");
    expect(SearchDateeFiled).toBeInTheDocument();
    fireEvent.change(SearchDateeFiled, { target: { value: "2023-05-02" } });
    fireEvent.blur(SearchDateeFiled,{ target: { value: "2023-06-02" } })
    fireEvent.blur(SearchDateeFiled,{ target: { value: "" } })

  });
  test("textFiled search endDate", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    FindCommittee.mockResolvedValue({ data: FindCommitteeDetails });
    ListCommitteeMember.mockResolvedValue({
      data: ListCommitteeMemberResponse,
    });
    ListUserToAddCommittee.mockResolvedValue({ data: AddCommitteeUserList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    CommitteeSearch.mockResolvedValue({ data: SearchResponse });
    render(
      <Router>
        <Committee />
      </Router>
    );
    const CloseBtn = screen.getByTestId("Close-btn-Search");
    expect(CloseBtn).toBeInTheDocument();
    fireEvent.click(CloseBtn);

    const SearchDateeFiled = screen.getByTestId("Textfield-search-EndDate");
    expect(SearchDateeFiled).toBeInTheDocument();
    fireEvent.change(SearchDateeFiled, { target: { value: "2023-05-02" } });
    fireEvent.blur(SearchDateeFiled, { target: { value: "2023-06-02" } });
    fireEvent.blur(SearchDateeFiled, { target: { value: "" } });

  });

  test("textFiled search Designation", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    FindCommittee.mockResolvedValue({ data: FindCommitteeDetails });
    ListCommitteeMember.mockResolvedValue({
      data: ListCommitteeMemberResponse,
    });
    ListUserToAddCommittee.mockResolvedValue({ data: AddCommitteeUserList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    CommitteeSearch.mockResolvedValue({ data: SearchResponse });
    render(
      <Router>
        <Committee />
      </Router>
    );
    const CloseBtn = screen.getByTestId("Close-btn-Search");
    expect(CloseBtn).toBeInTheDocument();
    fireEvent.click(CloseBtn);

    const SearchDesignationFiled = screen.getByTestId("designation-field").querySelector("input");
    expect(SearchDesignationFiled).toBeInTheDocument();
    fireEvent.select(SearchDesignationFiled, {
      target: { value: "Software Engineer" },
    });
    fireEvent.blur(SearchDesignationFiled, {
      target: { value: "Software Engineer" },
    });
  });
  test("textFiled search Designation", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    FindCommittee.mockResolvedValue({ data: FindCommitteeDetails });
    ListCommitteeMember.mockResolvedValue({
      data: ListCommitteeMemberResponse,
    });
    ListUserToAddCommittee.mockResolvedValue({ data: AddCommitteeUserList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    CommitteeSearch.mockResolvedValue({ data: SearchResponse });
    render(
      <Router>
        <Committee />
      </Router>
    );
    const CloseBtn = screen.getByTestId("Close-btn-Search");
    expect(CloseBtn).toBeInTheDocument();
    fireEvent.click(CloseBtn);

    const SearchDesignationFiled = screen.getByTestId("designation-field").querySelector("input");
    expect(SearchDesignationFiled).toBeInTheDocument();
    fireEvent.select(SearchDesignationFiled, {
      target: { value: "Software Engineer" },
    });
    fireEvent.blur(SearchDesignationFiled, {
      target: { value: "Software Engineer" },
    });
  });
  test("Search clear data", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    FindCommittee.mockResolvedValue({ data: FindCommitteeDetails });
    ListCommitteeMember.mockResolvedValue({
      data: ListCommitteeMemberResponse,
    });
    ListUserToAddCommittee.mockResolvedValue({ data: AddCommitteeUserList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    CommitteeSearch.mockResolvedValue({ data: SearchResponse });
    render(
      <Router>
        <Committee />
      </Router>
    );
    const CloseBtn = screen.getByTestId("Close-btn-Search");
    expect(CloseBtn).toBeInTheDocument();
    fireEvent.click(CloseBtn);

    const SearchTextFiled = screen.getByTestId("Textfield-search-email");
    expect(SearchTextFiled).toBeInTheDocument();
    fireEvent.change(SearchTextFiled, { target: { value: "aparna" } });

    const ClearBtn = screen.getByTestId("clearData-committee");
    expect(ClearBtn).toBeInTheDocument();
    fireEvent.click(ClearBtn);
  });
  test("Delete Committee member", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    FindCommittee.mockResolvedValue({ data: FindCommitteeDetails });
    ListCommitteeMember.mockResolvedValue({
      data: ListCommitteeMemberResponse,
    });
    ListUserToAddCommittee.mockResolvedValue({ data: AddCommitteeUserList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    CommitteeSearch.mockResolvedValue({ data: SearchResponse });
    DeleteCommitteeMember.mockResolvedValue({ data: CommitteeMemberDeleteRes });
    render(
      <Router>
        <Committee />
      </Router>
    );

    await waitFor(() => {
      const DeleteBtn = screen.getByTestId("delete-committee-member");
      expect(DeleteBtn).toBeInTheDocument();
      fireEvent.click(DeleteBtn);
    });
  });
  test("add Committee member modal close", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    FindCommittee.mockResolvedValue({ data: FindCommitteeDetails });
    ListCommitteeMember.mockResolvedValue({
      data: ListCommitteeMemberResponse,
    });
    ListUserToAddCommittee.mockResolvedValue({ data: AddCommitteeUserList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    CommitteeSearch.mockResolvedValue({ data: SearchResponse });
    DeleteCommitteeMember.mockResolvedValue({ data: CommitteeMemberDeleteRes });
    render(
      <Router>
        <Committee />
      </Router>
    );

    const AddMemberBtn = screen.getByTestId("New-member-btn");
    expect(AddMemberBtn).toBeInTheDocument();
    fireEvent.click(AddMemberBtn);

    const testElement = screen.getByText("Add Committee Member");
    expect(testElement).toBeInTheDocument();

    await waitFor(() => {
      const ModalCloseBtn = screen.getByTestId("add-member-modal-close");
      expect(ModalCloseBtn).toBeInTheDocument();
      fireEvent.click(ModalCloseBtn);
    });
  });
  test("add Committee member submit", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    FindCommittee.mockResolvedValue({ data: FindCommitteeDetails });
    ListCommitteeMember.mockResolvedValue({
      data: ListCommitteeMemberResponse,
    });
    ListUserToAddCommittee.mockResolvedValue({ data: AddCommitteeUserList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    CommitteeSearch.mockResolvedValue({ data: SearchResponse });
    DeleteCommitteeMember.mockResolvedValue({ data: CommitteeMemberDeleteRes });
    render(
      <Router>
        <Committee />
      </Router>
    );

    const AddMemberBtn = screen.getByTestId("New-member-btn");
    expect(AddMemberBtn).toBeInTheDocument();
    fireEvent.click(AddMemberBtn);

    const testElement = screen.getByText("Add Committee Member");
    expect(testElement).toBeInTheDocument();

    await waitFor(() => {
      const SubmitBtn = screen.getByTestId("add-committee-member-btn");
      expect(SubmitBtn).toBeInTheDocument();
      fireEvent.click(SubmitBtn);
    });
  });
  test("Update search value", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    FindCommittee.mockResolvedValue({ data: FindCommitteeDetails });
    ListCommitteeMember.mockResolvedValue({
      data: ListCommitteeMemberResponse,
    });
    ListUserToAddCommittee.mockResolvedValue({ data: AddCommitteeUserList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    CommitteeSearch.mockResolvedValue({ data: SearchResponse });
    render(
      <Router>
        <Committee />
      </Router>
    );
    const AddMemberBtn = screen.getByTestId("New-member-btn");
    expect(AddMemberBtn).toBeInTheDocument();
    fireEvent.click(AddMemberBtn);

    const testElement = screen.getByText("Add Committee Member");
    expect(testElement).toBeInTheDocument();

    const ValueUpdateBtn = screen.getByTestId("update-search-values");
    expect(ValueUpdateBtn).toBeInTheDocument();
    fireEvent.click(ValueUpdateBtn);
  });
  
});
