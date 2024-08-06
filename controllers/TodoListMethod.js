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
        const { name, icon } = req.body
        const newList = new TodoList({ name: name, icon: icon })
        await newList.save()
        res.send(newList)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

}


export const UpdateList = async (req, res) => {
    try {
        const { id, name } = req.body
        const updatedList = await TodoList.findByIdAndUpdate(id, { name: name })
        res.send(updatedList)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const DeleteList = async (req, res) => {
    try {
        const { id } = req.params
        const deletedList = await TodoList.findByIdAndDelete(id)
        res.send(deletedList)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
