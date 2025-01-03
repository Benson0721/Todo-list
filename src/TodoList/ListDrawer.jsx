import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import * as Icons from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAppState } from "../../provider/AppState"
import { useEffect, useState } from 'react';
import { useAuthState } from '../../provider/AuthState';


export default function ListDrawer({ drawerState, ListData }) {
    const { currentList, setCurrentList } = useAppState()
    const [Emojis, setEmojis] = useState()
    const { user, loading } = useAuthState()
    const drawerWidth = 240;


    useEffect(() => {
        EmojiRender(setEmojis)
    }, []);
    //console.log(user)
    useEffect(() => {
        if (!currentList && user) {
            setCurrentList(ListData[0]?._id);
        }
    }, [currentList, ListData, setCurrentList]);


    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });
    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );
    const EmojiRender = () => {
        const emojis = [
            "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "🥲", "🥹",
            "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗",
            "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓",
            "😎", "🥸", "🤩", "🥳", "🙂‍↕️", "😏", "😒", "🙂‍↔️", "😞", "😔",
            "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢",
            "😭", "😮‍💨", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶",
            "😱", "😨", "😰", "😥", "😓", "🫣", "🤗", "🫡", "🤔", "🫢",
            "🤭", "🤫", "🤥", "😶", "😶‍🌫️", "😐", "😑", "😬", "🫨", "🫠",
            "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪",
            "😵", "😵‍💫", "🫥", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒",
            "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻",
            "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻",
            "😼", "😽", "🙀", "😿", "😾"
        ];
        let emojiString = []
        for (let i = 0; emojiString.length <= 5; i++) {
            let ran = Math.floor(Math.random() * emojis.length)
            emojiString.push(emojis[ran])
        }
        setEmojis(emojiString.join(""))
    }




    return (
        <Drawer variant="permanent" open={drawerState.isOpen}>
            <DrawerHeader>
                <Typography variant="h6" noWrap component="div">
                    {Emojis}
                </Typography>
                <IconButton onClick={() => {
                    EmojiRender(setEmojis)
                    drawerState.close()
                }}>
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {user && !loading ? ListData.map(({ name, _id, icon }, index) => {
                    const Icon = Icons[icon]
                    return (
                        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: drawerState.isOpen ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                selected={_id === currentList ? true : false}
                                onClick={() => setCurrentList(_id)}
                            >
                                <a href=""></a>
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: drawerState.isOpen ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {Icon ? <Icon /> : <Icons.List />}
                                </ListItemIcon>
                                <ListItemText primary={name} sx={{ opacity: drawerState.isOpen ? 1 : 0 }} />
                            </ListItemButton>
                            <Divider />
                        </ListItem>
                    )
                }) : ("")}
            </List>
        </Drawer >
    )
}
