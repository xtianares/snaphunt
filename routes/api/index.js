const router = require("express").Router();
const userRoutes = require("./users");
const huntRoutes = require("./hunts");
const snapRoutes = require("./snaps");
const loginRoutes = require("./login");

// All routes
router.use("/users", userRoutes);
router.use("/hunts", huntRoutes);
router.use("/snaps", snapRoutes);
router.use("/login", loginRoutes);

module.exports = router;
