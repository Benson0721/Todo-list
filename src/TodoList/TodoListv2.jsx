import { useAppState } from "../../provider/AppState"
import { TodoItemsHooks } from "../hooks/TodoItemsHooks";
import { TodoListHooks } from "../hooks/TodoListHooks"
import { styled, useTheme } from '@mui/material/styles';
import { usePopupState } from "material-ui-popup-state/hooks"
import { useState, useEffect } from "react";

import AppBar from "./AppBar";
import AddItem from "./AddItem";
import TodoListItem from "./TodoListItem";
import ListDrawer from "./ListDrawer";

import * as Icons from '@mui/icons-material';
import {
    Box,
    CssBaseline,
    Divider,
    Typography,
    List,
    TextField
} from "@mui/material"




const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export default function TodoListv2() {//functional component不能使用async
    const { currentList } = useAppState()
    const theme = useTheme();
    const { data, addItem, deleteItem, handleToggle, updateItem } = TodoItemsHooks(currentList)
    const { ListData, updateList } = TodoListHooks()
    const drawerState = usePopupState({ variant: 'menu', popupId: 'drawer-control' })
    const [originalListName, setOriginalListName] = useState("")
    const [items, setItems] = useState([])


    useEffect(() => {
        if (data?.name) {
            setOriginalListName(data.name)
        }
    },
        [currentList, data?.name])

    useEffect(() => {
        if (data && data !== undefined) {
            //console.log(data)
            setItems(data.items)
        }
    }, [data, currentList])



    const Icon = Icons[data?.icon]

    return (
        <>
            <CssBaseline />
            <AppBar drawerState={drawerState} theme={theme} />
            <ListDrawer drawerState={drawerState} ListData={ListData} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                            sx={{
                                display: "flex",
                                border: theme => `1px solid ${theme.palette.divider}`,//使用Mui的內建調色盤
                                borderRadius: "50%", p: 1,
                                mr: 2,
                                mb: 3
                            }}>{Icon ? (<Icon />) : (<Icons.List />)}
                        </Box>
                        <TextField id="outlined-basic" label="List-Name" variant="outlined" value={originalListName}
                            sx={{ maxWidth: "30vw", marginBottom: "1.5rem" }}
                            onChange={(e) => {
                                setOriginalListName(e.target.value)

                            }}
                            onBlur={(e) => {
                                void updateList(data?.id, e.target.value)
                            }} />
                    </Box>
                    <Divider />
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {items ? (items.map((Todo, index) => (<TodoListItem
                            //盡量避免使用不穩定的識別符當作key,把新的key當作新的組件導致丟失狀態
                            toggleFunc={handleToggle}
                            deleteFunc={deleteItem}
                            updateFunc={updateItem}
                            Todo={Todo}
                            Todos={items}
                            key={Todo.id}
                        />))) : (<Typography>No List Selected</Typography>)
                        }
                    </List>
                    {items ? (<AddItem addFunc={addItem} />) : ("")}
                </Box>
            </Box>
        </>

    );
}

/*
<TodoListItem
                            toggleFunc={handleToggle}
                            updateFunc={updateItem}
                            deleteFunc={deleteItem}
                            Todo={Todo}
                            Todos={items}
                            key={index} />*/
/*const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));*/

/*const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);*/

//

{/*<AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        My!! Todo-list
                    </Typography>
                    <IconButton color="inherit" aria-label="add new List" sx={{ marginLeft: "auto" }}>
                        <AddIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>*/}
{/*<Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <Typography variant="h6" noWrap component="div">
                        😥😥😥😥😥😥
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {ListData.map((d, index) => (
                        <ListItem key={d.name} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={d.name} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                {/*<List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>}
            </Drawer>*/}

/*export default function TodoListv2() {
    const { data, addItem, deleteItem, handleToggle } = TodoListMethods()
    /*
        const initialList = [
            { id: uuid(), task: "Have a phone call with grandpa", isComplated: false },
            { id: uuid(), task: "do some exercise everyday", isComplated: false },
            { id: uuid(), task: "morning to gf", isComplated: false }]
    
    
    
    
    
        const getInitialData = () => {
            const storedData = JSON.parse(localStorage.getItem('listItems'))
            if (storedData) return storedData
            else return initialList
        }
    
        const [listItems, setListItems] = useState(getInitialData)
    
    
        useEffect(() => {
            const storedData = JSON.parse(localStorage.getItem('listItems'))//將資料(JSON.parse)以陣列的方式
            setListItems(storedData)
        }, [])
    
    
        useEffect(() => (
            localStorage.setItem("listItems", JSON.stringify(listItems))//將資料(JSON.stringify)以JSON字串資料格式儲存到本地儲存空間中
        ), [listItems])//當listItems有發生變化時執行effect
    */

/* const deleteItem = (id) => {
     setListItems((currItems) => {
         return currItems.filter((i) => (i.id !== id))
     })
 }
 
 const handleToggle = (id) => {
     setListItems((currItems) => {
         return currItems.map((i) => { //注意，map是對array中特定元素修正，並回傳修正過後的新陣列，記得要回傳給setState
             if (i.id === id) {
                 return { ...i, isComplated: !i.isComplated }
             }
             else {
                 return i
             }
         })
     })
 }
 
 
 
 const addItem = (t) => {
     setListItems((currItems) => {
         return [...currItems, { id: uuid(), task: t, isComplated: false }]
     })
 }


return (
    <Box sx={{ width: "100%", height: "100%", margin: "auto", display: "flex", flexDirection: "column" }}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {data.map((Todo) => (
                <TodoListItem toggleFunc={handleToggle} Todo={Todo} deletefunc={deleteItem} key={uuid()} />
            ))}
        </List>
        <AddItem addFunc={addItem} />
    </Box>
)

}*/