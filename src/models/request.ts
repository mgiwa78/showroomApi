import { Document, Model, model, Schema } from "mongoose";

export interface organizationDetails {
  name: string;
  email: string;
  officeNumber: string;
  description: string;
  address: string;
}
interface contactPerson {
  lastName: string;
  email: string;
  phoneNumber: string;
  companyRole: string;
  firstName: string;
}
interface Request {
  organizationDetails: organizationDetails;
  contactPerson: contactPerson;
  status: string;
}

interface RequestModel extends Model<RequestDoc> {}

interface RequestDoc extends Request, Document {}

const requestSchema = new Schema<RequestDoc, RequestModel>({
  organizationDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    officeNumber: { type: String, required: true },
    address: { type: String, required: true }
  },
  contactPerson: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    companyRole: { type: String, required: true }
  },
  status: { type: String, default: "pending" }
});

export const Request = model<RequestDoc, RequestModel>(
  "Request",
  requestSchema
);
