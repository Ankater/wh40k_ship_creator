import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import mockApi from '../../api/mockApi';
import {AdditionalComponents, EssentialComponents, Hull, Oddity, Ship, Trait, WeaponSlot} from '../../types/shipTypes';

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

export const fetchShips = createAsyncThunk('ships/fetchShips', async () => {
  const data = await mockApi.getShips();
  return data;
});

export const fetchShipDetails = createAsyncThunk(
  'ships/fetchShipDetails',
  async (shipId: string) => {
    const data = await mockApi.getShipDetails(shipId);
    return data;
  }
);

export const createShip = createAsyncThunk(
  'ships/createShip',
    async (shipData: Partial<Ship>, { rejectWithValue }) => {
    try {
      console.log('Создание нового корабля:', shipData);

      const newShip: {
          detection?: number;
          traits?: Trait[];
          shipHistory?: Oddity | null;
          speed?: number;
          armour?: number;
          shields?: number | null;
          hullIntegrity?: number;
          additionalComponents?: AdditionalComponents;
          essentialComponents?: EssentialComponents;
          name?: string;
          machineSpiritOddity?: Oddity | null;
          id: string;
          turretRating?: number;
          hull?: Hull | null;
          manoeuvrability?: number;
          weaponSlots?: WeaponSlot[];
          classShip?: string
      } = {
          id: Date.now().toString(),
          ...shipData,
      };

      return newShip;
    } catch (error) {
      return rejectWithValue(error || 'Ошибка при создании корабля');
    }
  }
);

export const saveShip = createAsyncThunk(
  'ships/saveShip',
  async (shipData: Ship) => {
    const savedShip = await mockApi.saveShip(shipData);
    return savedShip;
  }
);

export const deleteShip = createAsyncThunk(
  'ships/deleteShip',
  async (shipId: string) => {
    await mockApi.deleteShip(shipId);
    return shipId;
  }
);

const shipsSlice = createSlice({
  name: 'ships',
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
        state.error = action.error.message || 'Ошибка загрузки кораблей';
      })
      .addCase(fetchShipDetails.fulfilled, (state, action) => {
        state.currentShip = action.payload;
      })
        .addCase(createShip.fulfilled, (state, action) => {
            const newShip: Ship = {
                id: Date.now().toString(),
                name: action.payload.name || '',
                classShip: action.payload.classShip || '',
                speed: action.payload.speed || 0,
                manoeuvrability: action.payload.manoeuvrability || 0,
                detection: action.payload.detection || 0,
                turretRating: action.payload.turretRating || 0,
                shields: action.payload.shields || null,
                armour: action.payload.armour || 0,
                hullIntegrity: action.payload.hullIntegrity || 0,
                traits: action.payload.traits || [],
                machineSpiritOddity: action.payload.machineSpiritOddity || null,
                shipHistory: action.payload.shipHistory || null,
                essentialComponents: action.payload.essentialComponents || {},
                additionalComponents: action.payload.additionalComponents || {},
                weaponSlots: action.payload.weaponSlots || [],
            };

            state.ships.push(newShip);
            state.loading = false;
        })
      .addCase(createShip.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(saveShip.fulfilled, (state, action) => {
        const updatedShip = action.payload;
        const index = state.ships.findIndex((ship) => ship.id === updatedShip.id);
        if (index !== -1) {
          state.ships[index] = updatedShip;
        } else {
          state.ships.push(updatedShip);
        }
        state.currentShip = updatedShip;
      })
      .addCase(deleteShip.fulfilled, (state, action) => {
        state.ships = state.ships.filter((ship) => ship.id !== action.payload);
      });
  },
});


export const { setCurrentShip, clearCurrentShip } = shipsSlice.actions;
export default shipsSlice.reducer;
