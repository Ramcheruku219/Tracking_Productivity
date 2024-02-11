const express =require('express');
// const multer = require('multer');
const app =express();
 const routes =require("./src/routes/index")
app.use(express.json())
 const{sequelize} = require('./models');
 app.use(routes)

app.listen(5000,async()=>{

     await sequelize.authenticate()

    console.log("app listening on port 5000")
})

