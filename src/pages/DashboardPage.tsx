// DashboardPage.tsx
import DashboardCardsComponent from "../components/dashboard/DashboardCardsComponent.tsx";
import DashboardImageSlider from "../components/dashboard/DashboardImageSlider.tsx";

function DashboardPage() {
    console.log("📌 Rendering DashboardPage");

    return (
        <>
            <h1 className="text-3xl font-bold text-blue-500">Dashboard Page</h1>
            <div className="mx-5">
                <DashboardCardsComponent />
                <DashboardImageSlider />
            </div>
        </>
    );
}

export default DashboardPage;