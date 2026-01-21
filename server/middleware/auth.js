const jwt = require("jsonwebtoken");
const Membership = require("../models/Membership");
const { fail } = require("../utils/response");

function protect(req, res, next) {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) return fail(res, "Not authenticated", 401);

  const token = header.slice(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    return next();
  } catch (e) {
    return fail(res, "Invalid/expired token", 401);
  }
}

function requireMember(paramKey = "chamaId") {
  return async function (req, res, next) {
    const chamaId = req.params[paramKey];
    const userId = req.user.id;

    const membership = await Membership.findOne({ userId, chamaId });
    if (!membership) return fail(res, "You are not a member of this chama", 403);

    req.membership = membership;
    return next();
  };
}

function requireRole(paramKey = "chamaId", roles = []) {
  return async function (req, res, next) {
    const chamaId = req.params[paramKey];
    const userId = req.user.id;

    const membership = await Membership.findOne({ userId, chamaId });
    if (!membership) return fail(res, "You are not a member of this chama", 403);

    if (!roles.includes(membership.role)) {
      return fail(res, "Insufficient permissions", 403);
    }

    req.membership = membership;
    return next();
  };
}

module.exports = { protect, requireMember, requireRole };
