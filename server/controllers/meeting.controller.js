const mongoose = require("mongoose");
const Meeting = require("../models/Meeting");
const { ok, fail } = require("../utils/response");

exports.listMeetings = async (req, res, next) => {
  try {
    const { chamaId } = req.params;
    if (!mongoose.isValidObjectId(chamaId)) return fail(res, "Invalid chamaId", 400);

    const meetings = await Meeting.find({ chamaId }).sort({ dateTime: 1 }).lean();
    return ok(res, { meetings });
  } catch (err) {
    next(err);
  }
};

exports.createMeeting = async (req, res, next) => {
  try {
    const { chamaId } = req.params;
    const userId = req.user.id;
    const { title, agenda, dateTime, location } = req.body || {};

    if (!mongoose.isValidObjectId(chamaId)) return fail(res, "Invalid chamaId", 400);
    if (!title || typeof title !== "string" || title.trim().length < 2) {
      return fail(res, "title is required (min 2 chars)", 400);
    }
    if (!dateTime) return fail(res, "dateTime is required", 400);

    const dt = new Date(dateTime);
    if (Number.isNaN(dt.getTime())) return fail(res, "Invalid dateTime", 400);

    const meeting = await Meeting.create({
      chamaId,
      title: title.trim(),
      agenda: agenda ? String(agenda) : "",
      dateTime: dt,
      location: location ? String(location) : "",
      createdBy: userId
    });

    return ok(res, { meeting }, 201);
  } catch (err) {
    next(err);
  }
};
