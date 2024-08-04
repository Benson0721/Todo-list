import { TodoList } from "../models/TodoList";



export const AllTodos = async (req, res) => {
    const allTodos = await TodoList.find({})
    return allTodos
}

export const AddList = async (req, res) => {
    const { name, icon } = req.body
    const newList = new TodoList({ name: name, icon: icon })
    await newList.save()
    return console.log("Create list successfully!")
}

export const ShowList = async (req, res) => {
    const currentList = await TodoList.findById(req.params.id).populate("todoItems")
    return currentList
}

export const UpdateList = async (req, res) => {
    const { name } = req.body
    const updatedList = await TodoList.findByIdAndUpdate(req.params.id, { name: name })
    await updatedList.save()
    return console.log("Update list successfully!")
}
