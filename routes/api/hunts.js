const router = require("express").Router();
const huntController = require("../../controllers/huntController");

// all hunts
router.route("/")
  .get(huntController.findAll)
  .post(huntController.create);

// find hunts by id
router
  .route("/:id")
  .get(huntController.findById)
  .put(huntController.update)
  .delete(huntController.remove);

// find hunts by userId
router
  .route("/user/:userId")
  .get(huntController.findByUserId);

module.exports = router;
