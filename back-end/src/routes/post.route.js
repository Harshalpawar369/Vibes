const express = require("express");
const postController = require('../controllers/post.controllers.js');
const {authRoleMiddleware,requireUser} = require('../middlewares/user.middleware.js')

const router = express.Router();

router.post("/askDelulu", authRoleMiddleware, requireUser,postController.sendMessage);

module.exports = router;