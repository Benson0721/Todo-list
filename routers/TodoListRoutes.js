import express from "express"
import { AllTodos, AddList, UpdateList, DeleteList } from "../controllers/TodoListMethod.js"
import { AllItems, AddItem, DeleteItem, UpdateItem, Toggler } from "../controllers/TodoItemsMethod.js"
const router = express.Router()


router.route("/")
    .get(AllTodos)
    .patch(UpdateList)
    .post(AddList)
    .delete(DeleteList)

router.route("/:id")
    .get((req, res) => {
        AllItems(req, res)
    })
    .post((req, res) => {
        AddItem(req, res)
    })
    .delete((req, res) => {

        DeleteItem(req, res)
    })
    .put((req, res) => {
        UpdateItem(req, res)
    })
    .patch((req, res) => {
        Toggler(req, res)
    })



export default router;





