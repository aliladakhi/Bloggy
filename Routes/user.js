const { Router } = require("express");
const User = require("../Models/user");
const { redirect } = require("../middleware/auth");
const { createHmac } = require("crypto");
const { setToken } = require("../Utilities/token");


const userRouter = Router();


const multer  = require('multer')
const path=require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/images'))
  },
  filename: function (req, file, cb) {
    const fileName = `${req.body.email}`+file.originalname
    cb(null, fileName)
  }
})

const upload = multer({ storage: storage })



userRouter.route("/Signin")
  .get((req, res) => {
    const name = req.user ? req.user.name : "USER";
    console.log(name);
    res.render("Signin", {name});
  })
  .post(async (req, res) => {
    try {
      console.log(req);
      const { email, password } = req.body;
      console.log(email);
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return res.render("Signin",{name:"NOT USER"});
      }
      const salt = user.salt;
      const hashPassword = createHmac('sha256', salt).update(password).digest("hex");
      if (hashPassword !== user.password) {
        return res.render("Signin",{name:"NOT PASS"});
      }
      const token = setToken(user);
      res.cookie("sessionId", token).redirect("/home");
    } catch (error) {
      console.error("Signin error:", error.message);
      res.status(500).send("Server error");
    }
  });

userRouter.route("/Signup")
  .get((req, res) => {
    const name = req.user ? req.user.name : "USER";
    res.render("Signup", { name });
  })
  .post(upload.single('pic'), async (req, res) => {
    try {
        const profile_imgUrl=`/images/${req.file.filename}`
      const { name, email, password } = req.body;
      const user = await User.create({ name, email, profile_imgUrl,password });
      const token = setToken(user);
      res.cookie("sessionId", token).redirect("/home");
    } catch (error) {
      console.error("Signup error:", error.message);
      res.status(500).send("Server error");
    }
  });

userRouter.route('/logout')
  .get(redirect(['USER']), (req, res) => {
    res.clearCookie('sessionId');
    res.redirect('/user/Signin');
  });

module.exports = userRouter;
