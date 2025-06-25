const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  {
    user: { type: String, required: true }, // pour afficher le nom
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tweet", tweetSchema);
