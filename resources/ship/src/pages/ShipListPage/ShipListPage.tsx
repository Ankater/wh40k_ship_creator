import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { deleteShip, fetchShips } from '../../store/slices/shipsSlice';

const ShipListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ships, loading, error } = useSelector((state: RootState) => state.ships);

  const handleDelete = (shipId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот корабль?')) {
      dispatch(deleteShip(shipId)).then(() => dispatch(fetchShips()));
    }
  };

  return (
    <div>
      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      <ul>
        {ships.map((ship) => (
          <li key={ship.id}>
            {ship.name}
            <button onClick={() => handleDelete(ship.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShipListPage;