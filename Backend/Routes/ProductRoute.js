 const express = require("express")
 const router = express.Router()
 const adminOnly = require("../Middleware/adminOnly")
 const verifyToken = require("../Middleware/token")

 const {
    //-----User-Side--------------
    CreateProducts ,
    ViewAllProduct,
    ViewSingleProducts,
    UpdateOwnProducts ,
    
    //----Admin-Side-----
    GetAllProduct,
    GetSingleProduct,
    DeleteProduct

 }=require("../controller/products")

//-------UserSide------------
 router.post("/create-product" , verifyToken , CreateProducts)
 router.get("/view-allproduct" , verifyToken, ViewAllProduct )
 router.get("/view-Singleproduct/:id" , verifyToken, ViewSingleProducts)
 router.put("/updateOwn-product/:id" , verifyToken , UpdateOwnProducts)










 
//-------AdminSide-------------
 router.get("/all-product" , verifyToken , adminOnly , GetAllProduct)
 router.get("/single-product/:id" , verifyToken, adminOnly , GetSingleProduct)
 router.delete("/delete-product/:id" , verifyToken, adminOnly , DeleteProduct)


 module.exports = router