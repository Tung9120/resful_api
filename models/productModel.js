const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    unique: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  images: {
    type: Array,
    default: "https://via.placeholder.com/2000",
  },

  description: String,

  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Products", productSchema);
