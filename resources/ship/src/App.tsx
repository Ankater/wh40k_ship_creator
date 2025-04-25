import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import ShipEditPage from './pages/ShipEditPage';
import ShipListPage from './pages/ShipListPage';
import { AppDispatch, RootState } from './store';
import { login } from './store/slices/authSlice';
import { clearCurrentShip, fetchShips, setCurrentShip } from './store/slices/shipsSlice';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { ships, currentShip } = useSelector((state: RootState) => state.ships);

  const handleLoginSuccess = async (username: string, password: string) => {
    try {
      await dispatch(login({ username, password })).unwrap();
      dispatch(fetchShips());
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  const handleEditShip = (shipId: string) => {
    dispatch(setCurrentShip(ships.find((ship) => ship.id === shipId) || null));
  };

  const handleCreateNewShip = () => {
    dispatch(clearCurrentShip());
  };

  const handleSaveSuccess = () => {
    dispatch(fetchShips());
  };

  const handleCancelEdit = () => {
    dispatch(clearCurrentShip());
  };

  return (
    <div>
      {!user ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : currentShip ? (
        <ShipEditPage
          ship={currentShip}
          onSaveSuccess={handleSaveSuccess}
          onCancel={handleCancelEdit}
        />
      ) : (
        <ShipListPage
          ships={ships}
          onEdit={handleEditShip}
          onCreateNew={handleCreateNewShip}
        />
      )}
    </div>
  );
};

export default App;