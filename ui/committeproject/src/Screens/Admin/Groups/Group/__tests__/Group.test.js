import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Groups from "../Groups";
import React from "react";
import {
  createGrp,
  deleteGrp,
  editGrpImage,
  EditGrpName,
  getGrp,
  listGrp,
} from "../../../../../api/ServiceFile/ApiService";
import { getNameEdit, GrpList, LocalData } from "../testData";

jest.mock("react-helmet-async");

jest.mock("../../../../../api/ServiceFile/ApiService", () => ({
  listGrp: jest.fn(),
  deleteGrp: jest.fn(),
  getGrp: jest.fn(),
  EditGrpName: jest.fn(),
  editGrpImage: jest.fn(),
  createGrp: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Admin Groups", () => {
  let ErrorFile;
  let ImageFile;
  let fileInvalid;
  let longFIle;

  beforeEach(() => {
    ImageFile = new File(["ehffenkajend"], "rfvrerv.jpg", {
      type: "image/jpg",
    });
    ErrorFile = new File(["ehffenkajend"], "rfvrerv.csv", {
      type: "Text/csv",
    });
    longFIle = new File(
      ["ehffenkajend"],
      "gfhdherhfrhfdhdfbvhydsfvudfhciudfhvudfhvudhfvudfvhfiuvhfuihvufhuifnvufvniudhfiudfhiuhvisiudhsfhhfhshf.jpg",
      {
        type: "image/jpg",
      }
    );
  });
  test("render Groups", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    listGrp.mockResolvedValue({ data: GrpList });
    render(
      <Router>
        <Groups />
      </Router>
    );
    const GroupsPage = screen.getByTestId("group-page");
    expect(GroupsPage).toBeInTheDocument();
  });

  test("GroupsImgeEditModal", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    listGrp.mockResolvedValue({ data: GrpList });
    editGrpImage.mockResolvedValue({
      data: {
        acknowledged: true,
        modifiedCount: 1,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1,
      },
    });
    render(
      <Router>
        <Groups />
      </Router>
    );

    const imageModalOpen = await screen.findByTestId("ImodalOpen_btn");
    expect(imageModalOpen).toBeInTheDocument();
    fireEvent.click(imageModalOpen);

    const ImageUpload = screen.getByTestId("img-upload-field");
    expect(ImageUpload).toBeInTheDocument();
    fireEvent.click(ImageUpload);

    await waitFor(() =>
      fireEvent.change(ImageUpload, {
        target: { files: [ImageFile] },
      })
    );

    const imageSubmitBtn = screen.getByTestId("img-submit-btn");
    expect(imageSubmitBtn).toBeInTheDocument();
    fireEvent.click(imageSubmitBtn);

    const imageModalClose = await screen.findByTestId("ImodalClose_btn");
    expect(imageModalClose).toBeInTheDocument();
    fireEvent.click(imageModalClose);
  });
  test("GroupsImgeEditModal error", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    listGrp.mockResolvedValue({ data: GrpList });
    editGrpImage.mockResolvedValue({
      data: {
        acknowledged: true,
        modifiedCount: 1,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1,
      },
    });
    render(
      <Router>
        <Groups />
      </Router>
    );

    const imageModalOpen = await screen.findByTestId("ImodalOpen_btn");
    expect(imageModalOpen).toBeInTheDocument();
    fireEvent.click(imageModalOpen);

    const ImageUpload = screen.getByTestId("img-upload-field");
    expect(ImageUpload).toBeInTheDocument();
    fireEvent.click(ImageUpload);

    await waitFor(() =>
      fireEvent.change(ImageUpload, {
        target: { files: [ErrorFile] },
      })
    );

    const imageSubmitBtn = screen.getByTestId("img-submit-btn");
    expect(imageSubmitBtn).toBeInTheDocument();
    fireEvent.click(imageSubmitBtn);

    const imageModalClose = await screen.findByTestId("ImodalClose_btn");
    expect(imageModalClose).toBeInTheDocument();
    fireEvent.click(imageModalClose);
  });

  test("GroupsImgeEditModal", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    listGrp.mockResolvedValue({ data: GrpList });
    editGrpImage.mockResolvedValue({
      data: {
        acknowledged: true,
        modifiedCount: 1,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1,
      },
    });
    render(
      <Router>
        <Groups />
      </Router>
    );

    const imageModalOpen = await screen.findByTestId("ImodalOpen_btn");
    expect(imageModalOpen).toBeInTheDocument();
    fireEvent.click(imageModalOpen);

    const ImageUpload = screen.getByTestId("img-upload-field");
    expect(ImageUpload).toBeInTheDocument();
    fireEvent.click(ImageUpload);

    await waitFor(() =>
      fireEvent.change(ImageUpload, {
        target: { files: [fileInvalid] },
      })
    );
  });

  test("GroupsEditNameModal", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    listGrp.mockResolvedValue({ data: GrpList });
    getGrp.mockResolvedValue({ data: getNameEdit });
    EditGrpName.mockResolvedValue({ data: getNameEdit });

    render(
      <Router>
        <Groups />
      </Router>
    );

    const editModalOpen = await screen.findByTestId("NmodalOpen_btn");
    expect(editModalOpen).toBeInTheDocument();
    fireEvent.click(editModalOpen);

    const submitBtn = await screen.findByTestId("nameEdit-btn");
    expect(submitBtn).toBeInTheDocument();
    fireEvent.click(submitBtn);

    const editModalClose = await screen.findByTestId("NmodalClose_btn");
    expect(editModalClose).toBeInTheDocument();
    fireEvent.click(editModalClose);
  });
  test("GroupsEditNameModal change", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    listGrp.mockResolvedValue({ data: GrpList });
    getGrp.mockResolvedValue({ data: getNameEdit });
    EditGrpName.mockResolvedValue({ data: getNameEdit });

    render(
      <Router>
        <Groups />
      </Router>
    );

    const editModalOpen = await screen.findByTestId("NmodalOpen_btn");
    expect(editModalOpen).toBeInTheDocument();
    fireEvent.click(editModalOpen);
    await waitFor(() => {
      const GroupNameFiled = screen.getByTestId("edit-grname-change");
      expect(GroupNameFiled).toBeInTheDocument();
      fireEvent.change(GroupNameFiled, { target: { value: "TestGr2" } });
    });
    const submitBtn = await screen.findByTestId("nameEdit-btn");
    expect(submitBtn).toBeInTheDocument();
    fireEvent.click(submitBtn);

    const editModalClose = await screen.findByTestId("NmodalClose_btn");
    expect(editModalClose).toBeInTheDocument();
    fireEvent.click(editModalClose);
  });
  test("GroupsEditNameModal changeError", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    listGrp.mockResolvedValue({ data: GrpList });
    getGrp.mockResolvedValue({ data: getNameEdit });
    EditGrpName.mockResolvedValue({ data: getNameEdit });

    render(
      <Router>
        <Groups />
      </Router>
    );

    const editModalOpen = await screen.findByTestId("NmodalOpen_btn");
    expect(editModalOpen).toBeInTheDocument();
    fireEvent.click(editModalOpen);
    await waitFor(() => {
      const GroupNameFiled = screen.getByTestId("edit-grname-change");
      expect(GroupNameFiled).toBeInTheDocument();
      fireEvent.change(GroupNameFiled, { target: { value: "TestGr2" } });
      fireEvent.change(GroupNameFiled, { target: { value: " " } });
      fireEvent.change(GroupNameFiled, {
        target: { value: "huiwjdetrusedurwjshdieortjsnchdf" },
      });
      fireEvent.change(GroupNameFiled, { target: { value: "" } });
    });
    const submitBtn = await screen.findByTestId("nameEdit-btn");
    expect(submitBtn).toBeInTheDocument();
    fireEvent.click(submitBtn);

    const editModalClose = await screen.findByTestId("NmodalClose_btn");
    expect(editModalClose).toBeInTheDocument();
    fireEvent.click(editModalClose);
  });

  test("newGrpModal", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    listGrp.mockResolvedValue({ data: GrpList });
    render(
      <Router>
        <Groups />
      </Router>
    );

    const NewGrpModalOpen = await screen.findByTestId("NewGrpModalOpen_btn");
    expect(NewGrpModalOpen).toBeInTheDocument();
    fireEvent.click(NewGrpModalOpen);

    const NewGrpModalClose = await screen.findByTestId("NewGrpModalClose_btn");
    expect(NewGrpModalClose).toBeInTheDocument();
    fireEvent.click(NewGrpModalClose);
  });
  test("newGrpModal", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    listGrp.mockResolvedValue({ data: GrpList });
    render(
      <Router>
        <Groups />
      </Router>
    );

    const NewGrpModalOpen = await screen.findByTestId("NewGrpModalOpen_btn");
    expect(NewGrpModalOpen).toBeInTheDocument();
    fireEvent.click(NewGrpModalOpen);

    const NewGrpModalClose = await screen.findByTestId("NewGrpModalClose_btn");
    expect(NewGrpModalClose).toBeInTheDocument();
    fireEvent.click(NewGrpModalClose);
  });

  test("newGrpModal nameChange", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    listGrp.mockResolvedValue({ data: GrpList });
    render(
      <Router>
        <Groups />
      </Router>
    );

    const NewGrpModalOpen = await screen.findByTestId("NewGrpModalOpen_btn");
    expect(NewGrpModalOpen).toBeInTheDocument();
    fireEvent.click(NewGrpModalOpen);

    const GroupNameFiled = screen.getByTestId("addGroup-name");
    expect(GroupNameFiled).toBeInTheDocument();
    fireEvent.change(GroupNameFiled, { target: { value: "TestGr2" } });
    fireEvent.change(GroupNameFiled, { target: { value: " " } });
    fireEvent.change(GroupNameFiled, {
      target: { value: "huiwjdetrusedurwjshdieortjsnchdf" },
    });
    fireEvent.change(GroupNameFiled, { target: { value: null } });

    const NewGrpSubmitBtn = await screen.findByTestId("newGrp-Btn");
    expect(NewGrpSubmitBtn).toBeInTheDocument();
    fireEvent.click(NewGrpSubmitBtn);
  });
  test("newGrpModal profileChange", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    listGrp.mockResolvedValue({ data: GrpList });
    render(
      <Router>
        <Groups />
      </Router>
    );

    const NewGrpModalOpen = await screen.findByTestId("NewGrpModalOpen_btn");
    expect(NewGrpModalOpen).toBeInTheDocument();
    fireEvent.click(NewGrpModalOpen);

    const GroupProfileFiled = screen.getByTestId("addGroup-profile");
    expect(GroupProfileFiled).toBeInTheDocument();
    fireEvent.change(GroupProfileFiled, {
      target: { files: [ImageFile] },
    });
    fireEvent.change(GroupProfileFiled, {
      target: { files: [ErrorFile] },
    });
    fireEvent.change(GroupProfileFiled, {
      target: { files: [ErrorFile] },
    });
    fireEvent.change(GroupProfileFiled, {
      target: { files: [longFIle] },
    });
    const NewGrpSubmitBtn = await screen.findByTestId("newGrp-Btn");
    expect(NewGrpSubmitBtn).toBeInTheDocument();
    fireEvent.click(NewGrpSubmitBtn);
  });
  test("newGrpModal submit", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    listGrp.mockResolvedValue({ data: GrpList });
    createGrp.mockResolvedValue({ data: getNameEdit });
    render(
      <Router>
        <Groups />
      </Router>
    );

    const NewGrpModalOpen = await screen.findByTestId("NewGrpModalOpen_btn");
    expect(NewGrpModalOpen).toBeInTheDocument();
    fireEvent.click(NewGrpModalOpen);

    const GroupProfileFiled = screen.getByTestId("addGroup-profile");
    expect(GroupProfileFiled).toBeInTheDocument();
    fireEvent.change(GroupProfileFiled, {
      target: { files: [ImageFile] },
    });

    const GroupNameFiled = screen.getByTestId("addGroup-name");
    expect(GroupNameFiled).toBeInTheDocument();
    fireEvent.change(GroupNameFiled, { target: { value: "TestGr2223" } });

    const NewGrpSubmitBtn = await screen.findByTestId("newGrp-Btn");
    expect(NewGrpSubmitBtn).toBeInTheDocument();
    fireEvent.click(NewGrpSubmitBtn);
  });

  test("newGrp", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    listGrp.mockResolvedValue({ data: GrpList });
    createGrp.mockResolvedValue({ data: getNameEdit });
    render(
      <Router>
        <Groups />
      </Router>
    );

    const NewGrpModalOpen = await screen.findByTestId("NewGrpModalOpen_btn");
    expect(NewGrpModalOpen).toBeInTheDocument();
    fireEvent.click(NewGrpModalOpen);

    const NewGrpSubmitBtn = await screen.findByTestId("newGrp-Btn");
    expect(NewGrpSubmitBtn).toBeInTheDocument();
    fireEvent.click(NewGrpSubmitBtn);

    const NewGrpModalClose = await screen.findByTestId("NewGrpModalClose_btn");
    expect(NewGrpModalClose).toBeInTheDocument();
    fireEvent.click(NewGrpModalClose);
  });

  test("GroupsImgeEditModalChange", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    listGrp.mockResolvedValue({ data: GrpList });
    render(
      <Router>
        <Groups />
      </Router>
    );

    const imageModalOpen = await screen.findByTestId("ImodalOpen_btn");
    expect(imageModalOpen).toBeInTheDocument();
    fireEvent.click(imageModalOpen);

    const ImageUpload = screen.getByTestId("img-upload-field-change");
    expect(ImageUpload).toBeInTheDocument();
    fireEvent.change(ImageUpload, {
      target: { files: [ImageFile] },
    });
    fireEvent.change(ImageUpload, {
      target: { files: [ErrorFile] },
    });
    fireEvent.change(ImageUpload, {
      target: { files: [ErrorFile] },
    });
    fireEvent.change(ImageUpload, {
      target: { files: [longFIle] },
    });
  });

  test("render GroupsDelete", async () => {
    localStorage.setItem("Profile", JSON.stringify(LocalData));
    listGrp.mockResolvedValue({ data: GrpList });
    deleteGrp.mockResolvedValue({
      data: { acknowledged: true, deletedCount: 3 },
    });
    render(
      <Router>
        <Groups />
      </Router>
    );

    const DeleteBtn = await screen.findByTestId("delete_btn");
    expect(DeleteBtn).toBeInTheDocument();
    fireEvent.click(DeleteBtn);
  });
});
