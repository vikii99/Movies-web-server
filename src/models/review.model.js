import mongoose from "mongoose"
import modelOptions from "./model.options.js"

const reviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    requiued: true,
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
  }
}, modelOptions);


export default mongoose.model("Review", reviewSchema)

// import mongoose, { Schema } from "mongoose";
// import modelOptions from "./model.options.js";

// export default mongoose.model(
//   "Review",
//   mongoose.Schema({
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true
//     },
//     content: {
//       type: String,
//       required: true
//     },
//     mediaType: {
//       type: String,
//       enum: ["tv", "movie"],
//       required: true
//     },
//     mediaId: {
//       type: String,
//       required: true
//     },
//     mediaTitle: {
//       type: String,
//       required: true
//     },
//     mediaPoster: {
//       type: String,
//       required: true
//     },
//   }, modelOptions)
// );