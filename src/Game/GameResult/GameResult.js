import React from 'react';
import {Link} from 'react-router-dom'
import styles from './GameResult.module.css';

const gameResult = (props) => {

    return (
        <div className={styles.GameResult} >
            <h1>Time ran out</h1>
            <p>Your final score is {props.location.state.score}</p>
            <h4>Highest Score: {localStorage.getItem('highestScore')}</h4>
            <Link to='/'> <button type="button" >Try again</button> </Link>
        </div>
    );
}

export default gameResult;