import { Autocomplete, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { usePuestosStore } from '../../../hooks/hooksCatalogo/usePuestosStore';
import { useModalHook } from '../../../hooks/useModalHook';
import axios from 'axios';
import { radioApi } from '../../../api';

export const FormPuestos = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [tableData, setTableData] = useState([])
    const [inputValue1, setInputValue1] = useState('');
    const [formValues, setFormValues] = useState({
        nombre:'',
        nombreCorporacion:'',
        fk_corporacion:'',
        estatus:'',
        createdAt:'',
        updatedAt:'',
    });

    useEffect(() => {
        radioApi.get('/corporaciones/estatus/').
      then((response)=>{
        setTableData(response.data);
      });
     }, []);
 
    const {CloseModal, isActualizar, mostrarGuardar}=useModalHook();
    const { activeEvent, startSavingEvent }=usePuestosStore();

    useEffect(() => {
        if ( activeEvent !== null ) {
            setFormValues({ ...activeEvent });
        }
      }, [ activeEvent ])

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const onSubmit = async(event) => {
        //console.log(event)
        event.preventDefault();
        setFormSubmitted(true);

        if (formValues.nombre.length <= 0 )return;
        // console.log(formValues);
        //TODO:
        await startSavingEvent(formValues);
        CloseModal();
        setFormSubmitted(false);
    };

    return (
        <>
            <ModalRadio >
                <Typography variant='h5'>  {isActualizar? 'Actualizando Puesto' : 'Nuevo Puesto'} </Typography>
                <form onSubmit={onSubmit}>
                        <Grid container alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <TextField
                                id="nombre-input"
                                sx={{ border: 'none', mb: 1, mt: 2, width: 500 }}
                                type="text"
                                name="nombre"
                                color='warning'
                                label="Nombre"
                                variant="outlined"
                                value={formValues.nombre}
                                onChange={handleInputChange} />
                        </Grid>
                        {/* <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="fk_corporacion-input" color='warning'>Corporaciones</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="fk_corporacion-input"
                                    name="fk_corporacion"
                                    required
                                    color='warning'
                                    value={formValues.fk_corporacion}
                                    label="Nombre Corporacion"
                                    onChange={handleInputChange}>
                                    {
                                        tableData.map(elemento=>{
                                          return <MenuItem key={elemento.idcorporaciones} value={elemento.idcorporaciones} >{elemento.nombreCorporacion}</MenuItem> 
                                        })}
                                </Select>
                            </FormControl>
                        </Grid> */}
                        {isActualizar?
                        (<Grid item xs={6}>
                            <Autocomplete
                                    name="fk_corporacion"
                                    value={formValues}
                                    sx={{ width: 500, mb:1 }}
                                    onChange={(event, newFormValues1) => {
                                        setFormValues({
                                            ...formValues,
                                            ['fk_corporacion']: newFormValues1.idcorporaciones,
                                             ['nombreCorporacion']: newFormValues1.nombreCorporacion,
                                        });
                                    }}
                                    inputValue={inputValue1}
                                    onInputChange={(event, newInputValue1) => {
                                        setInputValue1(newInputValue1);
                                    }}
                                    options={tableData}
                                    getOptionLabel={(tableData) => tableData.nombreCorporacion || ""}
                                    //isOptionEqualToValue={(option, value) =>{
                                    //    option.serie === value.serie
                                    //    //console.log(option.serie);
                                    //    //console.log(value.serie_radio);
                                    //}}
                                    renderInput={(params) => <TextField  {...params} variant="outlined" color='warning' label="Corporaciones" />}       
                            />
                            </Grid>):
                            (<Grid item xs={6}>
                                <Autocomplete
                                        name="fk_corporacion"
                                        options={tableData}
                                        getOptionLabel={(tableData) => tableData.nombreCorporacion || ""}
                                        sx={{ width: 500, mb:1 }}
                                        onChange={(event, newFormValues) => {
                                            setFormValues({
                                                ...formValues,
                                                ['fk_corporacion']: newFormValues.idcorporaciones,
                                            });
                                        }}
                                        renderInput={(params) => <TextField  {...params} variant="outlined" color='warning' label="Corporaciones" />}       
                                />
                                </Grid>)
                            } 
                        {/* <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="estatus-input" color='warning'>Estatus</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="estatus-input"
                                    name="estatus"
                                    color='warning'
                                    value={formValues.estatus}
                                    label="Estatus"
                                    onChange={handleInputChange}>
                                    <MenuItem value={true}>Activo</MenuItem>
                                    <MenuItem value={false}>Inactivo</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid> */}
                        <Button variant="contained" color="warning" type="submit" onClick={mostrarGuardar} sx={{  width: 400 }} >
                        {isActualizar? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Grid>
                </form>
            </ModalRadio>
        </>
    )
}