var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//LANDING PAGE
router.get("/", function(req, res){
   res.render("landing");
});

router.get("/selection", function(req, res){
   res.render("car-selection");
});

router.get("/insertKey", function(req, res){
   res.render("insertKey");
});

router.get("/info", function(req, res){
   res.render("keyInfo");
});

router.get("/service", function(req, res){
   res.render("service");
});

router.get("/payment", function(req, res){
   res.render("submitPayment");
});

router.get("/testDrive", function(req, res){
   res.render("testDrive");
});

router.get("/thankYou", function(req, res){
   res.render("thankYou");
});

router.get("/alarm", function(req, res){
   res.render("driveTimeAlarm");
});

//===================================
// AUTH ROUTES
//===================================

//NEW - show register form
router.get("/register", function(req, res){
   res.render("register");
});

//CREATE - handle sign ups
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Car Kiosk " + user.username);
            res.redirect("/");
        });
    });
});

//NEW - show login form
router.get("/login", function(req, res){
    res.render("login");
});

//CREATE - handling logins
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});

//LOGOUT route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/");
});

module.exports = router;
