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
    constructor(props) {
        super(props);

        this.state = {
            uid: uuid.v1(),
            studentName: '',
            answers: {
                answer1: '',
                answer2: '',
                answer3: ''
            },
            isSubmitted: false
        };
        this.nameSubmit = this.nameSubmit.bind(this);
    }

    render() {
        let studentName;
        let questions;

        if (this.state.studentName === '' && this.state.isSubmitted === false) {
            studentName = <div> 
                    <h3>Name: </h3>
                    <form onSubmit={this.nameSubmit}>
                        <input className="namy" type="text" placeholder="Name" ref="name" />
                    </form>
                </div>;
                questions = '';
        } else if (this.state.studentName !== '' && this.state.isSubmitted === false) {
            studentName = <h3>Welcome to new survey {this.state.studentName}</h3>
            questions = <p></p>
        };



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
