const mongoose = require("mongoose");
const Chama = require("../models/Chama");
const Membership = require("../models/Membership");
const Notification = require("../models/Notification");
const { ok, fail } = require("../utils/response");

function randomCode(len = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

exports.listMyChamas = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const memberships = await Membership.find({ userId }).select("chamaId role joinedAt");
    const chamaIds = memberships.map((m) => m.chamaId);

    const chamas = await Chama.find({ _id: { $in: chamaIds } })
      .sort({ createdAt: -1 })
      .select("name description contributionAmount cycle createdBy inviteCode createdAt");

    const roleByChama = new Map(memberships.map((m) => [m.chamaId.toString(), m.role]));

    const enriched = await Promise.all(
      chamas.map(async (c) => {
        const count = await Membership.countDocuments({ chamaId: c._id });
        return {
          _id: c._id,
          name: c.name,
          description: c.description,
          contributionAmount: c.contributionAmount,
          cycle: c.cycle,
          inviteCode: c.inviteCode,
          memberCount: count,
          myRole: roleByChama.get(c._id.toString()) || "member",
          createdAt: c.createdAt
        };
      })
    );

    return ok(res, { chamas: enriched });
  } catch (err) {
    next(err);
  }
};

exports.createChama = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, description, contributionAmount, cycle } = req.body || {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return fail(res, "Chama name is required (min 2 chars)", 400);
    }

    const amountNum = contributionAmount === undefined ? 0 : Number(contributionAmount);
    if (Number.isNaN(amountNum) || amountNum < 0) return fail(res, "Invalid contributionAmount", 400);

    const cycleVal = cycle || "monthly";
    if (!["weekly", "monthly"].includes(cycleVal)) return fail(res, "cycle must be weekly or monthly", 400);

    const chama = await Chama.create({
      name: name.trim(),
      description: description ? String(description) : "",
      contributionAmount: amountNum,
      cycle: cycleVal,
      createdBy: userId
    });

    await Membership.create({ userId, chamaId: chama._id, role: "admin" });

    return ok(
      res,
      {
        chama: {
          _id: chama._id,
          name: chama.name,
          description: chama.description,
          contributionAmount: chama.contributionAmount,
          cycle: chama.cycle
        }
      },
      201
    );
  } catch (err) {
    // handle duplicate membership index etc.
    next(err);
  }
};

exports.getChamaById = async (req, res, next) => {
  try {
    const { chamaId } = req.params;

    if (!mongoose.isValidObjectId(chamaId)) return fail(res, "Invalid chamaId", 400);

    const chama = await Chama.findById(chamaId).select(
      "name description contributionAmount cycle createdBy inviteCode inviteCodeCreatedAt createdAt"
    );
    if (!chama) return fail(res, "Chama not found", 404);

    const memberCount = await Membership.countDocuments({ chamaId });
    // req.membership is set by requireMember
    const myRole = req.membership?.role || "member";

    return ok(res, {
      chama: {
        _id: chama._id,
        name: chama.name,
        description: chama.description,
        contributionAmount: chama.contributionAmount,
        cycle: chama.cycle,
        createdBy: chama.createdBy,
        memberCount,
        myRole,
        inviteCode: chama.inviteCode
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.createInviteCode = async (req, res, next) => {
  try {
    const { chamaId } = req.params;

    const inviteCode = randomCode(8);
    const chama = await Chama.findByIdAndUpdate(
      chamaId,
      { inviteCode, inviteCodeCreatedAt: new Date() },
      { new: true }
    ).select("inviteCode inviteCodeCreatedAt");

    if (!chama) return fail(res, "Chama not found", 404);

    return ok(res, { inviteCode: chama.inviteCode });
  } catch (err) {
    next(err);
  }
};

exports.joinByInvite = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { inviteCode } = req.body || {};
    if (!inviteCode || typeof inviteCode !== "string") return fail(res, "inviteCode is required", 400);

    const chama = await Chama.findOne({ inviteCode: inviteCode.trim().toUpperCase() });
    if (!chama) return fail(res, "Invalid invite code", 404);

    const exists = await Membership.findOne({ userId, chamaId: chama._id });
    if (exists) return fail(res, "You are already a member", 409);

    const membership = await Membership.create({ userId, chamaId: chama._id, role: "member" });

    await Notification.create({
      userId,
      type: "invite",
      message: `You joined "${chama.name}" using invite code ${inviteCode.trim().toUpperCase()}.`,
      meta: { chamaId: chama._id.toString() }
    });

    return ok(res, { message: "Joined successfully", chamaId: membership.chamaId }, 201);
  } catch (err) {
    next(err);
  }
};
