import React from 'react';

const Alerts = () => {
  const alerts = [
    {
      type: 'warning',
      title: 'Planned Maintenance - Port Louis',
      area: 'Central Business District area',
      time: 'Today, 10:00 AM - 2:00 PM',
      severity: 'Moderate Impact'
    },
    {
      type: 'warning',
      title: 'Unplanned Outage - Curepipe',
      area: 'Royal Road and surrounding areas',
      time: 'Since 8:45 AM - Estimated restoration: 12:30 PM',
      severity: 'Moderate Impact'
    },
    {
      type: 'warning',
      title: 'Fault Repair - Grand Baie',
      area: 'Coastal Road area',
      time: 'Today, 1:00 PM - 4:00 PM',
      severity: 'Low Impact'
    }
  ];

  return (
    <section className="alerts" id="alerts">
      <div className="container">
        <div className="section-title">
          <h2>Current Outage Alerts</h2>
          <p>Real-time information about electricity disruptions across Mauritius</p>
        </div>
        <div className="alert-container">
          <div className="alert-header">
            <h3>Active Alerts</h3>
            <div className="alert-status">
              <div className="status-indicator warning"></div>
              <span>3 Active Warnings</span>
            </div>
          </div>
          <ul className="alert-list">
            {alerts.map((alert, index) => (
              <li key={index} className={`alert-item ${alert.type}`}>
                <div className="alert-info">
                  <strong>{alert.title}</strong>
                  <p>{alert.area}</p>
                  <span className="alert-time">{alert.time}</span>
                </div>
                <div className="alert-severity">{alert.severity}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Alerts;