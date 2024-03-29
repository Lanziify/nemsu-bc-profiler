import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Protected from "./routes/Protected";
import Public from "./routes/Public";
import Login from "./pages/public/Login";
import Records from "./pages/protected/Records";
import Settings from "./pages/protected/Settings";
import StudentForm from "./pages/protected/FormPage";
import NotFound from "./pages/protected/NotFound";
import Profile from "./pages/protected/Profile";
import Register from "./pages/public/Register";
import ChangePassword from "./pages/protected/ChangePassword";

const App = () => {
  return (
    <Routes>
      <Route element={<Protected />}>
        <Route path="student-form" index element={<StudentForm />} />
        <Route path="records" element={<Records />} />
        <Route path="records/profile/:id" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="settings/change_password" element={<ChangePassword />} />
        <Route path="" element={<Navigate replace to="student-form" />} />
      </Route>

      <Route element={<Public />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
