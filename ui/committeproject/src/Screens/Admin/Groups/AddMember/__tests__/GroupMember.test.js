import { render, screen, fireEvent,waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  LocalData,
  TeamSearch,
  ListCommitteeMemberResponse,
  AddCommitteeUserList,
  RoleChangeList,
  DesinationListResponse,
  DeleteUser
} from "../../../admincommittee/testData";
import GroupMember from "../GroupMember";
import React from "react";
import {
  searchGroupMember,
  groupMemberList,
  UserListToCommitteeAdd,
  ListDesignation,
  listUserChangeRole,
  DeleteGroupMember
} from "../../../../../api/ServiceFile/ApiService";

jest.mock("react-helmet-async");
jest.mock("../../../../../api/ServiceFile/ApiService", () => ({
  searchGroupMember: jest.fn(),
  groupMemberList: jest.fn(),
  UserListToCommitteeAdd: jest.fn(),
  listUserChangeRole: jest.fn(),
  ListDesignation: jest.fn(),
  DeleteGroupMember: jest.fn(),
}));
jest.mock("sweetalert2", () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));
describe("Admin GroupMember", () => {
  test("render GroupMember", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    groupMemberList.mockResolvedValue({ data: ListCommitteeMemberResponse });
    UserListToCommitteeAdd.mockResolvedValue({ data: AddCommitteeUserList });
    listUserChangeRole.mockResolvedValue({ data: RoleChangeList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    searchGroupMember.mockResolvedValue({ data: TeamSearch });
    render(
      <Router>
        <GroupMember />
      </Router>
    );
    const GroupMemberPage = screen.getByTestId("groupMember-add");
    expect(GroupMemberPage).toBeInTheDocument();
  });
  test("Open search", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    groupMemberList.mockResolvedValue({ data: ListCommitteeMemberResponse });
    UserListToCommitteeAdd.mockResolvedValue({ data: AddCommitteeUserList });
    listUserChangeRole.mockResolvedValue({ data: RoleChangeList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    searchGroupMember.mockResolvedValue({ data: TeamSearch });
    render(
      <Router>
        <GroupMember />
      </Router>
    );
    const SearchBtn = screen.getByTestId("search-add-groupMember");
    expect(SearchBtn).toBeInTheDocument();
    fireEvent.click(SearchBtn);
  });
  test("search name", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    groupMemberList.mockResolvedValue({ data: ListCommitteeMemberResponse });
    UserListToCommitteeAdd.mockResolvedValue({ data: AddCommitteeUserList });
    listUserChangeRole.mockResolvedValue({ data: RoleChangeList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    searchGroupMember.mockResolvedValue({ data: TeamSearch });
    render(
      <Router>
        <GroupMember />
      </Router>
    );
    const SearchBtn = screen.getByTestId("search-add-groupMember");
    expect(SearchBtn).toBeInTheDocument();
    fireEvent.click(SearchBtn);

    const SearchTextFiled = screen.getByTestId("search-groupMember-name");
    expect(SearchTextFiled).toBeInTheDocument();
    fireEvent.change(SearchTextFiled, { target: { value: "aparna" } });
  });
  test("search Email", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    groupMemberList.mockResolvedValue({ data: ListCommitteeMemberResponse });
    UserListToCommitteeAdd.mockResolvedValue({ data: AddCommitteeUserList });
    listUserChangeRole.mockResolvedValue({ data: RoleChangeList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    searchGroupMember.mockResolvedValue({ data: TeamSearch });
    render(
      <Router>
        <GroupMember />
      </Router>
    );
    const SearchBtn = screen.getByTestId("search-add-groupMember");
    expect(SearchBtn).toBeInTheDocument();
    fireEvent.click(SearchBtn);

    const SearchEmailText = screen.getByTestId("search-groupMember-email");
    expect(SearchEmailText).toBeInTheDocument();
    fireEvent.change(SearchEmailText, { target: { value: "aparna" } });

    const SearchDesignationText = screen.getByTestId(
      "designation-groupMember-search-field"
    ).querySelector("input");
    expect(SearchDesignationText).toBeInTheDocument();
    fireEvent.select(SearchDesignationText, {
      target: { value: "Software Engineer" },
    });
    fireEvent.blur(SearchDesignationText, {
      target: { value: "Software Engineer" },
    });
    const ClearDataBtn = screen.getByTestId("clearData-search-data");
    expect(ClearDataBtn).toBeInTheDocument();
    fireEvent.click(ClearDataBtn);
  });
  test("delete-user", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    groupMemberList.mockResolvedValue({ data: ListCommitteeMemberResponse });
    UserListToCommitteeAdd.mockResolvedValue({ data: AddCommitteeUserList });
    listUserChangeRole.mockResolvedValue({ data: RoleChangeList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    searchGroupMember.mockResolvedValue({ data: TeamSearch });
    DeleteGroupMember.mockResolvedValue({ data: DeleteUser})
    render(
      <Router>
        <GroupMember />
      </Router>
    );
    await waitFor(() => {
      const DeleteBtn = screen.getByTestId("delete-group-member");
      expect(DeleteBtn).toBeInTheDocument();
      fireEvent.click(DeleteBtn);
    });
  });
  test("manage role", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    groupMemberList.mockResolvedValue({ data: ListCommitteeMemberResponse });
    UserListToCommitteeAdd.mockResolvedValue({ data: AddCommitteeUserList });
    listUserChangeRole.mockResolvedValue({ data: RoleChangeList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    searchGroupMember.mockResolvedValue({ data: TeamSearch });
    render(
      <Router>
        <GroupMember />
      </Router>
    );
    const ManageRoleBtn = screen.getByTestId("manage-role-group-member");
    expect(ManageRoleBtn).toBeInTheDocument();
    fireEvent.click(ManageRoleBtn);
    const ManageRoleCloseBtn = screen.getByTestId("role-change-modal-close");
    expect(ManageRoleCloseBtn).toBeInTheDocument();
    fireEvent.click(ManageRoleCloseBtn);
    
  });
  test("manage role submit", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    groupMemberList.mockResolvedValue({ data: ListCommitteeMemberResponse });
    UserListToCommitteeAdd.mockResolvedValue({ data: AddCommitteeUserList });
    listUserChangeRole.mockResolvedValue({ data: RoleChangeList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    searchGroupMember.mockResolvedValue({ data: TeamSearch });
    render(
      <Router>
        <GroupMember />
      </Router>
    );
    const ManageRoleBtn = screen.getByTestId("manage-role-group-member");
    expect(ManageRoleBtn).toBeInTheDocument();
    fireEvent.click(ManageRoleBtn);
    const ManageRoleSubmitBtn = screen.getByTestId("role-change-submit");
    expect(ManageRoleSubmitBtn).toBeInTheDocument();
    fireEvent.click(ManageRoleSubmitBtn);
    
  });
  test("add group member", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    groupMemberList.mockResolvedValue({ data: ListCommitteeMemberResponse });
    UserListToCommitteeAdd.mockResolvedValue({ data: AddCommitteeUserList });
    listUserChangeRole.mockResolvedValue({ data: RoleChangeList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    searchGroupMember.mockResolvedValue({ data: TeamSearch });
    render(
      <Router>
        <GroupMember />
      </Router>
    );
    const AddMemberBtn = screen.getByTestId("add-group-member");
    expect(AddMemberBtn).toBeInTheDocument();
    fireEvent.click(AddMemberBtn);
    const AddModalCloseBtn = screen.getByTestId("add-member-modal-close");
    expect(AddModalCloseBtn).toBeInTheDocument();
    fireEvent.click(AddModalCloseBtn);
    
  });
  test("add group member submit", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    groupMemberList.mockResolvedValue({ data: ListCommitteeMemberResponse });
    UserListToCommitteeAdd.mockResolvedValue({ data: AddCommitteeUserList });
    listUserChangeRole.mockResolvedValue({ data: RoleChangeList });
    ListDesignation.mockResolvedValue({ data: DesinationListResponse });
    searchGroupMember.mockResolvedValue({ data: TeamSearch });
    render(
      <Router>
        <GroupMember />
      </Router>
    );
    const AddMemberBtn = screen.getByTestId("add-group-member");
    expect(AddMemberBtn).toBeInTheDocument();
    fireEvent.click(AddMemberBtn);
    const AddModalSubmitBtn = screen.getByTestId("add-member-submit-btn");
    expect(AddModalSubmitBtn).toBeInTheDocument();
    fireEvent.click(AddModalSubmitBtn);
    
  });
});

