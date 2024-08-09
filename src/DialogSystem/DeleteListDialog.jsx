import * as React from 'react';
import { useAppState } from "../../provider/AppState"
import { TodoListHooks } from "../hooks/TodoListHooks"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContentText,
    DialogContent,
    DialogTitle,
} from "@mui/material"





export default function DeleteListDialog({ dialogState, deleteList }) {
    const { currentList, setCurrentList } = useAppState()
    const { ListData } = TodoListHooks()
    const handleDelete = () => {
        deleteList(currentList).then(() => {
            // 刪除後更新 currentList 為第一個存在的列表
            if (ListData.length > 1 && currentList === ListData[0]?._id) {
                setCurrentList(ListData[1]?._id); // 假設刪除的是第一個列表
            } else if (ListData.length > 0) {
                setCurrentList(ListData[0]?._id)
            }
            else {
                setCurrentList(null); // 如果沒有剩餘的列表，則設為 null
            }
            dialogState.close();
        });
    };

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
                <DialogTitle>{"Are you sure to 'Delete' this List?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        This action can't be undone.
                        Please be confirm if you want to delete.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => {
                        handleDelete()
                    }}>Confirm</Button>
                    <Button onClick={dialogState.close}>Cancel</Button>
                </DialogActions>
            </Dialog >
        </>
    );
}