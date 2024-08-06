import mongoose from 'mongoose'
import { TodoList } from "../models/TodoList.js"
import { TodoItems } from "../models/TodoItems.js"



mongoose.connect('mongodb://localhost:27017/TododoList');


const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



const example = {
    name: "I'm example",
    icon: "Checklist"
}
const example2 = {
    name: "GGWP",
    icon: "Task"
}
const exampleItem = {
    task: "I'm example",
    isComplated: false
}


const seeds = async () => {
    await TodoList.deleteMany({})
    await TodoItems.deleteMany({})
    const List1 = new TodoList(example)
    const List2 = new TodoList(example2)
    const Item1 = new TodoItems(exampleItem)
    List1.todoItems.push(Item1._id)
    Item1.todoList = List1._id
    await List1.save()
    await List2.save()
    await Item1.save()
}


seeds().then(() => {
    mongoose.connection.close();
})