// BarChartComponent.tsx
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface ChartProps {
    labels: string[];
    data: number[];
    chartTitle?: string;
    chartColor?: string;
    chartType: 'bar' | 'pie'; // Add chartType prop
}

const BarChartComponent: React.FC<ChartProps> = ({ labels, data, chartTitle = 'Demo Chart', chartColor = 'rgba(0, 0, 0, 0.5)', chartType = 'bar' }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                const datasets = [{
                    label: chartTitle,
                    data: data,
                    backgroundColor: chartType === 'bar' ? chartColor : undefined, // Conditionally set background color for bars
                    borderColor: chartType === 'bar' ? chartColor.replace('0.5', '1') : undefined, // Conditionally set border color for bars
                    borderWidth: 1,
                }];

                if (chartType === 'pie') {
                    datasets[0].backgroundColor = labels.map((_, index) => `hsl(${index * 60}, 70%, 50%)`); // Generate colors for pie slices
                }

                chartInstance.current = new Chart(ctx, {
                    type: chartType,
                    data: {
                        labels: labels,
                        datasets: datasets,
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: chartType === 'bar', // Only apply beginAtZero for bar charts
                            },
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    color: 'black',
                                }
                            },
                            title: {
                                display: chartTitle ? true : false,
                                text: chartTitle,
                                color: 'black',
                            }
                        }
                    },
                });
            }
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [labels, data, chartTitle, chartColor, chartType]); // Add chartType to dependency array

    return (
        <div className="w-full h-50">
            <canvas ref={chartRef} />
        </div>
    );
};

// Example usage with demo data:
const DemoChart = () => {
    const demoLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const demoData = [15, 22, 18, 25, 30, 20];

    return (
        <div>
            <BarChartComponent labels={demoLabels} data={demoData} chartTitle="Monthly Demo Bar Chart" chartType="bar" />
            <BarChartComponent labels={demoLabels} data={demoData} chartTitle="Monthly Demo Pie Chart" chartType="pie" />
        </div>
    );
};

export default DemoChart;