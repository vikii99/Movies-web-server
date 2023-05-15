import mongoose from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "Favourite", mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mediaType: {
    type: String,
    enum: ["tv", "movie"],
    required: true,
  },
  mediaId: {
    type: String,
    requiued: true,
  },
  mediaTitle: {
    type: String,
    requiued: true,
  },
  mediaPoster: {
    type: String,
    requiued: true,
  },
  mediaRate: {
    type: Number,
    requiued: true,
  }
}, modelOptions));

