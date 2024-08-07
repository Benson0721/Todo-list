import { User } from "../models/User"



export const getUserData = async (req, res) => {
    if (req.isAuthenticated()) {
        // 如果用戶已經登入，返回用戶資訊
        return res.redirect(`/api?user=${encodeURIComponent(JSON.stringify(req.user))}`);
    } else {
        // 如果用戶未登入，返回 401 狀態碼
        return res.status(401).json({ message: 'User not authenticated' });
    }
}

export const register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        const user = await User.create({ email, username })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if (err) return next(err)
        })
        return res.redirect('/user')

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = (req, res) => {
    res.redirect("/user")
}

export const logout = (req, res) => {
    req.logout()
    res.redirect("/api")
}