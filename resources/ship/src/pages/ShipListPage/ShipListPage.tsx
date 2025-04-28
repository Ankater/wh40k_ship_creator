import React, { useEffect } from 'react';
import styles from './ShipListPage.module.css';
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";
import {deleteShip, fetchShips} from "store/slices/shipsSlice";


interface ShipListPageProps {
  onEdit: (shipId: string) => void;
  onCreateNew: () => void;
}

const ShipListPage: React.FC<ShipListPageProps> = ({ onEdit, onCreateNew }) => {
  const dispatch = useAppDispatch();
  const { ships, loading, error } = useAppSelector((state) => state.ships);

  useEffect(() => {
    dispatch(fetchShips());
  }, [dispatch]);

  const handleDelete = async (shipId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот корабль?')) {
      try {
        await dispatch(deleteShip(shipId)).unwrap();
        dispatch(fetchShips());
      } catch (err) {
        console.error('Ошибка при удалении корабля:', err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Флот</h1>
        <button onClick={onCreateNew} className={styles.createButton}>
          Создать новый корабль
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {loading && <p>Загрузка...</p>}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Название</th>
              <th className={styles.tableHeader}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {ships.map((ship) => (
              <tr key={ship.id} className={styles.row}>
                <td onClick={() => onEdit(ship.id)}>{ship.name}</td>
                <td>
                  <button
                    onClick={() => onEdit(ship.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(ship.id)}
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
