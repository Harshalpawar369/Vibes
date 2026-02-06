const express = require('express');
const itemController = require("../controllers/item.controllers.js")
const authitemMiddleware = require('../middlewares/auth.middleware.js')
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router();
 
router.post('/', authitemMiddleware.authitemMiddleware, upload.single("image"), itemController.createItem)

module.exports = router