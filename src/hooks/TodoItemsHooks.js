import { ItemAPIs, fetcher, putter } from "../utils"
import useSWR from "swr"


export const TodoItemsHooks = (currentList) => {

    const { data = [], mutate } = useSWR(() =>
        currentList && { urls: ItemAPIs.getTodo, id: currentList }, fetcher)

    return {
        data,
        async addItem(item) {
            const newItem = {
                task: item,
                isComplated: false,
                listId: currentList
            }
            return await mutate(
                await putter({
                    urls: ItemAPIs.addTodo,
                    task: item,
                    isComplated: false,
                    listId: currentList
                }),
                {
                    optimisticData: (currData) => {
                        return {
                            ...currData,
                            items: [...currData.items, newItem]
                        }
                    },
                    populateCache: false
                }
            )
            /*setListItems((currItems) => {
                return [...currItems, { id: uuid(), task: t, isComplated: false }]
            })*/
        },
        async deleteItem(id) {
            /*setListItems((currItems) => {
                return currItems.filter((i) => (i.id !== id))
            })*/
            return await mutate(
                await putter({ urls: ItemAPIs.deleteTodo, id: id }),
                {
                    optimisticData: (currData) => {
                        return {
                            ...currData,
                            items: [...currData.items.filter((i) => i.id !== id)]
                        }
                    },
                    populateCache: false
                }
            )
        },
        async handleToggle(id) {
            const updateItem = data.items.find((item) => item.id === id)
            return await mutate(
                await putter({
                    urls: ItemAPIs.updateTodo,
                    id: id,
                    isComplated: !data.items.find((item) => item.id === id).isComplated
                }),
                {
                    optimisticData: (currData) => {
                        return {
                            ...currData,
                            items: [
                                ...currData.items.slice(//使用spread是為了要讓其內容直接解析並放置在array中
                                    0,
                                    currData.items.findIndex((item) => item.id === id)
                                ),
                                {
                                    ...updateItem, isComplated: !updateItem.isComplated
                                },
                                ...currData.items.slice(
                                    currData.items.findIndex((item) => item.id === id) + 1
                                )]

                        }
                    },
                    populateCache: false
                })
        },
        async updateItem(id, updateTask) {
            const updateItem = data.items.find((item) => item.id === id)
            return await mutate(
                await putter({
                    urls: ItemAPIs.updateTodo,
                    id: id,
                    task: updateTask,
                }),
                {
                    optimisticData: (currData) => {
                        return {
                            ...currData,
                            items: [
                                ...currData.items.slice(//使用spread是為了要讓其內容直接解析並放置在array中
                                    0,
                                    currData.items.findIndex((item) => item.id === id)
                                ),
                                {
                                    ...updateItem, task: updateTask
                                },
                                ...currData.items.slice(
                                    currData.items.findIndex((item) => item.id === id) + 1
                                )]

                        }
                    },
                    populateCache: false
                }
            )
        }
    }
}




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








