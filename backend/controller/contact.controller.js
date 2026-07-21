import Contact from "../models/contact.model.js";
import mongoose from "mongoose";

export const getAllContact = async (req, res, next) => {
  const { search = "", page = 1, limit = 10, sort = "" } = req.query;
  const query = {};

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  let sortOption = {};

  // calculate skip
  const skip = (pageNumber - 1) * limitNumber;
  switch (sort) {
    case "latest":
      sortOption = { createdAt: -1 };
      break;
    case "oldest":
      sortOption = { createdAt: 1 };
      break;
    case "nameAsc":
      sortOption = { name: 1 };
      break;
    case "nameDecs":
      sortOption = { name: -1 };
      break;

    default:
      sortOption = { createdAt: -1 };
      break;
  }

  try {
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          subject: {
            $regex: search,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
      ];
  
      const contact = await Contact.find(query).sort(sortOption)
      res.status(200).json({
        success: true,
        data: contact,
       
      });
    } 
     const totalContact = await Contact.countDocuments(query);
      const totalPage = Math.ceil(totalContact / limitNumber);

      const contact = await Contact.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limitNumber);

      res.status(200).json({
        success: true,
        data: contact,
        pagination: {
          totalPage: totalPage,
          totalContact: totalContact,
        },
      });
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(400)
      .json({ success: false, message: "invalid contact message id" });
  }
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "contact not found" });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const { name, email, phone, subject, message, status } = req.body;
  if (!name || !email  || !subject || !message) {
    return res.status(400).json({ success: false, message: "missing details" });
  }
  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      status,
    });
    await newContact.save();
    res.status(200).json({
      success: true,
      message: "Contact successfully sent!",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const { name, email, phone, subject, message, status } = req.body;
  const { id } = req.params;
 
  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(400)
      .json({ success: false, message: "invalid contact message id" });
  }
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, email, phone, subject, message, status },
      { new: true },
    );
    if (!updatedContact) {
      return res
        .status(404)
        .json({ success: false, message: "contact not found" });
    }
    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(400)
      .json({ success: false, message: "invalid contact message id" });
  }
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res
        .status(404)
        .json({ success: false, message: "contact not found" });
    }
    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
      data: deletedContact,
    });
  } catch (error) {
    next(error);
  }
};
