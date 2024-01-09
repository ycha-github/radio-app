import  { useState } from "react";
import { Button, Card, Divider, CardHeader, Checkbox, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export const Consultas=()=> {
  const listado = [
        'RFSI', 
        'Tipo', 
        'Serie', 
        'Inventario interno', 
        'Inventario SSYPC', 
        'Usuario', 
        'Puesto', 
        'Corporación', 
        'Siglas Corporación', 
        'Propietario', 
        'Recurso', 
        'Serie bateria', 
        'Serie cargador', 
        'Serie gps', 
        'Unidad'
    ];
  // const listadoTotal = listado.values;

  
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(listado);
  const [right, setRight] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);


  const handleToggle = (value) => () => {
    // const currentIndex = checked.indexOf(value);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    console.log(currentIndex)


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

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} Seleccionados`}
      />
      <Divider />
      <List
        sx={{
          width: 450,
          height: 250,
          bgcolor: 'background.paper',
          overflow: 'auto',   
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          // const labelId = `transfer-list-all-item-${value}-label`;
          const labelId = value;
          console.log(labelId)

          return (
            <ListItem
              key={value}
              role="listitem"
              // button
              onClick={handleToggle(value)}
              sx={{ my:-2 }}
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
              {/* <ListItemText id={labelId} primary={`List item ${value + 1}`} /> */}
              <ListItemText id={labelId} primary={labelId} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <>
      <h2 className='colorUti'>CONSULTAS</h2>
      <Grid container spacing={2} sx={{pt:2}} justifyContent="center" alignItems="center">
        <Grid item >{customList(<div className="textCheck">Campos a considerar</div>, left)}</Grid>
        <Grid item>
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
        <Grid item>{customList(<div className="textCheck">Campos seleccionados para búsqueda</div>, right)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center" sx={{pl:5}}>
            <Button /*onClick={newRow}*/ color={'secondary'} variant="outlined" endIcon={<SearchIcon/>}>
              Buscar
            </Button>
          </Grid>
        </Grid>
      </Grid> 
    </>
  )
}