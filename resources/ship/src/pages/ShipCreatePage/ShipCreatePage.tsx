import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './ShipCreatePage.module.css';
import {AppDispatch} from "store/";
import {createShip} from "store/slices/shipsSlice";

interface ShipCreatePageProps {
  onSaveSuccess: () => void;
  onCancel: () => void;
}

const ShipCreatePage: React.FC<ShipCreatePageProps> = ({ onSaveSuccess, onCancel }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState('');
    const [classShip, setClassShip] = useState('');
    const [speed, setSpeed] = useState<number | undefined>(undefined);
    const [manoeuvrability, setManoeuvrability] = useState<number | undefined>(undefined);
    const [detection, setDetection] = useState<number | undefined>(undefined);
    const [turretRating, setTurretRating] = useState<number | undefined>(undefined);
    const [shields, setShields] = useState<number | undefined>(undefined);
    const [armour, setArmour] = useState<number | undefined>(undefined);
    const [hullIntegrity, setHullIntegrity] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

        try {
            if (!name) {
                throw new Error('Название корабля обязательно');
            }

            await dispatch(
                createShip({
                    name,
                    classShip: classShip,
                    speed,
                    manoeuvrability,
                    detection,
                    turretRating,
                    shields,
                    armour,
                    hullIntegrity,
                })
            ).unwrap();
            onSaveSuccess();
        } catch (error) {
            console.error('Ошибка при создании корабля:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Создание нового корабля</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Название корабля
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите название"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="class" className={styles.label}>
              Класс корабля
            </label>
            <select
              id="class"
              value={classShip}
              onChange={(e) => setClassShip(e.target.value)}
              className={styles.input}
            >
              <option value="">Выберите класс</option>
              <option value="Линкор">Линкор</option>
              <option value="Крейсер">Крейсер</option>
              <option value="Эсминец">Эсминец</option>
              <option value="Подводная лодка">Подводная лодка</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="speed" className={styles.label}>
              Скорость
            </label>
            <input
              type="number"
              id="speed"
              value={speed || ''}
              onChange={(e) => setSpeed(Number(e.target.value))}
              placeholder="Введите скорость"
              className={styles.input}
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="manoeuvrability" className={styles.label}>
              Маневренность
            </label>
            <input
              type="number"
              id="manoeuvrability"
              value={manoeuvrability || ''}
              onChange={(e) => setManoeuvrability(Number(e.target.value))}
              placeholder="Введите маневренность"
              className={styles.input}
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="detection" className={styles.label}>
              Обнаружение
            </label>
            <input
              type="number"
              id="detection"
              value={detection || ''}
              onChange={(e) => setDetection(Number(e.target.value))}
              placeholder="Введите обнаружение"
              className={styles.input}
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="turretRating" className={styles.label}>
              Рейтинг турелей
            </label>
            <input
              type="number"
              id="turretRating"
              value={turretRating || ''}
              onChange={(e) => setTurretRating(Number(e.target.value))}
              placeholder="Введите рейтинг турелей"
              className={styles.input}
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="shields" className={styles.label}>
              Щиты
            </label>
            <input
              type="number"
              id="shields"
              value={shields || ''}
              onChange={(e) => setShields(Number(e.target.value))}
              placeholder="Введите щиты"
              className={styles.input}
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="armour" className={styles.label}>
              Броня
            </label>
            <input
              type="number"
              id="armour"
              value={armour || ''}
              onChange={(e) => setArmour(Number(e.target.value))}
              placeholder="Введите броню"
              className={styles.input}
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="hullIntegrity" className={styles.label}>
              Целостность корпуса
            </label>
            <input
              type="number"
              id="hullIntegrity"
              value={hullIntegrity || ''}
              onChange={(e) => setHullIntegrity(Number(e.target.value))}
              placeholder="Введите целостность корпуса"
              className={styles.input}
              min="0"
            />
          </div>
          <div className={styles.actions}>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Создание...' : 'Создать'}
            </button>
            <button type="button" onClick={onCancel} className={styles.cancelButton}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    );
  };

  export default ShipCreatePage;
