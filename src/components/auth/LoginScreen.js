import React from 'react';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';
import Swal from 'sweetalert2';

export const LoginScreen = () => {
    const dispatch = useDispatch();

    const [loginForm, handleLoginChange] = useForm({
        Lemail: 'juan.pablo@gmail.com',
        Lpassword: 'Ab1-bccH',
    });

    const [registerForm, handleRegisterChange] = useForm({
        Rname: 'Juan Pablo',
        Remail: 'juan.pablo@gmail.com',
        Rpassword: 'Ab1-bccH',
        Rpassword2: 'Ab1-bccH',
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
            Swal.fire('Error', 'Email must be valid', 'error');
            return false;
        }
        if (/^\s*$/.test(Lpassword)) {
            Swal.fire('Error', 'Password must be entered', 'error');
            return false;
        }
        return true;
    };

    const isValidRegisterForm = () => {
        if (/^\s*$/.test(Rname)) {
            Swal.fire('Error', 'Name cannot be empty', 'error');
            return false;
        }
        if (!validator.isEmail(Remail)) {
            Swal.fire('Error', 'Email must be valid', 'error');
            return false;
        }
        if (Rpassword.trim().length <= 5) {
            Swal.fire(
                'Error',
                'Password must be at least 6 characters',
                'error'
            );
            return false;
        }
        if (Rpassword !== Rpassword2) {
            Swal.fire('Error', "Passwords don't match", 'error');
            return false;
        }
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
                                className="form-control"
                                placeholder="Correo"
                                name="Lemail"
                                value={Lemail}
                                onChange={handleLoginChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
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
                                className="form-control"
                                placeholder="Nombre"
                                name="Rname"
                                value={Rname}
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="Remail"
                                value={Remail}
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="Rpassword"
                                value={Rpassword}
                                onChange={handleRegisterChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
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
