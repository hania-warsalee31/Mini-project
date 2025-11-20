import React from 'react';

const SafetyTips = () => {
  const tips = [
    {
      title: 'Before a Blackout',
      items: [
        'Keep flashlights and batteries in easily accessible locations',
        'Create an emergency kit with essential supplies',
        'Charge power banks and mobile devices',
        'Know how to manually open your electric garage door',
        'Install surge protectors for sensitive electronics'
      ]
    },
    {
      title: 'During a Blackout',
      items: [
        'Turn off and unplug electrical appliances',
        'Keep refrigerator and freezer doors closed',
        'Use flashlights instead of candles to prevent fire hazards',
        'Keep one light switched on to know when power returns',
        'Check on neighbors, especially elderly or vulnerable individuals'
      ]
    },
    {
      title: 'After a Blackout',
      items: [
        'Wait a few minutes before turning on major appliances',
        'Check food in refrigerator and freezer for spoilage',
        'Reset clocks, timers, and security systems',
        'Inspect your electrical system for any damage',
        'Restock your emergency kit if needed'
      ]
    }
  ];

  return (
    <section className="safety-tips" id="safety">
      <div className="container">
        <div className="section-title">
          <h2>Safety Measures</h2>
          <p>Essential guidelines to keep you and your family safe during power outages</p>
        </div>
        <div className="tips-container">
          {tips.map((tip, index) => (
            <div key={index} className="tip-card">
              <div className="tip-header">
                <h3>{tip.title}</h3>
              </div>
              <div className="tip-body">
                <ul>
                  {tip.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafetyTips;