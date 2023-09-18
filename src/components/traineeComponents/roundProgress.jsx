import React, { useState, useEffect } from 'react';

const RoundProgressBar = ({ total, current }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (total > 0 && current >= 0) {
      const calculatedPercentage = (current / total) * 100;
      setPercentage(calculatedPercentage);
    }
  }, [total, current]);

  const dashOffset = 283 - (283 * percentage) / 100; 

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="none" strokeWidth="10" stroke="#ccc" />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        strokeWidth="10"
        stroke="#007bff"
        strokeDasharray="283"
        strokeDashoffset={dashOffset}
      />
      <text x="50%" y="50%" textAnchor="middle" dy="0.3em" fontSize="16">
        {`${percentage.toFixed(0)}%`}
      </text>
    </svg>
  );
};

export default RoundProgressBar;
