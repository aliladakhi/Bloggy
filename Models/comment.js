const mongoose=require("mongoose")


const commentSchema=new mongoose.Schema({
  commentBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  commentTo:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Blog"
  },
  comment:{
    type:String,
    require:true
  }
},{
  timestamps:true
})


const Comment=mongoose.model("comment",commentSchema)

module.exports=Comment