import React, { useState, useEffect } from 'react';

const EnergyReserve = () => {
  const [updateTime, setUpdateTime] = useState('');

  useEffect(() => {
    const now = new Date();
    setUpdateTime(`Today, ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`);
  }, []);

  return (
    <section className="energy-reserve" id="reserve">
      <div className="container">
        <div className="section-title">
          <h2>Mauritius Energy Reserve</h2>
          <p>Daily updates on the country's electricity generation and consumption</p>
        </div>
        <div className="reserve-container">
          <h3>Current Reserve Status</h3>
          <p>Last updated: <span>{updateTime}</span></p>
          
          <div className="reserve-meter">
            <div className="reserve-level" style={{ width: '65%' }}></div>
          </div>
          <div className="reserve-labels">
            <span>Critical (0-30%)</span>
            <span>Adequate (31-70%)</span>
            <span>Good (71-100%)</span>
          </div>
          
          <div className="reserve-data">
            <div className="reserve-stat">
              <h4>Current Reserve</h4>
              <p className="stat-value">65%</p>
            </div>
            <div className="reserve-stat">
              <h4>Daily Consumption</h4>
              <p className="stat-value">890 MWh</p>
            </div>
            <div className="reserve-stat">
              <h4>Peak Demand Time</h4>
              <p className="stat-value">6:00 PM - 9:00 PM</p>
            </div>
            <div className="reserve-stat">
              <h4>Renewable Contribution</h4>
              <p className="stat-value">22%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnergyReserve;