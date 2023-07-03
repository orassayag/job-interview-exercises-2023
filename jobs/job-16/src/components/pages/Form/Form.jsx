import React, { useEffect, useState } from 'react';
import Button from '../../common/Button/Button';
import questionsData from '../../../data/questions.json';

export default function Form() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [grade, setGrade] = useState(null);

  useEffect(() => {
    setQuestions(questionsData);
  }, []);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswer = (optionId) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionId;
    setAnswers(newAnswers);
  };

  const handleDone = () => {
    const correctAnswers = questions.reduce((count, question, i) => {
      if (question.answer === answers[i]) {
        return count + 1;
      }
      return count;
    }, 0);
    const calculatedGrade = Math.round((correctAnswers / questions.length) * 100);
    setGrade(calculatedGrade);
  };

  const renderOptions = (options) => options.map((option) => (
    <label key={option.id} className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={answers[currentQuestion] === option.id}
        onChange={() => handleAnswer(option.id)}
      />
      <span>{option.text}</span>
    </label>
  ));

  const renderQuestion = (question) => (
    <div key={question.id} className="space-y-4">
      <h3>{question.text}</h3>
      {renderOptions(question.options)}
    </div>
  );

  if (!questions?.length) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">American Test</h1>
      {grade === null ? (
        <>
          {renderQuestion(questions[currentQuestion])}
          <div className="flex justify-between mt-4">
            <Button
              title="Back"
              onClick={handleBack}
              disabled={!currentQuestion}
            />
            <Button
              title="Next"
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
            />
            {currentQuestion === questions.length - 1
              && (
                <Button
                  title="Done"
                  onClick={handleDone}
                  disabled={false}
                />
              )}
          </div>
        </>
      ) : (
        <p>
          {`Your grade: ${grade}`}
        </p>
      )}
    </div>
  );
}
