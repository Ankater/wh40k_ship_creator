import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import ShipEditPage from './pages/ShipEditPage';
import ShipListPage from './pages/ShipListPage';
import { AppDispatch, RootState } from './store';
import {clearCurrentShip, fetchShips } from './store/slices/shipsSlice';
import './styles/globals.css';
import ShipCreatePage from "./pages/ShipCreatePage";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Navbar from "components/common/Navbar";

export const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleSaveSuccess = () => {
        dispatch(fetchShips());
    };

    const handleCancelEdit = () => {
        dispatch(clearCurrentShip());
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
                            <LoginPage />}
                    />
                    <Route
                        path='/ships'
                        element={
                            <PrivateRoute>
                                <ShipListPage/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/ships/create'
                        element={
                            <PrivateRoute>
                                <ShipCreatePage />
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
