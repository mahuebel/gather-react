import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <img
        src="/gather_logo.svg"
        className="loading-app"
        alt="Loading"
      />
    );
  }
}

export default Loading;