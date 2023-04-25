import React, { Component } from "react";
import Circle from "./components/Circle";
import Modal from "./components/Modal";
import "./App.css";

class App extends Component {
  state = {
    title: "Speed Game",
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
      this.setState({
        score: this.state.score + 10,
        rounds: 0,
      });
    } else {
      this.endHandler();
    }
  };

  randomizer = () => {
    let nextActive;
    do {
      nextActive = Math.floor(Math.random() * 4) + 1;
      if (this.state.rounds === 5) {
        this.endHandler();
      }
    } while (nextActive === this.state.current);
    this.setState({
      current: nextActive,
      rounds: this.state.rounds + 1,
    });
    //console.log(this.state.rounds);
    //console.log("Active circle is ", nextActive);
  };

  startHandler = () => {
    this.setState({
      gameStart: true,
      timer: setInterval(this.randomizer, this.state.pace),
    });
    //this.intervalId = setInterval(this.randomizer, this.state.pace);
  };

  endHandler = () => {
    this.setState({
      gameStart: false,
      showGameOver: true,
    });
    clearInterval(this.state.timer);
  };

  modalHandler = (e) => {
    this.setState({
      showGameOver: !this.state.showGameOver,
      score: 0,
      current: 0,
      rounds: 0,
    });
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
          <Modal score={this.state.score} click={this.modalHandler} />
        )}
      </div>
    );
  }
}

export default App;
