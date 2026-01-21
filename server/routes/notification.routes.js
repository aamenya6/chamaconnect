const router = require("express").Router();
const { protect } = require("../middleware/auth");
const { listNotifications, updateNotification } = require("../controllers/notification.controller");

router.get("/", protect, listNotifications);
router.patch("/:id", protect, updateNotification);

module.exports = router;
