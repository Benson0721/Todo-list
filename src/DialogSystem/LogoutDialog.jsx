import * as React from 'react';
import {
    Button,
    Box,
    Dialog,
    DialogActions,
    DialogContentText,
    DialogContent,
    DialogTitle,
} from "@mui/material"
import { useEffect } from "react";
import { useAuthState } from '../../provider/AuthState';
import { useAppState } from "../../provider/AppState"
import { TodoListHooks } from "../hooks/TodoListHooks"
export default function LogoutDialog({ dialogState }) {
    const { setCurrentList } = useAppState()
    const { logout } = useAuthState()
    const { mutate } = TodoListHooks()

    const handleLogout = async () => {
        await logout()//記得要有回傳值才會讓component re-render
        setCurrentList(null)
        mutate()
        dialogState.close();
    }



    //const { LogoutHook } = UserHooks()
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
                <DialogTitle>{"Are you sure to logout?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        We will miss you so much😭
                    </DialogContentText>
                </DialogContent>

                <Box sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}>
                </Box>
                <DialogActions>
                    <Button onClick={handleLogout}>Yes!</Button>
                    <Button onClick={dialogState.close}>maybe later...</Button>
                </DialogActions>
            </Dialog >
        </>
    );
}