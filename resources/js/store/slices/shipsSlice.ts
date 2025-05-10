import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mockApi from "../../api/mockApi";
import { Ship } from "types/shipTypes";

interface ShipsState {
    ships: Ship[];
    currentShip: Ship | null;
    loading: boolean;
    error: string | null;
}

const initialState: ShipsState = {
    ships: [],
    currentShip: null,
    loading: false,
    error: null,
};

export const fetchShips = createAsyncThunk("ships/fetchShips", async () => {
    const data = await mockApi.getShips();
    return data;
});

export const fetchShipDetails = createAsyncThunk(
    "ships/fetchShipDetails",
    async (shipId: string) => {
        const data = await mockApi.getShipDetails(shipId);
        return data;
    },
);

export const createShip = createAsyncThunk(
    "ships/createShip",
    async (shipData: Partial<Ship>, { rejectWithValue }) => {
        try {
            console.log("Создание нового корабля:", shipData);

            const newShip: Ship = {
                id: Date.now().toString(),
                name: shipData.name || "",
                classShip: shipData.classShip || "",
                speed: shipData.speed || 0,
                manoeuvrability: shipData.manoeuvrability || 0,
                detection: shipData.detection || 0,
                turretRating: shipData.turretRating || 0,
                shields: shipData.shields || null,
                armour: shipData.armour || 0,
                hullIntegrity: shipData.hullIntegrity || 0,
                traits: shipData.traits || [],
                machineSpiritOddity: shipData.machineSpiritOddity || null,
                shipHistory: shipData.shipHistory || null,
                essentialComponents: shipData.essentialComponents || {},
                additionalComponents: shipData.additionalComponents || {},
                weaponSlots: shipData.weaponSlots || [],
            };

            return newShip;
        } catch (error) {
            return rejectWithValue(error || "Ошибка при создании корабля");
        }
    },
);

export const saveShip = createAsyncThunk(
    "ships/saveShip",
    async (shipData: Ship) => {
        return await mockApi.saveShip(shipData);
    },
);

export const updateShip = createAsyncThunk(
    "ships/updateShip",
    async (
        { id, updatedData }: { id: string; updatedData: Partial<Ship> },
        { rejectWithValue },
    ) => {
        try {
            return await mockApi.updateShip(id, updatedData);
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(
                    error.message || "Ошибка при обновлении корабля",
                );
            }
            return rejectWithValue("Неизвестная ошибка");
        }
    },
);

export const deleteShip = createAsyncThunk(
    "ships/deleteShip",
    async (shipId: string) => {
        await mockApi.deleteShip(shipId);
        return shipId;
    },
);

const shipsSlice = createSlice({
    name: "ships",
    initialState,
    reducers: {
        setCurrentShip: (state, action) => {
            state.currentShip = action.payload;
        },
        clearCurrentShip: (state) => {
            state.currentShip = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShips.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchShips.fulfilled, (state, action) => {
                state.loading = false;
                state.ships = action.payload;
            })
            .addCase(fetchShips.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || "Ошибка загрузки кораблей";
            })
            .addCase(fetchShipDetails.fulfilled, (state, action) => {
                state.currentShip = action.payload;
            })
            .addCase(createShip.fulfilled, (state, action) => {
                state.ships.push(action.payload);
                state.loading = false;
            })
            .addCase(createShip.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(saveShip.fulfilled, (state, action) => {
                const updatedShip = action.payload;
                const index = state.ships.findIndex(
                    (ship) => ship.id === updatedShip.id,
                );
                if (index !== -1) {
                    state.ships[index] = updatedShip;
                } else {
                    state.ships.push(updatedShip);
                }
                state.currentShip = updatedShip;
            })
            .addCase(updateShip.fulfilled, (state, action) => {
                const updatedShip = action.payload;
                const index = state.ships.findIndex(
                    (ship) => ship.id === updatedShip.id,
                );
                if (index !== -1) {
                    state.ships[index] = {
                        ...state.ships[index],
                        ...updatedShip,
                    };
                }
                state.currentShip = updatedShip;
            })
            .addCase(deleteShip.fulfilled, (state, action) => {
                state.ships = state.ships.filter(
                    (ship) => ship.id !== action.payload,
                );
            });
    },
});

export const { setCurrentShip, clearCurrentShip } = shipsSlice.actions;
export default shipsSlice.reducer;
