// import logo from './logo.svg';
import './App.css';
import "./styles.css";  //put all styles in here.
import MainView from './views/MainView';
import StoryGrid from './views/StoryGrid6';
// import SongPhrases from './views/SongPhrases';
// import TicTacToe from './views/TicTacToeView';
// import AWordaGami1 from './views/aWordaGami1';
import { useState } from 'react';

function App() {

  let sonicBlip = new Audio("https://netcinematics.github.io/aPRYZMaGAMEa/sonic/nxBlip2b.mp3")
  const playBlip = () => {
    sonicBlip.play()
  }
  let sonicSonar = new Audio("https://netcinematics.github.io/aPRYZMaGAMEa/sonic/nxSonar1d.mp3")
  const playSonar = () => {
    sonicSonar.play()
  }


  return (
    <div className="App">
      <header className="App-header">
        aPRYZMaGAMEa
      <div>
          <button onClick={playBlip}>Play1</button>
          <button onClick={playSonar}>Play2</button>
        </div>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

      </header>
    </div>
  );
}

export default App;
