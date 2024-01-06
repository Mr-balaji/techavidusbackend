const Products = require("../models/product");


async function allProducts(data,page=1) {
  const PAGE_SIZE = 10;
    try{

      const searchQuery = {};

      // Add specific conditions based on your searchData
      if (data.productName) {
        // Case-insensitive search for productName
        searchQuery.productName = { $regex: new RegExp(data.productName, 'i') };
      }

      if (data.productDetails) {
        // Case-insensitive search for productName
        searchQuery.productDetails = { $regex: new RegExp(data.productDetails, 'i') };
      }

      if (data.price) {
        // Case-insensitive search for productName
        searchQuery.price = { $regex: new RegExp(data.price, 'i') };
      }

      if (data.quantity) {
        // Case-insensitive search for productName
        searchQuery.productDetails = { $regex: new RegExp(data.quantity, 'i') };
      }

      if (data.createdAt) {
        // Case-insensitive search for productName
        searchQuery.createdAt =  data.createdAt ;
      }
      const totalCount = await Products.countDocuments(searchQuery);
      const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  
      const products = await Products.find(searchQuery)
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE);
  
  
      return {
        products,
        totalPages,
        currentPage: page,
        totalCount,
      };
        return product
      }catch(err){
        console.log(err);
        res.json({
          responseCode: 500,
          responseStatus: "error",
          responseMsg: "Error In Route",
        });
      }
}

async function createProducts(data,file){
    try {

        const productName = data.productName;
        const productDetails = data.productDetails;
        const productImage = file; 
        const price = data.price;
        const quantity = data.quantity;
        const createdAt = data.createdAt;
        const product = new Products({
          productName,
          productDetails,
          productImage,
          price,
          quantity,
          createdAt
        });
        await product.save();

        console.log('product',data);
        return product
      } catch (error) {
        logger.error("Error in route create Product", error);
        res.status(500).json({
          responseCode: 500,
          responseStatus: "error",
          responseMsg: "Something went wrong!..",
        });
      }
}


async function deleteProduct(id) {
    try{
        const deletedRecord = await Products.findByIdAndDelete(id);
        return deletedRecord
      }catch(err){
        console.log(err);
        res.json({
          responseCode: 500,
          responseStatus: "error",
          responseMsg: "Error In Route",
        });
      }
}

async function updateRecords(id,data) {
    try{
        const updateData = {
           productName : data.productName,
           productDetails : data.productDetails,
           productImage : data?.path,
           price : data.price,
           quantity : data.quantity,
           createdAt : data.createdAt,
          };
          const updatedProduct = await Products.findByIdAndUpdate(
            id,
            { $set: updateData }, // Use $set to update specific fields
            { new: true }
          );
      
          return updatedProduct;
      }catch(err){
        console.log(err);
        res.json({
          responseCode: 500,
          responseStatus: "error",
          responseMsg: "Error In Route",
        });
      }
}




module.exports = {
    allProducts,
    createProducts,
    deleteProduct,
    updateRecords
};