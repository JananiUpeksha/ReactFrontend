import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store"; // Update path if needed
import { viewOrders } from "/home/janani/Desktop/RAD-Assignment-Floral_Dreams-Frontend-main/src/reducers/OrderSlice.ts"; // Ensure correct path

const OrderDetailTableComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const orders = useSelector((state: RootState) => state.order.orders); // Access the orders array
    const loading = useSelector((state: RootState) => state.order.loading);
    const error = useSelector((state: RootState) => state.order.error);

    const [selectedOrderId, setSelectedOrderId] = useState<string>("");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        dispatch(viewOrders());
    }, [dispatch]);

    // Handle search button click
    const handleSearch = () => {
        const order = orders.find((order) => order.order_id === parseInt(selectedOrderId));
        setSelectedOrder(order || null);
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div className="p-4">
            {/* Form with Background Color */}
            <div className="bg-[#98D8EF] p-4 rounded shadow-md mb-4">
                {/* Dropdown for Order IDs */}
                <div className="mb-4">
                    <label htmlFor="orderId" className="mr-2">Select Order ID:</label>
                    <select
                        id="orderId"
                        value={selectedOrderId}
                        onChange={(e) => setSelectedOrderId(e.target.value)}
                        className="border border-gray-300 rounded p-2 mr-2"
                    >
                        <option value="">Select an order</option>
                        {orders.map((order) => (
                            <option key={order.order_id} value={order.order_id}>
                                {order.order_id}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleSearch}
                        className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Display Selected Order Details */}
            {selectedOrder && (
                <div className="border border-gray-300 p-4 rounded max-w-lg mx-auto bg-white shadow-md">
                    <h2 className="text-xl font-bold mb-4">Order Details</h2>
                    <p><strong>Order ID:</strong> {selectedOrder.order_id}</p>
                    <p><strong>Customer Email:</strong> {selectedOrder.customer_email}</p>
                    <p><strong>Order Date:</strong> {selectedOrder.order_date}</p>
                    <p><strong>Sub Total:</strong> {selectedOrder.sub_total}</p>
                    <p><strong>Discount:</strong> {selectedOrder.discount}</p>
                    <p><strong>Decoration Charges:</strong> {selectedOrder.decoration_charges}</p>
                    <p><strong>Wrapping Charges:</strong> {selectedOrder.wrapping_charges}</p>
                    <p><strong>Total Amount:</strong> {selectedOrder.total_amount}</p>
                    <p><strong>Paid Amount:</strong> {selectedOrder.paid_amount}</p>
                    <p><strong>Balance:</strong> {selectedOrder.balance}</p>

                    {/* Display Order Items */}
                    <h3 className="text-lg font-semibold mt-4">Order Items</h3>
                    <table className="min-w-full border-collapse border border-gray-300 mt-2">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Item</th>
                            <th className="border border-gray-300 px-4 py-2">Quantity</th>
                            <th className="border border-gray-300 px-4 py-2">Unit Price</th>
                            <th className="border border-gray-300 px-4 py-2">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {selectedOrder.order_items.map((item) => (
                            <tr key={item.order_detail_id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{item.item}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.unitPrice}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.total}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderDetailTableComponent;
