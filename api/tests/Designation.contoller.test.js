const app = require("../routes/Designation.Routes");
const { ObjectId } = require("bson");

const { default: mongoose } = require("mongoose");
const User = require("../models/Designation.Models");
const bcrypt = require("bcryptjs");
const { addDesig,FindAllDesignation } = require("../controller/Designation.Controller");
const DesignationModels = require("../models/Designation.Models");


jest.mock("jsonwebtoken", () => ({
    sign: jest.fn().mockReturnValue("mocked_token"),
  }));
  
  beforeAll(async () => {
    return true;
  });
  jest.mock("bcryptjs", () => ({
    compareSync: jest.fn(),
    genSaltSync: jest.fn(),
    hashSync: jest.fn(),
  }));
  jest.mock("jsonwebtoken", () => ({
    verify: jest.fn(),
    sign: jest.fn(),
  }));


  describe("add des success case", () => {
    test("add des success case", async () => {
        const request = {
            body: {
            }
          };
      const res = {
        status: jest.fn().mockReturnValue({
          send: jest.fn().mockResolvedValue(),
          json: jest.fn().mockResolvedValue(),
        }),
        send: jest.fn(),
        json: jest.fn(),
        cookie: jest
          .fn()
          .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
      };
  
      jest
        .spyOn(DesignationModels, "create")
        .mockResolvedValue();
      await addDesig(request, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("add des fail case", () => {
    test("add des fail case", async () => {
        const request = {
            body: {
            }
          };
      const res = {
        status: jest.fn().mockReturnValue({
          send: jest.fn().mockResolvedValue(),
          json: jest.fn().mockResolvedValue(),
        }),
        send: jest.fn(),
        json: jest.fn(),
        cookie: jest
          .fn()
          .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
      };
  
      jest
        .spyOn(DesignationModels, "create")
        .mockReturnValue({ exec: jest.fn().mockResolvedValue() });
      await addDesig(request, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe("find des Success case", () => {
    test("find des Success case", async () => {
        const request = {
            body: {
            }
          };
      const res = {
        status: jest.fn().mockReturnValue({
          send: jest.fn().mockResolvedValue(),
          json: jest.fn().mockResolvedValue(),
        }),
        send: jest.fn(),
        json: jest.fn(),
        cookie: jest
          .fn()
          .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
      };
  
      jest
        .spyOn(DesignationModels, "find")
        .mockResolvedValue();
      await FindAllDesignation(request, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("find des fail case", () => {
    test("find des fail case", async () => {
        const request = {
            body: {
            }
          };
      const res = {
        status: jest.fn().mockReturnValue({
          send: jest.fn().mockResolvedValue(),
          json: jest.fn().mockResolvedValue(),
        }),
        send: jest.fn(),
        json: jest.fn(),
        cookie: jest
          .fn()
          .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
      };
  
      jest
        .spyOn(DesignationModels, "find")
        .mockReturnValue({ exec: jest.fn().mockResolvedValue() });
      await FindAllDesignation(request, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });