const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
let methodOverride = require('method-override')
// client side form submission we use 
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
let posts = [
    {
        id: uuidv4() ,
        username: 'arsalan', 
        content: 'working for web technology',
    }, 
    {
        id: uuidv4(),
        username: 'ali',
        content: 'working for web 3 technology',
    },
    {
        id: uuidv4() ,
        username: 'sami',
        content: 'working for medical field',
    }
]
app.get("/", (req, res) =>{
    res.send('this is  home page');
    
});
app.get("/posts", (req, res)=>{
    res.render('index.ejs', {posts});
});
app.get("/posts/new",(req, res) =>{
    res.render("form.ejs");
});
app.post("/posts", (req, res) =>{
    let id = uuidv4();
    let {username, content} = req.body;
    posts.push({id, username, content});
    console.log(req.body);
    res.redirect('/posts');
});
app.get("/posts/:id", (req, res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    // console.log(post)
    res.render("show.ejs", {post});
});
app.patch("/posts/:id", (req, res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) =>id === p.id);
    post.content = newContent;
    

    res.redirect("/posts")
});
app.get("/posts/:id/edit", (req, res) =>{
    let {id} = req.params;
    let post = posts.find((p) =>id === p.id);
    res.render("edit.ejs", {post})

});
app.delete("/posts/:id", (req, res) =>{
    let {id} = req.params;
     posts = posts.filter((p) =>id !== p.id);
    res.redirect("/posts");
})
app.listen(port, ()=>{
    console.log(`app is listening or port ${port}`);
})