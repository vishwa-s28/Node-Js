const {
  ADMIN_API_PREFIX,
  ADMIN_ROUTES,
  BASE_URL,
} = require("../constants/routesConstants");
const Product = require("../models/product");
const { encrypt, decrypt } = require("../utils/encrypt_decrypt");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = encrypt(req.body.description);

  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user,
  });
  product
    .save()
    .then((result) => {
      console.log("Created Product");
      res.redirect(ADMIN_API_PREFIX.ADMIN_API + ADMIN_ROUTES.PRODUCTS);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect(BASE_URL.URL);
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect(BASE_URL.URL);
      }
      product.description = decrypt(product.description);
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = encrypt(req.body.description);

  Product.findById(prodId)
    .then((product) => {
      if(product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save()
      .then((result) => {
        console.log("UPDATED PRODUCT!");
        res.redirect(ADMIN_API_PREFIX.ADMIN_API + ADMIN_ROUTES.PRODUCTS);
      })
    }) 
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id})
    .then((products) => {
      products.forEach((product) => {
        product.description = decrypt(product.description);
      });
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteOne({_id: prodId, userId: req.user._id})
    .then(() => {
      console.log("DESTROYED PRODUCT");
      res.redirect(ADMIN_API_PREFIX.ADMIN_API + ADMIN_ROUTES.PRODUCTS);
    })
    .catch((err) => console.log(err));
};
