import React from 'react';
import './App.css';
import Header from './components/header';
import Hero from './components/hero';
import Features from './components/features';
import Alerts from './components/alerts';
import SafetyTips from './components/safetytips';
import Quiz from './components/Quiz';
import EnergyReserve from './components/EnergyReserve';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import FloatingFontController from './components/FloatingFontController';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Features />
      <Alerts />
      <SafetyTips />
      <Quiz />
      <EnergyReserve />
      <AIAssistant />
      <Footer />
      
    </div>
  );
}

export default App;