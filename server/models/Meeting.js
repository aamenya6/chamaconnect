const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    chamaId: { type: mongoose.Schema.Types.ObjectId, ref: "Chama", required: true },
    title: { type: String, required: true, trim: true },
    agenda: { type: String, default: "" },
    dateTime: { type: Date, required: true },
    location: { type: String, default: "" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meeting", meetingSchema);
