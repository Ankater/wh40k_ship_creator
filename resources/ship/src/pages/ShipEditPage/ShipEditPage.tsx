import {useDispatch, useSelector} from 'react-redux';
import styles from './ShipEditPage.module.css';
import {AppDispatch, RootState} from "store";
import {saveShip} from "store/slices/shipsSlice";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import React, {useState} from "react";
import {mockHulls} from "api/mockHulls";
import {Ship, Trait} from "types/shipTypes";

/**
* Страница редактирования корабля по id
 */
const ShipEditPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const ships = useSelector((state: RootState) => state.ships.ships);
  const ship = ships.find((s) => s.id === id);

  const [isTraitsVisible, setIsTraitsVisible] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<Ship>({
        defaultValues: ship || undefined,
    });

    const hullId = watch('hull') as string | undefined;
    const currentHull = hullId ? mockHulls.find((hull) => hull.id === hullId) : null;

    const handleHullChange = (hullId: string) => {
        const selected = mockHulls.find((hull) => hull.id === hullId);
        if (selected) {
            setValue('hull', hullId);
            setValue('classShip', selected.classShip);
            setValue('speed', selected.speed);
            setValue('manoeuvrability', selected.manoeuvrability);
            setValue('detection', selected.detection);
            setValue('turretRating', selected.turretRating);
            setValue('armour', selected.armour);
            setValue('hullIntegrity', selected.hullIntegrity);
        }
    };

  const handleSave = async (data: any) => {
      try {
          await dispatch(saveShip(data)).unwrap();
          navigate('/ships');
      } catch (err) {
          console.error('Ошибка при сохранении корабля:', err);
      }
  };

  const handleCancel = () => {
      navigate('/ships');
  };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Редактирование корабля</h1>
            <form onSubmit={handleSubmit(handleSave)} className={styles.form}>
                <div className={styles.field}>
                    <label className={styles.label}>Название:</label>
                    <input
                        type="text"
                        {...register('name', { required: 'Название обязательно' })}
                        className={styles.input}
                    />
                    {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Корпус:</label>
                    <select
                        {...register('hull', {required: 'Корпус обязателен'})}
                        onChange={(e) => handleHullChange(e.target.value)}
                        className={styles.input}
                    >
                        <option value="">Выберите корпус</option>
                        {mockHulls.map((hull) => (
                            <option key={hull.id} value={hull.id}>
                                {hull.name}
                            </option>
                        ))}
                    </select>
                    {errors.hull && <p className={styles.errorMessage}>{errors.hull.message}</p>}
                </div>
                {currentHull && (
                    <>
                        <div className={styles.field}>
                            <label className={styles.label}>Класс корабля:</label>
                            <span className={styles.value}>{currentHull.classShip}</span>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Скорость:</label>
                            <input
                                type="number"
                                {...register('speed', {min: 0})}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Маневренность:</label>
                            <input
                                type="number"
                                {...register('manoeuvrability')}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Обнаружение:</label>
                            <input
                                type="number"
                                {...register('detection')}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Рейтинг турелей:</label>
                            <input
                                type="number"
                                {...register('turretRating', {min: 0})}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Щиты:</label>
                            <input
                                type="number"
                                {...register('shields', {min: 0})}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Броня:</label>
                            <input
                                type="number"
                                {...register('armour', {min: 0})}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Целостность корпуса:</label>
                            <input
                                type="number"
                                {...register('hullIntegrity', {min: 0})}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.field}>
                            <button
                                type="button"
                                onClick={() => setIsTraitsVisible(!isTraitsVisible)}
                                className={styles.spoilerButton}
                            >
                                Черты корпуса {isTraitsVisible ? '▲' : '▼'}
                            </button>
                            <div
                                className={`${styles.traitsContainer} ${
                                    isTraitsVisible ? styles.visible : ''
                                }`}
                            >
                                {currentHull ? (
                                    <ul className={styles.traitsList}>
                                        {currentHull.traits.length > 0 ? (
                                            currentHull.traits.map((trait: Trait, index: number) => (
                                                <li key={index}>
                                                    <strong>{trait.name}:</strong> {trait.description}
                                                </li>
                                            ))
                                        ) : (
                                            <li>Нет черт</li>
                                        )}
                                    </ul>
                                ) : (
                                    <p>Выберите корпус</p>
                                )}
                            </div>
                        </div>
                    </>
                )}
                <div className={styles.actionButtons}>
                    <button type="button" onClick={handleCancel} className={styles.cancelButton}>
                        Отмена
                    </button>
                    <button type="submit" className={styles.saveButton}>
                        Сохранить
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ShipEditPage;
