const express = require('express')
const router =express.Router()
const user = require("./user")

const createlogin = require("../../src/routes/login/index")
const authenticate =require("../../src/routes/index")

router.get('/',(req,res)=>{
    return res.setDefaultEncoding("you are in router")
})

router.use ('/user',user);

// // login 
//  router.use ('/login',login);
router.use ('/authenticate', authenticate);

router.post('/login',createlogin.login)



module.exports=router