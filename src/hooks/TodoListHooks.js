
//import { ListAPIs, fetcher, putter } from "../utils"
import useSWR from "swr"
import axios from "axios"

const url = "/api"//實際上axios.get的部分是http://localhost:5173/api => http://localhost:5000/

const fetcher = async ({ url }) => await axios.get(url).then((res) => {
    return res.data
});

export const TodoListHooks = () => {
    const { data: ListData = [], mutate } = useSWR({ url: url }, fetcher)

    return {
        ListData,//包含name,icon
        async addList({ name, icon }) {//先取得用來樂觀更新的資料，同時調用putter改變後台數據
            const newList = {
                name: name || "new List",
                icon: icon || "Todo-list",
            }
            return await mutate(
                await axios.post(url, {
                    name: name || "new List",
                    icon: icon || "Todo-list",
                }),
                {
                    optimisticData: (currData) => {
                        return [...currData, newList]
                    },
                    populateCache: false
                }
            )
            /*setListItems((currItems) => {
                return [...currItems, { id: uuid(), task: t, isComplated: false }]
            })*/
        },

        /* async deleteList(id) {
             /*setListItems((currItems) => {
                 return currItems.filter((i) => (i.id !== id))
             })
             return await mutate(
                 await putter({ urls: ListAPIs.deleteTodoList, id: id }),
                 {
                     optimisticData: (currData) => {
                         return currData.filter((d) => d.id !== id)
                     },
                     populateCache: false
                 }
             )
 
 
 
 
         },*/

        async deleteList(id) {
            return await mutate(
                await axios.delete(url, {
                    params: {
                        id: id
                    }
                }),
                {
                    optimisticData: (currData) => {
                        return [...currData.filter((list) => list._id !== id)]
                    },
                    populateCache: false
                }
            )
        },
        async updateList(id, updateName) {
            const updateList = ListData.find((List) => List._id === id)
            return await mutate(
                await axios.patch(url, { name: updateName, id: id }),
                {
                    optimisticData: (currData) => {
                        return currData.map((List) => {
                            if (List._id === id) {
                                return { ...updateList, name: updateName }
                            } else {
                                return List
                            }
                        })
                    },
                    populateCache: false
                }
            )
            export const apiHandler = (req, res) => {
                const userData = req.query.user ? JSON.parse(decodeURIComponent(req.query.user)) : null;
            
                if (userData) {
                    return res.json(userData); // 返回用戶資料
                } else {
                    return res.status(400).json({ message: 'No user data provided' });
                }
            }T


            /*setListItems((currItems) => {
                return currItems.map((i) => { //注意，map是對array中特定元素修正，並回傳修正過後的新陣列，記得要回傳給setState
                    if (i.id === id) {
                        return { ...i, isComplated: !i.isComplated }
                    }
                    else {
                        return i
                    }
                })
            })*/
        }

    }
}


/*export const TodoListHooks = () => {
    const { data: ListData = [], mutate } = useSWR({ urls: ListAPIs.getTodoList }, fetcher)

    return {
        ListData,
        async addList(name, icon) {//先取得用來樂觀更新的資料，同時調用putter改變後台數據
            console.log(ListData)
            const newList = {
                name: name || "new List",
                icon: icon || "Todo-list",
            }
            return await mutate(
                await putter({
                    urls: ListAPIs.addTodoList,
                    name: name || "new List",
                    icon: icon || "Todo-list"
                }),
                {
                    optimisticData: (currData) => {
                        return [...currData, newList]
                    },
                    populateCache: false
                }
            )
            /*setListItems((currItems) => {
                return [...currItems, { id: uuid(), task: t, isComplated: false }]
            })
            },



            async deleteList(id) {
                /*setListItems((currItems) => {
                    return currItems.filter((i) => (i.id !== id))
                })
                return await mutate(
                    await putter({ urls: ListAPIs.deleteTodoList, id: id }),
                    {
                        optimisticData: (currData) => {
                            return currData.filter((d) => d.id !== id)
                        },
                        populateCache: false
                    }
                )
    
    
    
    
            },
            async updateList(id, updateName) {
                const updateList = ListData.find((List) => List.id === id)
                return await mutate(
                    await putter({
                        urls: ListAPIs.updateTodoList,
                        id: id,
                        name: updateName
                    }),
                    {
                        optimisticData: (currData) => {
                            return currData.map((List) => {
                                if (List.id === id) {
                                    return { ...updateList, name: updateName }
                                } else {
                                    return List
                                }
                            })
                        },
                        populateCache: false
                    }
                )
    
    
    
             
            }
    
        }
    }*/