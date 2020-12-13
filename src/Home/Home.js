import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

const Home = (props) => {

    const selectedDifficulty = localStorage.getItem('difficulty') || 'easy';
    const [difficulty, setDifficulty] = useState(selectedDifficulty);
    const [start, setStart] = useState(false);

    const formHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('difficulty', difficulty);
        setStart(true);
    }

    return (
        <Container maxWidth="sm" style={{padding: '50px', background: '#d8cbb9b8'}}>
            {start ? <Redirect to="/game" /> : null }
            <Typography variant="h4" component="h1"> Welcome to Typing Game </Typography>
            <Divider />
            <Typography variant="body2" component="p"> Enjoy the thrill of typing in this game </Typography>

            <form onSubmit={formHandler}>
                <strong>Choose your Difficulty Level</strong>
                <select onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
                    <option value='easy'>Easy</option>
                    <option value='medium'>Medium</option>
                    <option value='hard'>Hard</option>
                    <option value='extreme'>Extreme</option>
                </select>
                <button type="submit">Lets Start</button>
            </form>

        </Container>
    );
}

export default Home;
