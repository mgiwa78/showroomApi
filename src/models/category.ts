import { Schema, model, Document } from "mongoose";

interface Category extends Document {
  name: string;
  description: string;
  categoryBanner: string;
  organization?: Schema.Types.ObjectId;
}

export const categorySchema = new Schema<Category>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    categoryBanner: { type: String, default: null },
    organization: { type: Schema.Types.ObjectId, ref: "Organization" }
  },
  { timestamps: true }
);

const Category = model<Category>("Category", categorySchema);

export default Category;
