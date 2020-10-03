const Products = require("../models/productModel");

const productCtrl = {
  getProducts: async (req, res) => {
    const products = await Products.find();

    res.json(products);
  },

  createProduct: async (req, res) => {
    const { product_id, title, images, description, price } = req.body;
    const product = await Products.findOne({ title: title });
    if (product)
      return res.status(400).json({
        msg: "The product already exists",
      });
    const newProduct = new Products({
      product_id,
      title,
      images,
      description,
      price,
    });

    await newProduct.save();

    res.json({ msg: "Create a new product" });
  },

  updateProduct: async (req, res) => {
    const { product_id, title, images, description, price } = req.body;
    await Products.findByIdAndUpdate(
      { _id: req.params.id },
      {
        product_id,
        title,
        images,
        description,
        price,
      }
    );

    res.json({ msg: "Updated a product" });
  },

  deleteProduct: async (req, res) => {
    await Products.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted a product" });
  },

  getProduct: async (req, res) => {
    const product = await Products.findById(req.params.id);
    res.json(product);
  },
};

module.exports = productCtrl;
