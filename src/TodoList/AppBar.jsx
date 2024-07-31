import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';


import { styled } from '@mui/material/styles';
import NewListDialog from './NewListDialog';
import { usePopupState } from "material-ui-popup-state/hooks"
import { ListMethods } from "../hooks/ListsMethods"



export default function AppBar({ drawerState, theme }) {
    const drawerWidth = 240;
    const dialogState = usePopupState({ variant: 'dialog', popupId: 'new-list' });
    const { addList } = ListMethods()

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));


    return (<>
        <NewListDialog dialogState={dialogState} addList={addList} />
        <AppBar position="fixed" open={drawerState.isOpen}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={drawerState.open}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(drawerState.isOpen && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    My!! Todo-list
                </Typography>
                <IconButton color="inherit" aria-label="add new List" sx={{ marginLeft: "auto" }} onClick={dialogState.open} >
                    <AddIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    </>
    )


} 