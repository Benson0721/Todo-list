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
import { useForm } from "react-hook-form"





export default function NewListDialog({ dialogState, addList }) {
    //const [newList, setNewList] = useState('')
    const [searchIcon, setSearchIcon] = useState('')
    const [filteredIcons, setFilteredIcons] = useState([])
    const [newIcon, setNewIcon] = useState('')
    const { register, handleSubmit, formState: { errors }, reset } = useForm()




    const onSubmit = (data) => {

        void addList({ name: data.name, icon: newIcon })
        reset()
        dialogState.close()
    }
    const Close = () => {
        reset()
        dialogState.close()
    }
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
                    <form onSubmit={handleSubmit(onSubmit)} id='myForm1'>
                        <DialogContentText id="alert-dialog-slide-description">
                            Create a new Todo-List
                        </DialogContentText>
                        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", paddingTop: "15px" }}>
                            <TextField
                                {...register("name", {
                                    required: "Listname can't be blank",
                                    maxLength: {
                                        value: 15,
                                        message: "Listname must be less than 15"
                                    }
                                })}
                                id="outlined-textarea"
                                label="New List"
                                placeholder="New List"
                                autoFocus
                                multiline
                                error={errors?.name}
                                helperText={errors?.name && errors.name.message}
                            />

                            <TextField
                                {...register("icon", {
                                    maxLength: {
                                        value: 8,
                                        message: "I bet you can't find icon above 8"
                                    }
                                })}
                                id="outlined-textarea"
                                label="New Icon"
                                placeholder="New Icon"
                                sx={{ marginTop: "15px" }}
                                multiline
                                onChange={(e) => {
                                    setSearchIcon(e.target.value)
                                }
                                }
                                error={errors?.icon}
                                helperText={errors?.icon && errors.icon.message}
                            />
                        </Box>
                    </form>
                </DialogContent>

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
                    <Button type='submit' form="myForm1" variant='button'>submit</Button>
                    <Button onClick={Close}>cancel</Button>
                </DialogActions>
            </Dialog >

        </>
    );
}
