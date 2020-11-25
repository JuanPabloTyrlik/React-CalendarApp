import React, { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
    const [startDate, setStartDate] = useState(
        moment().minutes(0).seconds(0).toDate()
    );
    const [endDate, setEndDate] = useState(
        moment(startDate).add(1, 'hour').toDate()
    );

    const [formValues, setFormValues] = useState({
        title: 'Evento',
        notes: '',
        start: startDate,
        end: endDate,
    });

    const closeModal = () => {
        // TODO: Close Modal
    };

    const handleStartDate = (e) => {
        setStartDate(e);
        if (e) {
            const newEndDate = moment(e).add(1, 'hours').toDate();
            setEndDate(newEndDate);
            setFormValues({
                ...formValues,
                start: e,
                end: newEndDate,
            });
        } else {
            setFormValues({
                ...formValues,
                start: e,
            });
        }
    };

    const handleEndDate = (e) => {
        setEndDate(e);
        setFormValues({
            ...formValues,
            end: e,
        });
    };

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const momentStart = moment(formValues.start);
        const momentEnd = moment(formValues.end);
        if (!formValues.title) {
            return Swal.fire(
                'Error',
                'El evento debe tener un título',
                'error'
            );
        }
        if (!formValues.end) {
            return Swal.fire(
                'Error',
                'El evento debe tener una fecha de fin',
                'error'
            );
        }
        if (momentEnd.isBefore(momentStart)) {
            return Swal.fire(
                'Error',
                'La fecha de fin debe ser mayor a la inicial',
                'error'
            );
        }
        // TODO: Save to DB
    };

    return (
        <div>
            <Modal
                isOpen={true}
                onRequestClose={closeModal}
                style={customStyles}
                className="modal"
                overlayClassName="modal-fondo"
                closeTimeoutMS={200}
            >
                <h1> Nuevo evento </h1>
                <hr />
                <form className="container" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Fecha y hora inicio</label>
                        <DateTimePicker
                            onChange={handleStartDate}
                            value={startDate}
                            className={`form-control ${
                                startDate ? 'is-valid' : 'is-invalid'
                            }`}
                            required
                            clearIcon={null}
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha y hora fin</label>
                        <DateTimePicker
                            onChange={handleEndDate}
                            value={endDate}
                            minDate={startDate}
                            className={`form-control ${
                                endDate && moment(endDate).isAfter(startDate)
                                    ? 'is-valid'
                                    : 'is-invalid'
                            }`}
                            required
                            clearIcon={null}
                        />
                    </div>

                    <hr />
                    <div className="form-group">
                        <label>Titulo y notas</label>
                        <input
                            type="text"
                            className={`form-control ${
                                formValues.title ? 'is-valid' : 'is-invalid'
                            }`}
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                            value={formValues.title}
                            onChange={handleChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            Una descripción corta
                        </small>
                    </div>

                    <div className="form-group">
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value={formValues.notes}
                            onChange={handleChange}
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">
                            Información adicional
                        </small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
                </form>
            </Modal>
        </div>
    );
};