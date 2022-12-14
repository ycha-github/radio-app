import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Person, TurnedInNot } from '@mui/icons-material';
import { NestedList } from './NestedList';
import { useAuthStore } from '../../hooks';


export const SideBar = ({ drawerWidth = 240 }) => {

    const {user}= useAuthStore();

  return (
    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth = 240 }, flexShrink: { sm: 0 } }}
    >
        <Drawer
            variant='permanent'//temporary
            open
            sx={{
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>  
                   <Person /> {user.username}
                </Typography>
            </Toolbar>
            <Divider />
            <NestedList />
            {/* <List>
                {
                    ['Administración', 'Catálogos', 'Utilidades', 'Cambiar contraseña', ''].map( text => (
                        <ListItem key={ text } disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary={ text } />
                                    <ListItemText secondary={ 'Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500' } />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List> */}
        </Drawer>
    </Box>
  )
}
