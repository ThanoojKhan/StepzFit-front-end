import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function CountBarChart({ data }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const traineeCount = data;

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Tasks Count'],
                    datasets: [
                        {
                            label: 'Total Tasks Scheduled',
                            data: [traineeCount],
                            backgroundColor: 'rgba(100, 30, 132, 0.4)',
                            borderColor: 'rgba(100, 30, 132, 1)',
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
                            min: 0,
                            max: 20,
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
    }, [traineeCount]);

    return (
        <div className="w-full h-full flex justify-center items-center">
            <canvas ref={chartRef} width={600} height={300}></canvas>
        </div>
    );
}

export default CountBarChart;
