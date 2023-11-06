import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 300;




const useStyles = makeStyles( ( ) => ( {
    customTextField: {
        // Your custom styles go here

        height: 40,
        '& .MuiInputBase-input': {
            padding: '10px 15px',
            marginBottom: '3px',
            width: '300px',
            borderRadius: 10
        },

    },
} ) );

const openedMixin = ( theme: Theme ): CSSObject => ( {
    width: drawerWidth,
    transition: theme.transitions.create( 'width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    } ),
    overflowX: 'hidden',
    background: '#151529',
    color: 'white'
} );

const closedMixin = ( theme: Theme ): CSSObject => ( {
    transition: theme.transitions.create( 'width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    } ),
    overflowX: 'hidden',
    background: '#151529',
    color: 'white',
    width: `calc(${theme.spacing( 7 )} + 1px)`,
    [theme.breakpoints.up( 'sm' )]: {
        width: `calc(${theme.spacing( 8 )} + 1px)`,
    },
} );

const DrawerHeader = styled( 'div' )( ( { theme } ) => ( {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing( 0, 1 ),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
} ) );



interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled( MuiAppBar, {
    shouldForwardProp: ( prop ) => prop !== 'open',
} )<AppBarProps>( ( { theme, open } ) => ( {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create( ['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    } ),
    ...( open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create( ['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        } ),
    } ),
} ) );

const Drawer = styled( MuiDrawer, { shouldForwardProp: ( prop ) => prop !== 'open' } )(
    ( { theme, open } ) => ( {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...( open && {
            ...openedMixin( theme ),
            '& .MuiDrawer-paper': openedMixin( theme ),
        } ),
        ...( !open && {
            ...closedMixin( theme ),
            '& .MuiDrawer-paper': closedMixin( theme ),
        } ),
    } ),
);

export default function MiniDrawer() {
    const theme = useTheme();
    const mobileView = useMediaQuery(theme.breakpoints.up("xl"));
    console.log( "View =======", mobileView );
    const [open, setOpen] = React.useState( false );
    const classes = useStyles();
    const handleDrawerOpen = () => {
        setOpen( !open );
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{
                background: '#ffffff',
                color: 'black',
                width: `${open ? 'calc(100% - 300px)' : 'calc(100% - 64px)'}`

            }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 2,
                            color: '#cacaca'
                        }}
                    >
                        {open ? <MenuIcon /> : <ArrowRightAltIcon />}

                    </IconButton>

                    <TextField id="filled-basic" label="" variant="filled" className={classes.customTextField}
                        placeholder="Search..."
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: (
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            )
                        }}
                    />

                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {open ? <Typography variant='h4' >
                        Drawer
                    </Typography> : <Box>@@</Box>}

                </DrawerHeader>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map( ( text, index ) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: 'white'
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ) )}
                </List>

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </Box>
        </Box>
    );
}
