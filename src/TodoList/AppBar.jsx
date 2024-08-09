import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect } from "react";
import { styled } from '@mui/material/styles';
import NewListDialog from '../DialogSystem/NewListDialog';
import { usePopupState } from "material-ui-popup-state/hooks"
import { TodoListHooks } from "../hooks/TodoListHooks"
import LogoutDialog from '../DialogSystem/LogoutDialog';
import LoginDialog from '../DialogSystem/LoginDialog';
import RegisterDialog from '../DialogSystem/RegisterDialog';
import { useAuthState } from '../../provider/AuthState';


export default function AppBar({ drawerState, theme }) {
    const drawerWidth = 240;
    const NewListState = usePopupState({ variant: 'dialog', popupId: 'new-list' });
    const LoginState = usePopupState({ variant: 'dialog', popupId: 'login' });
    const LogoutState = usePopupState({ variant: 'dialog', popupId: 'logout' });
    const RegisterState = usePopupState({ variant: 'dialog', popupId: 'register' });
    const { addList } = TodoListHooks()
    const { user } = useAuthState()
  
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

    useEffect(() => {
        if (user == null) {
            console.log("AuthState:logout")
        } else {
            console.log("AuthState:login")
        }
    }, [user])




    return (<>
        <NewListDialog dialogState={NewListState} addList={addList} />
        <LogoutDialog dialogState={LogoutState} />
        <LoginDialog dialogState={LoginState} />
        <RegisterDialog dialogState={RegisterState} />
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
                {user && user !== null ?
                    <Box sx={{ marginLeft: "auto" }}><IconButton color="inherit" aria-label="add new List" sx={{ marginLeft: "auto" }} onClick={LogoutState.open} >
                        <LogoutIcon />
                    </IconButton>
                        <IconButton color="inherit" aria-label="add new List" sx={{ marginLeft: "auto" }} onClick={NewListState.open} >
                            <AddIcon />
                        </IconButton>
                    </Box> :
                    <Box sx={{ marginLeft: "auto" }}>
                        <IconButton color="inherit" aria-label="add new List" sx={{ marginLeft: "auto" }} onClick={RegisterState.open} >
                            <AppRegistrationIcon />
                        </IconButton>
                        <IconButton color="inherit" aria-label="add new List" sx={{ marginLeft: "auto" }} onClick={LoginState.open} >
                            <LoginIcon />
                        </IconButton>
                    </Box>}
            </Toolbar>
        </AppBar>
    </>
    )


} 