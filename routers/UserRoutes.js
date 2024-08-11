import express from "express"
import { getUserData, register, login, logout } from "../controllers/UserMethod.js"
const router = express.Router()
import passport from "passport"



router.get('/user', getUserData);

router.post("/register", (req, res) => {
    //console.log(req)
    register(req, res)
})
router.post("/login", passport.authenticate('local'),
    (req, res) => {
        //console.log(req)
        login(req, res)
    })
router.get("/logout",
    (req, res) => {
       //console.log(req)
        logout(req, res)
    })

export default router