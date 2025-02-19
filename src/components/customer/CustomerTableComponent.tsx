/*
/!*
import {Customer} from "../../models/customer.ts";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {toast} from "react-toastify";
import {deleteCustomer} from "../../reducers/CustomerSlice.ts";
import ConfirmationModal from "../modals/ConfirmationModal.tsx";


const CustomerTableComponent = ({customers = [], onEditCustomer}: {customers?: Customer[]; onEditCustomer: (customer: Customer) => void}) => {

    const dispatch = useDispatch();

    // Modal state
    const [isModalOpen, setModalOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState<number | null>(null);

    const openDeleteModal = (customerId: number) => {
        setCustomerToDelete(customerId);
        setModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (customerToDelete) {
            dispatch(deleteCustomer({ customer_id: customerToDelete }));
            toast.success("Customer deleted successfully!", {
                position: "bottom-right",
                autoClose: 2000,
            });
        }
        setModalOpen(false);
        setCustomerToDelete(null);
    };

    const handleCancelDelete = () => {
        setModalOpen(false);
        setCustomerToDelete(null);
    };

    return (
        <>
            {/!* Confirmation Modal *!/}
            <ConfirmationModal
                isOpen={isModalOpen}
                title="Confirm Deletion"
                message="Are you sure you want to delete this customer?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

            {/!* Table *!/}
            <table className="mt-7 min-w-full bg-[#bda6a6] border-collapse border-2 border-black shadow-lg sm:rounded-lg">
                <thead>
                <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
                    <th className="px-6 py-3 text-left font-bold">Id</th>
                    <th className="px-6 py-3 text-left font-bold">First Name</th>
                    <th className="px-6 py-3 text-left font-bold">Last Name</th>
                    <th className="px-6 py-3 text-left font-bold">Contact</th>
                    <th className="px-6 py-3 text-left font-bold">Email</th>
                    <th className="px-6 py-3 text-left font-bold">Address</th>
                    <th className="px-6 py-3 text-left font-bold">Gender</th>
                    <th className="px-6 py-3 text-center font-bold">Actions</th>
                </tr>
                </thead>
                <tbody>
                {customers.length > 0 ? (
                    customers.map((customer: Customer, index: number) => (
                        <tr
                            key={index}
                            className="hover:bg- even:bg-transparent text-gray-700 border-t"
                        >
                            <td className="px-6 py-4">{customer.customer_id}</td>
                            <td className="px-6 py-4">{customer.customer_firstName}</td>
                            <td className="px-6 py-4">{customer.customer_lastName}</td>
                            <td className="px-6 py-4">{customer.customer_phone}</td>
                            <td className="px-6 py-4">{customer.customer_email}</td>
                            <td className="px-6 py-4">{customer.customer_address}</td>
                            <td className="px-6 py-4">{customer.gender}</td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => onEditCustomer(customer)}
                                        className="px-4 py-2 text-xs font-bold text-white bg-pink-900 rounded hover:bg-pink-800 shadow-md"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal(customer.customer_id)}
                                        className="px-4 py-2 text-xs font-bold text-white bg-black rounded hover:bg-gray-900 shadow-md"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={8} className="text-center py-4 text-gray-500">
                            No customers available.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </>
    );
};

export default CustomerTableComponent;*!/
import { useEffect } from "react";
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Customer } from "../../models/Customer.ts";
import { deleteCustomer, viewCustomers } from "../../reducers/CustomerSlice.ts";
import ConfirmationModal from "../modals/ConfirmationModal.tsx";
import { AppDispatch } from "../../store/Store.ts";
import { RootState } from "../../store/Store.ts";

const CustomerTableComponent = ({ onEditCustomer }: { onEditCustomer: (customer: Customer) => void }) => {
    const dispatch = useDispatch<AppDispatch>();

    // Fetching customer data from Redux store
    const customers = useSelector((state: RootState) => state.customer);

    // Modal state for confirmation
    const [isModalOpen, setModalOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState<number | null>(null);

    // Fetch customers on component mount
    useEffect(() => {
        dispatch(viewCustomers());
    }, [dispatch]);

    const openDeleteModal = (customerId: number) => {
        setCustomerToDelete(customerId);
        setModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (customerToDelete) {
            dispatch(deleteCustomer(customerToDelete));
            toast.success("Customer deleted successfully!", {
                position: "bottom-right",
                autoClose: 2000,
            });
        }
        setModalOpen(false);
        setCustomerToDelete(null);
    };

    const handleCancelDelete = () => {
        setModalOpen(false);
        setCustomerToDelete(null);
    };

    return (
        <>
            {/!* Confirmation Modal *!/}
            <ConfirmationModal
                isOpen={isModalOpen}
                title="Confirm Deletion"
                message="Are you sure you want to delete this customer?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

            {/!* Table *!/}
            <table className="mt-7 min-w-full bg-[#bda6a6] border-collapse border-2 border-black shadow-lg sm:rounded-lg">
                <thead>
                <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
                    <th className="px-6 py-3 text-left font-bold">Id</th>
                    <th className="px-6 py-3 text-left font-bold">First Name</th>
                    <th className="px-6 py-3 text-left font-bold">Last Name</th>
                    <th className="px-6 py-3 text-left font-bold">Contact</th>
                    <th className="px-6 py-3 text-left font-bold">Email</th>
                    <th className="px-6 py-3 text-left font-bold">Address</th>
                    <th className="px-6 py-3 text-left font-bold">Gender</th>
                    <th className="px-6 py-3 text-center font-bold">Actions</th>
                </tr>
                </thead>
                <tbody>
                {customers.length > 0 ? (
                    customers.map((customer: Customer) => (
                        <tr key={customer.customer_id} className="hover:bg- even:bg-transparent text-gray-700 border-t">
                            <td className="px-6 py-4">{customer.customer_id}</td>
                            <td className="px-6 py-4">{customer.customer_firstName}</td>
                            <td className="px-6 py-4">{customer.customer_lastName}</td>
                            <td className="px-6 py-4">{customer.customer_phone}</td>
                            <td className="px-6 py-4">{customer.customer_email}</td>
                            <td className="px-6 py-4">{customer.customer_address}</td>
                            <td className="px-6 py-4">{customer.gender}</td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => onEditCustomer(customer)}
                                        className="px-4 py-2 text-xs font-bold text-white bg-pink-900 rounded hover:bg-pink-800 shadow-md"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal(customer.customer_id)}
                                        className="px-4 py-2 text-xs font-bold text-white bg-black rounded hover:bg-gray-900 shadow-md"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={8} className="text-center py-4 text-gray-500">
                            No customers available.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </>
    );
};

export default CustomerTableComponent;
*/
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Customer } from "../../models/Customer.ts";
import { deleteCustomer, viewCustomers } from "../../reducers/CustomerSlice.ts";
import ConfirmationModal from "../modals/ConfirmationModal.tsx";
import { AppDispatch, RootState } from "../../store/Store.ts";

const CustomerTableComponent = ({ onEditCustomer }: { onEditCustomer: (customer: Customer) => void }) => {
    const dispatch = useDispatch<AppDispatch>();

    // Fetching customer data from Redux store
    const customers = useSelector((state: RootState) => state.customer);

    // Modal state for confirmation
    const [isModalOpen, setModalOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState<number | null>(null);

    // Fetch customers on component mount
    useEffect(() => {
        dispatch(viewCustomers());
    }, [dispatch]);

    const openDeleteModal = (customerId: number) => {
        setCustomerToDelete(customerId);
        setModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (customerToDelete) {
            dispatch(deleteCustomer(customerToDelete));
            toast.success("Customer deleted successfully!", {
                position: "bottom-right",
                autoClose: 2000,
            });
        }
        setModalOpen(false);
        setCustomerToDelete(null);
    };

    const handleCancelDelete = () => {
        setModalOpen(false);
        setCustomerToDelete(null);
    };

    return (
        <>
            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                title="Confirm Deletion"
                message="Are you sure you want to delete this customer?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

            {/* Table Container with Scrolling */}
            <div className="mt-7 border-2 border-black shadow-lg sm:rounded-lg bg-[#bda6a6]">
                <table className="min-w-full border-collapse">
                    <thead className="sticky top-0 bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
                    <tr>
                        <th className="px-6 py-3 text-left font-bold">Id</th>
                        <th className="px-6 py-3 text-left font-bold">First Name</th>
                        <th className="px-6 py-3 text-left font-bold">Last Name</th>
                        <th className="px-6 py-3 text-left font-bold">Contact</th>
                        <th className="px-6 py-3 text-left font-bold">Email</th>
                        <th className="px-6 py-3 text-left font-bold">Address</th>
                        <th className="px-6 py-3 text-left font-bold">Gender</th>
                        <th className="px-6 py-3 text-center font-bold">Actions</th>
                    </tr>
                    </thead>
                </table>

                {/* Scrollable tbody */}
                <div className="overflow-y-auto" style={{ maxHeight: "460px" }}>
                    <table className="min-w-full border-collapse">
                        <tbody>
                        {customers.length > 0 ? (
                            customers.map((customer: Customer) => (
                                <tr key={customer.customer_id} className="hover:bg-gray-200 text-gray-700 border-t">
                                    <td className="px-6 py-4">{customer.customer_id}</td>
                                    <td className="px-6 py-4">{customer.customer_firstName}</td>
                                    <td className="px-6 py-4">{customer.customer_lastName}</td>
                                    <td className="px-6 py-4">{customer.customer_phone}</td>
                                    <td className="px-6 py-4">{customer.customer_email}</td>
                                    <td className="px-6 py-4">{customer.customer_address}</td>
                                    <td className="px-6 py-4">{customer.gender}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => onEditCustomer(customer)}
                                                className="px-4 py-2 text-xs font-bold text-white bg-pink-900 rounded hover:bg-pink-800 shadow-md"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(customer.customer_id)}
                                                className="px-4 py-2 text-xs font-bold text-white bg-black rounded hover:bg-gray-900 shadow-md"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center py-4 text-gray-500">
                                    No customers available.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default CustomerTableComponent;

