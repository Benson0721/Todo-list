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
    const [error, setError] = useState("")
    const [errorBoolean, setErrorBoolean] = useState(false)
    const submitHandler = (e) => {
        e.preventDefault()
        try {
            if (item.length == 0) throw new Error("You must need to input something!")
            setErrorBoolean(false)
            void addFunc(item)
            setItem("")
        } catch (err) {
            setError(err.message)
            setErrorBoolean(true)
        }
    }
    const changeHandler = (e) => {
        setItem(e.target.value)
    }
    return (
        <Box sx={{ width: "100%" }} textAlign={"center"} mt={"auto"} justifyContent={"flex-end"}>
            <form onSubmit={submitHandler}>
                {errorBoolean && <p>{error}</p>}
                <TextField sx={{ width: "30%" }} value={item} id="standard-basic" label="New Task" variant="standard" onChange={changeHandler} InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <IconButton edge="end" onClick={() => {
                            try {
                                if (item.length == 0) throw new Error("You must need to input something!")
                                setErrorBoolean(false)
                                void addFunc(item)
                                setItem("")
                            } catch (e) {
                                setError(e.message)
                                setErrorBoolean(true)
                            }
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