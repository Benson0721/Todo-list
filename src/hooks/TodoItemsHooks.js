import axios from "axios"
import useSWR from "swr"


const fetcher = async ({ url }) => await axios.get(url).then((res) => {
    console.log(res.data)
    return res.data
})


export const TodoItemsHooks = (currentList) => {
    const url = `/api/${currentList}`
    const { data: ItemsData = [], mutate } = useSWR(() =>
        currentList && { url: url }, fetcher)

    return {
        ItemsData,
        async addItem(item) {
            const newItem = {
                task: item,
                isComplated: false,
                listId: currentList
            }
            return await mutate(
                await axios.post(url, {
                    task: item,
                    isComplated: false,
                    listId: currentList
                }),
                {
                    optimisticData: (currData) => {
                        return {
                            ...currData,
                            todoItems: [...currData.todoItems, newItem]
                        }
                    },
                    populateCache: false
                }
            )
            /*setListItems((currItems) => {
                return [...currItems, { id: uuid(), task: t, isComplated: false }]
            })*/
        },
        async updateItem(id, item) {
            const updatedItem = ItemsData.todoItems.find((item) => item._id === id)
            return await mutate(
                await axios.put(url, {
                    id: id,
                    task: item,
                }),
                {
                    optimisticData: (currData) => {
                        return {
                            ...currData,
                            todoItems: [
                                ...currData.todoItems.slice(0, currData.todoItems.findIndex((item) => item._id === id)),
                                { ...updatedItem, task: item },
                                ...currData.todoItems.slice(currData.todoItems.findIndex((item) => item._id === id) + 1)]
                        }
                    },
                    populateCache: false
                }
            )
        },
        async deleteItem(id) {
            return await mutate(
                await axios.delete(url, {//DELETE method不會有req.body可以做調用，通常會透過query來指定要刪除的資料
                    params: {
                        id: id
                    }
                }),
                {
                    optimisticData: (currData) => {
                        return {
                            ...currData,
                            todoItems: [...currData.todoItems.filter((item) => item._id !== id)]
                        }
                    },
                    populateCache: false
                }
            )
            /*setListItems((currItems) => {
                return [...currItems, { id: uuid(), task: t, isComplated: false }]
            })*/
        },
        async toggleItem(id) {
            const toggledItem = ItemsData.todoItems.find((item) => item._id === id)
            return await mutate(
                await axios.patch(url, {
                    id: id
                }),
                {
                    optimisticData: (currData) => {
                        return {
                            ...currData,
                            todoItems: [
                                ...currData.todoItems.slice(0, currData.todoItems.findIndex((item) => item._id === id)),
                                { ...toggledItem, isComplated: !toggledItem.isComplated },
                                ...currData.todoItems.slice(currData.todoItems.findIndex((item) => item._id === id) + 1)]
                        }
                    },
                    populateCache: false
                }
            )
        },

        /*async deleteItem(id) {
            /*setListItems((currItems) => {
                return currItems.filter((i) => (i.id !== id))
            })
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
        }*/
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








