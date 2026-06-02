require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectMongo = require("./config/mongo")

const AuthRoute = require("./Routes/AuthRouth")
const ProductRoute = require("./Routes/ProductRoute")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);



app.use("/api",AuthRoute)
app.use("/api" , ProductRoute)




const PORT = process.env.PORT||5000

const startServer = async () => {
  try {
    await connectMongo();    
  

    app.listen(PORT, () => {
      console.log(`🚀 Service running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server startup failed:", err.message);
    process.exit(1);
  }
};

startServer();