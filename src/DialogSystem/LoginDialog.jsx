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
import { useForm } from "react-hook-form"

export default function LoginDialog({ dialogState }) {
    //const [username, setUsername] = useState('')
    //const [password, setPassword] = useState("")
    //const { LoginHook } = UserHooks()
    const { login } = useAuthState()
    const { mutate } = TodoListHooks()
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm()
    const handleLogin = async (data) => {
        const user = await login(data);
        if (user != null) {//登入後沒有找到user
            mutate()//登入後令其re-render最新資訊
            reset()
            dialogState.close();
        } else {
            setError("password", { type: "manual", message: "username or password is incorrent" });
            setError("username", { type: "manual", message: "username or password is incorrent" });

        }
    }
    const Close = () => {
        reset()
        dialogState.close()
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
                    <form id='LoginForm' onSubmit={handleSubmit(handleLogin)}>
                        <DialogContentText id="alert-dialog-slide-description">
                            Login Tododo~~!
                        </DialogContentText>
                        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", paddingTop: "15px" }}>
                            <TextField
                                {...register("username", { required: "Username must required for login!" })}
                                id="outlined-textarea"
                                label="Username"
                                placeholder="Input your username"
                                sx={{ margin: "10px" }}
                                autoFocus
                                multiline
                                error={errors?.username}
                                helperText={errors?.username && errors.username.message}
                            />
                            <TextField
                                {...register("password", { required: "Password must required for login!" })}
                                id="outlined-textarea"
                                label="Password"
                                placeholder="Input your password"
                                type="password"
                                autoComplete="current-password"
                                sx={{ margin: "10px" }}
                                autoFocus
                                error={errors?.password}
                                helperText={errors?.password && errors.password.message}
                            />
                        </Box>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button type='submit' form="LoginForm" variant='button'>Login</Button>
                    <Button onClick={Close}>cancel</Button>
                </DialogActions>
            </Dialog >
        </>
    );
}