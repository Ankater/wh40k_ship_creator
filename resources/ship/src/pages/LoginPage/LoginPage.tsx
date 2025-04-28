import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'hooks/useAppDispatch';
import {login as loginAction} from '../../store/slices/authSlice';
import styles from './LoginPage.module.css';
import {SubmitHandler, useForm} from "react-hook-form";
import {Link} from "react-router-dom";

interface LoginPageProps {
  onLoginSuccess: (username: string, password: string) => Promise<void>;
}

interface LoginFormInputs {
    username: string;
    password: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useSelector((state: any) => state.auth);

  const {
      register,
      handleSubmit,
      formState: { errors }
  } = useForm<LoginFormInputs>();

  const onSubmitAuthorizationForm: SubmitHandler<LoginFormInputs> = async (data) => {
      try {
          await dispatch(loginAction({ username: data.username, password: data.password })).unwrap();
          await onLoginSuccess(data.username, data.password);
      } catch (err) {
          console.error('Ошибка входа:', err);
      }
  };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {user ? (
                    <div className={styles.loggedInContent}>
                        <h1 className={styles.title}>Добро пожаловать!</h1>
                        <div className={styles.actions}>
                            <Link to="/ships/create" className={styles.actionButton}>
                                Создать новый корабль
                            </Link>
                            <Link to="/ships" className={styles.actionButton}>
                                Посмотреть список кораблей
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <h1 className={styles.title}>Авторизация</h1>
                        {error && <p className={styles.error} role="alert">{error}</p>}
                        <form onSubmit={handleSubmit(onSubmitAuthorizationForm)} className={styles.form} aria-disabled={loading}>
                            <fieldset disabled={loading}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="username" className={styles.label}>
                                        Логин
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        {...register('username', { required: 'Логин обязателен' })}
                                        className={styles.input}
                                        placeholder="Введите логин"
                                        aria-label="Логин"
                                    />
                                    {errors.username && <p className={styles.error}>{errors.username.message}</p>}
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="password" className={styles.label}>
                                        Пароль
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        {...register('password', { required: 'Пароль обязателен' })}
                                        className={styles.input}
                                        placeholder="Введите пароль"
                                        aria-label="Пароль"
                                    />
                                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                                </div>
                                <button type="submit" className={styles.submitButton}>
                                    {loading ? 'Загрузка...' : 'Войти'}
                                </button>
                            </fieldset>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
