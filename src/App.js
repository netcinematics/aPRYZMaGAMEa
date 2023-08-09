// import './App.css';
import "./styles.css";  //put all new styles in here.
import MainView from './views/MainView';
import TokenGridFrame from './views/TokenGrid8';
import { useState } from 'react';

/*****-SONICZ-****** load from raw to avoid deploy path errors */
let sonicBlip = new Audio("https://netcinematics.github.io/aPRYZMaGAMEa/sonic/nxBlip2b.mp3")
let sonicSonar = new Audio("https://netcinematics.github.io/aPRYZMaGAMEa/sonic/nxSonar1d.mp3")

function App() {

  const [appIDX, setAppIDX] = useState(''); 
  function Click_APP (e) { setAppIDX(e.target.innerText); }

  return (
    <div className="App" style={{display:'flex',flexDirection:'column',backgroundColor: 'black',
      // maxWidth:'55em',
      
      // margin:'0 auto',
      padding:'0.444em',borderRadius:'15px'}}>
    <div>
      <main className="AppMain" style={{color:'skyblue', 
      // paddingTop:'0.222em',
        borderRadius:'13px',height:'90%', 
        display:'flex',flexDirection:'column'
        ,overflowY:'hidden'
        }}>

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
      </div>
      <nav style={{marginTop:'0.5em'}}>
        <button style={{cursor:'pointer',borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px purple'}}
           onClick={Click_APP}>MAIN</button>
        {/* <button style={{cursor:'pointer',borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px yellow'}}
           onClick={Click_APP}>TicTacToe</button> */}
        <button style={{cursor:'pointer',borderRadius:'8px',margin:'0px 10px',boxShadow:'1px 1px 5px orange'}}
           onClick={Click_APP}>aPRYZMaGAMEa</button>
      </nav>
      <section style={{color:'steelblue',fontSize:'x-small',marginTop:'1em'}}>
        MIT - work in progress by envolveren  - &copy; 2023
      </section>      
   </div>
  );

}

export default App;
