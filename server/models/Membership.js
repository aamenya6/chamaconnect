const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    chamaId: { type: mongoose.Schema.Types.ObjectId, ref: "Chama", required: true },
    role: { type: String, enum: ["admin", "treasurer", "member"], default: "member" },
    joinedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

membershipSchema.index({ userId: 1, chamaId: 1 }, { unique: true });

module.exports = mongoose.model("Membership", membershipSchema);
