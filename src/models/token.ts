const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  },
  token: {
    type: String,
    required: true
  },
  maxUses: {
    type: Number,
    required: true,
    default: 1
  },
  currentUses: {
    type: Number,
    required: true,
    default: 0
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

export const Token = mongoose.model("Token", tokenSchema);
