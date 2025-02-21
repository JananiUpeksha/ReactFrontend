// DashboardCardsComponent.tsx
const DashboardCardsComponent = () => {
    console.log("🚀 Rendering DashboardCardsComponent");

    const cards = [
        {
            title: "Flowers",
            count: 120,
            image: "/flower2.jpg", // Replace with the actual image path
        },
        {
            title: "Customers",
            count: 80,
            image: "/customer-card.jpg", // Replace with the actual image path
        },
        {
            title: "Orders",
            count: 45,
            image: "/order.jpg", // Replace with the actual image path
        },
    ];

    return (
        <div className="grid gap-6 mb-6 md:grid-cols-3">
            {cards.map((card, index) => {
                console.log(`🎴 Rendering Card: ${card.title}`);

                return (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-lg shadow-lg border-2 border-[#bda6a6] bg-[#fff3f3] transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        {/* Background Image */}
                        <img
                            src={card.image}
                            alt={card.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                            onLoad={() => console.log(`✅ Loaded Image: ${card.image}`)}
                            onError={() => console.error(`❌ Failed to Load Image: ${card.image}`)}
                        />

                        {/* Overlay */}
                        <div className="relative z-10 p-5 bg-gradient-to-t from-[#432e32] to-transparent">
                            <h3 className="text-lg font-bold text-[#f0e5e5]">{card.title}</h3>
                            <p className="text-3xl font-extrabold text-[#f0e5e5]">{card.count}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DashboardCardsComponent;