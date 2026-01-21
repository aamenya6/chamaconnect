const mongoose = require("mongoose");

const chamaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    contributionAmount: { type: Number, default: 0 },
    cycle: { type: String, enum: ["weekly", "monthly"], default: "monthly" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    inviteCode: { type: String, default: null },
    inviteCodeCreatedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chama", chamaSchema);
