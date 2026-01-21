const router = require("express").Router();
const { protect, requireMember, requireRole } = require("../middleware/auth");
const { listMeetings, createMeeting } = require("../controllers/meeting.controller");

router.get("/:chamaId/meetings", protect, requireMember("chamaId"), listMeetings);
router.post("/:chamaId/meetings", protect, requireRole("chamaId", ["admin", "treasurer"]), createMeeting);

module.exports = router;
