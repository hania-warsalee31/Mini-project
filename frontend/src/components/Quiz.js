import React, { useState } from 'react';

const Quiz = () => {
  const quizData = [
    {
      question: "What is the most energy-efficient way to light your home during a power outage?",
      options: [
        "LED lanterns or flashlights",
        "Candles",
        "Kerosene lamps",
        "Gas-powered generators for lighting"
      ],
      correct: 0
    },
    {
      question: "Which appliance typically consumes the most electricity in a household?",
      options: [
        "Refrigerator",
        "Air conditioner",
        "Water heater",
        "Television"
      ],
      correct: 1
    },
    {
      question: "What should you do first when the power goes out?",
      options: [
        "Check the circuit breaker",
        "Call the utility company",
        "Turn off major appliances",
        "Light candles"
      ],
      correct: 2
    },
    {
      question: "How can you reduce energy consumption from your refrigerator?",
      options: [
        "Keep it fully stocked",
        "Place it in direct sunlight",
        "Set the temperature as cold as possible",
        "Defrost it weekly"
      ],
      correct: 0
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const loadQuestion = () => {
    setSelectedOption(null);
  };

  const selectOption = (index) => {
    setSelectedOption(index);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      loadQuestion();
    } else {
      alert('Quiz completed! Thank you for testing your knowledge.');
      setCurrentQuestion(0);
      loadQuestion();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      loadQuestion();
    }
  };

  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <section className="quiz" id="quiz">
      <div className="container">
        <div className="section-title">
          <h2>Energy Awareness Quiz</h2>
          <p>Test your knowledge about electricity conservation and safety</p>
        </div>
        <div className="quiz-container">
          <div className="quiz-progress">
            <div className="quiz-progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="quiz-question">
            <h3>{quizData[currentQuestion].question}</h3>
          </div>
          <div className="quiz-options">
            {quizData[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`quiz-option ${selectedOption === index ? 'selected' : ''}`}
                onClick={() => selectOption(index)}
                style={{
                  backgroundColor: selectedOption !== null
                    ? index === quizData[currentQuestion].correct
                      ? 'var(--success)'
                      : selectedOption === index
                      ? 'var(--danger)'
                      : ''
                    : ''
                }}
              >
                {option}
              </div>
            ))}
          </div>
          <div className="quiz-nav">
            <button className="btn" onClick={prevQuestion} disabled={currentQuestion === 0}>
              Previous
            </button>
            <button className="btn" onClick={nextQuestion}>
              {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;