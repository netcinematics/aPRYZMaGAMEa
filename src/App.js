import './App.css';
import "./styles.css";  //put all new styles in here.
import MainView from './views/MainView';
import TokenGridFrame from './views/TokenGrid7';
import { useState } from 'react';

/*****-SONICZ-****** load from raw to avoid deploy path errors */
let sonicBlip = new Audio("https://netcinematics.github.io/aPRYZMaGAMEa/sonic/nxBlip2b.mp3")
let sonicSonar = new Audio("https://netcinematics.github.io/aPRYZMaGAMEa/sonic/nxSonar1d.mp3")

function App() {

  const [appIDX, setAppIDX] = useState(''); 
  function Click_APP (e) { setAppIDX(e.target.innerText); }

  return (
    <div className="App" style={{display:'flex',flexDirection:'column',backgroundColor: 'black',
      minHeight:'80vh',maxWidth:'55em',margin:'0 auto',padding:'0.444em',borderRadius:'15px'}}>
      <main style={{color:'skyblue', paddingTop:'1.5em',
        borderRadius:'13px',margin:'1em',height:'48em',
        display:'flex',flexDirection:'column'}}>

      {         
        (() => { //SIMPLE-DYNAMIC-VIEW-DISPLAY: (design~innovation) // Routing - nah...
          if (appIDX === "aPRYZMaGAMEa") {
            sonicBlip.play();
            return <TokenGridFrame/>;
          } else if (appIDX === "MAIN") {
            sonicSonar.play();
            return <MainView/>;
          } else {
            return <MainView/>;
          }
        })()
      }
      </main>
      <nav style={{marginTop:'1em'}}>
        <button style={{cursor:'pointer',borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px purple'}}
           onClick={Click_APP}>MAIN</button>
        {/* <button style={{cursor:'pointer',borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px yellow'}}
           onClick={Click_APP}>TicTacToe</button> */}
        <button style={{cursor:'pointer',borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px orange'}}
           onClick={Click_APP}>aPRYZMaGAMEa</button>
      </nav>
      <section style={{color:'steelblue',fontSize:'x-small',marginTop:'2em'}}>
        MIT - work in progress by spazefalcon  - &copy; 2023
      </section>      
    </div>
  );

}

export default App;
