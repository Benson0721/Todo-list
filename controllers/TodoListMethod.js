import { TodoList } from "../models/TodoList";



export const AllTodos = async (req, res) => {
    const allTodos = TodoList.find({}).populate("todoItems")
    return allTodos
}