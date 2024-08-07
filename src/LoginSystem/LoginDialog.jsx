import * as React from 'react';
import * as Icons from '@mui/icons-material';
import { useState, useEffect } from 'react';
import {
    Button,
    Box,
    Dialog,
    DialogActions,
    DialogContentText,
    DialogContent,
    DialogTitle,
    TextField,
    ToggleButton,
    Typography
} from "@mui/material"
import { UserHooks } from "../hooks/UserHooks"

/*const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});*/

export default function RegisterDialog({ dialogState }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState("")
    const { LoginHook } = UserHooks()

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
                <DialogTitle>{"Think about new thing to do!"}</DialogTitle>
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
                    value={password}
                    sx={{ margin: "10px" }}
                    autoFocus
                    multiline
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />
                <Box sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}>
                </Box>
                <DialogActions>
                    <Button onClick={() => {
                        LoginHook({ username, password })
                        setAllNull()
                        dialogState.close()
                    }}>Login</Button>
                    <Button onClick={dialogState.close}>cancel</Button>
                </DialogActions>
            </Dialog >
        </>
    );
}