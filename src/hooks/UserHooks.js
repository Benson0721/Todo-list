import useSWR from "swr"
import axios from "axios"
import { getUserData } from "../../controllers/UserMethod"


const url = "/api"


/*const fetcher = async ({ url }) => await axios.get(url).then((res) => {
    return res.data
});*/



export const UserHooks = () => {
    const { mutate } = useSWR()

    return {
        async RegisterHook({ email, username, password }) {//先取得用來樂觀更新的資料，同時調用putter改變後台數據
            return await mutate(
                await axios.post(`${url}/register`, {
                    email, username, password
                }).then((res) => (data = res.data))
            )
        },


        async LoginHook({ username, password }) {
            return await mutate(
                await axios.post(`${url}/login`, {
                    username, password
                }),
            )
        },
        async LogoutHook() {
            return await mutate(
                await axios.get(`${url}/logout`),
            )
        }
    }
}