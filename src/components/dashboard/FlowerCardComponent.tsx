// FlowerCardComponent.tsx
import React from 'react';

interface FlowerCardProps {
    imageUrl: string;
    title: string;
    description: string;
    price: string;
}

const FlowerCardComponent: React.FC<FlowerCardProps> = ({ imageUrl, title, description, price }) => {
    return (
        <div
            className="relative rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
            style={{ width: '750px', height: '350px', backgroundColor: '#284b63' }} // Lighter dark blue
        >
            {/* Image */}
            <img
                src="/public/b1.jpg"
                alt={title}
                className="w-full h-2/3 object-cover"
            />

            {/* Content */}
            <div className="p-4 text-white">
                <h3 className="text-xl font-semibold mb-2 text-[#a0c2e0]">{title}</h3> {/* Light blue text */}
                <p className="text-[#a0c2e0] text-sm mb-3">{description}</p> {/* Light blue description */}
                <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-[#7ab8e0] mb-2">{price}</span> {/* Lighter blue price */}
                    <button className="bg-[#5c98c7] hover:bg-[#4a87b5] text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300"> {/* Matching blue button */}
                        Be Aware of extra charges when taking payment
                    </button>
                </div>
            </div>

            {/* Overlay (Optional - for hover effects) */}
            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
        </div>
    );
};

export default FlowerCardComponent;