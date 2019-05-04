const router = require("express").Router();
const huntController = require("../../controllers/huntController");

// all hunts
router.route("/")
  .get(huntController.findAll)
  .post(huntController.create);

// find hunts by userId
router
  .route("/:userId")
  .get(huntController.findByUserId);

// find hunts by id
router
  .route("/:id")
  .get(huntController.findById)
  .put(huntController.update)
  .delete(huntController.remove);

module.exports = router;
