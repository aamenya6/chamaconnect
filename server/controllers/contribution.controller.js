const mongoose = require("mongoose");
const Contribution = require("../models/Contribution");
const Membership = require("../models/Membership");
const { ok, fail } = require("../utils/response");

exports.listContributions = async (req, res, next) => {
  try {
    const { chamaId } = req.params;
    if (!mongoose.isValidObjectId(chamaId)) return fail(res, "Invalid chamaId", 400);

    const contributions = await Contribution.find({ chamaId })
      .sort({ createdAt: -1 })
      .populate("userId", "name email")
      .lean();

    const mapped = contributions.map((c) => ({
      id: c._id,
      chamaId: c.chamaId,
      userId: c.userId?._id || c.userId,
      memberName: c.userId?.name || "Member",
      memberEmail: c.userId?.email || "",
      amount: c.amount,
      status: c.status,
      dueDate: c.dueDate,
      paidAt: c.paidAt,
      note: c.note,
      createdAt: c.createdAt
    }));

    return ok(res, { contributions: mapped });
  } catch (err) {
    next(err);
  }
};

exports.createContribution = async (req, res, next) => {
  try {
    const { chamaId } = req.params;
    const userId = req.user.id;
    const { amount, dueDate, note, paidAt, status } = req.body || {};

    if (!mongoose.isValidObjectId(chamaId)) return fail(res, "Invalid chamaId", 400);

    const amountNum = Number(amount);
    if (!amount || Number.isNaN(amountNum) || amountNum <= 0) return fail(res, "amount must be a positive number", 400);

    let due = null;
    if (dueDate) {
      const d = new Date(dueDate);
      if (Number.isNaN(d.getTime())) return fail(res, "Invalid dueDate", 400);
      due = d;
    }

    let paid = null;
    if (paidAt) {
      const p = new Date(paidAt);
      if (Number.isNaN(p.getTime())) return fail(res, "Invalid paidAt", 400);
      paid = p;
    }

    // If paidAt provided, default paid unless explicitly set
    let finalStatus = "pending";
    if (paid) finalStatus = "paid";
    if (status && ["paid", "pending", "late"].includes(status)) finalStatus = status;

    const created = await Contribution.create({
      chamaId,
      userId,
      amount: amountNum,
      status: finalStatus,
      dueDate: due,
      paidAt: paid,
      note: note ? String(note) : ""
    });

    return ok(res, { contribution: created }, 201);
  } catch (err) {
    next(err);
  }
};

exports.updateContribution = async (req, res, next) => {
  try {
    const { contributionId } = req.params;
    const userId = req.user.id;

    if (!mongoose.isValidObjectId(contributionId)) return fail(res, "Invalid contributionId", 400);

    const contribution = await Contribution.findById(contributionId);
    if (!contribution) return fail(res, "Contribution not found", 404);

    // Role rule: admin/treasurer can edit others; member can only edit their own
    const membership = await Membership.findOne({ userId, chamaId: contribution.chamaId });
    if (!membership) return fail(res, "You are not a member of this chama", 403);

    const isOwner = contribution.userId.toString() === userId;
    const canEditOthers = ["admin", "treasurer"].includes(membership.role);

    if (!isOwner && !canEditOthers) return fail(res, "Insufficient permissions", 403);

    const { status, amount, paidAt, note } = req.body || {};

    if (status !== undefined) {
      if (!["paid", "pending", "late"].includes(status)) return fail(res, "Invalid status", 400);
      contribution.status = status;
    }

    if (amount !== undefined) {
      const n = Number(amount);
      if (Number.isNaN(n) || n <= 0) return fail(res, "amount must be positive number", 400);
      contribution.amount = n;
    }

    if (paidAt !== undefined) {
      if (paidAt === null || paidAt === "") {
        contribution.paidAt = null;
      } else {
        const p = new Date(paidAt);
        if (Number.isNaN(p.getTime())) return fail(res, "Invalid paidAt", 400);
        contribution.paidAt = p;
      }
    }

    if (note !== undefined) {
      contribution.note = note ? String(note) : "";
    }

    await contribution.save();
    return ok(res, { contribution });
  } catch (err) {
    next(err);
  }
};
