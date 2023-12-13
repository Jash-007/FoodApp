const router=require('express').Router();
const createuser_controller=require('../Controller/createuser')
const express = require('express')
const {body,validationResult}=require('express-validator')
router.post("/signup",body('email','Incorrect email').isEmail(),body('name','Name must have 3 letter').isLength({min:3}),body('password','Incorrect Password').isLength({min:5 , max:15}),createuser_controller.register)
router.post("/login",createuser_controller.auth);
module.exports=router;