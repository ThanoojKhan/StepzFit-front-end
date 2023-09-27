import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function countBarChart( {data} ) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const months = data.map((item) => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthNumber = item._id.month - 1; 
        return monthNames[monthNumber];
    });
    const userCounts = data.map((item) => item.count);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: months,
                    datasets: [
                        {
                            label: 'User Count',
                            data: userCounts,
                            backgroundColor: 'rgba(10, 30, 132, 0.2)',
                            borderColor: 'rgba(10, 30, 132, 1)',
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
    }, [months, userCounts]);

    return (
        <div className="w-full h-full flex justify-center items-center">
            <canvas ref={chartRef} width={600} height={300}></canvas>
        </div>
    );
}

export default countBarChart;
