import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { styled } from '@mui/material/styles';
import NewListDialog from './NewListDialog';
import { usePopupState } from "material-ui-popup-state/hooks"
import { TodoListHooks } from "../hooks/TodoListHooks"
import LogoutDialog from '../LoginSystem/LogoutDialog';
import LoginDialog from '../LoginSystem/LoginDialog';
import RegisterDialog from '../LoginSystem/RegisterDialog';



export default function AppBar({ drawerState, theme }) {
    const drawerWidth = 240;
    const NewListDialog = usePopupState({ variant: 'dialog', popupId: 'new-list' });
    const LoginDialog = usePopupState({ variant: 'dialog', popupId: 'login' });
    const LogoutDialog = usePopupState({ variant: 'dialog', popupId: 'logout' });
    const RegisterDialog = usePopupState({ variant: 'dialog', popupId: 'register' });
    const { ListData, addList } = TodoListHooks()

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
        <NewListDialog dialogState={NewListDialog} addList={addList} />
        <LogoutDialog dialogState={LogoutDialog} />
        <LoginDialog dialogState={LoginDialog} />
        <RegisterDialog dialogState={RegisterDialog} />
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
                    My!! Tododo
                </Typography>
                {ListData ? <IconButton color="inherit" aria-label="add new List" sx={{ marginLeft: "auto" }} onClick={LogoutDialog.open} >
                    <LogoutIcon />
                </IconButton> : <Box><IconButton color="inherit" aria-label="add new List" sx={{ marginLeft: "auto" }} onClick={RegisterDialog.open} >
                    <AppRegistrationIcon />
                </IconButton>
                    <IconButton color="inherit" aria-label="add new List" sx={{ marginLeft: "auto" }} onClick={LoginDialog.open} >
                        <LoginIcon />
                    </IconButton></Box>}
                <IconButton color="inherit" aria-label="add new List" sx={{ marginLeft: "auto" }} onClick={NewListDialog.open} >
                    <AddIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    </>
    )


} 