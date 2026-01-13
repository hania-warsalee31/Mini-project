import React, { useState, useRef, useEffect } from 'react';

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const GEMINI_API_KEY = "AIzaSyB4lmI7fKnSaL5wtRky9jsltpFeop5Iymg";
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  // Clean and parse JSON from AI response
  const parseAIResponse = (aiResponse) => {
    try {
      console.log('Raw AI response:', aiResponse);
      
      // Method 1: Try direct JSON parse first (it might already be valid)
      try {
        const directParse = JSON.parse(aiResponse);
        if (Array.isArray(directParse)) {
          console.log('Direct parse successful!');
          return validateQuestions(directParse);
        }
      } catch (e) {
        // Continue with cleaning if direct parse fails
      }
      
      // Method 2: Extract from code blocks
      const codeBlockMatch = aiResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (codeBlockMatch) {
        aiResponse = codeBlockMatch[1];
      }
      
      // Method 3: Find JSON array pattern
      const jsonArrayMatch = aiResponse.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (jsonArrayMatch) {
        aiResponse = jsonArrayMatch[0];
      }
      
      // Comprehensive cleaning for common issues
      let jsonString = aiResponse
        // Handle smart quotes and apostrophes
        .replace(/[\u2018\u2019]/g, "'") // Smart single quotes
        .replace(/[\u201C\u201D]/g, '"') // Smart double quotes
        .replace(/[`´]/g, "'") // Other quote-like characters
        // Fix the specific Mauritius's case
        .replace(/Mauritius's/g, "Mauritius's")
        .replace(/Mauritius’s/g, "Mauritius's")
        // Ensure proper JSON formatting
        .replace(/(\w+):/g, '"$1":') // Add quotes to property names
        .replace(/,\s*}/g, '}') // Remove trailing commas before }
        .replace(/,\s*]/g, ']') // Remove trailing commas before ]
        .replace(/\n/g, ' ') // Replace newlines with spaces
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
      
      console.log('Cleaned JSON string:', jsonString);
      
      // Try parsing the cleaned JSON
      const questions = JSON.parse(jsonString);
      return validateQuestions(questions);
      
    } catch (error) {
      console.error('JSON parsing failed:', error);
      console.log('Last attempted string:', aiResponse);
      
      // Final attempt: Manual extraction and reconstruction
      try {
        const manualQuestions = extractQuestionsManually(aiResponse);
        if (manualQuestions.length > 0) {
          console.log('Manual extraction successful!', manualQuestions);
          return manualQuestions;
        }
      } catch (manualError) {
        console.error('Manual extraction also failed:', manualError);
      }
      
      throw new Error('Failed to parse AI response as valid JSON');
    }
  };

  // Validate and filter questions
  const validateQuestions = (questions) => {
    if (Array.isArray(questions) && questions.length > 0) {
      const validQuestions = questions.filter(q => 
        q.question && 
        Array.isArray(q.options) && 
        q.options.length === 4 && 
        typeof q.correct === 'number' &&
        q.correct >= 0 && 
        q.correct <= 3
      );
      
      if (validQuestions.length > 0) {
        console.log('Successfully parsed questions:', validQuestions);
        return validQuestions.slice(0, 5);
      }
    }
    throw new Error('Invalid question structure');
  };

  // Manual extraction as last resort
  const extractQuestionsManually = (text) => {
    const questions = [];
    const questionBlocks = text.split(/{/).slice(1); // Split by object start
    
    for (const block of questionBlocks) {
      try {
        const questionMatch = block.match(/"question":\s*"([^"]*)"/);
        const optionsMatch = block.match(/"options":\s*\[([^\]]*)\]/);
        const correctMatch = block.match(/"correct":\s*(\d+)/);
        
        if (questionMatch && optionsMatch && correctMatch) {
          // Extract options array
          const optionsText = optionsMatch[1];
          const options = optionsText.split(',').map(opt => 
            opt.trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '')
          ).filter(opt => opt.length > 0);
          
          if (options.length === 4) {
            questions.push({
              question: questionMatch[1],
              options: options,
              correct: parseInt(correctMatch[1])
            });
          }
        }
      } catch (e) {
        // Skip invalid blocks
        continue;
      }
    }
    
    return questions.slice(0, 5);
  };

  // Generate AI-powered quiz questions
  const generateQuizQuestions = async () => {
    setIsLoading(true);
    
    try {
      const prompt = `Create exactly 5 simple multiple-choice questions about energy conservation and electricity safety in Mauritius catered for all ages.

IMPORTANT: Return ONLY valid JSON format, no additional text. Use only regular characters, no smart quotes.

Each question must have:

- "question": string with the question text and emojis
- "options": array of exactly 4 strings containing emojis as well
- "correct": number (0-3) indicating the correct option index

Example format:
[
  {
    "question": "What is the most energy-efficient lighting during outages?",
    "options": ["LED lanterns", "Candles", "Kerosene lamps", "Gas generators"],
    "correct": 0
  }
]

Focus on Mauritius-specific energy topics like CEB, tropical climate efficiency, and local safety practices.`;

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "gemini-2.5-flash",
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 2000,
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.error('Invalid API response format:', data);
        throw new Error('Invalid response format from API');
      }

      const aiResponse = data.candidates[0].content.parts[0].text;
      const questions = parseAIResponse(aiResponse);
      setQuizData(questions);
      
    } catch (error) {
      console.error('Error generating quiz:', error);
      setQuizData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const selectOption = (index) => {
    if (selectedOption === null && quizData[currentQuestion]) {
      setSelectedOption(index);
      if (index === quizData[currentQuestion].correct) {
        setScore(score + 1);
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
    generateQuizQuestions();
  };

  const progress = quizData.length > 0 ? ((currentQuestion + 1) / quizData.length) * 100 : 0;

  useEffect(() => {
    generateQuizQuestions();
  }, []);

  // ... (rest of the component JSX remains the same as previous version)
  if (isLoading) {
    return (
      <section className="quiz" id="quiz">
        <div className="container">
          <div className="section-title">
            <h2>Energy Awareness Quiz</h2>
            <p>Test your knowledge about electricity conservation and safety</p>
          </div>
          <div className="quiz-container">
            <div className="loading-message">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p>Generating AI-powered quiz questions...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (quizData.length === 0) {
    return (
      <section className="quiz" id="quiz">
        <div className="container">
          <div className="section-title">
            <h2>Energy Awareness Quiz</h2>
            <p>Test your knowledge about electricity conservation and safety</p>
          </div>
          <div className="quiz-container">
            <div className="error-message">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
              <h3>Unable to Generate Quiz</h3>
              <p>The AI service returned invalid data. Please try again.</p>
              <button className="btn" onClick={generateQuizQuestions} style={{ marginTop: '1rem' }}>
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (quizCompleted) {
    return (
      <section className="quiz" id="quiz">
        <div className="container">
          <div className="section-title">
            <h2>Quiz Completed!</h2>
            <p>Your energy knowledge results</p>
          </div>
          <div className="quiz-container">
            <div className="quiz-results">
              <h3>Your Score: {score} out of {quizData.length}</h3>
              <p>
                {score === quizData.length ? "🎉 Excellent! You're an energy expert!" :
                 score >= Math.ceil(quizData.length * 0.7) ? "👍 Good job! You know your energy facts!" :
                 "💡 Keep learning! You'll master energy conservation soon!"}
              </p>
              <button className="btn" onClick={restartQuiz}>
                Generate New Quiz
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="quiz" id="quiz">
      <div className="container">
        <div className="section-title">
          <h2>Energy Awareness Quiz</h2>
          <p>AI-powered questions about electricity conservation and safety in Mauritius</p>
        </div>
        <div className="quiz-container">
          <div className="quiz-progress">
            <div className="quiz-progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          
          <div className="quiz-header">
            <span>Question {currentQuestion + 1} of {quizData.length} </span>
            
          </div>

          <div className="score-header">
           
            <span>Score: {score}</span>
          </div>

          <div className="quiz-question">
            <h3>{quizData[currentQuestion]?.question}</h3>
          </div>

          <div className="quiz-options">
            {quizData[currentQuestion]?.options.map((option, index) => (
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
            <button 
              className="btn" 
              onClick={nextQuestion} 
              disabled={selectedOption === null}
            >
              {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>

          <div style={{ fontSize: '12px', color: '#666', textAlign: 'center', marginTop: '1rem' }}>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;