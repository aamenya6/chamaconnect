const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { ok, fail } = require("../utils/response");

function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function isEmail(x) {
  return typeof x === "string" && x.includes("@") && x.includes(".");
}

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return fail(res, "Name is required (min 2 chars)", 400);
    }
    if (!email || !isEmail(email)) return fail(res, "Valid email is required", 400);
    if (!password || typeof password !== "string" || password.length < 6) {
      return fail(res, "Password must be at least 6 characters", 400);
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return fail(res, "Email already in use", 409);

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name: name.trim(), email: email.toLowerCase(), passwordHash });

    const token = signToken(user._id.toString());
    return ok(
      res,
      { token, user: { id: user._id, name: user.name, email: user.email } },
      201
    );
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !isEmail(email)) return fail(res, "Valid email is required", 400);
    if (!password) return fail(res, "Password is required", 400);

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return fail(res, "Invalid credentials", 401);

    const okPass = await bcrypt.compare(password, user.passwordHash);
    if (!okPass) return fail(res, "Invalid credentials", 401);

    const token = signToken(user._id.toString());
    return ok(res, { token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("_id name email");
    if (!user) return fail(res, "User not found", 404);
    return ok(res, { user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};
