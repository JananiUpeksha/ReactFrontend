/*
import React from 'react';

const PlaceOrderTableComponent = ({ orders, onDelete }: { orders: any[]; onDelete: (orderId: number) => void }) => {
    return (
        <div className="p-4 border rounded-lg shadow-md bg-white">
            {/!* Add gap on top of the table *!/}
            <div className="mb-4"></div>

            {/!* Scrollable Table Container *!/}
            <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
                <table className="w-full border-collapse border border-gray-300 mt-2">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">Order ID</th>
                        <th className="border border-gray-300 p-2">Customer Name</th>
                        <th className="border border-gray-300 p-2">Item Name</th>
                        <th className="border border-gray-300 p-2">Quantity</th>
                        <th className="border border-gray-300 p-2">Total</th>
                        <th className="border border-gray-300 p-2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 p-2">{order.orderId}</td>
                                <td className="border border-gray-300 p-2">{order.customerName}</td>
                                <td className="border border-gray-300 p-2">{order.itemName}</td>
                                <td className="border border-gray-300 p-2">{order.quantity}</td>
                                <td className="border border-gray-300 p-2">{order.total}</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button
                                        className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                                        onClick={() => onDelete(order.orderId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="border border-gray-300 p-2 text-center">
                                No orders found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Example usage of the component with example data
const ExamplePage = () => {
    const [orders, setOrders] = React.useState([
        { orderId: 1, customerName: "John Doe", itemName: "Rose", quantity: 10, total: 100 },
        { orderId: 2, customerName: "Jane Smith", itemName: "Tulip", quantity: 5, total: 50 },
        { orderId: 3, customerName: "Alice Brown", itemName: "Lily", quantity: 20, total: 200 },
    ]);

    const handleDelete = (orderId: number) => {
        setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
    };

    return <PlaceOrderTableComponent orders={orders} onDelete={handleDelete} />;
};

export default ExamplePage;*/

import {CartItems} from "../../models/addToCart.ts";
import { Trash2 } from "lucide-react";

const PlaceOrderTableComponent = ({ cartItems, onDelete }: { cartItems: CartItems[]; onDelete: (id: number) => void }) => {
    return (

        <div className="mt-7 overflow-y-auto max-h-[200px] border-2 border-black shadow-lg sm:rounded-lg">

            <table
                className="w-full bg-[#bda6a6] border-collapse">
                <thead className="sticky top-0 bg-gray-100 text-gray-600 text-xs uppercase tracking-wider z-10">
                <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
                    <th className="border border-gray-300 p-2">Item Name</th>
                    <th className="border border-gray-300 p-2">Unit Price</th>
                    <th className="border border-gray-300 p-2">Quantity</th>
                    <th className="border border-gray-300 p-2">Total</th>
                    <th className="border border-gray-300 p-2">Action</th>
                </tr>
                </thead>
                <tbody>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <tr key={item.flowerCode}
                            className="hover:bg-[#d3c2c2] even:bg-transparent text-gray-700 border-t text-center">
                            <td className="p-2">{item.flowerName}</td>
                            <td className="p-2">{`Rs: ${item.flowerUnitPrice.toFixed(2)}`}</td>
                            <td className="p-2">{item.quantity}</td>
                            <td className="p-2 font-bold">{`Rs: ${item.total.toFixed(2)}`}</td>
                            <td className="p-2">
                                <button
                                    className="text-red-700 hover:text-red-800"
                                    onClick={() => onDelete(item.flowerCode)}
                                >
                                    <Trash2 className="h-6 w-6"/>
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6} className="text-center py-4 text-gray-500">
                            No items added.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>

    );

};


export default PlaceOrderTableComponent;