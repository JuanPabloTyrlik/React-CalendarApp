import React, { useState } from 'react';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';
import Swal from 'sweetalert2';

export const LoginScreen = () => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({
        Lemail: false,
        Lpassword: false,
        Rname: false,
        Remail: false,
        Rpassword: false,
        Rpassword2: false,
    });

    const [loginForm, handleLoginChange] = useForm({
        Lemail: '',
        Lpassword: '',
    });

    const [registerForm, handleRegisterChange] = useForm({
        Rname: '',
        Remail: '',
        Rpassword: '',
        Rpassword2: '',
    });

    const { Lemail, Lpassword } = loginForm;
    const { Rname, Remail, Rpassword, Rpassword2 } = registerForm;

    const handleLogin = (e) => {
        e.preventDefault();
        if (isValidLoginForm()) {
            dispatch(startLogin(Lemail, Lpassword));
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (isValidRegisterForm()) {
            dispatch(startRegister(Rname, Remail, Rpassword));
        }
    };

    const isValidLoginForm = () => {
        if (!validator.isEmail(Lemail)) {
            setErrors({ ...errors, Lemail: true });
            Swal.fire('Error', 'Email must be valid', 'error');
            return false;
        }
        if (Lpassword.trim().length < 8) {
            setErrors({ ...errors, Lpassword: true });
            Swal.fire(
                'Error',
                'Password must be at least 8 characters',
                'error'
            );
            return false;
        }
        setErrors({
            Lemail: false,
            Lpassword: false,
            Rname: false,
            Remail: false,
            Rpassword: false,
            Rpassword2: false,
        });
        return true;
    };

    const isValidRegisterForm = () => {
        if (/^\s*$/.test(Rname)) {
            setErrors({ ...errors, Rname: true });
            Swal.fire('Error', 'Name cannot be empty', 'error');
            return false;
        }
        if (!validator.isEmail(Remail)) {
            setErrors({ ...errors, Remail: true });
            Swal.fire('Error', 'Email must be valid', 'error');
            return false;
        }
        if (Rpassword.trim().length < 8 || Rpassword.trim().length > 32) {
            setErrors({ ...errors, Rpassword: true });
            Swal.fire(
                'Error',
                'Password must be at least 8 characters and less that 32 characters',
                'error'
            );
            return false;
        }
        if (!/[0-9]/.test(Rpassword)) {
            setErrors({ ...errors, Rpassword: true });
            Swal.fire('Error', 'Password must contain a number', 'error');
            return false;
        }
        if (!/[a-z]/.test(Rpassword)) {
            setErrors({ ...errors, Rpassword: true });
            Swal.fire(
                'Error',
                'Password must contain a lower case letter',
                'error'
            );
            return false;
        }
        if (!/[A-Z]/.test(Rpassword)) {
            setErrors({ ...errors, Rpassword: true });
            Swal.fire(
                'Error',
                'Password must contain an upper case letter',
                'error'
            );
            return false;
        }
        if (!/[*.!@$%^&(){}[\]:;,.?/\\~_+\-=|]/.test(Rpassword)) {
            setErrors({ ...errors, Rpassword: true });
            Swal.fire(
                'Error',
                'Password must contain a special character',
                'error'
            );
            return false;
        }
        if (Rpassword !== Rpassword2) {
            setErrors({ ...errors, Rpassword: true });
            setErrors({ ...errors, Rpassword2: true });
            Swal.fire('Error', "Passwords don't match", 'error');
            return false;
        }
        setErrors({
            Lemail: false,
            Lpassword: false,
            Rname: false,
            Remail: false,
            Rpassword: false,
            Rpassword2: false,
        });
        return true;
    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className={
                                    errors.Lemail
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                placeholder="Correo"
                                name="Lemail"
                                value={Lemail}
                                onChange={handleLoginChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className={
                                    errors.Lpassword
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                placeholder="Contraseña"
                                name="Lpassword"
                                value={Lpassword}
                                onChange={handleLoginChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className={
                                    errors.Rname
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                placeholder="Nombre"
                                name="Rname"
                                value={Rname}
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className={
                                    errors.Remail
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                placeholder="Correo"
                                name="Remail"
                                value={Remail}
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className={
                                    errors.Rpassword
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                placeholder="Contraseña"
                                name="Rpassword"
                                value={Rpassword}
                                onChange={handleRegisterChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className={
                                    errors.Rpassword2
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                placeholder="Repita la contraseña"
                                name="Rpassword2"
                                value={Rpassword2}
                                onChange={handleRegisterChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
