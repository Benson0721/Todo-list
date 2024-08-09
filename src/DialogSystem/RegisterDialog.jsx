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
import { TodoListHooks } from "../hooks/TodoListHooks"

export default function RegisterDialog({ dialogState }) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState("")
    //const { RegisterHook } = UserHooks()
    const { register } = useAuthState()
    const setAllNull = () => {
        setEmail("")
        setUsername("")
        setPassword("")
    }
    const { mutate } = TodoListHooks()
    const handleRegister = async () => {
        await register({ email, username, password });
        mutate()
        setAllNull();
        dialogState.close();

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
                <DialogTitle>{"Regist a new account!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Start using Tododo!~
                    </DialogContentText>
                </DialogContent>
                <TextField
                    id="outlined-textarea"
                    label="Email"
                    placeholder="Input your email"
                    value={email}
                    type='email'
                    sx={{ margin: "10px" }}
                    autoFocus
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />
                <TextField
                    id="outlined-textarea"
                    label="Username"
                    placeholder="Input your username"
                    value={username}
                    type='text'
                    sx={{ margin: "10px" }}
                    autoFocus
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Input your password"
                    value={password}
                    sx={{ margin: "10px" }}
                    autoFocus
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <Box sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}>
                </Box>
                <DialogActions>
                    <Button onClick={handleRegister}>Regist</Button>
                    <Button onClick={() => {
                        setAllNull();
                        dialogState.close()
                    }}>cancel</Button>
                </DialogActions>
            </Dialog >
        </>
    );
}