const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("../config/db");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Chama = require("../models/Chama");
const Membership = require("../models/Membership");
const Contribution = require("../models/Contribution");
const Meeting = require("../models/Meeting");
const Notification = require("../models/Notification");

async function run() {
  await connectDB();

  // Clear existing demo data (safe reset)
  await Promise.all([
    Notification.deleteMany({}),
    Meeting.deleteMany({}),
    Contribution.deleteMany({}),
    Membership.deleteMany({}),
    Chama.deleteMany({}),
    User.deleteMany({})
  ]);

  const adminPassword = await bcrypt.hash("Password123!", 10);
  const admin = await User.create({
    name: "Demo Admin",
    email: "admin@chamaconnect.dev",
    passwordHash: adminPassword
  });

  const treasurerPassword = await bcrypt.hash("Password123!", 10);
  const treasurer = await User.create({
    name: "Demo Treasurer",
    email: "treasurer@chamaconnect.dev",
    passwordHash: treasurerPassword
  });

  const memberPassword = await bcrypt.hash("Password123!", 10);
  const member = await User.create({
    name: "Demo Member",
    email: "member@chamaconnect.dev",
    passwordHash: memberPassword
  });

  const chama = await Chama.create({
    name: "Watu Wa Savings",
    description: "Monthly contributions for emergencies and business growth.",
    contributionAmount: 5000,
    cycle: "monthly",
    createdBy: admin._id,
    inviteCode: "A1B2C3D4",
    inviteCodeCreatedAt: new Date()
  });

  const m1 = await Membership.create({ userId: admin._id, chamaId: chama._id, role: "admin" });
  const m2 = await Membership.create({ userId: treasurer._id, chamaId: chama._id, role: "treasurer" });
  const m3 = await Membership.create({ userId: member._id, chamaId: chama._id, role: "member" });

  // Contributions
  await Contribution.create([
    {
      chamaId: chama._id,
      userId: admin._id,
      amount: 5000,
      status: "paid",
      paidAt: new Date(),
      note: "January contribution"
    },
    {
      chamaId: chama._id,
      userId: treasurer._id,
      amount: 5000,
      status: "paid",
      paidAt: new Date(),
      note: "January contribution"
    },
    {
      chamaId: chama._id,
      userId: member._id,
      amount: 5000,
      status: "pending",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      note: "Pending payment"
    }
  ]);

  // Meetings
  await Meeting.create([
    {
      chamaId: chama._id,
      title: "January Kickoff",
      agenda: "Confirm contributions and plan payout schedule.",
      dateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      location: "Google Meet",
      createdBy: admin._id
    },
    {
      chamaId: chama._id,
      title: "December Review",
      agenda: "Review last month and identify improvements.",
      dateTime: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      location: "WhatsApp Call",
      createdBy: treasurer._id
    }
  ]);

  // Notifications
  await Notification.create([
    {
      userId: admin._id,
      type: "system",
      message: "Welcome to ChamaConnect demo!",
      meta: { chamaId: chama._id.toString() }
    },
    {
      userId: member._id,
      type: "contribution",
      message: "Your contribution is pending. Please pay before the due date.",
      meta: { chamaId: chama._id.toString() },
      isRead: false
    },
    {
      userId: treasurer._id,
      type: "meeting",
      message: "A new meeting was scheduled: January Kickoff.",
      meta: { chamaId: chama._id.toString() },
      isRead: true
    }
  ]);

  console.log("✅ Seed complete.");
  console.log("Demo users:");
  console.log("- admin@chamaconnect.dev / Password123!");
  console.log("- treasurer@chamaconnect.dev / Password123!");
  console.log("- member@chamaconnect.dev / Password123!");
  process.exit(0);
}

run().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
