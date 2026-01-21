const router = require("express").Router();
const { protect, requireMember, requireRole } = require("../middleware/auth");
const { listMembers, updateMemberRole, removeMember } = require("../controllers/member.controller");

router.get("/:chamaId/members", protect, requireMember("chamaId"), listMembers);
router.patch("/:chamaId/members/:memberId", protect, requireRole("chamaId", ["admin"]), updateMemberRole);
router.delete("/:chamaId/members/:memberId", protect, requireRole("chamaId", ["admin"]), removeMember);

module.exports = router;
