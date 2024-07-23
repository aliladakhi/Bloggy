const jwt = require('jsonwebtoken');
require("dotenv").config();
const jwtKey=process.env.JWT_KEY
function setToken(user){
  return jwt.sign({id:user._id,name:user.name,email:user.email,role:user.role},jwtKey,{ algorithm: 'HS256' })
}
function getUser(token){
  return jwt.verify(token,jwtKey,{ algorithm: 'HS256' })
}

module.exports={setToken,getUser}