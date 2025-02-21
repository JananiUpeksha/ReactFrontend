import OrderDetailTableComponent from "../components/orderDetails/OrderDetailTableComponenet.tsx";

const OrderDetailPage = () => {
    return (
        <div className="relative p-3">

            {/* Table */}
            <div>
                <OrderDetailTableComponent
                />
            </div>
        </div>
    );
};

export default OrderDetailPage;