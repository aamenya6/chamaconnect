const router = require("express").Router();
const { protect } = require("../middleware/auth");
const { getDashboard } = require("../controllers/dashboard.controller");

router.get("/", protect, getDashboard);

module.exports = router;
