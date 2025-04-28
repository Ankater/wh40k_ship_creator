import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import ShipEditPage from './pages/ShipEditPage';
import ShipListPage from './pages/ShipListPage';
import { AppDispatch, RootState } from './store';
import { login } from './store/slices/authSlice';
import {clearCurrentShip, fetchShips, setCurrentShip} from './store/slices/shipsSlice';
import './styles/globals.css';
import ShipCreatePage from "./pages/ShipCreatePage";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Navbar from "components/common/Navbar";

export const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { ships } = useSelector((state: RootState) => state.ships);

    const handleLoginSuccess = async (username: string, password: string) => {
        try {
            await dispatch(login({username, password})).unwrap();
            dispatch(fetchShips());
        } catch (error) {
            console.error('Ошибка входа:', error);
        }
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

    const handleEditShip = (shipId: string) => {
        const selectedShip = ships.find((ship: { id: string; }) => ship.id === shipId);
        if (selectedShip) {
            dispatch(setCurrentShip(selectedShip));
        }
    };

    const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
        const { user } = useSelector((state: RootState) => state.auth);
        return user ? children : <Navigate to="/" />;
    };

    return (
        <Router>
            <Navbar />
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <LoginPage
                                onLoginSuccess={handleLoginSuccess}/>}
                    />
                    <Route
                        path='/ships'
                        element={
                            <PrivateRoute>
                                <ShipListPage
                                    onEdit={handleEditShip}
                                    onCreateNew={handleCreateNewShip}
                                />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/ships/create'
                        element={
                            <PrivateRoute>
                                <ShipCreatePage
                                    onSaveSuccess={handleSaveSuccess}
                                    onCancel={handleCancelEdit}
                                />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/ships/edit/:id'
                        element={
                            <PrivateRoute>
                                <ShipEditPage
                                    onSaveSuccess={handleSaveSuccess}
                                    onCancel={handleCancelEdit}
                                />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
