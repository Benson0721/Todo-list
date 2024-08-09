
import { User } from "../models/User.js"
import { TodoList } from "../models/TodoList.js"
import { TodoItems } from "../models/TodoItems.js"

const example = {
    name: "I'm example",
    icon: "Checklist"
}
const exampleItem = {
    task: "I'm example",
    isComplated: false
}



export const getUserData = async (req, res) => {
    if (req.isAuthenticated()) {
        // 如果用戶已經登入，返回用戶資訊
        return res.json(req.user);
    } else {
        // 如果用戶未登入，返回 401 狀態碼
        return res.status(401).json({ message: 'User not authenticated' });
    }
}

export const register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        const exampleL = new TodoList(example)
        const exampleI = new TodoItems(exampleItem)
        exampleL.todoItems.push(exampleI._id)
        exampleI.todoList = exampleL._id
        exampleL.user = registeredUser._id
        await exampleL.save()
        await exampleI.save()
        req.login(registeredUser, err => {
            if (err) return next(err)
            res.json(req.user)
        })
        

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = (req, res) => {
    res.send(req.user)
}

export const logout = (req, res) => {
    req.user = null
    req.logout(function (err) {
        if (err) { return next(err); }
        res.send("logout");
    })

}