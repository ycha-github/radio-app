import * as React from 'react';
import List from '@mui/material/List';
import { IconButton } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ArtTrack, Assignment, AssignmentIndRounded, AutorenewRounded, Battery6Bar,BookmarkBorder, BusinessCenterTwoTone, DescriptionOutlined, DirectionsCarFilledOutlined, LibraryBooksRounded, LocalPolice, LockReset, LogoutTwoTone, ManageAccounts, MenuBook, MiscellaneousServices, PeopleAlt, PeopleOutline, Person, ShoppingBagTwoTone, SmartphoneTwoTone, SouthAmericaTwoTone, SwitchAccount, TextFieldsRounded, WorkRounded } from '@mui/icons-material';
import { RadioPage } from '../pages/RadioPage';
import { RadioPage2 } from '../pages/RadioPage2';

export const NestedList = () => {
  
  const [openAdmin, setOpenAdmin] = React.useState(false);
  const [openCat, setOpenCat] = React.useState(false);
  const [openUti, setOpenUti] = React.useState(false);

  const handleAdminClick = () => setOpenAdmin(!openAdmin);
  const handleCatClick = () => setOpenCat(!openCat);
  const handleUtiClick = () => setOpenUti(!openUti);
  

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader" 
    >
      {/*          Administración             */}
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

          <ListItemButton sx={{ pl: 4 }} >
            <ListItemIcon>
              <IconButton  color='info'>
                <Person />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <IconButton color='info'>
                <PeopleOutline />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Roles" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <IconButton color='info'>
                <ManageAccounts />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Permisos" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <IconButton color='info'>
                <PeopleAlt />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Grupos de permisos" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <IconButton color='info'>
                <SwitchAccount />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Registro de visita" />
          </ListItemButton>

        </List>
      </Collapse>

      {/*             Catálogos             */}
      <ListItemButton onClick={handleCatClick}>
        <ListItemIcon>
          <IconButton color='warning'>
            <MenuBook />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary="Cátalogos" />
        {openCat ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openCat} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          <ListItemButton sx={{ pl: 4 }} onClick={ <RadioPage />}>
            <ListItemIcon>
              <IconButton color='warning'>
                <Battery6Bar />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Accesorios" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={ <RadioPage2 /> }>
            <ListItemIcon>
              <IconButton color='warning'>
                <LocalPolice />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Corporaciones" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <IconButton color='warning'>
                <BookmarkBorder />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Marcas" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <IconButton color='warning'>
                <BusinessCenterTwoTone />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Puestos" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <IconButton color='warning'>
                <SmartphoneTwoTone />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Radios" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <IconButton color='warning'>
                <WorkRounded />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Recursos" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <IconButton color='warning'>
                <LibraryBooksRounded />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Servicios" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <IconButton color='warning'>
                <AutorenewRounded />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Estatus" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <IconButton color='warning'>
                <TextFieldsRounded />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Tipos" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <IconButton color='warning'>
                <Person />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <IconButton color='warning'>
                <DirectionsCarFilledOutlined />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Vehículos" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <IconButton color='warning'>
                <SouthAmericaTwoTone />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Zonas-Regiones" />
          </ListItemButton>

        </List>
      </Collapse>

      {/*             Utilidades          */}
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

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <IconButton color='secondary'>
                <AssignmentIndRounded />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Asignaciones" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <IconButton color='secondary'>
                <DescriptionOutlined />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Hoja de servicio" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <IconButton color='secondary'>
                <Assignment />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Historial de entradas" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <IconButton color='secondary'>
                <ArtTrack />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Configuración de reportes" />
          </ListItemButton>
          
        </List>
      </Collapse>

      <ListItemButton>
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
