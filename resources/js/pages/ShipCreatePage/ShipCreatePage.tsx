import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styles from "./ShipCreatePage.module.css";
import { AppDispatch } from "store/";
import { createShip } from "@/store/slices/shipsSlice";
import { useNavigate } from "react-router-dom";
import { ShipFormData } from "@/types/uiTypes";

/**
 * Страница создания нового корабля
 */
const ShipCreatePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ShipFormData>({
        defaultValues: {
            name: "",
            classShip: "",
            speed: undefined,
            manoeuvrability: undefined,
            detection: undefined,
            turretRating: undefined,
            shields: undefined,
            armour: undefined,
            hullIntegrity: undefined,
        },
    });

    const onSubmit = async (data: ShipFormData) => {
        setLoading(true);

        try {
            if (!data.name) {
                throw new Error("Название корабля обязательно");
            }

            await dispatch(createShip(data)).unwrap();

            navigate("/ships");
        } catch (error) {
            console.error("Ошибка при создании корабля:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/ships");
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Создание нового корабля</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                        Название корабля
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", {
                            required: "Название корабля обязательно",
                        })}
                        placeholder="Введите название"
                        className={styles.input}
                    />
                    {errors.name && (
                        <p className={styles.error}>{errors.name.message}</p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="classShip" className={styles.label}>
                        Класс корабля
                    </label>
                    <select
                        id="classShip"
                        {...register("classShip", {
                            required: "Выберите класс корабля",
                        })}
                        className={styles.input}
                    >
                        <option value="">Выберите класс</option>
                        <option value="Линкор">Линкор</option>
                        <option value="Крейсер">Крейсер</option>
                        <option value="Рейдер">Рейдер</option>
                        <option value="Брандер">Брандер</option>
                        <option value="Особый корабль">Особый</option>
                        <option value="Сторожевой корабль">Сторожевой</option>
                    </select>
                    {errors.classShip && (
                        <p className={styles.error}>
                            {errors.classShip.message}
                        </p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="speed" className={styles.label}>
                        Скорость
                    </label>
                    <input
                        type="number"
                        id="speed"
                        {...register("speed", { min: 0 })}
                        placeholder="Введите скорость"
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="manoeuvrability" className={styles.label}>
                        Маневренность
                    </label>
                    <input
                        type="number"
                        id="manoeuvrability"
                        {...register("manoeuvrability", { min: 0 })}
                        placeholder="Введите маневренность"
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="detection" className={styles.label}>
                        Обнаружение
                    </label>
                    <input
                        type="number"
                        id="detection"
                        {...register("detection", { min: 0 })}
                        placeholder="Введите обнаружение"
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="turretRating" className={styles.label}>
                        Рейтинг турелей
                    </label>
                    <input
                        type="number"
                        id="turretRating"
                        {...register("turretRating", { min: 0 })}
                        placeholder="Введите рейтинг турелей"
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="shields" className={styles.label}>
                        Щиты
                    </label>
                    <input
                        type="number"
                        id="shields"
                        {...register("shields", { min: 0 })}
                        placeholder="Введите щиты"
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="armour" className={styles.label}>
                        Броня
                    </label>
                    <input
                        type="number"
                        id="armour"
                        {...register("armour", { min: 0 })}
                        placeholder="Введите броню"
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="hullIntegrity" className={styles.label}>
                        Целостность корпуса
                    </label>
                    <input
                        type="number"
                        id="hullIntegrity"
                        {...register("hullIntegrity", { min: 0 })}
                        placeholder="Введите целостность корпуса"
                        className={styles.input}
                    />
                </div>
                <div className={styles.actions}>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? "Создание..." : "Создать"}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className={styles.cancelButton}
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ShipCreatePage;
