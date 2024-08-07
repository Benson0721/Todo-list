import mongoose from "mongoose"

const { Schema } = mongoose


const TodoListSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    icon: {
        type: String,
        require: true
    },
    todoItems: [
        {
            type: mongoose.Types.ObjectId,
            ref: "TodoItems"
        }
    ],
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})



export const TodoList = mongoose.model("TodoList", TodoListSchema)

