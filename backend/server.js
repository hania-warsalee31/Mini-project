import express from 'express';
import cors from 'cors';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock database (replace with real database)
const outageData = {
  "Rivière du Rempart": [
    {
      date: "Le jeudi 20 novembre 2025 de 11:00:00 à 15:00:00",
      locality: "SAINT ANTOINE",
      streets: "MORC ST ANTOINE",
      type: "scheduled",
      duration: "4 hours"
    }
  ],
  "Port Louis": [
    {
      date: "Le jeudi 20 novembre 2025 de 09:00:00 à 12:00:00",
      locality: "PORT LOUIS CENTRAL",
      streets: "RUE DU VIEUX CONSEIL, QUEEN STREET",
      type: "emergency",
      duration: "3 hours"
    }
  ],
  "Plaines Wilhems": [
    {
      date: "Le vendredi 21 novembre 2025 de 08:00:00 à 10:00:00",
      locality: "QUATRE BORNES",
      streets: "ROYAL ROAD, JUMEAUX LANE",
      type: "scheduled", 
      duration: "2 hours"
    }
  ],
  "Moka": [],
  "Grand Port": [],
  "Savanne": [],
  "Black River": [],
  "Flacq": [],
  "Pamplemousses": [],
  "Rodrigues": []
};

// API Routes
app.get('/api/outages', (req, res) => {
  res.json({
    success: true,
    data: outageData,
    lastUpdated: new Date().toISOString()
  });
});

app.get('/api/outages/:district', (req, res) => {
  const district = req.params.district;
  const data = outageData[district] || [];
  
  res.json({
    success: true,
    district,
    data,
    count: data.length
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'PowerGuard Mauritius API is running',
    timestamp: new Date().toISOString()
  });
});

// Web scraper for CEB data (USE CAREFULLY - for educational purposes)
app.get('/api/scrape-ceb', async (req, res) => {
  try {
    // Note: This is a template - actual implementation depends on CEB's website structure
    // For now, we'll return mock data with a warning
    
    console.log('⚠️  Scraping attempt - replace with actual CEB scraping logic');
    
    // Mock response since actual scraping requires careful implementation
    const mockScrapedData = {
      "Port Louis": [
        {
          date: new Date().toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          locality: "PORT LOUIS CENTRAL",
          streets: "EXAMPLE STREET 1, EXAMPLE STREET 2",
          type: "scheduled",
          source: "CEB",
          duration: "3 hours"
        }
      ]
    };

    res.json({
      success: true,
      message: "This is mock data. Implement actual scraping based on CEB's website structure.",
      data: mockScrapedData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch data from CEB',
      message: 'This feature requires proper implementation based on CEB website structure'
    });
  }
});

// Manual data update endpoint
app.post('/api/outages', (req, res) => {
  const { district, outages } = req.body;
  
  if (!district || !outages) {
    return res.status(400).json({
      success: false,
      error: 'District and outages are required'
    });
  }

  if (outageData[district]) {
    outageData[district] = [...outageData[district], ...outages];
    res.json({ 
      success: true,
      message: 'Outage data updated successfully',
      district,
      newCount: outageData[district].length
    });
  } else {
    res.status(400).json({ 
      success: false,
      error: 'Invalid district' 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    error: 'Something went wrong!' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Endpoint not found' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 PowerGuard Mauritius API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🗺️ Outages data: http://localhost:${PORT}/api/outages`);
});