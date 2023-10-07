import { Document, Model, model, Schema } from "mongoose";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  contactNumber?: string;
  address?: string;
  password: string;
  roles: Array<"Organization Admin" | "Super Admin">;
  organization?: Schema.Types.ObjectId; // Reference to the Organization model for admin and regular users
  // Other user fields
}

import { Permission } from "accesscontrol";
import {
  OrganizationDoc,
  OrganizationModel,
  TOrganization
} from "./organization";
interface Allowed {
  readOwn?: Permission;
  readAny?: Permission;
  updateOwn?: Permission;
  updateAny?: Permission;
  createOwn?: Permission;
  createAny?: Permission;
  deleteAny?: Permission;
  deleteOwn?: Permission;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        organization?: string;
        firstName: string;
        contactNumber?: string;
        address?: string;
        lastName: string;
        roles: string[];
        permissions?: string[];
      };
      permissions: Allowed;
    }
  }
}

interface UserModel extends Model<UserDoc> {}

interface UserDoc extends User, Document {}

const userSchema = new Schema<UserDoc, UserModel>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  contactNumber: { type: String, required: false },
  address: { type: String, required: false },
  lastName: { type: String, required: true },
  roles: {
    type: [String],
    enum: ["Super Admin", "Regular", "Organization Admin"],
    required: true
  },
  organization: { type: Schema.Types.ObjectId, ref: "Organization" }
});

export const User = model<UserDoc, UserModel>("User", userSchema);
