import { Routes, Route } from "react-router-dom";
import HoverableSidebar from "./../sidebar/ClippedDrawer.tsx";
import DashboardPage from "../../pages/DashboardPage";
import FlowerPage from "../../pages/FlowerPage";
import CustomerPage from "../../pages/CustomerPage";
import PlaceOrderPage from "../../pages/PlaceOrderPage";

function RootLayout() {
    return (
        <>
            <HoverableSidebar />
            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/flower" element={<FlowerPage />} />
                <Route path="/customer" element={<CustomerPage />} />
                <Route path="/placeOrder" element={<PlaceOrderPage />} />
                <Route path="/orderDetails" element={<FlowerPage />} />
                <Route path="/payment" element={<FlowerPage />} />
            </Routes>
        </>
    );
}

export default RootLayout;

