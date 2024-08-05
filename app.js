import mongoose from 'mongoose'
import express from "express"
import methodOverride from "method-override"
import TodoListRoutes from "./routers/TodoListRoutes.js"


mongoose.connect('mongodb://localhost:27017/TododoList');




const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const app = express()

app.use(express.json())//需要用來解析res.body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/', TodoListRoutes)





const port = 5000



app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})