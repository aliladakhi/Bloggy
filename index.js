const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const app = express();
const {checkAuth,redirect}=require("./middleware/auth")
const connectDB = require("./connection");
require("dotenv").config();
const userRouter = require("./Routes/user");
const blogRouter = require("./Routes/blog");
const homeRouter = require("./Routes/home");
const User=require("./Models/user")

const serverPort = process.env.PORT || 3000;
const DBstring = process.env.DB_STRING;
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuth)

app.get("/",redirect(["USER","ADMIN"]),async (req,res)=>{
  const {name,email,profile_imgUrl}=await User.findOne({_id:req.user.id})
  console.log(profile_imgUrl);
  res.render("User",{name,email,profile_imgUrl})
})
app.get("/dashboard",redirect(["ADMIN"]), (req,res)=>{
  res.render("Dashboard")
})
app.use("/home",redirect(["USER","ADMIN"]),homeRouter)
app.use("/blog",redirect(["USER"]),blogRouter)
app.use("/user", userRouter);

connectDB(DBstring).then(() => {
  console.log("DB connected");
}).catch((error) => {
  console.error("DB connection failed:", error.message);
});

app.listen(serverPort, () => {
  console.log(`Server running on port ${serverPort}`);
});
