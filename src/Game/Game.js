import React, { Component } from 'react';
import styles from './Game.module.css';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Game extends Component {

    state = {
        // words: ["sigh", "dependent", "quince", "eight", "loving", "drag", "admit", "superficial"],
        score: 0,
        time: 5,
        randomWord: '',
        gameOver: false
    }

    componentDidMount() {
        console.log("Clock", "componentDidMount");
        this.words = [];
        axios.get(`https://random-word-api.herokuapp.com/word?number=100`)
             .then(result => {
                 console.log(result);
                this.words = result.data;
                this.addWordToDOM();
                this.timeInterval = setInterval(() => {
                    this.updateTime();
                }, 1000);
            })

        this.difficulty = localStorage.getItem("difficulty") || "easy";
    }

    componentWillUnmount() {
        console.log("Clock", "componentWillUnmount");
        clearInterval(this.timerID);
    }

    //add to DOM
    addWordToDOM = () => {
        let randomWord = this.words[Math.floor(Math.random() * this.words.length)];
        this.setState({randomWord: randomWord});
    }

    updateTime = () => {
        this.setState((prevState) => {
            return {...prevState, time: prevState.time - 1}
        });
        if (this.state.time === 0) {
            clearInterval(this.timeInterval);
            this.gameOver();
        }
    }

    gameOver() {
        const oldHighestScore = localStorage.getItem('highestScore') || 0;
        if(this.state.score > oldHighestScore) {
            localStorage.setItem('highestScore', this.state.score);
        }
        this.setState({gameOver: true});
        // this.props.history.push({pathname: '/game-result', state: { score: this.state.score } });
        // <Redirect to={{ pathname: "/game-result", state: { score: this.state.score } }} />;
    }

    inputHandler = (e) => {
        const insertedText = e.target.value;

        if (insertedText === this.state.randomWord) {
            this.addWordToDOM();
            this.updateScore();

            e.target.value = "";
            let time = 4;
            if (this.difficulty === "extreme")
                time = 1;
            else if (this.difficulty === "hard")
                time = 2;
            else if (this.difficulty === "medium")
                time = 3;

            this.setState((prevState) => {
                return {...prevState, time: prevState.time + time}
            });
            this.updateTime();
        }
    }

    updateScore() {
        this.setState({score: this.state.score+1});
    }

    render() {
        return (
            <div className={styles.Game}>
                {this.state.gameOver ?
                    <Redirect to={{ pathname: "/game-result", state: { score: this.state.score } }} />
                    : null
                }
                <h2>Speed Typer</h2>
                <small>Type the following</small>
                <h1 id="word">{this.state.randomWord}</h1>
                <input type="text" onChange={(e) => this.inputHandler(e)} placeholder="Type the word here...." />
                <p className={styles.TimeContainer}>Time left: <span id="time">{this.state.time}s</span></p>
                <p className={styles.ScoreContainer}>Score: <span id="score">{this.state.score}</span></p>
                <p>
                    <strong>LEVEL </strong> {this.difficulty}
                    <Link to='/'> <button type="button" >Change Level</button> </Link>
                </p>
            </div>
        );

    }
}

export default Game;