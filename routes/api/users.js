const router = require("express").Router();
const userController = require("../../controllers/userController");

// all users
router.route("/")
  .get(userController.findAll)
  .post(userController.create);

  // find user by id
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

// adding hunt info to user
router
  .route("/hunt/:id")
  .put(userController.addHunt)

router
  .route("/hunt/update/:id")
  .put(userController.updateHunt)

module.exports = router;
