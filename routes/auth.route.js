
import {Router} from "express";
import * as authControllers from "../controllers/auth.controller.js";
const router=Router();
router.get('/', (req, res) => {
    res.redirect('/login')
})
router.get("/signup",authControllers.getSignupPage);
//
router.post("/signup",authControllers.postSignupPage);
router.get("/login",authControllers.getLoginPage);
router.post("/login",authControllers.postLoginPage);


export const authRoutes=router;

