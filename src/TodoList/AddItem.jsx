import {
    Icon,
    TextField,
    Box,
    InputAdornment,//在input中，至於開頭或結束的裝飾圖示
    IconButton
} from "@mui/material";
import { useState } from "react";


export default function AddItem({ addFunc }) {
    const [item, setItem] = useState("")
    const submitHandler = (e) => {
        e.preventDefault()
        addFunc(item)
        setItem("")
    }
    const changeHandler = (e) => {
        setItem(e.target.value)
    }
    return (
        <Box sx={{ width: "100%" }} textAlign={"center"} mt={"auto"} justifyContent={"flex-end"}>
            <form onSubmit={submitHandler}>
                <TextField sx={{ width: "30%" }} value={item} id="standard-basic" label="New Task" variant="standard" onChange={changeHandler} InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <IconButton edge="end" onClick={() => {
                            void addFunc(item)
                            setItem("")
                        }} >
                            <Icon color="primary">add_circle</Icon>
                        </IconButton>
                    </InputAdornment>
                }}
                />
            </form>
        </Box >
    )
}