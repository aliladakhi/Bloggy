const {Router}=require("express")
const Blog=require("../Models/blog")
const User=require("../Models/user")
const homeRouter=Router()

homeRouter.route("")
.get(async(req,res)=>{
  const user=req.user
  console.log(user);
  const blogs=await Blog.find({owner:user.id})
  console.log(blogs);
  res.render("Home",{blogs,name:req.user.name})
})
homeRouter.route("/explore")
.get(async (req, res) => {
  try {
    const user = req.user;
    const blogs = await Blog.find({})
    
    const exploreblogs = blogs.filter(blog => {

      return !blog._id.equals(user._id);
    });

    console.log(exploreblogs);
    res.render("Home", { blogs: exploreblogs, name: user.name});
  } catch (error) {
    console.error("Error fetching explore blogs:", error.message);
    res.status(500).send("Server error");
  }
});



module.exports=homeRouter