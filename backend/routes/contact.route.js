import { Router } from "express";
import {
  createContact,
  deleteContact,
  getAllContact,
  getContactById,
  updateContact,
} from "../controller/contact.controller.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const contactRouter = Router();

contactRouter.get("/", roleMiddleware, getAllContact);
contactRouter.get("/:id", roleMiddleware, getContactById);
contactRouter.post("/", createContact);
contactRouter.put("/:id", roleMiddleware, updateContact);
contactRouter.delete("/:id", roleMiddleware, deleteContact);

export default contactRouter;
