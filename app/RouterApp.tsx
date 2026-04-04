import { Navigate, Route, Routes } from "react-router-dom";

import StoreHome from "./App";
import AccountPage from "./auth/AccountPage";
import LoginPage from "./auth/LoginPage";
import RequireAuth from "./auth/RequireAuth";
import ScrollToTop from "./components/ScrollToTop";
import NavNodePage from "./nav/NavNodePage";
import NotFoundPage from "./nav/NotFoundPage";
import RequestPage from "./request/RequestPage";
import CartPage from "./cart/CartPage";
import AdminPage from "./admin/AdminPage";

export default function RouterApp() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<StoreHome />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/account"
          element={
            <RequireAuth>
              <AccountPage />
            </RequireAuth>
          }
        />
        <Route
          path="/request"
          element={
            <RequireAuth>
              <RequestPage />
            </RequireAuth>
          }
        />
        <Route path="/nav" element={<Navigate to="/nav/root" replace />} />
        <Route path="/nav/:nodeId" element={<NavNodePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

