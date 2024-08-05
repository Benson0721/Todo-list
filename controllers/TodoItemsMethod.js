import { TodoList } from "../models/TodoList.js";
import { TodoItems } from "../models/TodoItems.js"



export const ALLItems = async (req, res) => {
    try {
        const currentList = await TodoList.findById(req.params.id).populate("todoItems")
        res.send(currentList)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const AddItem = async (req, res) => {
    try {
        const { id } = req.params
        const { task } = req.body
        const newItem = new TodoItems({ task: task, isComplated: false })
        newItem.todolist.push(id)
        await newItem.save()
        res.send(newItem)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}