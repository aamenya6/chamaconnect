const express = require("express");
const cors = require("cors");

const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const chamaRoutes = require("./routes/chama.routes");
const memberRoutes = require("./routes/member.routes");
const contributionRoutes = require("./routes/contribution.routes");
const meetingRoutes = require("./routes/meeting.routes");
const notificationRoutes = require("./routes/notification.routes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, name: "ChamaConnect API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/chamas", chamaRoutes);
app.use("/api/chamas", memberRoutes); // nested chama members routes
app.use("/api/chamas", contributionRoutes); // nested chama contributions routes
app.use("/api/chamas", meetingRoutes); // nested chama meetings routes
app.use("/api/notifications", notificationRoutes);

app.use(errorHandler);

module.exports = app;
