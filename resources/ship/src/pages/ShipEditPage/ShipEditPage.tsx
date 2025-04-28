import { Ship } from 'types/shipTypes';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './ShipEditPage.module.css';
import {AppDispatch, RootState} from "store";
import {saveShip} from "store/slices/shipsSlice";
import {useParams} from "react-router-dom";

interface ShipEditPageProps {
  onSaveSuccess: () => void;
  onCancel: () => void;
}

const ShipEditPage: React.FC<ShipEditPageProps> = ({ onSaveSuccess, onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const ships = useSelector((state: RootState) => state.ships.ships);
  const ship = ships.find((s) => s.id === id);

  const [editedShip, setEditedShip] = useState<Ship | null>(ship || null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  if (!ship || !editedShip) {
      return <div>Корабль не найден</div>;
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditedShip({ ...editedShip, name: e.target.value });
  };

  const handleSave = async () => {
      setIsSaving(true);
      setError('');
      try {
          await dispatch(saveShip(editedShip)).unwrap();
          onSaveSuccess();
      } catch (err) {
          setError('Не удалось сохранить корабль.');
          console.error(err);
      } finally {
          setIsSaving(false);
      }
  };

  return (
      <div className={styles.container}>
          <h1 className={styles.title}>Редактирование корабля</h1>
          <div className={styles.section}>
              <div className={styles.field}>
                  <label className={styles.label}>Название:</label>
                  <input
                      type="text"
                      value={editedShip.name}
                      onChange={handleNameChange}
                      className={styles.input}
                  />
              </div>
              <div className={styles.field}>
                  <label className={styles.label}>Класс:</label>
                  <span className={styles.value}>{editedShip.classShip}</span>
              </div>
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <div className={styles.actionButtons}>
              <button onClick={onCancel} className={styles.cancelButton}>
                  Отмена
              </button>
              <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={styles.saveButton}
              >
                  {isSaving ? 'Сохранение...' : 'Сохранить'}
              </button>
          </div>
      </div>
  );
};

export default ShipEditPage;
