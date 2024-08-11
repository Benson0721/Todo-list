//IndexDB

/*import Dexie from "dexie"

const db = new Dexie("todo-list")

db.version(3).stores({
    listItems: "++id, task, isComplated, listId",
    lists: "++id,name,icon"
})


export const ItemAPIs = {
    getTodo: "getTodo",
    addTodo: "addTodo",
    deleteTodo: "deleteTodo",
    updateTodo: "updateTodo"
}

export const ListAPIs = {
    getTodoList: "getTodoList",
    addTodoList: "addTodoList",
    deleteTodoList: "deleteTodoList",
    updateTodoList: "updateTodoList"
}





export async function fetcher({ urls, ...variables }) {
    switch (urls) {
        case ListAPIs.getTodoList:
            return db.lists.toArray()
        case ItemAPIs.getTodo:
            return {
                ...(await db.lists.get(variables.id)),
                items: (await db.listItems.where({ listId: variables.id }).toArray()) ?? []
            }
        default: throw new Error(`This url:${urls} is wrong, fetcher error!`)
    }
}


export async function putter({ urls, id, ...variables }) {
    switch (urls) {
        case ItemAPIs.addTodo:
            return db.listItems.add({ task: variables.task, isComplated: false, listId: variables.listId })
        case ItemAPIs.updateTodo:
            return db.listItems.update(id, variables)
        case ItemAPIs.deleteTodo:
            return db.listItems.delete(id)
        case ListAPIs.addTodoList:
            return db.lists.add({ name: variables.name, icon: variables.icon })
        case ListAPIs.updateTodoList:
            return db.lists.update(id, variables)
        case ListAPIs.deleteTodoList:
            return db.lists.delete(id)
        default:
            throw new Error(`This url:${urls} is wrong, putter error!`)
    }
}*/
