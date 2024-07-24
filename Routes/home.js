const {Router}=require("express")
const Blog=require("../Models/blog")
const User=require("../Models/user")
const homeRouter=Router()

homeRouter.route("")
.get(async(req,res)=>{
  const user=req.user

  const blogs=await Blog.find({owner:user.id})

  res.render("Home",{blogs,name:req.user.name})
})
homeRouter.route("/explore")
.get(async (req, res) => {
  try {
    const user = req.user;
    const blogs = await Blog.find({});

    const exploreblogs = blogs.filter(blog => {
      return !blog._id.equals(user.id);
    });

    let blogsWithUserName = [];
    for (let i = 0; i < exploreblogs.length; i++) {
      const blogOwner = await User.findOne({ _id: exploreblogs[i].owner });
      if (blogOwner) {
        const { name, profile_imgUrl } = blogOwner;
        blogsWithUserName[i] = { ...exploreblogs[i]._doc, name, profile_imgUrl };
      } else {
        console.warn(`User with id ${exploreblogs[i].owner} not found`);
        blogsWithUserName[i] = { ...exploreblogs[i]._doc, name: 'Unknown', profile_imgUrl: '' };
      }
    }

    res.render("Home", { blogs: blogsWithUserName, name: user.name });
  } catch (error) {
    console.error("Error fetching explore blogs:", error.message);
    res.status(500).send("Server error");
  }
});



module.exports=homeRouter