import React, {useEffect, useState} from 'react';
import styles from './ShipListPage.module.css';
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";
import {deleteShip, fetchShips, updateShip} from "store/slices/shipsSlice";
import {useNavigate} from "react-router-dom";
import Modal from "components/common/Modal";

const ShipListPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { ships, error } = useAppSelector((state) => state.ships);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedShip, setSelectedShip] = useState<{ id: string; name: string } | null>(null);

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

    const handleCreateNewShip = () => {
        navigate('/ships/create');
    };

    const handleEdit = (shipId: string, shipName: string) => {
        setSelectedShip({ id: shipId, name: shipName });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedShip(null);
    };

    const handleSaveChanges = async (updatedName: string) => {
        if (!selectedShip) return;

        try {
            await dispatch(
                updateShip({
                    id: selectedShip.id,
                    updatedData: { name: updatedName },
                })
            ).unwrap();
            dispatch(fetchShips());
            handleCloseModal();
        } catch (err) {
            console.error('Ошибка при обновлении корабля:', err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Флот</h1>
                <button onClick={handleCreateNewShip} className={styles.createButton}>
                    Создать новый корабль
                </button>
            </div>
            {error && <p className={styles.error}>{error}</p>}
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
                            <td>{ship.name}</td>
                            <td>
                                <button
                                    onClick={() => handleEdit(ship.id, ship.name)}
                                    className={styles.editButton}
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
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Редактирование корабля"
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const updatedName = formData.get('name') as string;
                        handleSaveChanges(updatedName);
                    }}
                >
                    <label htmlFor="name">Название корабля:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={selectedShip?.name || ''}
                    />
                    <button type="submit">Сохранить</button>
                </form>
            </Modal>
        </div>
    );
};

export default ShipListPage;
