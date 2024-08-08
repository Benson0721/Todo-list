import express from "express"
import { getUserData, register, login, logout } from "../controllers/UserMethod.js"
const router = express.Router()
const passport = require('passport');



/*router.get('/user', getUserData);*/

router.post("/register", register)
router.post("/login", passport.authenticate('local'), login)
router.get("/logout", logout)