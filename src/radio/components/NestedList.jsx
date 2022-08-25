import React from 'react';
import { IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {  LockReset, LogoutTwoTone } from '@mui/icons-material';
import { MenuAdmin, MenuCatalogos, MenuUtilidades } from './';
import { useNavigate } from 'react-router-dom';


export const NestedList = () => {

  const navigate = useNavigate();

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader" 
    >

      <MenuAdmin />

      <MenuCatalogos /> 

      <MenuUtilidades />

      <ListItemButton onClick={() => navigate('/pass-update')} >
        <ListItemIcon>
          <IconButton color='success'>
            <LockReset />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary="Cambiar contraseña" />
      </ListItemButton>

      <ListItemButton>
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
