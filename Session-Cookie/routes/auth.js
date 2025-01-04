const express = require("express");
const authController = require("../controllers/auth");
const { AUTH_ROUTES } = require("../constants/routesConstants");

const router = express.Router();

router.get(AUTH_ROUTES.LOGIN, authController.getLogin);
router.post(AUTH_ROUTES.LOGIN, authController.postLogin);
router.post(AUTH_ROUTES.LOGOUT, authController.postLogout);

module.exports = router;
