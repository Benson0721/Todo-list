import { TodoList } from "../models/TodoList.js";
import { TodoItems } from "../models/TodoItems.js"



export const AllItems = async (req, res) => {
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
        const { task, listId, isComplated } = req.body
        const currentList = await TodoList.findById(listId).populate("todoItems")
        const newItem = new TodoItems({ task: task, isComplated: isComplated })
        newItem.todoList.push(listId)
        currentList.todoItems.push(newItem._id)
        await newItem.save()
        await currentList.save()
        res.send(newItem)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const DeleteItem = async (req, res) => {
    try {
        const itemId = req.query.id
        const listId = req.params.id
        await TodoList.findByIdAndUpdate(listId, { $pull: { todoItems: itemId } })//刪除存在於list的id
        const deleteItem = await TodoItems.findByIdAndDelete(itemId)
        res.send(deleteItem)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const UpdateItem = async (req, res) => {
    try {
        const { id, task } = req.body
        const updatedItem = await TodoItems.findByIdAndUpdate(id, { task: task })
        res.send(updatedItem)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const Toggler = async (req, res) => {
    try {
        const { id } = req.body
        const toggledItem = await TodoItems.findById(id)
        await TodoItems.findByIdAndUpdate(id, { isComplated: !toggledItem.isComplated })
        res.send(toggledItem)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}