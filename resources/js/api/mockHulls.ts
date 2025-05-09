import { Hull } from "types/shipTypes";

export const mockHulls: Hull[] = [
    {
        id: "hull1",
        name: "Линкор",
        classShip: "Battleship",
        speed: 4,
        manoeuvrability: -2,
        detection: 5,
        turretRating: 3,
        armour: 75,
        hullIntegrity: 300,
        traits: [],
    },
    {
        id: "hull2",
        name: "Крейсер",
        classShip: "Cruiser",
        speed: 6,
        manoeuvrability: 2,
        detection: 8,
        turretRating: 2,
        armour: 60,
        hullIntegrity: 250,
        traits: [
            {
                name: "Универсальный",
                description: "Хорошо подходит для разных задач",
            },
            {
                name: "Сбалансированный",
                description: "Оптимальное сочетание скорости и защиты",
            },
        ],
    },
    {
        id: "hull3",
        name: "Рейдер",
        classShip: "Raider",
        speed: 8,
        manoeuvrability: 4,
        detection: 10,
        turretRating: 1,
        armour: 40,
        hullIntegrity: 200,
        traits: [
            { name: "Быстрый", description: "Высокая скорость передвижения" },
            { name: "Скрытный", description: "Сложно обнаружить" },
        ],
    },
    {
        id: "hull4",
        name: "Брандер",
        classShip: "Brander",
        speed: 5,
        manoeuvrability: 0,
        detection: 6,
        turretRating: 0,
        armour: 30,
        hullIntegrity: 150,
        traits: [
            { name: "Агрессивный", description: "Специализируется на атаках" },
            { name: "Хрупкий", description: "Низкая прочность корпуса" },
        ],
    },
    {
        id: "hull5",
        name: "Особый корабль",
        classShip: "Special",
        speed: 7,
        manoeuvrability: 3,
        detection: 9,
        turretRating: 4,
        armour: 80,
        hullIntegrity: 350,
        traits: [
            { name: "Уникальный", description: "Имеет особые способности" },
            { name: "Мощный", description: "Высокая огневая мощь" },
        ],
    },
    {
        id: "hull6",
        name: "Сторожевой корабль",
        classShip: "Patrol",
        speed: 6,
        manoeuvrability: 5,
        detection: 12,
        turretRating: 1,
        armour: 50,
        hullIntegrity: 220,
        traits: [
            { name: "Надежный", description: "Подходит для патрулирования" },
            { name: "Маневренный", description: "Высокая маневренность" },
        ],
    },
];
