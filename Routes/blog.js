const { Router } = require("express");
const Blog = require("../Models/blog");
const User = require("../Models/user");
const Comment = require("../Models/comment");
const Like = require("../Models/like");
const blogRouter = Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    const fileName = `${req.user.id}` + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

blogRouter
  .route("")
  .get((req, res) => {
    return res.render("CreateBlog", { name: req.user.name });
  })
  .post(upload.single("profilepic"), async (req, res) => {
    const coverUrl = `/uploads/${req.file.filename}`;
    const { title, blogContent } = req.body;
    const blog = await Blog.create({
      title,
      coverUrl,
      blogContent,
      owner: req.user.id,
    });
    return res.status(200).redirect("/home");
  });

blogRouter.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  const { title, blogContent,owner,coverUrl } = await Blog.findOne({ _id: id });
  const user = await User.findOne({ _id: owner });
  
  if (user) {
    var {name,profile_imgUrl}=user
  }

  const likes = await Like.find({ LikedTo: id }).select("LikedBy -_id");
  const LikedByIds = likes.map((like) => {
    return like.LikedBy;
  });
  const LikeUsers = await User.find({ _id: { $in: LikedByIds } });
  const comments = await Comment.find({ commentTo: id });
  const commentByIds = comments.map((comment) => comment.commentBy);
  const commentUsers = await User.find({ _id: { $in: commentByIds } });

  let commentss = [];

  const userMap = new Map();
  commentUsers.forEach((user) => {
    userMap.set(user._id.toString(), user.name);
  });

  commentss = comments.map((comment) => ({
    name: userMap.get(comment.commentBy.toString()),
    comment: comment.comment,
  }));
  res.render("POST", {
    name: req.user.name,
    title,
    blogContent,
    coverUrl,
    LikeUsers,
    commentss,
    name,
    profile_imgUrl
  });
});

blogRouter.route("/like/:id").post(async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).send("Blog post not found");
    }
    const like = await Like.create({ LikedBy: req.user.id, LikedTo: blogId });
    blog.numberOfLikes++;
    await blog.save();

    return res.redirect(`/home`);
  } catch (error) {
    console.error("Error adding Like:", error.message);
    return res.status(500).send("Server error");
  }
});

blogRouter.route("/share/:id").post(async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).send("Blog post not found");
    }
    blog.numberOfShares++;
    await blog.save();

    return res.redirect(`/home`);
  } catch (error) {
    console.error("Error adding Like:", error.message);
    return res.status(500).send("Server error");
  }
});

blogRouter.route("/comment/:id").post(async (req, res) => {
  try {
    const blogId = req.params.id;
    const commentText = req.body.comment;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).send("Blog post not found");
    }

    const comment = await Comment.create({
      commentBy: req.user.id,
      commentTo: blogId,
      comment: commentText,
    });

    blog.numberOfComments++;
    await blog.save();

    return res.redirect(`/home`);
  } catch (error) {
    console.error("Error adding comment:", error.message);
    return res.status(500).send("Server error");
  }
});

module.exports = blogRouter;
