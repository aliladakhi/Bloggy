const {getUser}=require("../Utilities/token")
function checkAuth(req,res,next){
  if(!req.cookies || !req.cookies.sessionId){
    req.user=null
  }
  else{
    const user=getUser(req.cookies.sessionId)
    req.user=user
  }

  next()
}

function redirect(roles){
  return function(req,res,next){
    if(!req.user) return res.redirect("/user/Signup")
    if(!roles.includes(req.user.role)) return res.end("Not a valid user,Only admin can access")
    return next()
  }
}

module.exports={checkAuth,redirect}