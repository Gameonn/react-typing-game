import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Home } from "@material-ui/icons";

const header = (props) => {
    return (
        <div>
          <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                  <Home fontSize="large" />
                </IconButton>
                <Typography variant="h6" > Typing Game </Typography>
              </Toolbar>
          </AppBar>
        </div>
    );
}

export default header;
