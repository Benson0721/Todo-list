import mongoose from 'mongoose'
import { TodoList } from "../models/TodoList.js"
import { TodoItems } from "../models/TodoItems.js"
import { User } from "../models/User.js"



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
const exampleUser1 = {
    email: "Mpass@gmail.com",
    username: "Mpass",
}
const exampleUser2 = {
    email: "Benson@gmail.com",
    username: "Benson",
}

const seeds = async () => {
    await TodoList.deleteMany({})
    await TodoItems.deleteMany({})
    await User.deleteMany({})
    const List1 = new TodoList(example)
    const List2 = new TodoList(example2)
    const Item1 = new TodoItems(exampleItem)
    const user1 = new User(exampleUser1)
    const user2 = new User(exampleUser2)
    const registeredUser1 = await User.register(user1, "Mpass1234")
    const registeredUser2 = await User.register(user2, "Benson1234")
    List1.todoItems.push(Item1._id)
    Item1.todoList = List1._id
    List1.user = registeredUser1._id
    List2.user = registeredUser2._id
    await List1.save()
    await List2.save()
    await Item1.save()
}


seeds().then(() => {
    mongoose.connection.close();
})