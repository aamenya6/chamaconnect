const mongoose = require("mongoose");
const Membership = require("../models/Membership");
const Contribution = require("../models/Contribution");
const Meeting = require("../models/Meeting");
const Notification = require("../models/Notification");
const { ok } = require("../utils/response");

exports.getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const memberships = await Membership.find({ userId }).select("chamaId").lean();
    const chamaIds = memberships.map((m) => m.chamaId);

    const activeChamas = chamaIds.length;

    // This month range
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const contributionsThisMonth = await Contribution.find({
      chamaId: { $in: chamaIds },
      createdAt: { $gte: start, $lt: end }
    }).lean();

    const totalContributedThisMonth = contributionsThisMonth
      .filter((c) => c.status === "paid")
      .reduce((sum, c) => sum + (c.amount || 0), 0);

    const pendingContributions = contributionsThisMonth.filter((c) => c.status === "pending").length;

    // Recent activity: contributions + meetings + notifications (simple)
    const recentNotifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const recentMeetings = await Meeting.find({ chamaId: { $in: chamaIds } })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const recentContributions = await Contribution.find({ chamaId: { $in: chamaIds } })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const activity = [
      ...recentContributions.map((c) => ({
        type: "contribution",
        message: `Contribution ${c.status}: KES ${c.amount}`,
        createdAt: c.createdAt
      })),
      ...recentMeetings.map((m) => ({
        type: "meeting",
        message: `Meeting created: ${m.title}`,
        createdAt: m.createdAt
      })),
      ...recentNotifications.map((n) => ({
        type: "notification",
        message: n.message,
        createdAt: n.createdAt
      }))
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    return ok(res, {
      stats: {
        totalContributedThisMonth,
        pendingContributions,
        activeChamas
      },
      activity
    });
  } catch (err) {
    next(err);
  }
};
