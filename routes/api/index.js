const router = require("express").Router();
const userRoutes = require("./users");
const snapRoutes = require("./snaps");
const loginRoutes = require("./login");

// All routes
router.use("/users", userRoutes);
router.use("/snaps", snapRoutes);
router.use("/login", loginRoutes);

module.exports = router;
