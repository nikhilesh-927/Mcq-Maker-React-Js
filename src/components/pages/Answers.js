import React from 'react'
import { useLocation } from 'react-router-dom'

function Answers() {

  const location = useLocation();
  
  const {state} = location;

  const dataMsg = state.toString();

  const quizData = parseQuestions();

  function parseQuestions(){
    const blocks = dataMsg.split(/\n\s*\n/);

  const quizData = blocks.map((block) => {
    const lines = block.split("\n");

    const questionLines = lines.find((line) => line.startsWith("Question"));
    const questions = questionLines.replace("Question: ", "").trim();

     const options = lines.filter((line) => line.startsWith("Option")).map((line, index) => {
      const [label, value] = line.split(":").map((s) => s.trim());

      return{
        id: index + 1,
        option: label.replace("Option ", "").trim(),
        value: value
      };
     });

     const answerLines = lines.find((line) => line.startsWith("Answer"));

     const answers = answerLines.replace("Answer: ", "");

     const searchAnsTextLines = lines.filter((line) => line.startsWith("Option"));

     const optionText = searchAnsTextLines.map((option, index) => {
      const [myOption, myValue] = option.split(":");
      const myOneOption = myOption.replace("Option ","").trim();

      return{
        optionText: myOneOption,
        value: myValue
      }
     });

     const answerText = optionText.find((item) => item.optionText === answers).value;

     return{questions, options, answers, answerText};
    
  });
  return quizData;
  }

  return (
    <div className='answersContainer'>
          {quizData.map((questions, index) => {
            return(
            <div key={index} className='questionAnswersContainer'>
            <p>Question {index + 1}: {questions.questions}</p>
              {questions.options.map(item => (
                <p key={item.id}>Option {item.option}: {item.value}</p>
          ))}
          <p className='answerAll'>Answer: {questions.answers} ({questions.answerText} )</p>
            </div>
            );
          })}
    </div>
  );
}

export default Answers
