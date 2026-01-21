const mongoose = require("mongoose");
const Notification = require("../models/Notification");
const { ok, fail } = require("../utils/response");

exports.listNotifications = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return ok(res, { notifications });
  } catch (err) {
    next(err);
  }
};

exports.updateNotification = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { isRead } = req.body || {};

    if (!mongoose.isValidObjectId(id)) return fail(res, "Invalid notification id", 400);
    if (typeof isRead !== "boolean") return fail(res, "isRead must be boolean", 400);

    const notification = await Notification.findOneAndUpdate(
      { _id: id, userId },
      { isRead },
      { new: true }
    );

    if (!notification) return fail(res, "Notification not found", 404);

    return ok(res, { notification });
  } catch (err) {
    next(err);
  }
};
