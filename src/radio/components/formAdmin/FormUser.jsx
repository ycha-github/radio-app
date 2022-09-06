import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { useModalHook } from '../../../hooks/useModalHook';
import { ModalRadio } from '../ModalRadio';

export const FormUser = () => {
    const [isOpen1, onCloseModal1, onOpenModal1] = useModalHook();

    return (
        <>
            <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={onOpenModal1} color={'info'} variant="outlined" startIcon={<AddCircleOutlineOutlined />}>
                    Nuevo
                </Button>
            </Stack>
            <ModalRadio isOpen={isOpen1} onCloseModal={onCloseModal1}>
                <h1> Nuevo evento </h1>
                <hr />
                <form className="container">
                    <div className="form-group mb-2">
                        <label>Fecha y hora inicio</label>
                        <input className="form-control" placeholder="Fecha inicio" />
                    </div>
                    <div className="form-group mb-2">
                        <label>Fecha y hora fin</label>
                        <input className="form-control" placeholder="Fecha inicio" />
                    </div>
                    <hr />
                    <div className="form-group mb-2">
                        <label>Titulo y notas</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                        />
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                    </div>
                    <div className="form-group mb-2">
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
                </form>
            </ModalRadio>
        </>
    )
}