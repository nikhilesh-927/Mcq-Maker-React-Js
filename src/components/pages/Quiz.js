import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  const location = useLocation();
  const {state} = location;
  
  const textMsg = state.toString();

  const navigate = useNavigate();

  const buttonAnsClick = () => {
    navigate('/answers', {state: textMsg});
  }

  const buttonClickHanle = () => {
    navigate('/');
  }
  
  return (
    <div>
      <nav className='quizNav'>
        <button onClick={buttonClickHanle} className='buttonStyle'>Home</button>
        <button onClick={buttonAnsClick} className='buttonStyle'>All Answers</button>
      </nav>
    <Question rawText={textMsg}/>
    </div>
  );
}

export default Quiz


function Question({rawText}){

  function parseQuestions(rawQuestions){
    const blocks = rawQuestions.trim().split(/\n\s*\n/);
    const quizData = blocks.map((block) => {
      const lines = block.split("\n").map((line) => line.trim());

      const questionLines = lines.find((line) => (line.startsWith("Question: ")));
      const question = questionLines.replace("Question: ", "").trim();

      const options = lines.filter((line) => line.startsWith("Option")).map((line, index) => {
        const [label, value] = line.split(":").map((s) => s.trim());

        return {
          id: index + 1,
          option: label.replace("Option: ", "").trim(),
          value: value
        };
      });

      const answerLines = lines.find((line) => line.startsWith("Answer: "));
      const answer = answerLines.replace("Answer: ", "").trim();

      return {question, options, answer};
    })

    return quizData;
  }

  const quizData = parseQuestions(rawText);

  const [isAnswered, setIsAnswered] = useState(false);

  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const [isWrongAnswer, setIsWrongAnswer] = useState(false);

  const [userAnswer, setUserAnswer] = useState(null);

  const [activeItem, setActiveItem] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextQuestion = () => {
    if(currentIndex < quizData.length - 1){
      setCurrentIndex(currentIndex + 1);
    }
    setActiveItem(null);
    setIsAnswered(false);
  };

  const prevQuestion = () => {
    if(currentIndex > 0){
      setCurrentIndex(currentIndex - 1);
    }
    setActiveItem(null);
    setIsAnswered(false);
  }

  function handleClick(id, ansOption){
    setIsAnswered(false);
    setIsWrongAnswer(false);
    setIsCorrectAnswer(false);
    setActiveItem(id);
    setUserAnswer(ansOption);
  }

  function handleAnswer(){
    let newAns = userAnswer.replace("Option ", "");
    if(userAnswer == null){
      alert("Please Select an Option!");
    }
    else if(newAns.toLowerCase() === quizData[currentIndex].answer.toLowerCase()){
      setIsWrongAnswer(false);
      setIsCorrectAnswer(true);
    }
    else{
      setIsCorrectAnswer(false);
      setIsWrongAnswer(true);
    }
    setIsAnswered(true);
  }

  return(
    <div className='questionDiv'>
      <div className='questionOptions'>
        <h2 className='questions'>Questions: {currentIndex + 1} / {quizData.length}</h2>
      <h2 className='questions'>
        {currentIndex + 1}: {quizData[currentIndex].question}
      </h2>
      <ol className='options'>
        {quizData[currentIndex].options.map((item) => (
          <li onClick={() => handleClick(item.id, item.option)} className={`${activeItem === item.id ? '' : 'option'} ${activeItem === item.id ? 'optionBgChange' : ''} ${isCorrectAnswer && activeItem === item.id ? 'correctAnswer' : ''} ${isWrongAnswer && activeItem === item.id ? 'wrongAnswer': ''}`} key={item.id}>{item.value}</li>
        ))}
      </ol>
      </div>
      <div className='submitAndNext'>
        <button className='submitBtn' onClick={prevQuestion} disabled={currentIndex === 0}>Prev</button>
      <button className='submitBtn' onClick={() => handleAnswer()}>Submit Answer</button>
      <button className='submitBtn' onClick={nextQuestion} disabled={currentIndex === quizData.length - 1}>Next</button>
      <div className='afterAnswer'>
      <p className={isAnswered && isCorrectAnswer ? 'correctAnswer options correctGlow': ''}>{isAnswered && isCorrectAnswer ? 'Correct Answer!' : ''}</p>
      <p className={isAnswered && isWrongAnswer ? 'wrongAnswer options wrongGlow' : ''}>{isAnswered && isWrongAnswer ? 'Wrong Answer!' : ''}</p>
      </div>
      </div>
    </div>
  );
}
