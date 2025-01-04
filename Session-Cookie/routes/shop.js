const path = require("path");
const express = require("express");

const shopController = require("../controllers/shop");
const { SHOP_ROUTES, BASE_URL } = require("../constants/routesConstants");

const router = express.Router();

router.get(BASE_URL.URL, shopController.getIndex);

router.get(SHOP_ROUTES.PRODUCTS, shopController.getProducts);

router.get(SHOP_ROUTES.PRODUCTS_ID, shopController.getProduct);

router.get(SHOP_ROUTES.CART, shopController.getCart);

router.post(SHOP_ROUTES.CART, shopController.postCart);

router.post(SHOP_ROUTES.DELETE_CART, shopController.postCartDeleteProduct);

router.post(SHOP_ROUTES.CREATE_ORDER, shopController.postOrder);

router.get(SHOP_ROUTES.ORDERS, shopController.getOrders);

module.exports = router;
