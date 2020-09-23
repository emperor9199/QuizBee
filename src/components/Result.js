import React from "react";

const Result = ({ score, answerSheet, playAgain }) => {
  return (
    <div className="score-board">
      <div className="score">Your Score is {score}/5 !</div>
      <div className="answer-key">
        <ul className="list-style">
          {answerSheet.map((answer, index) => (
            <li>
              {index + 1} : {answer}
            </li>
          ))}
        </ul>
      </div>
      <button className="btn btn-success playBtn" onClick={playAgain}>
        Play Again
      </button>
    </div>
  );
};

export default Result;
