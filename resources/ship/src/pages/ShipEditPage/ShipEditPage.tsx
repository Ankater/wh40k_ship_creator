import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { saveShip } from '../../store/slices/shipsSlice';

const ShipEditPage: React.FC<{
  ship: any;
  onSaveSuccess: () => void;
  onCancel: () => void;
}> = ({ ship, onSaveSuccess, onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    try {
      await dispatch(saveShip(ship)).unwrap();
      onSaveSuccess();
    } catch (err) {
      setError('Не удалось сохранить корабль.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1>Редактирование корабля</h1>
      <p>Название: {ship.name}</p>
      <p>Класс: {ship.class}</p>
      <button onClick={handleSave} disabled={isSaving}>
        {isSaving ? 'Сохранение...' : 'Сохранить'}
      </button>
      <button onClick={onCancel}>Отмена</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ShipEditPage;