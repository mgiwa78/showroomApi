import { Schema, model, Document } from "mongoose";

interface Room extends Document {
  title: string;
  description: string;
  roomBanner: string;
  organization?: Schema.Types.ObjectId;
}

export const roomSchema = new Schema<Room>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    roomBanner: { type: String, default: null },
    organization: { type: Schema.Types.ObjectId, ref: "Organization" }
  },
  { timestamps: true }
);

const Room = model<Room>("Room", roomSchema);

export default Room;
