import React from 'react';

const BMIMeter = ({ bmi }) => {
  const meterValue = parseFloat(bmi) || 0;
  const meterWidth = Math.min(meterValue, 40);

  let bmiCategory = 'Provide Data';
  let bmiColor = 'bg-blue-500';

  if (meterValue < 18.5 && meterValue != 0) {
    bmiCategory = 'Underweight';
    bmiColor = 'bg-red-500';
  } else if (meterValue >= 18.5 && meterValue < 25 && meterValue != 0) {
    bmiCategory = 'Normal Weight';
    bmiColor = 'bg-green-500';
  } else if (meterValue >= 25 && meterValue < 30 && meterValue != 0) {
    bmiCategory = 'Overweight';
    bmiColor = 'bg-yellow-500';
  } else if (meterValue > 30 && meterValue != 0) {
    bmiCategory = 'Obese';
    bmiColor = 'bg-red-500';
  }

  return (
    <>
      <div className="mt-4">
        <div className="bg-gray-200 h-6 w-40 rounded-full">
          <div
            className={`h-6 rounded-full ${bmiColor}`}
            style={{ width: `${meterWidth}%` }}
          ></div>
        </div>
        <p className={`text-center mt-2 ${bmiColor === 'bg-red-500' ? 'text-red-500' : ''}`}>
          BMI: {bmi} ({bmiCategory})
        </p>
      </div>
    </>
  );
};

export default BMIMeter;
