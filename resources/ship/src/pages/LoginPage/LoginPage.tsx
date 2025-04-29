import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'hooks/useAppDispatch';
import styles from './LoginPage.module.css';
import {SubmitHandler, useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {RootState} from "store";
import {useAuth} from "hooks/useAuth";
import {fetchShips} from "store/slices/shipsSlice";

interface LoginFormInputs {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);
  const { handleLogin } = useAuth();

  const {
      register,
      handleSubmit,
      formState: { errors }
  } = useForm<LoginFormInputs>();

  const onSubmitAuthorizationForm: SubmitHandler<LoginFormInputs> = async (data) => {
      const isLoginSuccessful = await handleLogin(data.username, data.password);
      if (isLoginSuccessful) {
          dispatch(fetchShips());
          navigate('/ships');
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
