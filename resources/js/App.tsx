import { useSelector } from "react-redux";
import LoginPage from "@/pages/LoginPage";
import ShipEditPage from "@/pages/ShipEditPage";
import ShipListPage from "@/pages/ShipListPage";
import { RootState } from "@/store";
import "@/styles/globals.css";
import ShipCreatePage from "@/pages/ShipCreatePage";
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import React from "react";

const App: React.FC = () => {
    const PrivateRoute: React.FC<{ children: JSX.Element }> = ({
        children,
    }) => {
        const { user } = useSelector((state: RootState) => state.auth);
        return user ? children : <Navigate to="/" />;
    };

    return (
        <Router>
            <Navbar />
            <div>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route
                        path="/ships"
                        element={
                            <PrivateRoute>
                                <ShipListPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/ships/create"
                        element={
                            <PrivateRoute>
                                <ShipCreatePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/ships/edit/:id"
                        element={
                            <PrivateRoute>
                                <ShipEditPage />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
