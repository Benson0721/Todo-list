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
import { useForm } from "react-hook-form"

export default function RegisterDialog({ dialogState }) {
    /*const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState("")*/
    //const { RegisterHook } = UserHooks()
    const { signUp } = useAuthState()
    const { register, reset, formState: { errors }, handleSubmit,setError } = useForm()
  



    const { mutate } = TodoListHooks()
    const handleRegister = async (data) => {
        const singedUp = await signUp(data);
        if (singedUp == null) {
            setError("username", { type: "manual", message: "This username is already exist!" });
        }
        else {
            mutate()
            reset();
            dialogState.close();
        }


    }
    const Close = () => {
        reset();
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
                    <form onSubmit={handleSubmit(handleRegister)} id='SigninForm'>
                        <DialogContentText id="alert-dialog-slide-description">
                            Start using Tododo!~
                        </DialogContentText>
                        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", paddingTop: "15px" }}>
                            <TextField
                                {...register('email', { required: "Email is required for registering a new account" })}
                                id="outlined-textarea"
                                label="Email"
                                placeholder="Input your email"
                                type='email'
                                sx={{ margin: "10px" }}
                                autoFocus
                                error={errors?.email}
                                helperText={errors?.email && errors.email.message}
                            />
                            <TextField
                                {...register('username', {
                                    required: "Username is required for registering a new account",
                                    maxLength: {
                                        value: 10,
                                        message: "Username must be less than 10"
                                    },

                                })}
                                id="outlined-textarea"
                                label="Username"
                                placeholder="Input your username"
                                type='text'
                                sx={{ margin: "10px" }}
                                autoFocus
                                error={errors?.username}
                                helperText={errors?.username && errors.username.message}
                            />
                            <TextField
                                {...register('password', {
                                    required: "Password is required for registering a new account",
                                    maxLength: {
                                        value: 10,
                                        message: "Username must be less than 10"
                                    },
                                })}
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Input your password"
                                sx={{ margin: "10px" }}
                                autoFocus
                                error={errors?.password}
                                helperText={errors?.password && errors.password.message}
                            />
                        </Box>
                    </form>
                </DialogContent>
                <Box sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}>
                </Box>
                <DialogActions>
                    <Button form='SigninForm' type='submit' variant='button'>Regist</Button>
                    <Button onClick={Close}>cancel</Button>
                </DialogActions>
            </Dialog >
        </>
    );
}