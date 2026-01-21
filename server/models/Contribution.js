const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema(
  {
    chamaId: { type: mongoose.Schema.Types.ObjectId, ref: "Chama", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["paid", "pending", "late"], default: "pending" },
    dueDate: { type: Date, default: null },
    paidAt: { type: Date, default: null },
    note: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contribution", contributionSchema);
