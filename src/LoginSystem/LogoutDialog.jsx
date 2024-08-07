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
import { UserHooks } from "../hooks/UserHooks"

/*const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});*/

export default function LogoutDialog({ dialogState }) {

    const { LogoutHook } = UserHooks()
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
                        Are you sure to logout?
                        We will miss you so much😭
                    </DialogContentText>
                </DialogContent>

                <Box sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}>
                </Box>
                <DialogActions>
                    <Button onClick={() => {
                        LogoutHook()
                        dialogState.close()
                    }}>Yes!</Button>
                    <Button onClick={dialogState.close}>maybe later...</Button>
                </DialogActions>
            </Dialog >
        </>
    );
}