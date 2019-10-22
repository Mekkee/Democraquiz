import React, { Component } from 'react';
import update from 'react-addons-update';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import './App.css';

/* 
  npm install react-addons-update --save
  npm install react-addons-css-transition-group
*/

class App extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOption: [],
      answer: '',
      answersCount: {
        Demokrat: 0,
        Diktator: 0,
        Oligark: 0
      },
      result: ''
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount(){
    const shuffledAnswerOptions = quizQuestions.map(question => this.shuffleArray(question.answers));
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle
    while(0 !== currentIndex){
      // pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
    
      // Then swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  handleAnswerSelected(event){
    this.setUserAnswer(event.currentTarget.value);

    if(this.state.questionId < quizQuestions.length){
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    const updatedAnswersCount = update(this.state.answersCount, 
      {
        [answer]: {$apply: (currentValue) => currentValue + 1}
    })

    this.setState({
      answersCount: updatedAnswersCount,
      answer: answer
    })
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter, 
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    })
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1){
      this.setState({ result: result[0]})
    }
    else {
      this.setState({result: 'Undetermined' })
    }
  }

  renderQuiz() {
    return (
      <Quiz
      answer={this.state.answer}
      answerOptions={this.state.answerOptions}
      questionId={this.state.questionId}
      question={this.state.question}
      questionTotal={quizQuestions.length}
      handleAnswerSelected={this.handleAnswerSelected}
    />
    )
  }

  renderResult() {
    return (
      <Result quizResult={this.state.result} />
    )
  }

  render() {
    return (
      <div className="App">
        {this.state.result ? this.renderResult() : this.renderQuiz()}+
      </div>
    )
  }

}

export default App;
