import { User } from "../models/user";
import sendResetPasswordMail from "../services/sendResetPasswordMail";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const resetToken = jwt.sign({ email }, "your-reset-secret-key", {
      expiresIn: "1h"
    });
    await sendResetPasswordMail(email, resetToken);

    res.json({ message: "Reset token sent to your email" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
