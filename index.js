const express=require("express");
const app=express();
const  port=3000;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

app.use(express.urlencoded({extended:true}));
app.use(express.json()); // for parsing application/json

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
let posts=[
    {
        id:uuidv4(),
        username:"apna college",
        content:"I  Love Coding", 
    },
    {
        id:uuidv4(),
        username:"Chiranth D V",
        content:"Hard Work is important to becomr sucess",
    },
    {
        id:uuidv4(),
        username:"Rakshitha",
        content:"I got selected for my 1st intership!",
    },
]
//first step-index routing process
app.get("/posts",(req,res)=>{
    res.render("index.ejs" ,{posts});
});

//creating the new post
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
//pushing post to array
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});
// view the post (show routing process)
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
   console.log(id);
    let post=posts.find((p)=>id===p.id);
    console.log(post);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    console.log(newContent);
    post.content=newContent;
    console.log(post);
    res.send("patch request working");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})
app.listen(port,(req,res)=>{
    console.log("client sended  request listening by port ");
});
