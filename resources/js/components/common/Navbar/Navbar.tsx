import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";

const Navbar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>Warhammer Ships</div>
            {user && (
                <>
                    <ul className={styles.navLinks}>
                        <li>
                            <Link to="/" className={styles.link}>
                                Главная
                            </Link>
                        </li>
                        <li>
                            <Link to="/ships" className={styles.link}>
                                Список кораблей
                            </Link>
                        </li>
                        <li>
                            <Link to="/ships/create" className={styles.link}>
                                Создать корабль
                            </Link>
                        </li>
                    </ul>
                    <div className={styles.userSection}>
                        <button
                            onClick={handleLogout}
                            className={styles.logoutButton}
                        >
                            Выйти из аккаунта
                        </button>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Navbar;
