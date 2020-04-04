import React, {Component,useState} from 'react';
import ReactDOM from 'react-dom'
import "./index.css"

export default class Counter extends Component {
    state = {
        step :this.props.step,
        minutes : this.props.minutes,
        seconds: this.props.seconds,
        isRunning: this.props.isRunning,
        end : false,
        length : 100,
        stepLength : (105 / (this.props.minutes * 60 + this.props.seconds)).toFixed(1)
    };


    componentDidMount() {

        this.timerID = setInterval(
            () => {
                this.tick();
                if(this.state.isRunning) {
                    this.onChangeLength();
                    console.log(this.state.length)
                }
                //console.log(this.state);
            },

            this.state.step
        );

    }

    componentWillUnmount() {
        console.log("end");
        this.setState({length:0});
        clearInterval(this.timerID)
    }

    pauseTimer = () => {
        this.setState({isRunning: false});
        console.log("pause");
    };
    startTimer = () => {
        console.log("running");
        this.setState({isRunning: true});
    };

    tick() {
        if(this.state.isRunning && !this.state.end) {
            if(this.state.seconds===0){
                this.setState((state)=>{
                    const minutes = state.minutes - 1;
                    return{
                        minutes : minutes,
                        seconds: 60
                    }
                });
            }
            if(this.state.minutes===0 && this.state.seconds===Math.round(this.state.step/1000)){
                this.pauseTimer();
                this.setState({end:true});
                this.componentWillUnmount();

            }
            this.setState((state) => {
                const newTime = state.seconds - Math.round(this.state.step/1000);
                return {
                    seconds: newTime
                }
            })
        }
    };
    onChangeLength(){
        this.setState(state=>{
            return{
                length : state.length - state.stepLength
            }
        })
    }

    render() {
        const {minutes,seconds,length} = this.state;

        const timerLineStyle = {
            width : `${length}%`
        };
        return (
            <div className="timer">
                <h1>{minutes}:{seconds}</h1>
                <button type="button" onClick={this.startTimer}>Start</button>
                <button type="button" onClick={this.pauseTimer}>Stop</button>
                <div className="timer-line" style={timerLineStyle}></div>
            </div>
        )
    }
}

const a = {
    step : 1000,
    minutes: 1,
    seconds : 11,
    isRunning: true
};

ReactDOM.render(<Counter {...a}/>, document.getElementById('root'));