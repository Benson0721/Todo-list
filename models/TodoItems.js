import mongoose from "mongoose"

const { Schema } = mongoose


const TodoItemsSchema = new Schema({
    task: {
        type: String,
        require: true
    },
    isComplated: {
        type: Boolean,
        require: true,
        default: false
    },
    todoList: [
        {
            type: mongoose.Types.ObjectId,
            ref: "TodoList"
        }
    ]
})



export const TodoItems = mongoose.model("TodoItems", TodoItemsSchema)


