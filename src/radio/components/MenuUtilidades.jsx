import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Collapse, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ArtTrack, Assignment, AssignmentIndRounded, DescriptionOutlined, ExpandLess, ExpandMore, ShoppingBagTwoTone } from '@mui/icons-material';

export const MenuUtilidades = () => {

  const navigate = useNavigate();
  const [openUti, setOpenUti] = React.useState(false);
  const handleUtiClick = () => setOpenUti(!openUti);

  const iconColorUti   = "secondary";

  const menuItemsUti = [
    {  
      text: 'Asignaciones', 
      icon: <AssignmentIndRounded color={ iconColorUti } />, 
      path: '/',
    }, 
    {  
      text: 'Hoja de servicio', 
      icon: <DescriptionOutlined color={ iconColorUti } />, 
      path: 'hoja-servicio',
    },
    //{  
    //  text: 'Historial de entradas', 
    //  icon: <Assignment color={ iconColorUti } />, 
    //  path: 'historial-entradas',
    //}, 
    
  ];

  return (
    <>
        <ListItemButton onClick={handleUtiClick}>
        <ListItemIcon>
          <IconButton color='secondary'>
            <ShoppingBagTwoTone />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary="Utilidades" />
        {openUti ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openUti} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        {menuItemsUti.map((item) => (
        <ListItemButton key={item.text} sx={{ pl: 4 }} onClick={() => navigate(item.path) }>
            <ListItemIcon>
              { item.icon }
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
          
        </List>
      </Collapse>
    </>
  )
}
