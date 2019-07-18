const express = require("express");
const hbs = require ("hbs");
const fs = require("fs");

var app = express();
var port = process.env.PORT || 3000 ;

hbs.registerPartials(__dirname + "/views/partials")
hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});
hbs.registerHelper("screamIt",(text) => {
    return text.toUpperCase();
});
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
app.use("/main",(req,res,next) =>{
    res.render("maintainance.hbs");
})
app.use((req,res,next) =>{
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile("server.log",log + "\n",(err) => {
        console.log("Unable to write to a file");
    })

    next();
})


app.get("/",(req,res) => {
    //res.send("<h1>Hello Express</h1>");
    // res.send(
    //     {
    //         name:"surafel",
    //         likes:["nothing ","and nothing"]
    //     }
    // )
    res.render("home.hbs",{
        pageTitle:"Home Page",
        welcome:"Welcome To our Website",
    })
});

app.get("/about",(req,res) => {
    res.render("about.hbs",{
        pageTitle:"About Page",
    })
});

app.get("/bad",(req, res) => {
    res.send({
        errorMessage:"Unable to respond to that request"
    })
})

app.listen(port, () => {
    console.log("server running on port 3000")
} );