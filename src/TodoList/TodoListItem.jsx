
import ClearIcon from '@mui/icons-material/Clear';
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Checkbox,
    IconButton,
    TextField
} from "@mui/material"
import { useState, useEffect } from "react";





export default function TodoListItem({ toggleFunc, deleteFunc, Todo, updateFunc, Todos }) {
    /*const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };*/
    const [originalListItems, setOriginalListItems] = useState({});
    const labelId = `checkbox-list-label-${Todo.id}`;
    useEffect(() => {
        if (Todos) {
            setOriginalListItems(//用來將設置成物件形式並以id:name的方式儲存
                Todos.reduce((acc, { id, task }) => ({ ...acc, [id]: task }), {})
            );
        }
    }, [Todos]);


    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="comments" onClick={() => (deleteFunc(Todo.id))}>
                    <ClearIcon />
                </IconButton>
            }
            disablePadding>
            <ListItemButton role={undefined} onClick={() => (toggleFunc(Todo.id))} dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={Todo.isComplated}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText id={labelId}>
                    <TextField id="standard-basic" label="" variant="standard" value={originalListItems[Todo.id] ?? ""}
                        sx={{ maxWidth: "50vw", my: 2 }}
                        onClick={(e) => {
                            e.stopPropagation()
                            console.log((originalListItems[Todo.id]).length)
                        }}
                        onChange={(e) => {

                            console.log(Todo.id)
                            setOriginalListItems({
                                ...originalListItems,
                                [Todo.id]: e.target.value

                            })
                        }}
                        onBlur={(e) => {
                            console.log("update!!!!")
                            void updateFunc(Todo.id, e.target.value)
                        }}
                        inputProps={originalListItems[Todo.id] && { style: { width: `${(originalListItems[Todo.id].length) * 8}px` } }}
                    />
                </ListItemText>
            </ListItemButton>
        </ListItem>
    )
}


/*<ListItemText id={Todo.id} primary={Todo.task} style={{
    textDecoration: Todo.isComplated ? "line-through" : "none",
    color: Todo.isComplated ? "gray" : "black"
}} />*/
