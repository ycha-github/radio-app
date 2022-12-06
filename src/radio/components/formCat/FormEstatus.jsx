import { Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useEstatusStore } from '../../../hooks/hooksCatalogo/useEstatusStore';
import { useModalHook } from '../../../hooks/useModalHook';

export const FormEstatus = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        nombreStatus:'',
        createdAt:'',
        updatedAt:'',
    });

    const { CloseModal, isActualizar } = useModalHook();
    const { activeEvent, startSavingEvent } = useEstatusStore();

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
        if (formValues.nombreStatus.length <= 0) return;
        console.log(formValues);
        //TODO:
        await startSavingEvent(formValues);
        CloseModal();
        setFormSubmitted(false);
    };

    return (
        <>
            <ModalRadio >
                <Typography variant='h5'> Nuevo Estatus </Typography>
                <form onSubmit={onSubmit}>
                    <Grid container alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <TextField
                                id="nombreStatus-input"
                                sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                type="text"
                                name="nombreStatus"
                                color='warning'
                                label="Estatus"
                                variant="outlined"
                                value={formValues.nombreStatus}
                                onChange={handleInputChange} />
                        </Grid>
                        <Button variant="contained" color="warning" type="submit" >
                            {isActualizar ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Grid>
                </form>
            </ModalRadio>
        </>
    )
}