import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { CellTower, MenuOutlined } from '@mui/icons-material';

export const NavBar = ({ drawerWidth = 240 }) => {
  return (
    <AppBar
        position='fixed'
        sx={{
            width: { sm: `calc(100% - ${ drawerWidth }px)`,
            ml: { sm: `${ drawerWidth }px` }
            }
        }}
    >
        <Toolbar className='navbar'>
            <IconButton
                color='inherit'
                edge="start"
                sx={{ mr: 2, display: { sm: 'none'} }}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'><CellTower /> Radiocomunicaciones</Typography>
            </Grid>

        </Toolbar>
    </AppBar>
  )
}
