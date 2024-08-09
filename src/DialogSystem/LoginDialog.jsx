import * as React from 'react';
import { useState } from 'react';
import {
    Button,
    Box,
    Dialog,
    DialogActions,
    DialogContentText,
    DialogContent,
    DialogTitle,
    TextField,

} from "@mui/material"

import { useAuthState } from '../../provider/AuthState';
import { TodoListHooks } from "../hooks/TodoListHooks.js"


export default function LoginDialog({ dialogState }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState("")
    //const { LoginHook } = UserHooks()
    const { login } = useAuthState()
    const { mutate } = TodoListHooks()
    const handleLogin = async () => {
        await login({ username, password });
        mutate()
        setAllNull();
        dialogState.close();

    }
    const setAllNull = () => {
        setUsername("")
        setPassword("")
    }

    return (
        <>
            <Dialog
                open={dialogState.isOpen}
                //TransitionComponent={Transition}
                keepMounted
                onClose={dialogState.close}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {//改變顯示對話框屬性
                        width: "35vw",
                        height: "auto"
                    }
                }}
            >
                <DialogTitle>{"Welcome to use Tododo~"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Login Tododo~~!
                    </DialogContentText>
                </DialogContent>
                <TextField
                    id="outlined-textarea"
                    label="Username"
                    placeholder="Input your username"
                    value={username}
                    sx={{ margin: "10px" }}
                    autoFocus
                    multiline
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />
            
                <TextField
                    id="outlined-textarea"
                    label="Password"
                    placeholder="Input your password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    sx={{ margin: "10px" }}
                    autoFocus
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />
                <DialogActions>
                    <Button onClick={handleLogin} variant='button'>Login</Button>
                    <Button onClick={()=>{
                        setAllNull()
                        dialogState.close()}}>cancel</Button>
                </DialogActions>
            </Dialog >
        </>
    );
}