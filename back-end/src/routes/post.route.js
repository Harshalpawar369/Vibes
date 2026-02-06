const express = require("express");
const postController = require('../controllers/post.controllers.js');
const { authitemMiddleware } = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.post("/askDelulu", authitemMiddleware, postController.sendMessage);

module.exports = router;