import React from 'react';

const Features = () => {
  const features = [
    {
      icon: 'fas fa-bell',
      title: 'Real-time Outage Alerts',
      description: 'Get instant notifications about planned and unplanned power cuts in your area.'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Energy Conservation Tips',
      description: 'Learn how to reduce your energy consumption and save on electricity bills.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Safety Guidelines',
      description: 'Comprehensive safety measures to follow before, during, and after blackouts.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Energy Reserve Tracking',
      description: 'Monitor Mauritius\' daily energy reserves and consumption patterns.'
    }
  ];

  return (
    <section className="features">
      <div className="container">
        <div className="section-title">
          <h2>Our Key Features</h2>
          <p>Everything you need to stay prepared during power outages in Mauritius</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <i className={feature.icon}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;