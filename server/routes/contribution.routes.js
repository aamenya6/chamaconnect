const router = require("express").Router();
const { protect, requireMember } = require("../middleware/auth");
const { listContributions, createContribution, updateContribution } = require("../controllers/contribution.controller");

router.get("/:chamaId/contributions", protect, requireMember("chamaId"), listContributions);
router.post("/:chamaId/contributions", protect, requireMember("chamaId"), createContribution);

// global contribution patch route
router.patch("/contributions/:contributionId", protect, updateContribution);

module.exports = router;
