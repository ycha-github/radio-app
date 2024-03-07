//  Actualmente no se está usando

import { useEffect, useState } from 'react';
import { Button, Card, CardHeader, Checkbox, Divider, Grid, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { PrintOutlined } from '@mui/icons-material';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TransferList({titulo, listado}) {
  // const listado2 = [] = listado.map((array,index, nombreUsuario)=> {
  //   return listado[index]?.nombreUsuario
  //  });

  const [left, setLeft] = useState(listado);
  // console.log(listado)
  const listado2 = [] = listado.map((array,index, nombreUsuario)=> {
    return listado[index]?.nombreUsuario
   });

  //  useEffect(  onload = () => {
  //   setLeft(listado2);
  //   });

   
  const [checked, setChecked] = useState([]);


  const [right, setRight] = useState([]);

  console.log(left)

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  
  const actualiza = () => {
    setLeft(listado2);
  }

  const customList = (title, items) => (
    <Card  >
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} seleccionados`}
      />
      <Divider />
      <List
        sx={{
          width: 393,
          height: 380,
          // bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={ value } />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid container justifyContent="center" alignItems="center"  >
      <Grid item >{titulo}</Grid>
    <Grid container spacing={2} justifyContent="center" >
      <Grid item xs={3} >{customList('Lista de usuarios', left)}</Grid>
      <Grid item xs={1}>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={3}>{customList('Usuarios seleccionados', right)}</Grid>
    </Grid>
      <Grid item xs={2}>
        <Grid container direction="column" alignItems='center' >
          <Button onClick={actualiza} color={'secondary'} variant="outlined" startIcon={<PrintOutlined/>}>
            Por Usuario
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
