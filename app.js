const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const { checkAuth, redirect } = require("./middleware/auth");
const connectDB = require("./connection");
require("dotenv").config();
const userRouter = require("./Routes/user");
const blogRouter = require("./Routes/blog");
const homeRouter = require("./Routes/home");
const User = require("./Models/user");
const Blog = require("./Models/blog");
const Like = require("./Models/like");
const Comment = require("./Models/comment");

const serverPort = process.env.PORT || 3000;
const DBstring = process.env.MONGO_URL;
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuth);

app.get("/", redirect(["USER", "ADMIN"]), async (req, res) => {
  const { name, email, profile_imgUrl } = await User.findOne({
    _id: req.user.id,
  });
  res.render("User", { name, email, profile_imgUrl });
});
app.get("/admin/dashboard", redirect(["USER", "ADMIN"]), async (req, res) => {
  try {
    const users = await User.find({});
    const blogs = await Blog.find({});
    const likes = await Like.find({});
    const comments = await Comment.find({});

    // Manually fetch owner details for each blog
    const latestPosts = await Promise.all(blogs.slice(-5).map(async blog => {
      const owner = await User.findById(blog.owner);
      return {
        title: blog.title,
        author: owner ? owner.name : 'Unknown',
        date: blog.createdAt.toLocaleDateString()
      };
    }));

    // Prepare the userStats array
    const userStats = await Promise.all(users.map(async user => {
      const totalPosts = await Blog.countDocuments({ owner: user._id });
      const totalComments = await Comment.countDocuments({ owner: user._id });
      const totalLikes = await Like.countDocuments({ owner: user._id });
      return {
        userName: user.name,
        profilePicture: user.profile_imgUrl,
        totalPosts,
        totalComments,
        totalLikes
      };
    }));

    res.render("Dashboard", {
      name: req.user.name,
      totalUsers: users.length,
      totalPosts: blogs.length,
      totalComments: comments.length,
      totalLikes: likes.length,
      latestPosts,
      userStats
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error.message);
    res.status(500).send('Server error');
  }
});


app.use("/home", redirect(["USER", "ADMIN"]), homeRouter);
app.use("/blog", redirect(["USER", "ADMIN"]), blogRouter);
app.use("/user", userRouter);

connectDB(DBstring)
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.error("DB connection failed:", error.message);
  });

app.listen(serverPort, () => {
  console.log(`Server running on port ${serverPort}`);
});
