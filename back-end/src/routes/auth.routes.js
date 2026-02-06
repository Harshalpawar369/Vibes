const express = require("express");
const authController = require('../controllers/auth.controllers.js')

const router = express.Router();

router.post("/registerUser", authController.registerUser);

router.post("/login", authController.loginUser);

router.post("/logout", authController.logoutUSer);
router.post("/admin/register", authController.shopAdminRegister);

router.post("/admin/login", authController.shopAdminLogin);

router.post("/admin/logout", authController.adminlogout)
router.get('/loggedIn', authController.isLoggedIn);
module.exports = router;