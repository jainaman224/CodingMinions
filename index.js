var express     = require("express"),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    app         = express();
    


mongoose.connect("mongodb://localhost/hacktivate");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//database model
var noteSchema = new mongoose.Schema({
    semester: Number,
    stream: String,
    subject: String,
    college: String,
    notes_file: String
});

var Notes = mongoose.model("Notes",noteSchema);

//sample entry

// Notes.create({
//     semester: 3,
//     stream: "CSE",
//     subject: "DS",
//     college: "BVP",
//     notes_file: "kkgghdgf.pdf"
// }, function(err,post){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(post);
//     }
// });


//RESTful routes
app.get("/", function(req,res){
    res.redirect("/search");
});


//the search page
app.get("/search", function(req,res){
    res.render("home");
});

//show results using form entries
app.post("/search", function(req, res){
    Notes.find({stream: req.body.str, semester: req.body.sem}, function(err, data){
        if(err){
            console.log(err);
        } else{
            res.render("results", {data: data});
        }
    });
});



//start the server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("I am on bithces...");
});