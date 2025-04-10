import { useState } from 'react';
import './App.css';

const questions = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
    correctAnswer: "Delhi",
  },
  {
    question: "Which programming language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correctAnswer: "JavaScript",
  },
  {
    question: "Who is known as the father of computers?",
    options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"],
    correctAnswer: "Charles Babbage",
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Tool Multi Language",
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars",
  },
  {
    question: "Which data structure uses LIFO?",
    options: ["Queue", "Stack", "Array", "Tree"],
    correctAnswer: "Stack",
  },
  {
    question: "What year was JavaScript created?",
    options: ["1990", "1995", "2000", "2005"],
    correctAnswer: "1995",
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Facebook", "Microsoft", "Apple"],
    correctAnswer: "Facebook",
  },
  {
    question: "Which of these is a NoSQL database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
    correctAnswer: "MongoDB",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets",
    ],
    correctAnswer: "Cascading Style Sheets",
  },
  {
    question: "What is the output of: typeof null in JavaScript?",
    options: ["object", "null", "undefined", "number"],
    correctAnswer: "object",
  },
  {
    question: "Which method is used to fetch data in React?",
    options: ["getData()", "useData()", "useEffect()", "fetch()"],
    correctAnswer: "fetch()",
  },
  {
    question: "Which one is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Django"],
    correctAnswer: "Django",
  },
  {
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Advanced Programming Instruction",
      "Application Process Integration",
      "Automated Programming Interface",
    ],
    correctAnswer: "Application Programming Interface",
  },
  {
    question: "Which tag is used for inserting a line break in HTML?",
    options: ["<br>", "<lb>", "<break>", "<line>"],
    correctAnswer: "<br>",
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleOptionSelect = (option) => {
    setUserAnswers({ ...userAnswers, [currentQuestion]: option });
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (userAnswers[i] === q.answer) score++;
    });
    setResult(`You scored ${score} out of ${questions.length}`);
  };

  return (
    <div className="app-container">
      <h1 className="main-title">Quiz Solver Application</h1>
      <div className="quiz-layout">
        {/* Left Side */}
        <div className="left-column">
          <div className="question-text">
            {currentQuestion + 1}. {questions[currentQuestion].question}
          </div>
          <div className="options-container">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  userAnswers[currentQuestion] === option ? 'selected' : ''
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="nav-buttons">
            <button onClick={handlePrev} disabled={currentQuestion === 0}>Previous</button>

            {currentQuestion < questions.length - 1 ? (
              <button onClick={handleNext}>Next</button>
            ) : (
              <button onClick={handleSubmit}>Submit</button>
            )}
          </div>

          {result && <div className="result">{result}</div>}
        </div>

        {/* Right Side */}
        <div className="right-column">
          <h3>Question Navigation</h3>
          <div className="question-list">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`nav-item 
                  ${index === currentQuestion ? 'active' : ''} 
                  ${userAnswers[index] ? 'answered' : ''}`}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
