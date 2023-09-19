import React from 'react';

const BMIMeter = ({ bmi }) => {
  const meterValue = parseFloat(bmi) || 0;
  let bmiCategory = 'Provide Data';
  let bmiColor = 'text-blue-500';
  let bmiBgColor = 'bg-blue-500';
  let meterWidth = `${Math.min(100, meterValue)}%`;

  if (meterValue < 18.5) {
    bmiCategory = 'Underweight';
    bmiColor = 'text-red-500';
    bmiBgColor = 'bg-red-500';
  } else if (meterValue < 25) {
    bmiCategory = 'Normal Weight';
    bmiColor = 'text-green-500';
    bmiBgColor = 'bg-green-500';
  } else if (meterValue < 30) {
    bmiCategory = 'Overweight';
    bmiColor = 'text-yellow-500';
    bmiBgColor = 'bg-yellow-500';
  } else {
    bmiCategory = 'Obese';
    bmiColor = 'text-red-400';
    bmiBgColor = 'bg-red-600';
  }

  return (
    <>
      <div className="mt-4 ">
        <div className="bg-black h-6 w-40 rounded-full">
          <div>
            <div
              className={`h-6 rounded-full ${bmiBgColor}`}
              style={{ width: meterWidth }}
            ></div>
          </div>
        </div>
        <p className={`text-center mt-2 ${bmiColor}`}>
          BMI: {bmi} ({bmiCategory})
        </p>
      </div>
    </>
  );
};

export default BMIMeter;
