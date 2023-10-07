import { Request, Response } from "express";
import Room from "../models/room";
import { Organization } from "../../src/models";
import Category from "../../src/models/category";
import Product from "../../src/models/product";
import { ObjectId } from "mongodb";

// Create a new product
export const Create__ROOM__POST = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const isHasRoom = await Room.findOne({
      organization: new ObjectId(user.organization)
    });

    const { title, description } = req.body;
    if (isHasRoom) {
      const roomToChange = await Room.findOne({
        organization: new ObjectId(user.organization)
      });

      console.log(roomToChange);

      roomToChange.title = title;
      roomToChange.description = description;

      res.status(201).json({ status: "success", data: roomToChange });
    } else {
      const room: Room = await Room.create({
        title,
        description,
        organization: user.organization
      });
      res.status(201).json({ status: "success", data: room });
    }
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Upload__ROOM_IMAGE__POST = async (req: Request, res: Response) => {
  const ID = req.params.roomID;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const room = await Room.findById(ID);
  if (!room) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid Category ID" });
  }
  if (files["roomBanner"]?.[0]) {
    const roomBannerFile = files["roomBanner"]?.[0];
    room.roomBanner = "roomBanner/" + roomBannerFile.filename;
  } else {
    return res
      .status(400)
      .json({ status: "error", message: "No Image Selected" });
  }
  room.save();

  return res.json({
    message: "Files uploaded successfully!"
  });
};

export const Fetch__ROOMS__GET = async (req: Request, res: Response) => {
  try {
    const products: Room[] = await Room.find();
    res.json({ status: "success", data: products });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Get a single product by ID
export const Fetch__ROOM_FOR_CLIENT__GET = async (
  req: Request,
  res: Response
) => {
  try {
    var { roomName } = req.params;

    if (!roomName) {
      return res
        .status(404)
        .json({ status: "error", error: "Room Name is required" });
    }

    roomName = roomName.split("_").join(" ");
    const room = await Room.findOne({ title: roomName });

    if (!room) {
      return res
        .status(404)
        .json({ status: "error", error: "Invalid Room Name" });
    }
    const organization = await Organization.findById(room.organization);

    const organizationCategories = await Category.find({
      organization: organization
    });

    const roomData = {
      room: room,
      organizationCategories,
      organizationData: organization
    };

    return res.json({ status: "success", data: roomData });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const Fetch__ROOMS_FOR_CLIENT__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const rooms = await Room.find();

    return res.json({ status: "success", data: rooms });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const Fetch__CATEGORIES_PRODUCTS_FOR_CLIENT__GET = async (
  req: Request,
  res: Response
) => {
  try {
    var { categoryID } = req.params;

    const organizationCategory = await Category.findOne({
      _id: categoryID
    });

    const categoryProducts = await Product.find({
      category: { $in: [organizationCategory._id] }
    })
      .populate("category")
      .exec();

    const categoryProductsAndType = {
      organizationCategory,
      categoryProducts
    };

    console.log(
      "Fetch__CATEGORIES_PRODUCTS_FOR_CLIENT__GET : ",
      categoryProductsAndType
    );
    return res.json({
      status: "success",
      data: categoryProductsAndType
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const Fetch__CATEGORY_FOR_CLIENT__GET = async (
  req: Request,
  res: Response
) => {
  try {
    var { categoryID } = req.params;

    const category = await Category.findById(categoryID);
    if (!category) {
      return res
        .status(404)
        .json({ status: "error", error: "Invalid Category ID" });
    }

    return res.json({
      status: "success",
      data: category
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__ROOM__GET = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (req.permissions?.readOwn) {
      const room = await Room.findOne({ organization: user.organization });

      if (!room) {
        return res
          .status(404)
          .json({ status: "error", error: "Room not found" });
      }
      return res.json({ status: "success", data: room });
    }
    if (req.permissions?.readAny) {
      const rooms = await Room.find({});

      if (!rooms) {
        return res
          .status(404)
          .json({ status: "error", error: "Room not found" });
      }
      return res.json({ status: "success", data: rooms });
    }
    return res.status(401).json({ status: "error", error: "Unauthorised" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Update a product by ID
export const Update__ROOM__PUT = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const { name, description, pictures } = req.body;

    const updatedRoom: Room | null = await Room.findByIdAndUpdate(
      { organization: user.organization },
      { name, description, pictures },
      { new: true }
    );

    if (!updatedRoom) {
      return res
        .status(404)
        .json({ status: "error", error: "Product not found" });
    }
    res.json({ status: "success", data: updatedRoom });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Delete a product by ID
export const Delete__ROOM__DESTROY = async (req: Request, res: Response) => {
  try {
    const categoryId: string = req.params.categoryId;
    const deletedRoom: Room | null = await Room.findByIdAndDelete(categoryId);
    if (!deletedRoom) {
      return res
        .status(404)
        .json({ status: "error", error: "Product not found" });
    }
    res.json({ status: "success", data: deletedRoom });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
