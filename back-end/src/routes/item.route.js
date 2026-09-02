const express = require('express');
const itemController = require("../controllers/item.controllers.js")
const authitemMiddleware = require('../middlewares/auth.middleware.js')
const multer = require('multer');
const { authRoleMiddleware, requireAdmin, requireUser } = require('../middlewares/orders.middleware');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 
    }
});

const router = express.Router();

router.get('/', itemController.getItems)

 
router.post('/', authRoleMiddleware, requireAdmin, upload.single("image"), itemController.createItem)

module.exports = router