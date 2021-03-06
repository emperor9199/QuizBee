import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService/index";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";
import "bootstrap/dist/css/bootstrap.min.css";

class QuizBee extends Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0,
    answerSheet: [],
  };

  getQuestions = () => {
    quizService().then((question) => {
      this.setState({
        questionBank: question,
      });
    });
  };

  correctAnswer = (answer, correctAns) => {
    if (answer === correctAns) {
      this.setState({
        score: this.state.score + 1,
      });
    }

    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5,
      answerSheet: [...this.state.answerSheet, correctAns],
    });
  };

  playAgain = () => {
    this.getQuestions();

    this.setState({
      score: 0,
      responses: 0,
      answerSheet: [],
    });
  };

  componentDidMount() {
    this.getQuestions();
  }

  render() {
    return (
      <div className="container">
        <div className="title">QuizBee</div>
        {this.state.questionBank.length > 0 &&
          this.state.responses < 5 &&
          this.state.questionBank.map(
            ({ question, answers, correct, questionId }) => (
              <QuestionBox
                question={question}
                options={answers}
                key={questionId}
                selected={(answer) => this.correctAnswer(answer, correct)}
              />
            )
          )}

        {this.state.responses === 5 ? (
          <Result
            score={this.state.score}
            answerSheet={this.state.answerSheet}
            playAgain={this.playAgain}
          />
        ) : null}
      </div>
    );
  }
}

ReactDOM.render(<QuizBee />, document.getElementById("root"));
