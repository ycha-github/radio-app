import React from 'react';
import { IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {  LockReset, LogoutTwoTone } from '@mui/icons-material';
import { MenuAdmin, MenuCatalogos, MenuUtilidades } from './';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks';

export const NestedList = () => {

  const navigate = useNavigate();
  const {startLogout, user}= useAuthStore();

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader" 
    >
{user.rol=== 1? 
  <MenuAdmin />
  :
  ""
} 
      

      <MenuCatalogos /> 

      <MenuUtilidades />

      <ListItemButton onClick={() => navigate('pass-update')} >
        <ListItemIcon>
          <IconButton color='success'>
            <LockReset />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary="Cambiar contraseña" />
      </ListItemButton>

      <ListItemButton onClick={startLogout}>
        <ListItemIcon>
          <IconButton color='error'>
            <LogoutTwoTone />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary="Cerrar sesión" />
      </ListItemButton>

    </List>
  )
}
