import { Document, Model, model, Schema } from "mongoose";

interface Organization {
  name: string;
  logo: string;
  description: string;
  organizationContact: string;
  address: string;
  email: string;
  verificationToken?: string;
}

interface OrganizationModel extends Model<OrganizationDoc> {}

interface OrganizationDoc extends Organization, Document {}

const organizationSchema = new Schema<OrganizationDoc, OrganizationModel>({
  name: { type: String, required: true },
  logo: { type: String },
  description: { type: String, required: true },
  email: { type: String, required: true },
  organizationContact: { type: String, required: false },
  address: { type: String },
  verificationToken: { type: String }
});

export const Organization = model<OrganizationDoc, OrganizationModel>(
  "Organization",
  organizationSchema
);
