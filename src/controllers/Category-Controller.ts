import { Request, Response } from "express";
import Category from "../models/category";

// Create a new product
export const Create__CATEGORY__POST = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { name, description } = req.body;

    const category: Category = await Category.create({
      name,
      description,
      organization: user.organization
    });

    res.status(201).json({ status: "success", data: category });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Upload__CATEGORY_IMAGE__POST = async (
  req: Request,
  res: Response
) => {
  const ID = req.params.categoryID;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const category = await Category.findById(ID);

  if (!category) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid Category ID" });
  }
  if (files["categoryBanner"]?.[0]) {
    const categoryBannerFile = files["categoryBanner"]?.[0];
    category.categoryBanner = "categories/" + categoryBannerFile.filename;
  } else {
    return res
      .status(400)
      .json({ status: "error", message: "No Image Selected" });
  }
  category.save();

  return res.json({
    message: "Files uploaded successfully!"
  });
};

export const Fetch__CATEGORIES__GET = async (req: Request, res: Response) => {
  try {
    const userOrganization = req.user.organization;

    const products: Category[] = await Category.find({
      organization: userOrganization
    });
    res.json({ status: "success", data: products });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Get a single product by ID
export const Fetch__CATEGORY__GET = async (req: Request, res: Response) => {
  try {
    const categoryId: string = req.params.categoryId;

    const category: Category | null = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ status: "error", error: "Category not found" });
    }
    res.json({ status: "success", data: category });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Update a product by ID
export const Update__CATEGORY__PUT = async (req: Request, res: Response) => {
  try {
    const categoryId: string = req.params.categoryId;

    const { name, description, pictures } = req.body;
    const updatedCategory: Category | null = await Category.findByIdAndUpdate(
      categoryId,
      { name, description, pictures },
      { new: true }
    );
    if (!updatedCategory) {
      return res
        .status(404)
        .json({ status: "error", error: "Product not found" });
    }
    res.json({ status: "success", data: updatedCategory });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Delete a product by ID
export const Delete__CATEGORY__DESTROY = async (
  req: Request,
  res: Response
) => {
  try {
    const categoryId: string = req.params.categoryId;
    const deletedCategory: Category | null = await Category.findByIdAndDelete(
      categoryId
    );
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ status: "error", error: "Product not found" });
    }
    res.json({ status: "success", data: deletedCategory });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
