import React, { useState } from 'react';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

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
        isValidLoginForm();
        dispatch(startLogin(Lemail, Lpassword));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        isValidRegisterForm();
        dispatch(startRegister(Rname, Remail, Rpassword));
    };

    const isValidLoginForm = () => {
        if (!validator.isEmail(Lemail)) {
            setErrors({ ...errors, Lemail: true });
            return false;
        }
        if (Lpassword.trim().length < 8) {
            setErrors({ ...errors, Lpassword: true });
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
            return false;
        }
        if (!validator.isEmail(Remail)) {
            setErrors({ ...errors, Remail: true });
            return false;
        }
        if (Rpassword.trim().length < 8 || Rpassword.trim().length > 32) {
            setErrors({ ...errors, Rpassword: true });
            return false;
        }
        if (!/[0-9]/.test(Rpassword)) {
            setErrors({ ...errors, Rpassword: true });
            return false;
        }
        if (!/[a-z]/.test(Rpassword)) {
            setErrors({ ...errors, Rpassword: true });
            return false;
        }
        if (!/[A-Z]/.test(Rpassword)) {
            setErrors({ ...errors, Rpassword: true });
            return false;
        }
        if (!/[*.!@$%^&(){}[\]:;,.?/\\~_+\-=|]/.test(Rpassword)) {
            setErrors({ ...errors, Rpassword: true });
            return false;
        }
        if (Rpassword !== Rpassword2) {
            setErrors({ ...errors, Rpassword: true });
            setErrors({ ...errors, Rpassword2: true });
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
