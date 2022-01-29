import React from 'react';
import {Link} from 'react-router-dom';

function Login({ onLogin, name, isLoading, onAuthState }) {

    React.useEffect(() => {
        onAuthState(false);
    }, []);

    function handleLoginSubmit(e) {
        e.preventDefault();
        onLogin();
    }

    return (
        <main className="content">
            <section className="login">
                <h2 className="login__title">Вход</h2>
                <form action="#"
                      onSubmit={handleLoginSubmit}
                      className="form form_type_login"
                      id={`${name}Form`}
                      data-form={name}
                      method="post"
                      noValidate>
                    <label className="form__label">
                        <input className="form__input form__input_type_login"
                               type="email"
                               name="email"
                               placeholder="Email"
                               minLength="2"
                               maxLength="40"
                               required
                               id="email-input"
                        />
                        <span className="form__input-error form__input-error_type_login"></span>
                    </label>
                    <label className="form__label">
                        <input className="form__input form__input_type_login"
                               type="password"
                               name="password"
                               placeholder="Пароль"
                               minLength="2"
                               maxLength="40"
                               required
                               id="password-input"
                        />
                        <span className="form__input-error form__input-error_type_login"></span>
                    </label>
                    <input
                        className="form__submit-button form__submit-button_type_login"
                        type="submit"
                        name="submit"
                        value={`${isLoading ? 'Вход' : 'Войти'}`}
                    />
                </form>
                <div className="login__signin">
                    <p className="login__question">Ещё не зарегистрированы?</p>
                    <Link to="/sign-up" className="login__login-link">Регистрация</Link>
                </div>
            </section>
        </main>
    );
}

export default Login;