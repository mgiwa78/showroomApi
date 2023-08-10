import { Request, Response } from "express";
import { Organization } from "../models/organization";

export const Create__ORGANIZATION__POST = async (
  req: Request,
  res: Response
) => {
  try {
    // Extract organization data from the request body
    const { name, logo, description, contactDetails } = req.body;

    // Create a new organization
    const organization = await Organization.create({
      name,
      logo,
      description,
      contactDetails
    });

    return res.status(201).json({ status: "success", data: organization });
  } catch (error) {
    console.error("Error creating organization:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Fetch__ORGANIZATIONS__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const organizations = await Organization.find();
    return res.json({ status: "success", data: organizations });
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
  return res
    .status(500)
    .json({ status: "error", error: "Internal server error" });
};

export const Fetch__ORGANIZATION__GET = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const organization = await Organization.findById(user.organization);

    if (!organization) {
      return res
        .status(404)
        .json({ status: "error", error: "Organization not found" });
    }
    return res.json({ status: "success", data: organization });
  } catch (error) {
    console.error("Error fetching organization:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Update__ORGANIZATION__PUT = async (
  req: Request,
  res: Response
) => {
  try {
    const user = req.user;

    const { name, logo, description, organizationContact } = req.body;

    const organization = await Organization.findByIdAndUpdate(
      user.organization,
      { name, logo, description, organizationContact },
      { new: true }
    );

    if (!organization) {
      return res
        .status(404)
        .json({ status: "error", error: "Organization not found" });
    }

    return res.json({ status: "success", data: organization });
  } catch (error) {
    console.error("Error updating organization:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Upload__OGANIZATION_LOGO__POST = async (
  req: Request,
  res: Response
) => {
  const ID = req.params.organizationID;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const organization = await Organization.findById(ID);
  if (!organization) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid Category ID" });
  }
  if (files["organizationLogo"]?.[0]) {
    const organizationLogo = files["organizationLogo"]?.[0];
    organization.logo = organizationLogo.filename;
  } else {
    return res
      .status(400)
      .json({ status: "error", message: "No Image Selected" });
  }
  organization.save();

  return res.json({
    message: "Files uploaded successfully!"
  });
};

export const Delete__ORGANIZATION__DELETE = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const organization = await Organization.findByIdAndDelete(id);

    if (!organization) {
      return res
        .status(404)
        .json({ status: "error", error: "Organization not found" });
    }

    return res.json({
      status: "success",
      message: "Organization deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting organization:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
