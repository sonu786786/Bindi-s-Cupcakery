import express from 'express'
import { requestOtp, verifyOtp } from "../Controllers/AuthController.js";
import {
    registerController,
    loginController,
    testController,
    } 
from "../Controllers/AuthController.js"
import { isAdmin, requireSignIn } from '../Middlewares/AuthMiddleware.js'


//router object
const router=express.Router()

//routing
//REGISTER ||  METHOD POST
router.post("/register",registerController)

// LOGIN || METHOD POST
router.post("/login",loginController)

//test routes
router.get("/test",requireSignIn, isAdmin, testController)


router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);

export default router 