
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
    const [originalListItems, setOriginalListItems] = useState({});
    const [error, setError] = useState(false)
    const labelId = `checkbox-list-label-${Todo._id}`;
    useEffect(() => {
        if (Todos) {
            setOriginalListItems(//用來將設置成物件形式並以id:name的方式儲存
                Todos.reduce((acc, { _id, task }) => ({ ...acc, [_id]: task }), {})
            );
        }
    }, [Todos]);


    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="comments" onClick={() => (void deleteFunc(Todo._id))} >
                    <ClearIcon />
                </ IconButton>
            }
            disablePadding>
            <ListItemButton role={undefined} dense onClick={() => (void toggleFunc(Todo._id))}>
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
                    <TextField id="standard-basic" label="" variant="standard" value={originalListItems[Todo._id] ?? ""}
                        sx={{ maxWidth: "50vw", my: 2 }}
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                        onChange={(e) => {
                            setOriginalListItems({
                                ...originalListItems,
                                [Todo._id]: e.target.value
                            })
                        }}
                        onBlur={(e) => {
                            if (originalListItems[Todo._id].length > 0) {
                                setError(false)
                                void updateFunc(Todo._id, e.target.value)
                            } else {
                                setError(true)
                            }
                        }}
                        inputProps={originalListItems[Todo._id] && { style: { width: `${(originalListItems[Todo._id].length) * 16}px` } }}
                        error={error}
                        helperText={error&&"Task can't be blank"}
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
