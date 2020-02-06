const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;
const fs = require('fs');
const hash = require('./scripts/hash');
const user = (require('./scripts/userSchema')).User;
const parser = require('body-parser');
const mongoose = require("mongoose");
const mail = require('nodemailer');
const deleteRouter = require("./delete");
const addRouter = require('./add');
const sess = require("express-session");
var session;
mongoose.connect(process.env.MONGO_DB,{useNewUrlParser:true,useUnifiedTopology:true});
app.use(parser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.static(path.join(__dirname,"/uploads")));
app.use(sess({secret:"ssshhhh"}));


app.get('/',(req,res)=>{
 session = req.session;
 res.sendFile(path.join(__dirname,"/public/html/index.html"));
});

app.get('/images',(req,res)=>{
let images = Array();
const files = fs.readdirSync("./uploads","utf-8");
const returnValue = Array();
files.forEach((entry)=>{
returnValue.push({"name":entry});
});
res.send(returnValue);
});

app.get('/categories',(req,res)=>{
   fs.readFile(path.join(__dirname,"/public/categories/categories.txt"),"utf-8",(err,data)=>{
    if (err) {
        console.log(err);
        res.statusMessage="Error, try again later";
        res.status(500).end();
    }
    else{
        console.log();
res.set("Content-Type","text/json");
res.send({"text":data});
    }

   });
   
    });

    app.post("/login",(req,res)=>{ 
     const passwd = hash.createHash(req.body.password);
     console.log(passwd);
     const one = user.findOne({
         "login":req.body.login,
         "password":passwd,
        },(err,obj)=>{
            if (err) {res.statusMessage="No such user"; res.status(500).end();}
            else {
                session = session != null ? session : req.session;
                session.logged = true;
                res.redirect("/adminPanel");
            }
        });
    });


    app.get("/adminPanel",(req,res)=>{
        res.sendFile(path.join(__dirname,"/public/html/adminPanel.html"));
    });

    app.post("/mail",(req,res)=> {// to co wyżej
        const transporter = mail.createTransport({
            service: process.env.SERVICE,
            auth: {
                user:process.env.SENDER_MAIL,
                pass:process.env.SENDER_PASS
            }
        });
        
        const mailOptions = {
            from: req.body.email,
            to: process.env.TARGET_MAIL,
            subject: req.body.imie,
            text:`Kontakt ${req.body.email} \n ${req.body.message}`
        };
        
        transporter.sendMail(mailOptions,(err,info)=>{
            if(err) console.log(err);
            else console.log(info);
        });
        res.sendFile(path.join(__dirname,"/public/html/index.html"));
    });

    
app.use('/delete',deleteRouter);
app.use('/add',addRouter);
app.listen(port,()=>console.log(`listening on port ${port}`));