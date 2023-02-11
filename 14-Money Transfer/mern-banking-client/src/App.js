/**
 * @author Shri Nandhini J R
 * @email shrinandhini2801@gmail.com
 */
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from "./components/HomePage";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
        </div>
      </Router>
    );
  }
}

export default App;
