const mongoose = require("mongoose");
const Membership = require("../models/Membership");
const User = require("../models/User");
const { ok, fail } = require("../utils/response");

exports.listMembers = async (req, res, next) => {
  try {
    const { chamaId } = req.params;
    if (!mongoose.isValidObjectId(chamaId)) return fail(res, "Invalid chamaId", 400);

    const memberships = await Membership.find({ chamaId }).sort({ joinedAt: 1 }).lean();

    const userIds = memberships.map((m) => m.userId);
    const users = await User.find({ _id: { $in: userIds } }).select("_id name email").lean();
    const byId = new Map(users.map((u) => [u._id.toString(), u]));

    const members = memberships.map((m) => {
      const u = byId.get(m.userId.toString());
      return {
        memberId: m._id,
        userId: m.userId,
        name: u?.name || "Unknown",
        email: u?.email || "",
        role: m.role,
        joinedAt: m.joinedAt
      };
    });

    return ok(res, { members });
  } catch (err) {
    next(err);
  }
};

exports.updateMemberRole = async (req, res, next) => {
  try {
    const { chamaId, memberId } = req.params;
    const { role } = req.body || {};

    if (!mongoose.isValidObjectId(chamaId)) return fail(res, "Invalid chamaId", 400);
    if (!mongoose.isValidObjectId(memberId)) return fail(res, "Invalid memberId", 400);

    if (!role || !["admin", "treasurer", "member"].includes(role)) {
      return fail(res, "role must be admin, treasurer, or member", 400);
    }

    const member = await Membership.findOneAndUpdate(
      { _id: memberId, chamaId },
      { role },
      { new: true }
    );

    if (!member) return fail(res, "Member not found", 404);

    return ok(res, {
      member: {
        memberId: member._id,
        userId: member.userId,
        role: member.role,
        joinedAt: member.joinedAt
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.removeMember = async (req, res, next) => {
  try {
    const { chamaId, memberId } = req.params;

    if (!mongoose.isValidObjectId(chamaId)) return fail(res, "Invalid chamaId", 400);
    if (!mongoose.isValidObjectId(memberId)) return fail(res, "Invalid memberId", 400);

    const removed = await Membership.findOneAndDelete({ _id: memberId, chamaId });
    if (!removed) return fail(res, "Member not found", 404);

    return ok(res, { message: "Member removed" });
  } catch (err) {
    next(err);
  }
};
