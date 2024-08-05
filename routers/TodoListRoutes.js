import express from "express"
import { AllTodos, AddList, UpdateList } from "../controllers/TodoListMethod.js"
import { AllItems, AddItem } from "../controllers/TodoListMethod.js"
const router = express.Router()


router.route("/")
    .get(AllTodos)
    .patch(UpdateList)
    .post(AddList)

router.route("/:id")
    .get((req, res) => {
        console.log(req)
        AllItems(req, res)
    })
    .post(AddItem)



export default router;





