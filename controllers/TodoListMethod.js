import { TodoList } from "../models/TodoList.js";
import { TodoItems } from "../models/TodoItems.js"


export const AllTodos = async (req, res) => {
    try {
        const todos = await TodoList.find({});
        res.send(todos)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const AddList = async (req, res) => {
    try {
        console.log(req)
        const { name, icon } = req.body
        const newList = new TodoList({ name: name, icon: icon })
        await newList.save()
        res.send(newList)
    }
    catch (e) {
        throw new Error(`Add Error:${e}`)
    }

}

export const UpdateList = async (req, res) => {
    const { name } = req.body
    const updatedList = await TodoList.findByIdAndUpdate(req.params.id, { name: name })
    await updatedList.save()
    return console.log("Update list successfully!")
}
