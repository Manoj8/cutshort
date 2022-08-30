import React from "react";
import OnBoarding from "./pages/on-boarding";
import Eden from "./pages/eden";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isOnBoarding: true,
    };
  }

  setEden = () => {
    this.setState({ isOnBoarding: false });
  };

  render() {
    const { isOnBoarding } = this.state;
    return (
      <div className="App">
        <Routes>{isOnBoarding ? <Route path="/" element={<OnBoarding setEden={this.setEden} />} /> : <Route path="/" element={<Eden />} />}</Routes>
      </div>
    );
  }
}

export default App;
