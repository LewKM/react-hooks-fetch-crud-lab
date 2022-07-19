import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  
 function handleChange(id, correctIndex){
  
   fetch(`http://localhost:4000/questions/${id}`, {
     method: "PATCH" ,
     headers: 
     { 
       "Content-Type": "application/json" 
      },
      body: 
        JSON.stringify({correctIndex}),
        })
   .then((r) => r.json())
   .then((updatedQuestion) => onUpdateQuestion(updatedQuestion))
 } 
  
  function handleDeleteClick(){
    console.log(id)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then((r) => r.json())
    .then(() => onDeleteQuestion(id))
  }
  
  
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={(event) => handleChange(id, parseInt(event.target.value))}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem; 