import { Request, Response } from "express";
import { User } from "../models/user";

// Fetch users for an organization
export const Fetch__ORGANIZATIONS_USERS__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const organizationId = req.params.organizationId;

    // Assuming organizationId is passed and validated appropriately
    const users = await User.find({ organization: organizationId });

    return res.json({ status: "success", data: users });
  } catch (error) {
    console.error("Error fetching organization users:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

// Fetch all users for an admin
export const Fetch__USERS__GET = async (req: Request, res: Response) => {
  try {
    if (req.permissions.readAny) {
      const users = await User.find();
      return res.json({ status: "success", data: users });
    }
    if (req.permissions.readOwn) {
      const users = await User.find({ organization: req.user.organization });
      return res.json({ status: "success", data: users });
    }
  } catch (error) {
    console.error("Error fetching all users:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

// Update a user
export const Update__USER__PUT = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { name, email, password } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, password },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    return res.json({ status: "success", data: user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

// Update user's own profile
export const Update__OWN_USER__PUT = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // Assuming user ID is available in the request object
    const { name, email, password } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, password },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    return res.json({ status: "success", data: user });
  } catch (error) {
    console.error("Error updating own profile:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Delete__USER__DELETE = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ status: "error", error: "user not found" });
    }

    return res.json({
      status: "success",
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting User:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
