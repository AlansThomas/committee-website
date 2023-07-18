import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  LocalData,
  csvUploadResponse,
  listUserResponse,
  CSVuploadErrorResponse,
  ErrorResponseCSV,
  DesinationListResponse,
  SearchTestData,
  AddUserResponse,
} from "../../admincommittee/testData";
import Employee from "../Employee";
import React from "react";
import {
  CSVUpload,
  ListUsers,
  DeleteUser,
  listDesignationAPI,
  AdminPassChange,
  AdminUserSearch,
  AddUserAdmin,
} from "../../../../api/ServiceFile/ApiService";

jest.mock("react-helmet-async");
jest.mock("../../../../api/ServiceFile/ApiService", () => ({
  CSVUpload: jest.fn(),
  ListUsers: jest.fn(),
  DeleteUser: jest.fn(),
  listDesignationAPI: jest.fn(),
  AdminPassChange: jest.fn(),
  AdminUserSearch: jest.fn(),
  AddUserAdmin: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock("sweetalert2", () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));

describe("Admin Employee", () => {
  let file;
  let fileInvalid;
  let ErrorFile;

  beforeEach(() => {
    file = new File(
      ["raju,raju@gmail.com,software engineer,09-06-19"],
      "chucknorris.csv",
      { type: "text/csv" }
    );
    fileInvalid = new File(
      ["dfvgdfv"],
      "fhbvfhvfhhhfvbhdfvdhfbvhdfvhfdbvhbvhdfbvhdfbvhdfbdhfbvhfbvhdbvfhdjvdjhvbhdbvhfbvasjdbyfvuyfjhvjfhhdkk.csv",
      { type: "text/csv" }
    );
    ErrorFile = new File(["ehffenkajend"], "rfvrerv.jpg", {
      type: "image/jpg",
    });
  });

  test("render AdminEmployee", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });
    render(
      <Router>
        <Employee />
      </Router>
    );
    const EmployeePage = screen.getByTestId("employee-id");
    expect(EmployeePage).toBeInTheDocument();
  });

  test("Search close button", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const CloseBtn = screen.getByTestId("Employee-search-btn");
    expect(CloseBtn).toBeInTheDocument();
    fireEvent.click(CloseBtn);

    const testElement = screen.getByText("Search");
    expect(testElement).toBeInTheDocument();
  });

  test("textFiled search name", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });
    render(
      <Router>
        <Employee />
      </Router>
    );
    const CloseBtn = screen.getByTestId("Employee-search-btn");
    expect(CloseBtn).toBeInTheDocument();
    fireEvent.click(CloseBtn);

    const SearchTextFiled = screen.getByTestId("search-employee-name");
    expect(SearchTextFiled).toBeInTheDocument();
    fireEvent.change(SearchTextFiled, { target: { value: "aparna" } });
  });

  test("search employee email", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const CloseBtn = screen.getByTestId("Employee-search-btn");
    expect(CloseBtn).toBeInTheDocument();
    fireEvent.click(CloseBtn);

    const SearchTextFiled = screen.getByTestId("search-employee-email");
    expect(SearchTextFiled).toBeInTheDocument();
    fireEvent.change(SearchTextFiled, { target: { value: "aparna" } });
  });

  test("search employee Designation", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const CloseBtn = screen.getByTestId("Employee-search-btn");
    expect(CloseBtn).toBeInTheDocument();
    fireEvent.click(CloseBtn);

    const SearchDesignationFiled = screen
      .getByTestId("designation-employee-field")
      .querySelector("input");
    expect(SearchDesignationFiled).toBeInTheDocument();
    fireEvent.select(SearchDesignationFiled, {
      target: { value: "Software Engineer" },
    });
    fireEvent.blur(SearchDesignationFiled, {
      target: { value: "Software Engineer" },
    });
  });

  test("search employee type", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const CloseBtn = screen.getByTestId("Employee-search-btn");
    expect(CloseBtn).toBeInTheDocument();
    fireEvent.click(CloseBtn);

    const SearchDesignationFiled = screen.getByTestId("type-employee-field").querySelector("input");
    expect(SearchDesignationFiled).toBeInTheDocument();
    fireEvent.select(SearchDesignationFiled, {
      target: { value: "Committee" },
    });
    fireEvent.blur(SearchDesignationFiled, {
      target: { value: "Committee" },
    });
  });

  test("search employee startDate", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const CloseBtn = screen.getByTestId("Employee-search-btn");
    expect(CloseBtn).toBeInTheDocument();
    fireEvent.click(CloseBtn);

    const SearchDateeFiled = screen.getByTestId("search-employee-startDate");
    expect(SearchDateeFiled).toBeInTheDocument();
    fireEvent.change(SearchDateeFiled, { target: { value: "2023-05-02" } });
    fireEvent.blur(SearchDateeFiled, { target: { value: "2023-06-02" } });
    fireEvent.blur(SearchDateeFiled, { target: { value: "" } });
  });

  test("search employee endDate", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const CloseBtn = screen.getByTestId("Employee-search-btn");
    expect(CloseBtn).toBeInTheDocument();
    fireEvent.click(CloseBtn);

    const SearchDateeFiled = screen.getByTestId("search-employee-endDate");
    expect(SearchDateeFiled).toBeInTheDocument();
    fireEvent.change(SearchDateeFiled, { target: { value: "2023-05-02" } });
    fireEvent.blur(SearchDateeFiled, { target: { value: "2023-06-02" } });
    fireEvent.blur(SearchDateeFiled, { target: { value: "" } });
  });

  test("csv modal open", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    CSVUpload.mockResolvedValue();
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const AddUserBtn = screen.getByTestId("Employee-add-Btn");
    expect(AddUserBtn).toBeInTheDocument();
    fireEvent.click(AddUserBtn);

    const testElement = screen.getByText("Csv Upload");
    expect(testElement).toBeInTheDocument();

    const CSVuploadBtn = screen.getByTestId("csv-upload-Btn");
    expect(CSVuploadBtn).toBeInTheDocument();
    fireEvent.click(CSVuploadBtn);

    const UploadModal = screen.getByText("Upload CSV");
    expect(UploadModal).toBeInTheDocument();

    const CSVSubmitBtn = screen.getByTestId("Csv-submit-btn");
    expect(CSVSubmitBtn).toBeInTheDocument();
    fireEvent.click(CSVSubmitBtn);
  });

  test("csv upload", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    CSVUpload.mockResolvedValue();
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const AddUserBtn = screen.getByTestId("Employee-add-Btn");
    expect(AddUserBtn).toBeInTheDocument();
    fireEvent.click(AddUserBtn);

    const testElement = screen.getByText("Csv Upload");
    expect(testElement).toBeInTheDocument();

    const CSVuploadBtn = screen.getByTestId("csv-upload-Btn");
    expect(CSVuploadBtn).toBeInTheDocument();
    fireEvent.click(CSVuploadBtn);

    const UploadModal = screen.getByText("Upload CSV");
    expect(UploadModal).toBeInTheDocument();

    const CSVuploadField = screen.getByTestId("csv-upload-field");
    expect(CSVuploadField).toBeInTheDocument();
    fireEvent.click(CSVuploadField);

    await waitFor(() =>
      fireEvent.change(CSVuploadField, {
        target: { files: [file] },
      })
    );

    const CSVSubmitBtn = screen.getByTestId("Csv-submit-btn");
    expect(CSVSubmitBtn).toBeInTheDocument();
    fireEvent.click(CSVSubmitBtn);
  });
  test("CSV add Employee", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    CSVUpload.mockResolvedValue();
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const AddUserBtn = screen.getByTestId("Employee-add-Btn");
    expect(AddUserBtn).toBeInTheDocument();
    fireEvent.click(AddUserBtn);

    const testElement = screen.getByText("Csv Upload");
    expect(testElement).toBeInTheDocument();

    const CSVuploadBtn = screen.getByTestId("csv-upload-Btn");
    expect(CSVuploadBtn).toBeInTheDocument();
    fireEvent.click(CSVuploadBtn);

    const UploadModal = screen.getByText("Upload CSV");
    expect(UploadModal).toBeInTheDocument();

    const CSVuploadField = screen.getByTestId("csv-upload-field");
    expect(CSVuploadField).toBeInTheDocument();
    fireEvent.click(CSVuploadField);

    await waitFor(() =>
      fireEvent.change(CSVuploadField, {
        target: { files: [fileInvalid] },
      })
    );

    const CSVSubmitBtn = screen.getByTestId("Csv-submit-btn");
    expect(CSVSubmitBtn).toBeInTheDocument();
    fireEvent.click(CSVSubmitBtn);
  });
  test("add employee csv", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    CSVUpload.mockResolvedValue({ data: csvUploadResponse });
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const AddUserBtn = screen.getByTestId("Employee-add-Btn");
    expect(AddUserBtn).toBeInTheDocument();
    fireEvent.click(AddUserBtn);

    const testElement = screen.getByText("Csv Upload");
    expect(testElement).toBeInTheDocument();

    const CSVuploadBtn = screen.getByTestId("csv-upload-Btn");
    expect(CSVuploadBtn).toBeInTheDocument();
    fireEvent.click(CSVuploadBtn);

    const UploadModal = screen.getByText("Upload CSV");
    expect(UploadModal).toBeInTheDocument();

    const CSVuploadFields = screen.getByTestId("csv-upload-field");
    expect(CSVuploadFields).toBeInTheDocument();
    fireEvent.click(CSVuploadFields);

    await waitFor(() =>
      fireEvent.change(CSVuploadFields, {
        target: { files: [file] },
      })
    );

    const CSVSubmitBtn = screen.getByTestId("Csv-submit-btn");
    expect(CSVSubmitBtn).toBeInTheDocument();
    fireEvent.click(CSVSubmitBtn);
  });
  test("CSVErrorOne", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    CSVUpload.mockResolvedValue({ data: CSVuploadErrorResponse });
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const AddUserBtn = screen.getByTestId("Employee-add-Btn");
    expect(AddUserBtn).toBeInTheDocument();
    fireEvent.click(AddUserBtn);

    const testElement = screen.getByText("Csv Upload");
    expect(testElement).toBeInTheDocument();

    const CSVuploadBtn = screen.getByTestId("csv-upload-Btn");
    expect(CSVuploadBtn).toBeInTheDocument();
    fireEvent.click(CSVuploadBtn);

    const UploadModal = screen.getByText("Upload CSV");
    expect(UploadModal).toBeInTheDocument();

    const CSVuploadFieldOne = screen.getByTestId("csv-upload-field");
    expect(CSVuploadFieldOne).toBeInTheDocument();
    fireEvent.click(CSVuploadFieldOne);

    await waitFor(() =>
      fireEvent.change(CSVuploadFieldOne, {
        target: { files: [file] },
      })
    );

    const CSVSubmitBtn = screen.getByTestId("Csv-submit-btn");
    expect(CSVSubmitBtn).toBeInTheDocument();
    fireEvent.click(CSVSubmitBtn);
  });
  test("csvUploadError", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    CSVUpload.mockResolvedValue({ data: ErrorResponseCSV });
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const AddUserBtn = screen.getByTestId("Employee-add-Btn");
    expect(AddUserBtn).toBeInTheDocument();
    fireEvent.click(AddUserBtn);

    const testElement = screen.getByText("Csv Upload");
    expect(testElement).toBeInTheDocument();

    const CSVuploadBtn = screen.getByTestId("csv-upload-Btn");
    expect(CSVuploadBtn).toBeInTheDocument();
    fireEvent.click(CSVuploadBtn);

    const UploadModal = screen.getByText("Upload CSV");
    expect(UploadModal).toBeInTheDocument();

    const CSVuploadFieldTwo = screen.getByTestId("csv-upload-field");
    expect(CSVuploadFieldTwo).toBeInTheDocument();
    fireEvent.click(CSVuploadFieldTwo);

    await waitFor(() =>
      fireEvent.change(CSVuploadFieldTwo, {
        target: { files: [ErrorFile] },
      })
    );

    const CSVSubmitBtn = screen.getByTestId("Csv-submit-btn");
    expect(CSVSubmitBtn).toBeInTheDocument();
    fireEvent.click(CSVSubmitBtn);
  });

  test("Delete user", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ListUsers.mockResolvedValue({ data: listUserResponse });
    DeleteUser.mockResolvedValue();
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    await waitFor(() => {
      const DeleteBtn = screen.getByTestId("delete-button");
      expect(DeleteBtn).toBeInTheDocument();
      fireEvent.click(DeleteBtn);
    });
  });
  test("Change password", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    await waitFor(() => {
      const ChangePassBtn = screen.getByTestId("change-user-pass-word");
      expect(ChangePassBtn).toBeInTheDocument();
      fireEvent.click(ChangePassBtn);
    });
    const SearchTextFiled = screen.getByTestId("pass-change-new-pass");
    expect(SearchTextFiled).toBeInTheDocument();
    fireEvent.change(SearchTextFiled, { target: { value: "aparna" } });
  });
  test("Change pass greater", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    await waitFor(() => {
      const ChangePassBtn = screen.getByTestId("change-user-pass-word");
      expect(ChangePassBtn).toBeInTheDocument();
      fireEvent.click(ChangePassBtn);
    });
    const SearchTextFiled = screen.getByTestId("pass-change-new-pass");
    expect(SearchTextFiled).toBeInTheDocument();
    fireEvent.change(SearchTextFiled, {
      target: { value: "djhrk34nfjcksmrntkd" },
    });
  });
  test("Change pass less", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    await waitFor(() => {
      const ChangePassBtn = screen.getByTestId("change-user-pass-word");
      expect(ChangePassBtn).toBeInTheDocument();
      fireEvent.click(ChangePassBtn);
    });
    const SearchTextFiled = screen.getByTestId("pass-change-new-pass");
    expect(SearchTextFiled).toBeInTheDocument();
    fireEvent.change(SearchTextFiled, { target: { value: "dki" } });
  });
  test("Change pass null", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    await waitFor(() => {
      const ChangePassBtn = screen.getByTestId("change-user-pass-word");
      expect(ChangePassBtn).toBeInTheDocument();
      fireEvent.click(ChangePassBtn);
    });
    const SearchTextFiled = screen.getByTestId("pass-change-new-pass");
    expect(SearchTextFiled).toBeInTheDocument();
    fireEvent.change(SearchTextFiled, { target: { value: "               " } });
  });
  test("Change pass space", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    await waitFor(() => {
      const ChangePassBtn = screen.getByTestId("change-user-pass-word");
      expect(ChangePassBtn).toBeInTheDocument();
      fireEvent.click(ChangePassBtn);
    });
    const SearchTextFiled = screen.getByTestId("pass-change-new-pass");
    expect(SearchTextFiled).toBeInTheDocument();
    fireEvent.change(SearchTextFiled, { target: { value: "sd   f   " } });
  });

  test("Confirm pass", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    AdminPassChange.mockResolvedValue();
    render(
      <Router>
        <Employee />
      </Router>
    );
    await waitFor(() => {
      const ChangePassBtn = screen.getByTestId("change-user-pass-word");
      expect(ChangePassBtn).toBeInTheDocument();
      fireEvent.click(ChangePassBtn);
    });
    const NewPass = screen.getByTestId("pass-change-new-pass");
    expect(NewPass).toBeInTheDocument();
    fireEvent.change(NewPass, { target: { value: "aparna" } });

    const ConfirmPass = screen.getByTestId("pass-change-confirm");
    expect(ConfirmPass).toBeInTheDocument();
    fireEvent.change(ConfirmPass, { target: { value: "aparna" } });

    await waitFor(() => {
      const PassSubmitBtn = screen.getByTestId("change-pass-submit");
      expect(PassSubmitBtn).toBeInTheDocument();
      fireEvent.click(PassSubmitBtn);
    });
  });

  test("Confirm pass null", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    await waitFor(() => {
      const ChangePassBtn = screen.getByTestId("change-user-pass-word");
      expect(ChangePassBtn).toBeInTheDocument();
      fireEvent.click(ChangePassBtn);
    });
    const SearchTextFiled = screen.getByTestId("pass-change-confirm");
    expect(SearchTextFiled).toBeInTheDocument();
    fireEvent.change(SearchTextFiled, { target: { value: "hbdjjdfnjf" } });
    fireEvent.change(SearchTextFiled, { target: { value: "" } });
  });

  test("Cahnge Pass error", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    AdminPassChange.mockResolvedValue();
    render(
      <Router>
        <Employee />
      </Router>
    );
    await waitFor(() => {
      const ChangePassBtn = screen.getByTestId("change-user-pass-word");
      expect(ChangePassBtn).toBeInTheDocument();
      fireEvent.click(ChangePassBtn);
    });
    const NewPass = screen.getByTestId("pass-change-new-pass");
    expect(NewPass).toBeInTheDocument();
    fireEvent.change(NewPass, { target: { value: "aparnaPB" } });

    const ConfirmPass = screen.getByTestId("pass-change-confirm");
    expect(ConfirmPass).toBeInTheDocument();
    fireEvent.change(ConfirmPass, { target: { value: "aparna" } });

    await waitFor(() => {
      const PassSubmitBtn = screen.getByTestId("change-pass-submit");
      expect(PassSubmitBtn).toBeInTheDocument();
      fireEvent.click(PassSubmitBtn);
    });
  });
  test("Cahnge Pass error two", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });
    AdminPassChange.mockResolvedValue();
    render(
      <Router>
        <Employee />
      </Router>
    );
    await waitFor(() => {
      const ChangePassBtn = screen.getByTestId("change-user-pass-word");
      expect(ChangePassBtn).toBeInTheDocument();
      fireEvent.click(ChangePassBtn);
    });

    const ConfirmPass = screen.getByTestId("pass-change-confirm");
    expect(ConfirmPass).toBeInTheDocument();
    fireEvent.change(ConfirmPass, { target: { value: "aparna" } });

    await waitFor(() => {
      const PassSubmitBtn = screen.getByTestId("change-pass-submit");
      expect(PassSubmitBtn).toBeInTheDocument();
      fireEvent.click(PassSubmitBtn);
    });
  });
  test("Cahnge Pass error three", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });
    AdminPassChange.mockResolvedValue();
    render(
      <Router>
        <Employee />
      </Router>
    );
    await waitFor(() => {
      const ChangePassBtn = screen.getByTestId("change-user-pass-word");
      expect(ChangePassBtn).toBeInTheDocument();
      fireEvent.click(ChangePassBtn);
    });

    const ConfirmPass = screen.getByTestId("pass-change-confirm");
    expect(ConfirmPass).toBeInTheDocument();
    fireEvent.change(ConfirmPass, { target: { value: null } });

    await waitFor(() => {
      const PassSubmitBtn = screen.getByTestId("change-pass-submit");
      expect(PassSubmitBtn).toBeInTheDocument();
      fireEvent.click(PassSubmitBtn);
    });
  });

  test("Add user modal open", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    CSVUpload.mockResolvedValue();
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const AddUserBtn = screen.getByTestId("Employee-add-Btn");
    expect(AddUserBtn).toBeInTheDocument();
    fireEvent.click(AddUserBtn);

    const testElement = screen.getByText("Add user");
    expect(testElement).toBeInTheDocument();

    const CSVuploadBtn = screen.getByTestId("add-user-manual");
    expect(CSVuploadBtn).toBeInTheDocument();
    fireEvent.click(CSVuploadBtn);

    const UploadModal = screen.getByText("Add User");
    expect(UploadModal).toBeInTheDocument();

    const UserNameField = screen.getByTestId("add-user-name");
    expect(UserNameField).toBeInTheDocument();
    fireEvent.change(UserNameField, { target: { value: "Revathi" } });
  });
  test("Add user name maxLength", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    CSVUpload.mockResolvedValue();
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const AddUserBtn = screen.getByTestId("Employee-add-Btn");
    expect(AddUserBtn).toBeInTheDocument();
    fireEvent.click(AddUserBtn);

    const testElement = screen.getByText("Add user");
    expect(testElement).toBeInTheDocument();

    const CSVuploadBtn = screen.getByTestId("add-user-manual");
    expect(CSVuploadBtn).toBeInTheDocument();
    fireEvent.click(CSVuploadBtn);

    const UploadModal = screen.getByText("Add User");
    expect(UploadModal).toBeInTheDocument();

    const UserNameField = screen.getByTestId("add-user-name");
    expect(UserNameField).toBeInTheDocument();
    fireEvent.change(UserNameField, {
      target: { value: "RevathiSnairaparnapbharathansunithak" },
    });
  });
  test("Add user name null", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    CSVUpload.mockResolvedValue();
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const AddUserBtn = screen.getByTestId("Employee-add-Btn");
    expect(AddUserBtn).toBeInTheDocument();
    fireEvent.click(AddUserBtn);

    const testElement = screen.getByText("Add user");
    expect(testElement).toBeInTheDocument();

    const CSVuploadBtn = screen.getByTestId("add-user-manual");
    expect(CSVuploadBtn).toBeInTheDocument();
    fireEvent.click(CSVuploadBtn);

    const UploadModal = screen.getByText("Add User");
    expect(UploadModal).toBeInTheDocument();

    const UserNameField = screen.getByTestId("add-user-name");
    expect(UserNameField).toBeInTheDocument();
    fireEvent.change(UserNameField, { target: { value: "@fh%%%" } });
    fireEvent.change(UserNameField, { target: { value: "" } });
  });
  test("Add user Email", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    CSVUpload.mockResolvedValue();
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const AddUserBtn = screen.getByTestId("Employee-add-Btn");
    expect(AddUserBtn).toBeInTheDocument();
    fireEvent.click(AddUserBtn);

    const testElement = screen.getByText("Add user");
    expect(testElement).toBeInTheDocument();

    const CSVuploadBtn = screen.getByTestId("add-user-manual");
    expect(CSVuploadBtn).toBeInTheDocument();
    fireEvent.click(CSVuploadBtn);

    const UploadModal = screen.getByText("Add User");
    expect(UploadModal).toBeInTheDocument();

    const EmailField = screen.getByTestId("add-user-Email");
    expect(EmailField).toBeInTheDocument();
    fireEvent.change(EmailField, { target: { value: "Revathi@gmail.com" } });
  });
  test("Add user Email null", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    CSVUpload.mockResolvedValue();
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const AddUserBtn = screen.getByTestId("Employee-add-Btn");
    expect(AddUserBtn).toBeInTheDocument();
    fireEvent.click(AddUserBtn);

    const testElement = screen.getByText("Add user");
    expect(testElement).toBeInTheDocument();

    const CSVuploadBtn = screen.getByTestId("add-user-manual");
    expect(CSVuploadBtn).toBeInTheDocument();
    fireEvent.click(CSVuploadBtn);

    const UploadModal = screen.getByText("Add User");
    expect(UploadModal).toBeInTheDocument();

    const EmailField = screen.getByTestId("add-user-Email");
    expect(EmailField).toBeInTheDocument();
    fireEvent.change(EmailField, { target: { value: "Revathi@gmail.com" } });
    fireEvent.change(EmailField, { target: { value: "" } });
  });
  test("Add user Email Greater", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    CSVUpload.mockResolvedValue();
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const AddUserBtn = screen.getByTestId("Employee-add-Btn");
    expect(AddUserBtn).toBeInTheDocument();
    fireEvent.click(AddUserBtn);

    const testElement = screen.getByText("Add user");
    expect(testElement).toBeInTheDocument();

    const CSVuploadBtn = screen.getByTestId("add-user-manual");
    expect(CSVuploadBtn).toBeInTheDocument();
    fireEvent.click(CSVuploadBtn);

    const UploadModal = screen.getByText("Add User");
    expect(UploadModal).toBeInTheDocument();

    const EmailField = screen.getByTestId("add-user-Email");
    expect(EmailField).toBeInTheDocument();
    fireEvent.change(EmailField, {
      target: {
        value:
          "fhbvfhvfhhhfvbhdfvdhfbvhdfvhdbvhbvhdfbvhdfbvhdfbdhfbvhfbvhdbvfhdjvdjhvbhdbvhfbvasjdbyfvuyfjhvjfhf@gmail.com",
      },
    });
  });
  test("Add user wrong email", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    CSVUpload.mockResolvedValue();
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const AddUserBtn = screen.getByTestId("Employee-add-Btn");
    expect(AddUserBtn).toBeInTheDocument();
    fireEvent.click(AddUserBtn);

    const testElement = screen.getByText("Add user");
    expect(testElement).toBeInTheDocument();

    const CSVuploadBtn = screen.getByTestId("add-user-manual");
    expect(CSVuploadBtn).toBeInTheDocument();
    fireEvent.click(CSVuploadBtn);

    const UploadModal = screen.getByText("Add User");
    expect(UploadModal).toBeInTheDocument();

    const EmailField = screen.getByTestId("add-user-Email");
    expect(EmailField).toBeInTheDocument();
    fireEvent.change(EmailField, { target: { value: "jffjidkm@dvvvjj" } });
  });

  test("Add user DOB", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    CSVUpload.mockResolvedValue();
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const AddUserBtn = screen.getByTestId("Employee-add-Btn");
    expect(AddUserBtn).toBeInTheDocument();
    fireEvent.click(AddUserBtn);

    const testElement = screen.getByText("Add user");
    expect(testElement).toBeInTheDocument();

    const CSVuploadBtn = screen.getByTestId("add-user-manual");
    expect(CSVuploadBtn).toBeInTheDocument();
    fireEvent.click(CSVuploadBtn);

    const UploadModal = screen.getByText("Add User");
    expect(UploadModal).toBeInTheDocument();

    const DOBfield = screen.getByTestId("add-user-dob");
    expect(DOBfield).toBeInTheDocument();
    fireEvent.change(DOBfield, { target: { value: "1993-05-02" } });
    fireEvent.change(DOBfield, { target: { value: "" } });
  });
  test("Add user Designation", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    CSVUpload.mockResolvedValue();
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const AddUserBtn = screen.getByTestId("Employee-add-Btn");
    expect(AddUserBtn).toBeInTheDocument();
    fireEvent.click(AddUserBtn);

    const testElement = screen.getByText("Add user");
    expect(testElement).toBeInTheDocument();

    const AddUserManualBtn = screen.getByTestId("add-user-manual");
    expect(AddUserManualBtn).toBeInTheDocument();
    fireEvent.click(AddUserManualBtn);

    const UploadModal = screen.getByText("Add User");
    expect(UploadModal).toBeInTheDocument();

    const DesignationFiled = screen
      .getByTestId("add-user-Designation")
      .querySelector("input");
    expect(DesignationFiled).toBeInTheDocument();
    fireEvent.change(DesignationFiled, {
      target: { value: "ss" },
    });
    fireEvent.change(DesignationFiled, {
      target: { value: "" },
    });
    DesignationFiled.dispatchEvent(new Event("change"));
  });

  test("Add user submit", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    CSVUpload.mockResolvedValue();
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });
    AddUserAdmin.mockResolvedValue({ data: AddUserResponse });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const AddUserBtn = screen.getByTestId("Employee-add-Btn");
    expect(AddUserBtn).toBeInTheDocument();
    fireEvent.click(AddUserBtn);

    const testElement = screen.getByText("Add user");
    expect(testElement).toBeInTheDocument();

    const CSVuploadBtn = screen.getByTestId("add-user-manual");
    expect(CSVuploadBtn).toBeInTheDocument();
    fireEvent.click(CSVuploadBtn);

    const UploadModal = screen.getByText("Add User");
    expect(UploadModal).toBeInTheDocument();

    const UserNameField = screen.getByTestId("add-user-name");
    expect(UserNameField).toBeInTheDocument();
    fireEvent.change(UserNameField, { target: { value: "Revathi" } });

    const EmailField = screen.getByTestId("add-user-Email");
    expect(EmailField).toBeInTheDocument();
    fireEvent.change(EmailField, { target: { value: "Revathi@gmail.com" } });

    const DOBfield = screen.getByTestId("add-user-dob");
    expect(DOBfield).toBeInTheDocument();
    fireEvent.change(DOBfield, { target: { value: "1993-05-02" } });

    const DesignationFiled = screen
      .getByTestId("add-user-Designation")
      .querySelector("input");
    expect(DesignationFiled).toBeInTheDocument();
    fireEvent.change(DesignationFiled, {
      target: { value: "Software Engineer" },
    });

    DesignationFiled.dispatchEvent(new Event("change"));

    const UserSubmitBtn = screen.getByTestId("add-user-submit-btn");
    expect(UserSubmitBtn).toBeInTheDocument();
    fireEvent.click(UserSubmitBtn);
  });
  test("Add user invalid submit", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    CSVUpload.mockResolvedValue();
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const AddUserBtn = screen.getByTestId("Employee-add-Btn");
    expect(AddUserBtn).toBeInTheDocument();
    fireEvent.click(AddUserBtn);

    const testElement = screen.getByText("Add user");
    expect(testElement).toBeInTheDocument();

    const CSVuploadBtn = screen.getByTestId("add-user-manual");
    expect(CSVuploadBtn).toBeInTheDocument();
    fireEvent.click(CSVuploadBtn);

    const UploadModal = screen.getByText("Add User");
    expect(UploadModal).toBeInTheDocument();

    const UserSubmitBtn = screen.getByTestId("add-user-submit-btn");
    expect(UserSubmitBtn).toBeInTheDocument();
    fireEvent.click(UserSubmitBtn);
  });
  test("Add user modal close", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    CSVUpload.mockResolvedValue();
    ListUsers.mockResolvedValue({ data: listUserResponse });
    listDesignationAPI.mockResolvedValue({ data: DesinationListResponse });
    AdminUserSearch.mockResolvedValue({ data: SearchTestData });
    AddUserAdmin.mockResolvedValue({ data: AddUserResponse });

    render(
      <Router>
        <Employee />
      </Router>
    );
    const AddUserBtn = screen.getByTestId("Employee-add-Btn");
    expect(AddUserBtn).toBeInTheDocument();
    fireEvent.click(AddUserBtn);

    const testElement = screen.getByText("Add user");
    expect(testElement).toBeInTheDocument();

    const CSVuploadBtn = screen.getByTestId("add-user-manual");
    expect(CSVuploadBtn).toBeInTheDocument();
    fireEvent.click(CSVuploadBtn);

    const UploadModal = screen.getByText("Add User");
    expect(UploadModal).toBeInTheDocument();

    const UserNameField = screen.getByTestId("add-user-name");
    expect(UserNameField).toBeInTheDocument();
    fireEvent.change(UserNameField, { target: { value: "Revathi" } });

    const EmailField = screen.getByTestId("add-user-Email");
    expect(EmailField).toBeInTheDocument();
    fireEvent.change(EmailField, { target: { value: "Revathi@gmail.com" } });

    const DOBfield = screen.getByTestId("add-user-dob");
    expect(DOBfield).toBeInTheDocument();
    fireEvent.change(DOBfield, { target: { value: "1993-05-02" } });

    const modalCLoseBtn = screen.getByTestId("add-user-modal-close");
    expect(modalCLoseBtn).toBeInTheDocument();
    fireEvent.click(modalCLoseBtn);
  });
});
