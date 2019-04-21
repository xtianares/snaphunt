const router = require("express").Router();
const snapController = require("../../controllers/snapController");

// all snaps
router.route("/")
  .get(snapController.findAll)
  .post(snapController.create);

// find snaps by userId
router
  .route("/:userId")
  .get(snapController.findByUserId);

// find snaps by id
router
  .route("/:id")
  .get(snapController.findById)
  .put(snapController.update)
  .delete(snapController.remove);

module.exports = router;
