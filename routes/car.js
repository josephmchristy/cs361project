var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//LANDING PAGE
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

module.exports = router;
