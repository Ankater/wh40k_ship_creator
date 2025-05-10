import React, { useEffect } from "react";
import styles from "./ShipListPage.module.css";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { deleteShip, fetchShips } from "@/store/slices/shipsSlice";
import { useNavigate } from "react-router-dom";
import { mockHulls } from "@/api/mockHulls";

/**
 * Страница списка кораблей
 */
const ShipListPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { ships, error } = useAppSelector((state) => state.ships);

    useEffect(() => {
        dispatch(fetchShips());
    }, [dispatch]);

    const handleDelete = async (shipId: string, event: React.MouseEvent) => {
        event.stopPropagation();

        if (window.confirm("Вы уверены, что хотите удалить этот корабль?")) {
            try {
                await dispatch(deleteShip(shipId)).unwrap();
                dispatch(fetchShips());
            } catch (err) {
                console.error("Ошибка при удалении корабля:", err);
            }
        }
    };

    const handleRowClick = (shipId: string) => {
        navigate(`/ships/edit/${shipId}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Флот</h1>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.tableHeader}>Название</th>
                            <th className={styles.tableHeader}>Класс</th>
                            <th className={styles.tableHeader}>Корпус</th>
                            <th className={styles.tableHeader}>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ships.map((ship) => (
                            <tr
                                key={ship.id}
                                className={styles.row}
                                onClick={() => handleRowClick(ship.id)}
                            >
                                <td>{ship.name}</td>
                                <td>{ship.classShip}</td>
                                <td>
                                    {mockHulls.find(
                                        (hull) => hull.id === ship.hull,
                                    )?.name || "Не указан"}
                                </td>
                                <td>
                                    <button
                                        onClick={(event) =>
                                            handleDelete(ship.id, event)
                                        }
                                        className={styles.deleteButton}
                                    >
                                        &times;
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShipListPage;
