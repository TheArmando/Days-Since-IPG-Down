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

const ONE_DAY = 1000*60*60*24;
const ONE_HOUR = 1000*60*60;
const ONE_MINUTE = 1000*60;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: new Date(),
      lastUpTime: new Date(1533748684000),
      isUp: false
    }
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    let date = new Date();
    this.setState({
      currentTime: new Date()
    });
  }

  render() {
    const timeDiff = this.state.currentTime - this.state.lastUpTime;
    let dayDiff = Math.floor(timeDiff / ONE_DAY % 1);
    let hourDiff = Math.floor(timeDiff / ONE_HOUR % 24);
    let minuteDiff = Math.floor(timeDiff / ONE_MINUTE % 60);
    
    document.body.style.backgroundColor = this.state.isUp ? 'darkgreen' : 'darkred';
    console.log(timeDiff);
    console.log(dayDiff);
    console.log(hourDiff);
    console.log(minuteDiff);
    return (
        <div className="App">
          <Paper className="App-paper" elevation={20}>
            { this.state.isUp 
              ? 
              <Typography>
                The IPG API is up!
              </Typography>
              : 
                <div>
                  <Typography variant="title">
                    It's been
                  </Typography>
                  <Typography className="App-typography" variant='display4'>
                    {dayDiff ? dayDiff + ':': ''}{hourDiff}:{minuteDiff}
                  </Typography>
                  <Typography className="App-typography" variant='title'>
                    since the API has been up.
                  </Typography>
                </div>
            }
          </Paper>
        </div>
    );
  }
}

export default App;