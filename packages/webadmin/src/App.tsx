import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "components/router";
import * as PAGE from "pages";
import * as UI from "components/ui";
import { setSassVars } from "assets/style/utils";

function App() {
    useEffect(() => {
        setSassVars();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PAGE.AuthPage />}>
                    <Route index element={<PAGE.LoginPage />} />
                    <Route path="login" element={<PAGE.LoginPage />} />
                    <Route path="signup" element={<PAGE.SignupPage />} />
                    <Route path="restore" element={<PAGE.RestorePage />} />
                    <Route
                        path="setpw/:token"
                        element={<PAGE.PasswordChangePage />}
                    />
                </Route>
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <PAGE.DashboardLayout />
                        </PrivateRoute>
                    }
                >
                    <Route path="main" element={<PAGE.MainWorkSpace />} />
                    <Route path="profile" element={<PAGE.Profile />} />
                </Route>
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>

            <UI.SnackBar />
        </BrowserRouter>
    );
}

export default App;
