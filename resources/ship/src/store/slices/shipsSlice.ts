import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import mockApi from '../../api/mockApi';
import { Ship } from '../../types/shipTypes';

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