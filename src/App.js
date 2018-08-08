import React, { Component } from 'react';
import logo from './logo.svg';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './App.css';

function formatTime(t) {
  if (t < 10) {
    return '0' + t;
  }
  return t;
}

class App extends Component {
  render() {
    return (
        <div className="App">
          <Paper className="App-paper" elevation={20}>
            <Typography variant="title">
              The IPG API has been down for
            </Typography>
            <Typography variant='display4'>
                {formatTime(new Date().getHours())}:{formatTime(new Date().getMinutes())}
            </Typography>
          </Paper>
        </div>
    );
  }
}

export default App;
