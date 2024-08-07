import useSWR from "swr"
import axios from "axios"

export const UserHooks = () => {
    const { data, mutate } = useSWR()

    return {
        data,
        async RegisterHook({ email, username, password }) {//先取得用來樂觀更新的資料，同時調用putter改變後台數據
            return await mutate(
                await axios.post("/register", {
                    email, username, password
                }).then((res) => (data = res.data))
            )
        },


        async LoginHook({ username, password }) {
            return await mutate(
                await axios.post("/login", {
                    username, password
                }),
            )
        },
        async LogoutHook() {
            return await mutate(
                await axios.get("/logout"),
            )
        }
    }
}