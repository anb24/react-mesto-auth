import React from 'react';
import {Link} from 'react-router-dom';

function Register({ onRegister, name, isLoading, onAuthState }) {

    function handleRegisterSubmit(e) {
        e.preventDefault();
        onRegister();
    }

    return (
        <main className="content">
            <section className="register">
                <h2 className="register__title">Регистрация</h2>
                <form action="#"
                      onSubmit={handleRegisterSubmit}
                      className="form form_type_register"
                      id={`${name}Form`}
                      data-form={name}
                      method="post"
                      noValidate>
                    <label className="form__label">
                        <input className="form__input form__input_type_register"
                               type="email"
                               name="email"
                               placeholder="Email"
                               minLength="2"
                               maxLength="40"
                               required
                               id="email-input"

                        />
                        <span className="form__input-error form__input-error_type_register"></span>
                    </label>
                    <label className="form__label">
                        <input className="form__input form__input_type_register"
                               type="password"
                               name="password"
                               placeholder="Пароль"
                               minLength="2"
                               maxLength="40"
                               required
                               id="password-input"
                        />
                        <span className="form__input-error form__input-error_type_register"></span>
                    </label>
                    <input className="form__submit-button form__submit-button_type_register"
                           type="submit"
                           name="submit"
                           value={`${isLoading ? 'Регистрация' : 'Зарегистрироваться'}`}
                    />
                </form>
                <div className="register__signin">
                    <p className="register__question">Уже зарегистрированы?</p>
                    <Link to="/sign-in" className="register__login-link">Войти</Link>
                </div>
            </section>
        </main>
    );
}

export default Register;