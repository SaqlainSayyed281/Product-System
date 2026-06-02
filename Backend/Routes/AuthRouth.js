const express =  require("express")
const router = express.Router()
const verifyToken = require("../Middleware/token")

const{
  Register , 
  Login ,
  Logout,
  Profile 
}=require("../controller/Auth")

router.post("/register" , Register)
router.post("/logout" , Logout )
router.post("/login" , Login)
router.get("/profile" , verifyToken , Profile)

module.exports = router