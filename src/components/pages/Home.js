import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {

  return (
    <div className='container'>
      <Heading/>
      <UploadSection/>
    </div>
  );
}

function Heading(){
  return(
    <>
    <div>
      <h1 className='mainHeading'>MCQ Maker and Learning App</h1>
      <h1 className='headingUpload'>Paste mcq contents in below format:
        </h1>
        <div className='hintPaste'>
          <p>Question: Which gas do plants release during photosynthesis?</p>
          <p>Option A: Carbon Dioxide</p>
          <p>Option B: Oxygen</p>
          <p>Option C: Nitrogen</p>
          <p>Option D: Hydrogen</p>
          <p>Answer: B</p>
          </div>
    </div>
    </>
  );
}

function UploadSection(){

    const navigate = useNavigate();

  function handleClick(){
    let myTextArea = document.getElementById('textUploadId');
    let userInput = myTextArea.value;
    if(userInput){
        navigate('/quiz', {state: userInput});
    }
  }

  return(
    <>
    <textarea id='textUploadId' className='textUpload' placeholder='Enter text here.....'>
    </textarea>
    <button className='submitBtn' onClick={handleClick}>Submit</button>
    </>
  );
}

export default Home
