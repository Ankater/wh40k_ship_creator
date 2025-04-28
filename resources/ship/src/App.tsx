import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import ShipEditPage from './pages/ShipEditPage';
import ShipListPage from './pages/ShipListPage';
import { AppDispatch, RootState } from './store';
import { login } from './store/slices/authSlice';
import {clearCurrentShip, fetchShips, setCurrentShip} from './store/slices/shipsSlice';
import './styles/globals.css';
import ShipCreatePage from "./pages/ShipCreatePage";

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { ships, currentShip } = useSelector((state: RootState) => state.ships);
  const [isCreatingShip, setIsCreatingShip] = useState(false);

  const handleLoginSuccess = async (username: string, password: string) => {
    try {
      await dispatch(login({ username, password })).unwrap();
      dispatch(fetchShips());
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  const handleCreateNewShip = () => {
    dispatch(clearCurrentShip());
    setIsCreatingShip(true);
  };

  const handleSaveSuccess = () => {
    dispatch(fetchShips());
    setIsCreatingShip(false);
  };

  const handleCancelEdit = () => {
    dispatch(clearCurrentShip());
    setIsCreatingShip(false);
  };

    const handleEditShip = (shipId: string) => {
        const selectedShip = ships.find((ship: { id: string; }) => ship.id === shipId);
        if (selectedShip) {
            dispatch(setCurrentShip(selectedShip));
        }
    };

  return (
    <div>
      {!user ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : isCreatingShip ? (
        <ShipCreatePage onSaveSuccess={handleSaveSuccess} onCancel={handleCancelEdit} />
      ) : currentShip ? (
        <ShipEditPage
          ship={currentShip}
          onSaveSuccess={handleSaveSuccess}
          onCancel={handleCancelEdit}
        />
      ) : (
        <ShipListPage
          onEdit={handleEditShip}
          onCreateNew={handleCreateNewShip}
        />
      )}
    </div>
  );
};

export default App;
