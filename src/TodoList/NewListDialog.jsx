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

/*const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});*/

export default function NewListDialog({ dialogState, addList }) {
    const [newList, setNewList] = useState('')
    const [searchIcon, setSearchIcon] = useState('')
    const [filteredIcons, setFilteredIcons] = useState([])
    const [newIcon, setNewIcon] = useState('')


    useEffect(() => {
        setFilteredIcons(
            Object.entries(Icons)
                .filter(([name]) => !/Outlined$|TwoTone$|Rounded$|Sharp$/.test(name))//過濾名字
                .filter(([name]) => (searchIcon ? name.toLowerCase().includes(searchIcon) : true))//以搜尋列過濾，未搜尋時自動回傳9個圖標
                .slice(0, 9)//回傳前9個(0~8)
        )
    }, [searchIcon])



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
                        Create a new Todo-List
                    </DialogContentText>
                </DialogContent>
                <TextField
                    id="outlined-textarea"
                    label="New List"
                    placeholder="New List"
                    value={newList}
                    sx={{ margin: "10px" }}
                    autoFocus
                    multiline
                    onChange={(e) =>
                        setNewList(e.target.value)
                    }
                />
                <TextField
                    id="outlined-textarea"
                    label="New Icon"
                    placeholder="New Icon"
                    value={searchIcon}
                    sx={{ margin: "15px" }}
                    autoFocus
                    multiline
                    onChange={(e) => {
                        setSearchIcon(e.target.value)
                        console.log(searchIcon)
                    }
                    }
                />
                <Box sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}>
                    {filteredIcons.map(([name, Icon]) => (
                        <Box key={name} sx={{
                            display: "inline-flex", flexDirection: "column",
                            width: 40,
                            mx: 1,
                        }}>
                            <ToggleButton
                                value={name}
                                onClick={() => setNewIcon(name)
                                }
                                selected={name === newIcon}>
                                <Icon />
                            </ToggleButton>
                            <Typography
                                variant='caption'
                                align='center'
                                sx={{
                                    textOverflow: "ellipsis", overflow: 'hidden'//textOverflow: "ellipsis"=將文字溢出的部分以...省略
                                    //overflow: 'hidden'= 將溢出的字隱藏起來
                                }}>
                                {name}
                            </Typography>
                        </Box>)
                    )
                    }
                </Box>
                <DialogActions>
                    <Button onClick={() => {
                        addList({ name: newList, icon: newIcon })
                        setSearchIcon("")
                        setNewList("")
                        dialogState.close()
                    }}>submit</Button>
                    <Button onClick={dialogState.close}>cancel</Button>
                </DialogActions>
            </Dialog >
        </>
    );
}
