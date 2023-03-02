import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useUsuariosStore } from '../../../hooks/hooksCatalogo/useUsuariosStore';
import { useModalHook } from '../../../hooks/useModalHook';

export const FormUsuarios = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);
   const { CloseModal, isActualizar, mostrarGuardar } = useModalHook();
    const { activeEvent, startSavingEvent } = useUsuariosStore();
    const [formValues, setFormValues] = useState({
        nombre:'',
      apellido_pat:'',
      apellido_mat:'', 
      cuip:'',
      clave_elector:'',
      imagen_ine:'',
      imagen_cuip:'',
      titulo:'',
      estatus:'',
      createdAt:'',
      updatedAt:'',
    });

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent])

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const onSubmit = async (event) => {
        //console.log(event)
        event.preventDefault();
        setFormSubmitted(true);

        if (formValues.nombre.length <= 0) return;
        console.log(formValues);
        //TODO:
        await startSavingEvent(formValues);
        CloseModal();
        setFormSubmitted(false);
    };
    const btn =()=>{
        mostrarGuardar();
    }

    return (
        <>
            <ModalRadio >
                <Typography variant='h5'> {isActualizar? 'Actualizando Usuario' : 'Nuevo Usuario'} </Typography>
                <form onSubmit={onSubmit}>
                    <Grid container alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <TextField
                                id="nombre-input"
                                sx={{ border: 'none', mb: 1, mt: 2, width: 400 }}
                                type="text"
                                name="nombre"
                                color='warning'
                                label="Nombre"
                                variant="outlined"
                                value={formValues.nombre}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="apellido_pat-input"
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                type="text"
                                name="apellido_pat"
                                color='warning'
                                label="Apellido Paterno"
                                variant="outlined"
                                value={formValues.apellido_pat}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="apellido_mat-input"
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                type="text"
                                name="apellido_mat"
                                color='warning'
                                label="Apellido Materno"
                                variant="outlined"
                                value={formValues.apellido_mat}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="cuip-input"
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                type="text"
                                name="cuip"
                                color='warning'
                                label="Cuip"
                                variant="outlined"
                                value={formValues.cuip}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="clave_elector-input"
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                type="text"
                                name="clave_elector"
                                color='warning'
                                label="Clave Elector"
                                variant="outlined"
                                value={formValues.clave_elector}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="imagen_ine-input"
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                type="text"
                                name="imagen_ine"
                                color='warning'
                                label="Imagen Ine"
                                variant="outlined"
                                value={formValues.imagen_ine}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="imagen_cuip-input"
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                type="text"
                                name="imagen_cuip"
                                color='warning'
                                label="Imagen Cuip"
                                variant="outlined"
                                value={formValues.imagen_cuip}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="titulo-input"
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                type="text"
                                name="titulo"
                                color='warning'
                                label="Titulo"
                                variant="outlined"
                                value={formValues.titulo}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="estatus-input" color='warning'>Estatus</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 400 }}
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
                        </Grid>
                        <Button variant="contained" color="warning" type="submit" onClick={() => mostrarGuardar()}>
                            {isActualizar ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Grid>
                </form>
            </ModalRadio>
        </>
    )
}