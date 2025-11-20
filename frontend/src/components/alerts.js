import React, { useState, useEffect } from 'react';
const Alerts = () => {
  const [outages, setOutages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOutages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3000/api/outages/current');
      const data = await response.json();
      
      if (data.status === 'success') {
        setOutages(data.data);
      } else {
        setError('Failed to load outage data');
      }
    } catch (err) {
      setError('Unable to connect to server. Please check if backend is running.');
      console.error('Error fetching outages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutages();
    
    // Refresh data every 30 seconds to update timers
    const interval = setInterval(fetchOutages, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className="alerts" id="alerts">
        <div className="container">
          <div className="section-title">
            <h2>Power Outages in Mauritius</h2>
            <p>Loading current outage information...</p>
          </div>
          <div className="loading-spinner"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="alerts" id="alerts">
      <div className="container-alert">
        <div className="section-header">
          <h1>Power Outages in Mauritius</h1>
          <button className="refresh-btn" onClick={fetchOutages}>
            ↻ Refresh
          </button>
        </div>

        <div className="time-section">
          <h2>Today</h2>
          
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          {outages.length === 0 && !error ? (
            <div className="no-outages">
              <div className="success-icon">✓</div>
              <h3>No Active Outages</h3>
              <p>All regions currently have normal power supply</p>
            </div>
          ) : (
            <div className="outages-list">
              {outages.map((outage) => (
                <div key={outage.id} className={`outage-card ${outage.isCompleted ? 'completed' : 'active'}`}>
                  {/* Time Header */}
                  <div className="outage-time-header">
                    <div className="hours-ago">{outage.hoursAgo}</div>
                    <div className="time-range">{outage.timeRange}</div>
                  </div>

                  {/* Region Title */}
                  <div className="region-title">
                    <strong>{outage.region}</strong>
                  </div>

                  {/* Location Details */}
                  <div className="location-details">
                    {outage.location}
                  </div>

                  {/* Status and Timer */}
                  <div className="outage-status">
                    {outage.isCompleted ? (
                      <>
                        <span className="status-text">Power has resumed since</span>
                        <span className="timer completed">{outage.timeRemaining}</span>
                      </>
                    ) : (
                      <>
                        <span className="status-text">Power will resume in</span>
                        <span className="timer active">{outage.timeRemaining}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Alerts;