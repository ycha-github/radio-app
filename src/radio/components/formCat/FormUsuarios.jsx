import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useUsuariosStore } from '../../../hooks/hooksCatalogo/useUsuariosStore';
import { useModalHook } from '../../../hooks/useModalHook';
import radioApi from '../../../api/radioApi';
import { useConfigReportesStore } from '../../../hooks/hooksAdministracion/useConfigReportesStore';

export const FormUsuarios = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [puestoUsuario, setPuestoUsuario] = useState([]);
   const { CloseModal, isActualizar, mostrarGuardar } = useModalHook();
    const { activeEvent, startSavingEvent,subirImagen,subirImagen2 } = useUsuariosStore();
    const [archivo1, setArchivo1] = useState(
        {
            archivo:"",
        });
        const [archivo2, setArchivo2] = useState(
        {
            archivo:"",
        });
        const [inputValue1, setInputValue1] = useState('');
        const [idIne, setIdIne]= useState({});
        const [idCuip, setIdCuip]= useState({});

        useEffect(() => {
            radioApi.get(`/documentos/ine`).
                  then((response) => {
                    // console.log(response.data);
                    setIdIne(response.data.documentos[0].iddocumentos);
                  });
              }, []);
        useEffect(() => {
            radioApi.get(`/documentos/cuip`).
                  then((response) => {
                    // console.log(response.data);
                    setIdCuip(response.data.documentos[0].iddocumentos);
                  });
              }, []);
              //console.log(idIne.documentos[0].iddocumentos);
 //         console.log(puestoUsuario)
    //let idIneFinal=idIne.documentos[0].iddocumentos; 
//console.log(idIne)
    const [formValues, setFormValues] = useState({
        nombre:'',
      apellido_pat:'',
      apellido_mat:'',
      fk_puesto:'',
      nombrePuesto:'',
      cuip:'',
      clave_elector:'',
      imagen_ine:'',
      fk_documento_ine:null,
      imagen_cuip:'',
      fk_documento_cuip:null,
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

    useEffect(() => {
        radioApi.get(`/puestos/estatus/`).
              then((response) => {
                setPuestoUsuario(response.data);
              });
          }, []);

    const onSubmit = async (event) => {
        //console.log(event)
        event.preventDefault();
        setFormSubmitted(true);
        if (formValues.nombre.length <= 0) return;
        // console.log(formValues);
        //TODO:
        const formData = new FormData()
        formData.append('archivo', archivo1.archivo)
        subirImagen(formData);
        const formData2 = new FormData()
        formData2.append('archivo', archivo2.archivo)
        subirImagen2(formData2);
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
                                required
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
                                required
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
                                required
                                color='warning'
                                label="Apellido Materno"
                                variant="outlined"
                                value={formValues.apellido_mat}
                                onChange={handleInputChange} />
                        </Grid>
                        {/* <Grid item >
                            <FormControl fullWidth sx={{ border: 'none',  mb: 1, width: 400 }}>
                                <InputLabel id="fk_puesto-input" color='warning'>Puesto</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="fk_puesto-input"
                                    name="fk_puesto"
                                    required
                                    color='warning'
                                    value={formValues.fk_puesto}
                                    label="Puesto"
                                    onChange={handleInputChange}>
                                        {
                                        puestoUsuario.map(elemento=>{
                                          return <MenuItem key={elemento.idpuesto} value={elemento.idpuesto} >{elemento.nombre}</MenuItem> 
                                        })}
                                </Select>
                            </FormControl>
                        </Grid> */}
                         {isActualizar?
                        (<Grid item xs={6}>
                            <Autocomplete
                                    name="fk_puesto"
                                    required
                                    value={formValues}
                                    sx={{ width: 400, mb:1 }}
                                    onChange={(event, newFormValues1) => {
                                        setFormValues({
                                            ...formValues,
                                            ['fk_puesto']: newFormValues1.idpuesto,
                                            ['nombrePuesto']: newFormValues1.nombrePuesto,
                                        });
                                    }}
                                    inputValue={inputValue1}
                                    onInputChange={(event, newInputValue1) => {
                                        setInputValue1(newInputValue1);
                                    }}
                                    options={puestoUsuario}
                                    getOptionLabel={(puestoUsuario) => puestoUsuario.nombrePuesto+ " | "+puestoUsuario.nombreCorporacion || ""}
                                    //isOptionEqualToValue={(option, value) =>{
                                    //    option.serie === value.serie
                                    //    //console.log(option.serie);
                                    //    //console.log(value.serie_radio);
                                    //}}
                                    renderInput={(params) => <TextField  {...params} variant="outlined" color='warning' label="Puesto" />}       
                            />
                            </Grid>):
                            (<Grid item xs={6}>
                                <Autocomplete
                                        name="fk_puesto"
                                        required
                                        options={puestoUsuario}
                                        getOptionLabel={(puestoUsuario) => puestoUsuario.nombrePuesto+ " | "+puestoUsuario.nombreCorporacion || ""}
                                        sx={{ width: 400, mb:1 }}
                                        onChange={(event, newFormValues) => {
                                            setFormValues({
                                                ...formValues,
                                                ['fk_puesto']: newFormValues.idpuesto,
                                            });
                                        }}
                                        renderInput={(params) => <TextField  {...params} variant="outlined" color='warning' label="Puesto" />}       
                                />
                                </Grid>)
                            } 
                        <Grid item>
                            <TextField
                                id="cuip-input"
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                type="text"
                                name="cuip"
                                required
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
                                required
                                color='warning'
                                label="Clave Elector"
                                variant="outlined"
                                value={formValues.clave_elector}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                        <Box sx={{ border: '1px solid', width: 400, borderRadius: 2, borderColor: 'rgb(192, 192, 192)',  mb: 1, pl:1 }}>
                                            <TextField
                                                id="imagen_ine-input"
                                                type="file"
                                                name="imagen_ine"
                                                color={"warning"}
                                                label="Imagen INE"
                                                variant="standard"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                onChange={({target})=>{
                                                    // console.log(target.files);
                                                    setFormValues({
                                                        ...formValues,
                                                        ['imagen_ine']: target.value,
                                                        //["fk_documento_ine"]:idIne,
                                                        
                                                    });
                                                    //subirImagen(event.target.files)
                                                    setArchivo1({
                                                        ...archivo1,
                                                       ['archivo']: target.files[0]});
                                                }}
                                            />
                                           <TextField 
                                                disabled
                                                 id='imagen_ine-input'
                                                type="text"
                                                variant='standard'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                               value={formValues.imagen_ine}
                                            />
                                        </Box>
                        </Grid>
                        <Grid item>
                        <Box sx={{ border: '1px solid', width: 400, borderRadius: 2, borderColor: 'rgb(192, 192, 192)',  mb: 1, pl:1 }}>
                                            <TextField
                                                id="imagen_cuip-input"
                                                type="file"
                                                name="imagen_cuip"
                                                color={"warning"}
                                                label="Imagen CUIP"
                                                variant="standard"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                onChange={({target})=>{
                                                    // console.log(target.files);
                                                    setFormValues({
                                                        ...formValues,
                                                        ['imagen_cuip']: target.value,
                                                        //["fk_documento_cuip"]:idCuip,
                                                        
                                                    });
                                                    //subirImagen(event.target.files)
                                                    setArchivo2({
                                                        ...archivo2,
                                                       ['archivo']: target.files[0]});
                                                }}
                                            />
                                           <TextField 
                                                disabled
                                                 id='imagen_cuip-input'
                                                type="text"
                                                variant='standard'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                               value={formValues.imagen_cuip}
                                            />
                                        </Box>
                        </Grid>
                        <Grid item>
                            <TextField
                                id="titulo-input"
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                type="text"
                                name="titulo"
                                required
                                color='warning'
                                label="Titulo"
                                variant="outlined"
                                value={formValues.titulo}
                                onChange={handleInputChange} />
                        </Grid>
                        {/* <Grid item>
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
                        </Grid> */}
                        <Button variant="contained" sx={{  width: 400 }} color="warning" type="submit" onClick={() => mostrarGuardar()}>
                            {isActualizar ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Grid>
                </form>
            </ModalRadio>
        </>
    )
}