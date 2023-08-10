import { Schema, model, Document, Types } from "mongoose";

export interface PostImage {
  id: Types.ObjectId;
  url: string;
  altText?: string;
  title?: string;
  description?: string;
}

interface PostText {
  content: string;
  isBold?: boolean;
}

interface PostCategory {
  name: string;
}

interface PostDocument extends Document {
  title: string;
  description: string;
  images?: PostImage[];
  texts: PostText[];
  categories: PostCategory[];
  organization: Types.ObjectId;
}

const PostSchema = new Schema<PostDocument>(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    images: [
      {
        id: { type: Types.ObjectId },
        url: {
          type: String,
          required: true
        },
        altText: String,
        description: String,
        title: String
      }
    ],
    texts: [
      {
        content: {
          type: String,
          required: true
        },
        isBold: Boolean
      }
    ],
    categories: [
      {
        name: {
          type: String,
          required: true
        }
      }
    ],
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true
    }
  },
  { timestamps: true }
);

const Post = model<PostDocument>("Post", PostSchema);

export default Post;
