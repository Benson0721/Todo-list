import { Icon } from "@mui/material"
import { ListAPIs, fetcher, putter } from "../utils"

import useSWR from "swr"




export const TodoListHooks = () => {
    const { data: ListData = [], mutate } = useSWR({ urls: ListAPIs.getTodoList }, fetcher)

    return {
        ListData,
        async addList(name, icon) {
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
            })*/
        },



        async deleteList(id) {
            /*setListItems((currItems) => {
                return currItems.filter((i) => (i.id !== id))
            })*/
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
