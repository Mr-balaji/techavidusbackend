const express = require('express');
const productRoute = express.Router();
const productservices = require('../services/productservices');
const multer = require('multer');

const upload = multer({dest:'uploads/'})
productRoute.use("/uploads",express.static('uploads'));

productRoute.route('/list').post(async (req, res) => {
    try { 
        let Products = await productservices.allProducts(req.body);
        res.json({
            responseCode: 200,
            responseStatus: "success",
            responseMsg: "Product Created SuccessFully", 
            responseData: Products,
          });
        
    } catch (error) {
        if (error) {
            res.status(error.statusCode).json({ 'message': error.message });
        } else {
            res.status(500).json({ 'message': 'something went wrong ', 'error': error?.message });
        }
    }
});


productRoute.route('/').post(upload.single("productImage"),async (req, res) => {
    try { 
        let Products = await productservices.createProducts(req.body,req.file.path);

        res.json({ 
            responseCode: 200,
            responseStatus: "success",
            responseMsg: "Product Created SuccessFully", 
            responseData: Products,
          });
        
    } catch (error) {
        if (error) {
            res.status(error.statusCode).json({ 'message': error.message });
        } else {
            res.status(500).json({ 'message': 'something went wrong ', 'error': error?.message });
        }
    }
}); 

//delete of Records
productRoute.delete("/:id",async(req,res)=>{
    try {
      const deletedRecord = await productservices.deleteProduct(req.params.id);
      res.json({
        responseCode: 200,
        responseStatus: "success",
        responseMsg: "User Deleted SuccessFully",
        responseData: deletedRecord,
      });
    } catch (error) {
      res.status(500).json({ error: err.message });
  
    }
  })

  productRoute.put("/:id",async(req,res)=>{
    try {
      const updatedRecords = await productservices.updateRecords(req.params.id,req.body);
      res.json({
        responseCode: 200,
        responseStatus: "success",
        responseMsg: "User Deleted SuccessFully",
        responseData: updatedRecords,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
  
    }
  })
  

module.exports = productRoute;