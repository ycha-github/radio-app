import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Collapse, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { AutorenewRounded, Battery6Bar,BookmarkBorder, BusinessCenterTwoTone, DirectionsCarFilledOutlined, ExpandLess, ExpandMore, LibraryBooksRounded, LocalPolice, MenuBook, Person, SmartphoneTwoTone, SouthAmericaTwoTone, TextFieldsRounded, WorkRounded } from '@mui/icons-material';

export const MenuCatalogos = () => {

    const navigate = useNavigate();
    const [openCat, setOpenCat] = React.useState(false);
    const handleCatClick = () => setOpenCat(!openCat);

    const iconColorCat   = "warning";

    const menuItemsCat = [
        { 
          text: 'Accesorios', 
          icon: <Battery6Bar color={ iconColorCat } />, 
          path: '/accesorios' ,
        },
        { 
          text: 'Corporaciones', 
          icon: <LocalPolice color={ iconColorCat } />, 
          path: '/corporaciones', 
        },
        { 
          text: 'Marcas', 
          icon: <BookmarkBorder color={ iconColorCat } />, 
          path: '/marcas', 
        },
        { 
          text: 'Puestos', 
          icon: <BusinessCenterTwoTone color={ iconColorCat } />, 
          path: '/puestos', 
        },
        { 
          text: 'Radios', 
          icon: <SmartphoneTwoTone color={ iconColorCat } />, 
          path: '/radios', 
        },
        { 
          text: 'Recursos', 
          icon: <WorkRounded color={ iconColorCat } />, 
          path: '/recursos', 
        },
        { 
          text: 'Servicios', 
          icon: <LibraryBooksRounded color={ iconColorCat } />, 
          path: '/servicios', 
        },
        { 
          text: 'Estatus', 
          icon: <AutorenewRounded color={ iconColorCat } />, 
          path: '/estatus', 
        },
        { 
          text: 'Tipos', 
          icon: <TextFieldsRounded color={ iconColorCat } />, 
          path: '/tipos', 
        },
        { 
          text: 'Usuarios', 
          icon: <Person color={ iconColorCat } />, 
          path: '/usuarios-radios', 
        },
        { 
          text: 'Vehiculos', 
          icon: <DirectionsCarFilledOutlined color={ iconColorCat } />, 
          path: '/vehiculos', 
        },
        { 
          text: 'Zonas-Regiones', 
          icon: <SouthAmericaTwoTone color={ iconColorCat } />, 
          path: '/zonas-regiones', 
        },
      ];
      

  return (
    <>
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

          {menuItemsCat.map((item) => (
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
