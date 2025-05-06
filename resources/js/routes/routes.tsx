import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { privateRoutes } from "./privateRoutes";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { user } = useSelector((state: RootState) => state.auth);
    return user ? children : <Navigate to="/" />;
};

export const AppRoutes = () => {
    return (
        <Routes>
            {publicRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
            {privateRoutes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <PrivateRoute>
                            {route.element}
                        </PrivateRoute>
                    }
                />
            ))}
        </Routes>
    );
};
