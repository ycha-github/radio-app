import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { CellTower, MenuOutlined } from '@mui/icons-material';
// import image from "./banner.jpg"; 
import image2 from "./banner2.jpg"; 
// import image3 from "./banner3.jpg"; 
// import image4 from "./banner4.jpg"; 

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
        <Toolbar sx={{ backgroundImage: `url(${image2})`,  backgroundSize: 'cover', }} >
            <IconButton
                color='inherit'
                edge="start"
                sx={{ mr: 2, display: { sm: 'none'} }}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div' sx={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '28px' }}><CellTower /> Radiocomunicaciones</Typography>
            </Grid>

        </Toolbar>
    </AppBar>
  )
}
