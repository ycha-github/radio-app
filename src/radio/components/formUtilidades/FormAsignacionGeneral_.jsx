import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { FormAsignaciones } from './FormAsignaciones';
import { FormAsigAccesorio } from './FormAsigAccesorio';
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export  const FormAsignacionGeneral=()=> {
  const [value, setValue] = useState(0);
  const [tableData, setTableData] = useState([])
  const [tableSue, setTableSue] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/api/v0/usuarios').
        then((response) => {
           return setTableData(response.data);
        });
    }, []);

    useEffect(() => {
    axios.get('http://localhost:8000/api/v0/radios/filtrado').
        then((response) => {
            setTableSue(response.data);
        });
}, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <ModalRadio >
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Asignar a Usuario" {...a11yProps(0)} />
          <Tab label="Asignar Accesorio" {...a11yProps(1)} />
          <Tab label="Asignar a Vehiculo" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/* <FormAsignaciones usuario={tableData} radio={tableSue} /> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
      Asignar a Vehiculo
        {/* <FormAsigAccesorio radio={tableSue} /> */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        Asignar a Vehiculo
      </TabPanel>
    </Box>
    </ModalRadio>
  );
}