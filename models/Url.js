const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  fullUrl: String,
  shortUrl: String,
  userId: mongoose.Schema.Types.ObjectId,
  clicks: { type: Number, default: 0 }
});

module.exports = mongoose.model("Url", urlSchema);

