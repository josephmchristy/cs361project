var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash       = require("connect-flash"),
    User        = require("./models/user");

var	indexRoutes = require("./routes/index");


var url = process.env.DATABASEURL || 'mongodb+srv://car_key:car_key@cluster0-scb5m.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(url, {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")),
app.use(methodOverride("_method")),
app.use(flash());

//Passport Configuration
app.use(require("express-session")({
    secret: "I like turtles",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("YelpCamp Server has started!");
});
