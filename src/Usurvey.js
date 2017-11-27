import React, { Component } from 'react';
const firebase = require('firebase');
const uuid = require('uuid');

var config = {
    apiKey: "AIzaSyBoE63_A8EuiFhCx0Q_3WkNIe4iVqrun-w",
    authDomain: "ablinks-4e960.firebaseapp.com",
    databaseURL: "https://ablinks-4e960.firebaseio.com",
    projectId: "ablinks-4e960",
    storageBucket: "ablinks-4e960.appspot.com",
    messagingSenderId: "154062695240"
};
firebase.initializeApp(config);

class Usurvey extends Component {

    nameSubmit(event) {
        let studentName = this.refs.name.value;
        this.setState({studentName: studentName}, function() {
            console.log(this.state)
        });
    }

    answerSelected(event) {
        let answers = this.state.answers;
        if (event.target.name === 'q1') {
            answers.q1 = event.target.value;
        } else if (event.target.name === 'q2') {
            answers.q2 = event.target.value;
        }
    }

    questionSubmit() {

        firebase.database().ref('uSurvey/'+ this.state.uid).set({
            studentName: this.state.studentName,
            answers: this.state.answers
        });
        this.setState({isSubmitted: true});
    }

    constructor(props) {
        super(props);

        this.state = {
            uid: uuid.v1(),
            studentName: '',
            answers: {
                q1: '',
                q2: ''
            },
            isSubmitted: false
        };
        this.nameSubmit = this.nameSubmit.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
        this.questionSubmit = this.questionSubmit.bind(this);
    }

    render() {
        let studentName;
        let questions;

        if (this.state.studentName === '' && this.state.isSubmitted === false) {
            studentName = <div> 
                    <h2>Name: </h2>
                    <form onSubmit={this.nameSubmit}>
                        <input className="namy" type="text" placeholder="Name" ref="name" />
                    </form>
                </div>;
                questions = '';
        } else if (this.state.studentName !== '' && this.state.isSubmitted === false) {
            studentName = <h2>Welcome to new survey {this.state.studentName}</h2>
            questions = <div>
                <h3>Three Question Survey ...</h3>
                <form onSubmit={this.questionSubmit}>
                    <div className="card">
                        <label>What is your level of proficiency with ReactJS?</label><br />                            
                        <input type="radio" name="q1" value="beg" onChange={this.answerSelected}/>Beginner
                        <input type="radio" name="q1" value="int" onChange={this.answerSelected}/>Intermediate
                        <input type="radio" name="q1" value="exp" onChange={this.answerSelected}/>Expert
                    </div>
                    <div className="card">
                        <label>What best describes your interest in ReactJS?</label><br />
                        <input type="radio" name="q2" value="learn"  onChange={this.answerSelected}/>Learn or use ReactJS on personal projects<br />
                        <input type="radio" name="q2" value="job-search"  onChange={this.answerSelected}/>Looking for ReactJS work<br />
                        <input type="radio" name="q2" value="work"  onChange={this.answerSelected}/>Currently using ReactJS at work<br />
                    </div>
                    <div className="card">
                        <label>Do you know of any Colorado companies using ReactJS</label><br />
                        <input type="text" name="company"/> 
                    </div>
                    <input className="feedback-button" type="submit" value="submit" />
                </form>
                </div>
        } else if (this.state.isSubmitted === true) {
            studentName = <h1>Thanks, {this.state.studentName}</h1>
        }



        return (
            <div>
                {studentName}
                -------------------
                {questions}
            </div>
        );
    }
}

export default Usurvey;
