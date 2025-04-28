import { Ship } from 'types/shipTypes';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './ShipEditPage.module.css';
import {AppDispatch} from "store";
import {saveShip} from "store/slices/shipsSlice";

interface ShipEditPageProps {
  ship: Ship;
  onSaveSuccess: () => void;
  onCancel: () => void;
}

const ShipEditPage: React.FC<ShipEditPageProps> = ({ ship: initialShip, onSaveSuccess, onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [ship, setShip] = useState<Ship>(initialShip);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    try {
      await dispatch(saveShip(ship)).unwrap();
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
            value={ship.name}
            onChange={(e) => setShip({ ...ship, name: e.target.value })}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Класс:</label>
          <span className={styles.value}>{ship.classShip}</span>
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
