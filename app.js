import env from "dotenv"
if (process.env.NODE_ENV !== "production") {
    env.config()
}
import mongoose from 'mongoose'
import express from "express"
import TodoListRoutes from "./routers/TodoListRoutes.js"
import UserRoutes from "./routers/UserRoutes.js"
import { User } from "./models/User.js"
import passport from "passport"
import session from 'express-session'
import LocalStrategy from "passport-local"


const connectToDB = async () => {
    try {
        mongoose.connect(process.env.DBURL, {
            autoIndex: true
        })
        console.log('Connected to Mongodb Atlas');
    } catch (error) {
        console.error(error);
    }
}
connectToDB()

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const app = express()
const sessionConfig = {
    name: 'session',
    secret: "thisismysecert",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}






app.use(express.json())//需要用來解析res.body
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig))//開啟session儲存登入狀態


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use('/', UserRoutes)
app.use('/', TodoListRoutes)






const port = 5000



app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})