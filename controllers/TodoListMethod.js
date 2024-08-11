import { TodoList } from "../models/TodoList.js";



export const AllTodos = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const todos = await TodoList.find({ user: req.user._id });
            res.json(todos)
        }
        else {
            res.json([])
        }
        /*const todos = await TodoList.find({}).populate("user");
        res.send(todos)*/
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const AddList = async (req, res) => {
    try {
        const { name, icon } = req.body
        const newList = new TodoList({ name: name, icon: icon })
        newList.user = req.user
        await newList.save()
        res.json(newList)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

}


export const UpdateList = async (req, res) => {
    try {
        const { id, name } = req.body
        const updatedList = await TodoList.findByIdAndUpdate(id, { name: name })
        res.json(updatedList)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const DeleteList = async (req, res) => {
    try {
        const { id } = req.query
        const deletedList = await TodoList.findByIdAndDelete(id)
        res.json(deletedList)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
