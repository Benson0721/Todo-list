import express from "express"
import { AllTodos, AddList, UpdateList, ShowList } from "../controllers/TodoListMethod"
const router = express.Router()


router.route("/")
    .get(AllTodos)
    .patch(UpdateList)
    .post(AddList)

router.route("/id")
    .get(ShowList)







