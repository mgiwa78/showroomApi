import mongoose, { Schema, model, Document } from "mongoose";
import Category, { categorySchema } from "./category";
import { ObjectId } from "mongodb";
const CategoryMod = mongoose.model("Category", categorySchema);

interface Product extends Document {
  name: string;
  description: string;
  price: string;
  organization?: Schema.Types.ObjectId;
  category: Schema.Types.ObjectId[];
  profilePicture: string;
  otherPictures: string[];
}

const productSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    profilePicture: { type: String, default: null },
    otherPictures: { type: [String], default: [] },
    category: {
      type: [Schema.Types.ObjectId],
      ref: "Category",
      required: true
    },
    organization: { type: Schema.Types.ObjectId, ref: "Organization" }
  },
  { timestamps: true }
);

const Product = model<Product>("Product", productSchema);

export default Product;
