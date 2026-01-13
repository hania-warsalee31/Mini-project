import React, { useState, useEffect } from 'react';

const EnergyReserve = () => {
  const [energyData, setEnergyData] = useState({
    currentReserve: 65,
    dailyConsumption: 890,
    peakDemand: "6:00 PM - 9:00 PM",
    renewableContribution: 22,
    lastUpdated: new Date()
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateTime, setUpdateTime] = useState('');

  const fetchEnergyData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3000/api/energy/reserve');
      const data = await response.json();
      
      if (data.status === 'success') {
        setEnergyData(data.data);
        const updated = new Date(data.data.lastUpdated);
        setUpdateTime(`Today, ${updated.getHours()}:${updated.getMinutes().toString().padStart(2, '0')}`);
      } else {
        setError('Failed to load energy data');
      }
    } catch (err) {
      setError('Unable to connect to server. Please check if backend is running.');
      console.error('Error fetching energy data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnergyData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchEnergyData, 300000);
    return () => clearInterval(interval);
  }, []);

  const getReserveLevelClass = (reserve) => {
    if (reserve <= 30) return 'critical';
    if (reserve <= 70) return 'adequate';
    return 'good';
  };

  if (loading) {
    return (
      <section className="energy-reserve" id="reserve">
        <div className="container">
          <div className="section-title">
            <h2>Mauritius Energy Reserve</h2>
            <p>Loading current energy data...</p>
          </div>
          <div className="reserve-container">
            <div className="loading" style={{ textAlign: 'center', margin: '20px' }}>
              <div className="spinner"></div>
              <p>Loading energy data...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="energy-reserve" id="reserve">
      <div className="container">
        <div className="section-title">
          <h2>Mauritius Energy Reserve</h2>
          <p>Daily updates on the country's electricity generation and consumption</p>
          <button className="btn" onClick={fetchEnergyData} style={{ marginTop: '10px' }}>
            <i className="fas fa-sync-alt"></i> Refresh Data
          </button>
        </div>
        <div className="reserve-container">
          <h3>Current Reserve Status</h3>
          <p>Last updated: <span>{updateTime}</span></p>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="reserve-meter">
            <div 
              className={`reserve-level ${getReserveLevelClass(energyData.currentReserve)}`} 
              style={{ width: `${energyData.currentReserve}%` }}
            ></div>
          </div>
          <div className="reserve-labels">
            <span>Critical (0-30%)</span>
            <span>Adequate (31-70%)</span>
            <span>Good (71-100%)</span>
          </div>
          
          <div className="reserve-data">
            <div className="reserve-stat">
              <h4>Current Reserve</h4>
              <p className="stat-value">{energyData.currentReserve}%</p>
              <div className={`reserve-indicator ${getReserveLevelClass(energyData.currentReserve)}`}>
                {energyData.currentReserve <= 30 ? '⚠️ Critical' : 
                 energyData.currentReserve <= 70 ? '🔶 Adequate' : '✅ Good'}
              </div>
            </div>
            <div className="reserve-stat">
              <h4>Daily Consumption</h4>
              <p className="stat-value">{energyData.dailyConsumption} MWh</p>
            </div>
            <div className="reserve-stat">
              <h4>Peak Demand Time</h4>
              <p className="stat-value">{energyData.peakDemand}</p>
            </div>
            <div className="reserve-stat">
              <h4>Renewable Contribution</h4>
              <p className="stat-value">{energyData.renewableContribution}%</p>
              <div className="renewable-indicator">
                🌱 Green Energy
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnergyReserve;