import axios from 'axios';
import React, { Component } from 'react';
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
            isUp: true
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
        axios({
            method: 'get',
            url: 'http://localhost:3001/check'
        })
        .then((res) => {
            if (res.data && res.data.transactionStatus) {
                this.setState({isUp: true});
            } else {
                this.setState({isUp: false});
            }
        })
        .catch((error) => {
            console.log('Sorry, nothing:', error);
        });
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        this.setState({
            currentTime: new Date()
        });
    }

    render() {
        const timeDiff = this.state.currentTime - this.state.lastUpTime;
        let dayDiff = Math.floor(timeDiff / ONE_DAY % 1);
        let hourDiff = formatTime(Math.floor(timeDiff / ONE_HOUR % 24));
        let minuteDiff = formatTime(Math.floor(timeDiff / ONE_MINUTE % 60));

        document.body.style.backgroundColor = this.state.isUp ? 'darkgreen' : 'darkred';
        return (
            <div className="App">
                <Paper className="App-paper" elevation={20}>
                    {
                        this.state.isUp
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