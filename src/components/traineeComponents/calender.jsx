import React, { useState } from 'react';

const Calendar = ({ tasksByDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const renderDate = (date) => {
    const formattedDate = formatDate(date);
    const tasksForDate = tasksByDate[formattedDate];

    const isToday = () => {
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    };

    const selectDate = () => {
      setSelectedDate(formattedDate);
    };

    return (
      <div
        className={`calendar-date ${isToday() ? 'today' : ''}`}
        onClick={selectDate}
      >
        <span className="date">{date.getDate()}</span>
        {tasksForDate && (
          <div className="tasks">
            {tasksForDate.map((task, index) => (
              <div key={index} className="task">
                {task}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2>October 2023</h2>
      </div>
      <div className="calendar-days">
        <div className="day">Sun</div>
        <div className="day">Mon</div>
        <div className="day">Tue</div>
        <div className="day">Wed</div>
        <div className="day">Thu</div>
        <div className="day">Fri</div>
        <div className="day">Sat</div>
      </div>
      <div className="calendar-grid">
        {Array.from({ length: 31 }, (_, i) => {
          const date = new Date(2023, 9, i + 1); // October is month 9
          return renderDate(date);
        })}
      </div>
      {selectedDate && (
        <div className="selected-date-info">
          <h3>Selected Date: {selectedDate}</h3>
          <button onClick={() => setSelectedDate(null)}>Clear Selection</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
