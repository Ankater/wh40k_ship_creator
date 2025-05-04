import { LoginResponse } from "types/apiTypes";
import { Oddity, Ship } from "types/shipTypes";

const mockShips: Ship[] = [
    {
        id: "1",
        name: "Rocinante",
        classShip: "Corvette",
        hull: "hull_corvette",
        speed: 5,
        manoeuvrability: 10,
        detection: 5,
        turretRating: 2,
        armour: 50,
        hullIntegrity: 200,
        traits: [{ name: "Fast", description: "Moves quickly" }],
        weaponSlots: [],
    },
    {
        id: "2",
        name: "Donnager",
        classShip: "Battleship",
        hull: "hull_battleship",
        speed: 4,
        manoeuvrability: 8,
        detection: 7,
        turretRating: 3,
        armour: 75,
        hullIntegrity: 300,
        traits: [{ name: "Balanced", description: "Good all-around" }],
        weaponSlots: [],
    },
    {
        id: "3",
        name: "Canterbury",
        classShip: "Freighter",
        hull: "hull_freighter",
        speed: 3,
        manoeuvrability: 5,
        detection: 10,
        turretRating: 4,
        armour: 100,
        hullIntegrity: 500,
        traits: [{ name: "Tough", description: "Can take a beating" }],
        weaponSlots: [],
    },
];

const mockApi = {
    login: async (
        username: string,
        password: string,
    ): Promise<LoginResponse> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === "admin" && password === "password") {
                    resolve({ success: true, user: { name: "Admin User" } });
                } else {
                    reject(new Error("Неверный логин или пароль"));
                }
            }, 500);
        });
    },

    getShips: async (): Promise<Ship[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockShips);
            }, 500);
        });
    },

    deleteShip: async (_shipId: string): Promise<{ success: boolean }> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 300);
        });
    },

    getShipDetails: async (shipId: string): Promise<Ship> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const ship = mockShips.find((s) => s.id === shipId);
                if (ship) {
                    resolve(ship);
                } else {
                    throw new Error("Корабль не найден");
                }
            }, 500);
        });
    },

    updateShip: async (
        shipId: string,
        updatedData: Partial<Ship>,
    ): Promise<Ship> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const shipIndex = mockShips.findIndex((s) => s.id === shipId);
                if (shipIndex === -1) {
                    reject(new Error("Корабль не найден"));
                }

                const updatedShip = { ...mockShips[shipIndex], ...updatedData };
                mockShips[shipIndex] = updatedShip;

                resolve(updatedShip);
            }, 500);
        });
    },

    getOddities: async (type: string): Promise<Oddity[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (type === "machine_spirit") {
                    resolve([
                        { id: "odd1", name: "Stubborn" },
                        { id: "odd2", name: "Inquisitive" },
                        { id: "odd3", name: "Belligerent" },
                    ]);
                } else if (type === "history") {
                    resolve([
                        { id: "hist1", name: "Relic of Mars" },
                        { id: "hist2", name: "Former Pirate Vessel" },
                        { id: "hist3", name: "Survived Warp Storm" },
                    ]);
                } else {
                    resolve([]);
                }
            }, 300);
        });
    },

    saveShip: async (shipData: Ship): Promise<Ship> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    ...shipData,
                    id:
                        shipData.id === "new"
                            ? Date.now().toString()
                            : shipData.id,
                });
            }, 700);
        });
    },
};

export default mockApi;
