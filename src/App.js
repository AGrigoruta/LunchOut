import React from 'react';
import logo from './view/images/Logo.png';
import './css/index.css';
import Button from './Log.js';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App__header">
          <img src={logo} className="App__header__logo" alt="logo" />
        </header>
        <Button />
      </div>
    );
  }
}

export default App;
