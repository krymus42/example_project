const express = require('express');
const router = express.Router();
const parser = require('body-parser');
const fs = require('fs-extra');
const path =require('path');
const multer = require('multer');
const storage = multer.diskStorage({
destination: (req,file,cb)=>{
    cb(null,__dirname+'/uploads')
},
filename: (req,file,cb)=>{
    cb(null,file.originalname);
}
});
const upload = multer({storage:storage,
fileFilter: (req,file,cb)=>{
if (!file.mimetype.includes('image'))
cb(new Error("Wrong file"));
else
cb(null,true);
}});

router.use(parser.urlencoded({extended:true}));

router.post("/:category/image",upload.array('files'),(req,res)=>{
 req.files.forEach(file=>{
     console.log(file);
    fs.move(file.path,path.join(__dirname,"/categories",req.params.category,file.originalname),(err)=> console.log(err));
 });
});




module.exports = router;
