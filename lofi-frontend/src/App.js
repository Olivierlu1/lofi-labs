import React from 'react';
import logo from './logo.svg';
import './App.css';

class PlayButton extends React.Component {
  state = { play: false };
  
  handleClick = () => {
    this.setState({
        play: !this.state.play
    });
  };
  
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.props.instrument + (this.state.play ? ' play' : ' pause')}
      </button>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
            <PlayButton instrument = 'drums'/>
            <PlayButton instrument = 'piano'/>
        </div>
      </header>
    </div>
  );
}

export default App;