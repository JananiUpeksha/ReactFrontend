// DashboardPage.tsx
import DashboardCardsComponent from "../components/dashboard/DashboardCardsComponent.tsx";
import DashboardImageSlider from "../components/dashboard/DashboardImageSlider.tsx";
import React from "react";
import BarChartComponent from "../components/dashboard/BarChartComponent.tsx";
import FlowerCardComponent from "../components/dashboard/FlowerCardComponent.tsx";
import { RootState, AppDispatch } from "../store/store";

function DashboardPage() {
    const demoLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const demoData = [15, 22, 18, 25, 30, 20];

    return (
        <>
            <div className="relative p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <DashboardCardsComponent />
                    </div>
                    <div className="col-span-1 grid grid-rows-2 gap-4">
                        <div className="row-span-1 overflow-hidden">
                            <DashboardImageSlider />
                        </div>
                        <div className="row-span-1">
                            <FlowerCardComponent />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardPage;