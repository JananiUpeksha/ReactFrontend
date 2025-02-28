import { useEffect, useState } from "react";

const DashboardImageSlider = () => {
    const flowerImages = [
        "/i1.jpg",
        "/i2.jpg",
        "/i3.jpg",
        "/i4.jpg",
        "/i5.jpg",
        "/i6.jpg",
        "/i7.jpg",
        "/i8.jpg",
        "/i9.jpg",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % flowerImages.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [flowerImages.length]);

    return (
        <div className="relative overflow-hidden rounded-lg shadow-lg">
            {/* Current Image */}
            <img
                src={flowerImages[currentIndex]}
                alt={`Flower ${currentIndex + 1}`}
                className="w-[900px] h-[400px] object-cover transition-opacity duration-1000 ease-in-out" //Fixed height here
            />

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {flowerImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            currentIndex === index ? "bg-[#432e32]" : "bg-[#bda6a6]"
                        }`}
                        style={{ border: "2px solid #f0e5e5" }}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default DashboardImageSlider;