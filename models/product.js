const mongoose = require('mongoose');

// Define the user schema
const productSchema = new mongoose.Schema({
  productName: String,
  productDetails: String,
  price: String,
  quantity: String, 
  createdAt: Date,
  productImage:{
    type:String,
    // required:true
}
});



// Create the user model
const Products = mongoose.model('products', productSchema);

module.exports = Products;
