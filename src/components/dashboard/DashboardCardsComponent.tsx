// DashboardCardsComponent.tsx
const DashboardCardsComponent = () => {
    console.log("🚀 Rendering DashboardCardsComponent");

    const cards = [
        {
            title: "Daffodils",
            image: "/dafodils.jpg",
        },
        {
            title: "Daisy",
            image: "/daisy.jpeg",
        },
        {
            title: "Freesia",
            image: "/freesia.jpg",
        },
        {
            title: "Lavender",
            image: "/lavender.jpg",
        },
        {
            title: "Lillies",
            image: "/lilies.jpeg",
        },
        {
            title: "Marigold",
            count: 45,
            image: "/marigold-1.jpg",
        },
        {
            title: "Peonies",
            count: 120,
            image: "/peony.jpeg",
        },
        {
            title: "Roses",
            count: 80,
            image: "/rose.jpeg",
        },
        {
            title: "Tulips",
            count: 45,
            image: "/tulips.jpeg",
        },
    ];

    return (
        <div className="relative rounded-lg shadow-lg border-2 border-[#bda6a6] bg-[#fff3f3] p-8" style={{ height: '758px' }}> {/* Increased main div height */}
            <h2 className="text-2xl font-semibold mb-4 text-[#432e32]">Currently available flowers</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-lg shadow-lg border-2 border-[#bda6a6] bg-[#fff3f3] transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                        style={{ width: '200px', height: '190px' }} // Increased inside div width and height
                    >
                        <img
                            src={card.image}
                            alt={card.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                        />
                        <div className="relative z-10 p-5 bg-gradient-to-t from-[#432e32] to-transparent">
                            <h3 className="text-lg font-bold text-[#f0e5e5]">{card.title}</h3>
                            <p className="text-3xl font-extrabold text-[#f0e5e5]">{card.count}</p>
                        </div>
                        <div className="absolute inset-0 bg-black opacity-20 transition-opacity duration-300 hover:opacity-0"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardCardsComponent;