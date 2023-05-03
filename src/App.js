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

  timer;

  state = {
    title: "Speed Test 2.0",
    score: 0,
    current: 0,
    rounds: 0,
    circles: [1, 2, 3, 4],
    pace: 1000,
    gameStart: false,
    showGameOver: false,
  };

  clickHandler = (circle) => {
    //console.log(circle);
    if (circle === this.state.current) {
      this.setState({
        score: this.state.score + 10,
        rounds: this.state.rounds - 1,
      });
      this.clickSound.play();
    } else {
      return this.endHandler();
    }
  };

  randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  pickNew = () => {
    if (this.state.rounds >= 3) {
      return this.endHandler();
    }

    let nextActive;

    do {
      nextActive = this.randomInteger(1, this.state.circles.length);
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
      rounds: this.state.rounds + 1,
      pace: this.state.pace * 0.97,
    });
    this.timer = setTimeout(this.pickNew, this.state.pace);
  };

  startHandler = () => {
    this.startSound.play();
    this.setState({
      gameStart: true,
    });
    this.pickNew();
  };

  endHandler = () => {
    this.endSound.play();
    clearTimeout(this.timer);
    this.setState({
      gameStart: false,
      showGameOver: true,
    });
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
    } else if (score <= 80) {
      result = "Baby steps";
    } else if (score <= 300) {
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
          key={circle}
          click={() => this.clickHandler(circle)}
          class={isActive === circle ? "circle active" : "circle"}
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
