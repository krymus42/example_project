const express = require('express');
const router = express.Router();
const fs = require('fs');
const path=  require('path');

router.get("/:category/:imageName",(req,res)=>{
fs.unlink(path.join(__dirname,'/public','/categories',req.params.category,req.params.imageName),(err)=>{
    if(err) console.log(err);
    else console.log(`${req.params.imageName} has been deleted`);
});
});

router.get("/category/:categoryName",(req,res)=>{
fs.rmdir(path.join(__dirname,'/public','/categories',req.params.categoryName),{recursive:true},(err)=>{
if (err) console.log(err);
});
});

module.exports = router;