import {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {Customer} from "../models/customer.ts";
import CustomerFormComponent from "../components/customer/CustomerFormComponent.tsx";
import CustomerTableComponent from "../components/customer/CustomerTableComponent.tsx";


const CustomerPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const customers = useSelector((store) => store.customer);

    // Reference to call `editFlower` in FlowerFormComponent
    const customerFormRef = useRef<any>(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleEditCustomer = (customer: Customer) => {
        // Open the modal first
        openModal();

        // Delay the call to ensure FlowerFormComponent is rendered
        setTimeout(() => {
            if (customerFormRef.current) {
                customerFormRef.current.editCustomer(customer); // Call the edit function
            } else {
                console.error("customerFormRef is null after opening modal");
            }
        }, 0);
    };

    return (
        <div className="relative p-3">
            {/* Add New Button */}
            <div className="mb-3 text-right">
                <button
                    onClick={openModal}
                    className="bg-yellow-500 text-black font-extrabold px-4 py-2 rounded-md shadow-lg transition-colors"
                >
                    Add New +
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="bg-[#bda6a6] p-6 rounded-lg relative"
                        style={{
                            width: "70%",
                            maxWidth: "600px",
                            minWidth: "300px",
                            boxShadow: "none", // Remove any shadow
                            outline: "none",   // Remove outline
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-[#432e32] hover:text-black"
                            style={{
                                outline: "none",  // Remove outline around button
                            }}
                        >
                            ✖
                        </button>
                        {/* Flower Form */}
                        <CustomerFormComponent ref={customerFormRef} onCloseModal={closeModal} />
                    </div>
                </div>
            )}


            {/* Table */}
            <div>
                <CustomerTableComponent
                    customers={customers}
                    onEditCustomer={handleEditCustomer}
                />
            </div>
        </div>
    );
};

export default CustomerPage;