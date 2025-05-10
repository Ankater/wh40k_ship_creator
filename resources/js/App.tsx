import React from "react";
import "@/styles/globals.css";
import Navbar from "@/components/common/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import {AppRoutes} from "@/routes/routes";

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <>
                <AppRoutes />
            </>
        </Router>
    );
};

export default App;
