import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../__CONSTANTS__";
import { User } from "../models";
import { OrganizationDoc, OrganizationModel } from "../models/organization";

interface DecodedToken extends JwtPayload {
  userId: string;
  organization: string;
  roles: string;
  permissions: string[];
}

export const AuthenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ status: "error", error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      JWT_SECRET
    ) as unknown as DecodedToken;
    if (!decoded) {
      return res.status(401).json({ status: "error", error: "Invalid Token" });
    }

    const userData = await User.findById(decoded.user._id)
      .populate("organization")
      .exec();

    if (userData) {
      req.user = {
        id: decoded.user._id,
        roles: decoded.user.roles,
        organization: decoded.user.organization,
        ...userData
      };
    } else {
      return res.status(401).json({ status: "error", error: "User Not Found" });
    }
    next();
  } catch (error) {
    console.error("Error verifying JWT token:", error);
    return res.status(401).json({ status: "error", error: "Forbidden" });
  }
};
