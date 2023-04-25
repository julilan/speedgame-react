import React, { Component } from "react";
import Circle from "./components/Circle";
import Modal from "./components/Modal";
import "./App.css";

class App extends Component {
  intervalId;
  pace = 2000;

  //active color #BF1363

  state = {
    title: "Speed Game",
    score: 0,
    current: 0,
    circles: [
      { id: 1, color: "salmon" },
      { id: 2, color: "aquamarine" },
      { id: 3, color: "lightblue" },
      { id: 4, color: "yellow" },
    ],
    gameStart: false,
    showGameOver: false,
  };

  clickHandler = (circle) => {
    //console.log(circle);
    if (circle.id === this.state.current) {
      this.setState({
        score: this.state.score + 10,
      });
    } else {
      this.endHandler();
    }
  };

  randomizer = () => {
    let nextActive;
    do {
      nextActive = Math.floor(Math.random() * 4) + 1;
    } while (nextActive === this.state.current);
    this.setState({
      current: nextActive,
    });
    console.log("Active circle is ", nextActive);
  };

  startHandler = () => {
    this.setState({
      gameStart: true,
    });
    this.intervalId = setInterval(this.randomizer, this.pace);
  };

  endHandler = () => {
    this.setState({
      gameStart: false,
      showGameOver: true,
    });
    clearInterval(this.intervalId);
  };

  modalHandler = (e) => {
    this.setState({
      showGameOver: !this.state.showGameOver,
      score: 0,
    });
  };

  render() {
    //const colors = ["#EE6C4D", "#99E1D9", "#F0F7F4", "#095256"];
    // a condition to check what is the active number and then include a classname for the circle based on that
    //const isActive = this

    const circlesList = this.state.circles.map((circle, i) => {
      return (
        <Circle
          key={circle.id}
          click={() => this.clickHandler(circle)}
          backgroundColor={circle.color}
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
