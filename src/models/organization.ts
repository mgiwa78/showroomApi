import { Document, Model, model, Schema } from "mongoose";

export interface TOrganization {
  name: string;
  logo: string;
  description: string;
  organizationContact: string;
  address: string;
  email: string;
  verificationToken?: string;
}

export interface OrganizationModel extends Model<OrganizationDoc> {}
export interface OrganizationDoc extends TOrganization, Document {}

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
