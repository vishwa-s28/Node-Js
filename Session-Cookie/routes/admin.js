const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");
const { ADMIN_ROUTES } = require("../constants/routesConstants");

const router = express.Router();

router.get(ADMIN_ROUTES.ADD_PRODUCT, adminController.getAddProduct);

router.get(ADMIN_ROUTES.PRODUCTS, adminController.getProducts);

router.post(ADMIN_ROUTES.ADD_PRODUCT, adminController.postAddProduct);

router.get(ADMIN_ROUTES.EDIT_PRODUCT_ID, adminController.getEditProduct);

router.post(ADMIN_ROUTES.EDIT_PRODUCT, adminController.postEditProduct);

router.post(ADMIN_ROUTES.DELETE_PRODUCT, adminController.postDeleteProduct);

module.exports = router;
