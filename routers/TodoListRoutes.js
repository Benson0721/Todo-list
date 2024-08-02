import express from "express"
import { AllTodos } from "../controllers/TodoListMethod"

const app = express()
const router = express.Router()


router.route("/")
    .get(AllTodos)







