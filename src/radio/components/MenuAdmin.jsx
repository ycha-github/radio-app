import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Collapse, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore, ManageAccounts, MiscellaneousServices, PeopleAlt, PeopleOutline, Person, SwitchAccount } from '@mui/icons-material';

export const MenuAdmin = () => {

    const navigate = useNavigate();
    const [openAdmin, setOpenAdmin] = React.useState(false);
    const handleAdminClick = () => setOpenAdmin(!openAdmin);

    const iconColorAdmin = "info";

    const menuItemsAdmin = [
        { 
          text: 'Usuarios', 
          icon: <Person color={ iconColorAdmin } />, 
          path: 'users',
        },
        { 
          text: 'Roles', 
          icon: <PeopleOutline color={ iconColorAdmin } />, 
          path: 'roles',
        },
        { 
          text: 'Permisos', 
          icon: <ManageAccounts color={ iconColorAdmin } />, 
          path: 'permisos',
        },
        { 
          text: 'Grupos de permisos', 
          icon: <PeopleAlt color={ iconColorAdmin } />, 
          path: 'grupos-permisos', 
        },
        { 
          text: 'Registro de visita', 
          icon: <SwitchAccount color={ iconColorAdmin } />, 
          path: 'visitas', 
        },
      ];

  return (
    <>
        <ListItemButton onClick={handleAdminClick}>
        <ListItemIcon>
          <IconButton color='info'>
            <MiscellaneousServices />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary="Administración" />
        { openAdmin ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openAdmin} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        {menuItemsAdmin.map((item) => (
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
