import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function PlanBarChart({ data }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null); 
    const planNames = data.map((item) => item.name);
    const planCountsArray = data.map((item) => item.count);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: planNames,
                    datasets: [
                        {
                            label: 'Number of Plans',
                            data: planCountsArray,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                        y: {
                            beginAtZero: true,
                            stepSize: 1,
                        },
                    },
                },
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [planNames, planCountsArray]);

    return (
        <div className="w-full h-full flex justify-center items-center">
            <canvas ref={chartRef} width={600} height={300}></canvas>
        </div>
    );
}

export default PlanBarChart;
