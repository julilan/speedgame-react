import React, { Component } from "react";
import Circle from "./components/Circle";
import Modal from "./components/Modal";
import tap from "./sounds/tap_sound.wav";
import start from "./sounds/game_start.wav";
import end from "./sounds/game_end.wav";
import "./App.css";

class App extends Component {
  clickSound = new Audio(tap);
  startSound = new Audio(start);
  endSound = new Audio(end);

  state = {
    title: "Speed Test",
    score: 0,
    current: 0,
    rounds: 0,
    circles: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    pace: 1000,
    gameStart: false,
    showGameOver: false,
    timer: null,
  };

  clickHandler = (circle) => {
    //console.log(circle);
    if (circle.id === this.state.current) {
      this.setState((prevState) => ({
        score: prevState.score + 10,
        rounds: prevState.rounds - 1,
      }));
      this.clickSound.play();
    } else {
      this.endHandler();
    }
  };

  randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  pickNew = () => {
    let nextActive;
    do {
      nextActive = this.randomInteger(1, this.state.circles.length);
      if (this.state.rounds === 5) {
        this.endHandler();
      }
    } while (nextActive === this.state.current);
    this.setState((prevState) => ({
      current: nextActive,
      rounds: prevState.rounds + 1,
      pace: prevState.pace - 10,
    }));
    //console.log(this.state.rounds);
    //console.log("Active circle is ", nextActive);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.gameStart && prevState.pace !== this.state.pace) {
      clearInterval(this.state.timer);
      const timerId = setInterval(this.pickNew, this.state.pace);
      this.setState({ timer: timerId });
    }
  }

  startHandler = () => {
    this.startSound.play();
    const timerId = setInterval(this.pickNew, this.state.pace);
    this.setState({
      gameStart: true,
      timer: timerId,
    });
  };

  endHandler = () => {
    this.endSound.play();
    this.setState({
      gameStart: false,
      showGameOver: true,
    });
    // console.log(this.state.pace);
    clearInterval(this.state.timer);
  };

  modalHandler = (e) => {
    this.setState({
      showGameOver: !this.state.showGameOver,
      score: 0,
      current: 0,
      rounds: 0,
      pace: 1000,
    });
  };

  messageHandler = (score) => {
    let result = "";
    if (score === 0) {
      result = "🤨";
    } else if (score <= 150) {
      result = "Baby steps";
    } else if (score <= 400) {
      result = "Nice try";
    } else {
      result = "Proficient";
    }
    return result;
  };

  render() {
    const isActive = this.state.current;

    const circlesList = this.state.circles.map((circle, i) => {
      return (
        <Circle
          key={circle.id}
          click={() => this.clickHandler(circle)}
          class={isActive === circle.id ? "circle active" : "circle"}
          clicksActive={this.state.gameStart ? "auto" : "none"}
        />
      );
    });

    return (
      <div className="app">
        <h1>{this.state.title}</h1>
        <p>Score: {this.state.score}</p>
        <div className="game_wrapper">{circlesList}</div>
        <button
          className={!this.state.gameStart ? "" : "hidden"}
          onClick={this.startHandler}
        >
          Start
        </button>
        <button
          className={!this.state.gameStart ? "hidden" : ""}
          onClick={this.endHandler}
        >
          End
        </button>
        {this.state.showGameOver && (
          <Modal
            score={this.state.score}
            click={this.modalHandler}
            message={this.messageHandler(this.state.score)}
          />
        )}
      </div>
    );
  }
}

export default App;
