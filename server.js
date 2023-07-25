const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./config/db");


// when deploy
const path = require('path')

// 5. dot config
// dotenv.config({path: './config/'})
dotenv.config();

// 6. after dot config
connectDB();
// 1. rest object, basicaly we are calling express here and store its function in app
const app = express();

//6. middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// 2. routes
// 1st test route
// app.get('/',(req,res)=>{
//     res.status(200).json({
//         message: "Welcome to the Blood bank service provider",
//     })
// }
// )
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

// when deploy
//static folder
app.use(express.static(path.join(__dirname,'./client/build')))
// static routes
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname, './client/build/index.html'));
})

// 3. port

// const PORT =8080;
const PORT = process.env.PORT || 8080;

// 4. listen  in which we will run our application
app.listen(PORT, () => {
  // console.log(" node server is running");
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`
      .bgBlue.white
  );
});
