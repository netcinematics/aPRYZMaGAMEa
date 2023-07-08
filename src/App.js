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

  const [viewIDX, setViewIDX] = useState(''); 
  function CLICKview (e) { setViewIDX(e.target.innerText); }

  let sonicBlip = new Audio("https://netcinematics.github.io/aPRYZMaGAMEa/sonic/nxBlip2b.mp3")
  const playBlip = () => {
    sonicBlip.play()
  }
  let sonicSonar = new Audio("https://netcinematics.github.io/aPRYZMaGAMEa/sonic/nxSonar1d.mp3")
  const playSonar = () => {
    sonicSonar.play()
  }

  return (
    <div className="App" style={{display:'flex',flexDirection:'column',backgroundColor: 'black',
      minHeight: '80vh',maxWidth:'55em',margin:'0 auto',padding:'0.444em'}}>
      {/* <header className="App-header" style={{borderRadius:'13px'}}>
      <Zoom>{viewIDX}</Zoom>
      </header> */}
               aPRYZMaGAMEa
       <div>
           <button onClick={playBlip}>Play1</button>
           <button onClick={playSonar}>Play2</button>
         </div>
      <main style={{color:'skyblue', paddingTop:'1.5em',
        borderRadius:'13px',margin:'1em',height:'48em',
        display:'flex',flexDirection:'column'}}>

      {         
        (() => { //SIMPLE-DYNAMIC-VIEW-DISPLAY: (design~innovation) // Routing - nah...
          // if (viewIDX === "aWORDaGAMi") {
          //   return <AWordaGami1/>;
          // } else if (viewIDX === "TicTacToe") {
          //   return <TicTacToe/>;
          // } else 
          if (viewIDX === "StoryGrid") {
            return <StoryGrid/>;
          // } else if (viewIDX === "SongPhrases") {
          //   return <SongPhrases/>;
          } else {
            return <MainView/>;
          }
        })()
      }
      </main>
      <nav style={{marginTop:'1em'}}>
        <button style={{cursor:'pointer',borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px purple'}}
           onClick={CLICKview}>MAIN</button>
        <button style={{cursor:'pointer',borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px lime'}}
           onClick={CLICKview}>aWORDaGAMi</button>
        <button style={{cursor:'pointer',borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px yellow'}}
           onClick={CLICKview}>TicTacToe</button>
        <button style={{cursor:'pointer',borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px orange'}}
           onClick={CLICKview}>StoryGrid</button>
        <button style={{cursor:'pointer',borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px orange'}}
           onClick={CLICKview}>SongPhrases</button>
      </nav>
      <section style={{color:'steelblue',fontSize:'0.666em',marginTop:'2em'}}>
        MIT - work in progress by spazefalcon  - &copy; 2023
      </section>      
    </div>
  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       aPRYZMaGAMEa
  //     <div>
  //         <button onClick={playBlip}>Play1</button>
  //         <button onClick={playSonar}>Play2</button>
  //       </div>
  //     </header>
  //     <main>

  //     </main>
  //   </div>
  // );
}

export default App;
