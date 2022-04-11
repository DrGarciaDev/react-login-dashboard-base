import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
// i mport Paper from '@mui/material/Paper'
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Tooltip from '@mui/material/Tooltip';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

import { mainListItems, secondaryListItems } from './listItems';

import Logo from '../../Assets/img/react.png';

// COMPONENTES
import Copyright from '../Copyright';
import Dashboard from './Container/Dashboard/Dashboard';
import PageNotFound from '../NotFound/NotFound';

import AuthService from "../../Services/auth.service";

const drawerWidth = 240;

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
            },
        }),
        },
    }),
);

export default function Content( props ) {
    const board_id = props.match.params.board_id;
    // COMPONENTES DEL CONTENEDOR DEL DASHBOARD 
    let componente = null;
    switch(board_id) {
        case 'index':
            componente = <Dashboard />;
            break;
        default:
            componente = <PageNotFound />;
    }

    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [dark, setDark] = React.useState(false);
    const darkLigthTheme = createTheme({
        palette: {
            mode: dark ? 'dark' : 'light',
            primary: {
                main: '#00385c',
                // main: '#002884',
                contrastText: '#fff',
            },
            background: {
                default:  '#cbcccc'
            },
        }
    });

    // handle click event of logout button
    const handleLogout = () => {
        console.log('Handle Logout');
        AuthService.logout();
        history.push('/');
    }

    return (
        // <ThemeProvider theme={mdTheme}>
        <ThemeProvider theme={darkLigthTheme}>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                    pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h5"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Nombre de la APP
                    </Typography>
                    <Tooltip title="Cerrar sesión">
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleLogout}
                        >
                            <ExitToAppIcon sx={{ fontSize: 30 }} />
                        </IconButton >
                    </Tooltip>
                    <Tooltip title="Modo Oscuro / Modo Claro">
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setDark(!dark)}
                        >
                            <SettingsBrightnessIcon sx={{ fontSize: 30 }}/>
                        </IconButton>
                    </Tooltip>
                    <div> 
                        <img src={Logo} alt="logo" height="45" />
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List>{ mainListItems }</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
            {/* CONTENEDOR CENTRAL */}
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[300]
                        : theme.palette.grey[600],
                    flexGrow: 1,
                    height: '100%',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="xl" sx={{ mt: 4, mb: 4, width: '100%'}}>
                    <Grid container spacing={3}>
                        { componente }
                    </Grid>
                    <Toolbar />
                    <Copyright sx={{ pt: 4 }} />
                </Container>
            </Box>
        </Box>
        </ThemeProvider>
    );
}
