const router = require("express").Router();
const { protect, requireMember, requireRole } = require("../middleware/auth");
const {
  listMyChamas,
  createChama,
  getChamaById,
  createInviteCode,
  joinByInvite
} = require("../controllers/chama.controller");

router.get("/", protect, listMyChamas);
router.post("/", protect, createChama);

router.post("/join", protect, joinByInvite);

router.get("/:chamaId", protect, requireMember("chamaId"), getChamaById);
router.post("/:chamaId/invite", protect, requireRole("chamaId", ["admin"]), createInviteCode);

module.exports = router;
