import Typewriter from "typewriter-effect";
// import Zoom from 'react-reveal/Zoom';
// import Fade from 'react-reveal/Fade';

// import SocialPhrases_2 from '../data/SocialPhrases_2.js'
import { useEffect } from "react";
// import {useEffect, useState} from 'react'
import "../styles.css";

export default function MainView () {
    useEffect(() => { document.title = "aPRYZMaGAMEa";  }, []);

    return (<>
        <header style={{borderRadius:'13px',fontSize:'xxx-large',marginBottom:'0.666em'}}>
        {/* <Zoom>Welcome!</Zoom> */}
        Welcome!
        </header>
        <article style={{height:'55vh',display:'flex',flexDirection:'column',justifyContent:'space-evenly',
            borderRadius:'10px', backgroundColor: 'rgb(22 35 62)',paddingTop:'2em'}}>
            <code>Artificial Intelligence Word Games.</code><br/>
            <p>AI_WORD_GAMEZ.</p>
            <pre><i>u wanna try?</i></pre>
            <hr style={{width:'88%',height:'6px',boxShadow:'-3px 15px 7px 0px #180018',
                border:'1px solid skyblue',borderRadius:'100%',margin:'1em auto',
                marginBottom:'2em'}}></hr>

            {/* <Fade delay={1e3} cascade damping={1e-1}> */}
            <div className="sub">
                <Typewriter style={{fontSize:'x-large',paddingTop:'1em'}}
                    options={{
                    strings: ["a WORKSPACE to PRACTICE Ai CONCEPTS!", 
                            "Like: NLP and LLMs in JavaScript,",
                            "ReactJS State Machine grid displays,", 
                            "NodeJS Training Tokenizers",
                            "... MetaData, Algorithms, and more!"],
                    autoStart: true,
                    loop: true,
                    delay: 100,
                    changeDeleteSpeed:4444
                    }}
                />
            </div>
            <hr style={{width:'88%',height:'6px',boxShadow:'-3px 15px 7px 0px #180018',
                border:'1px solid skyblue',borderRadius:'100%',margin:'1em auto',marginTop:'2em'}}></hr>
            <section style={{fontSize:'smaller',display:'flex',justifyContent:'center'}}>
                <ol style={{margin:'1em auto',textAlign:'left'}}>
            {/* <Fade cascade  damping={0.444} delay={1000} duration={4000}>*/}
                    <li>Ai NLP Concepts</li>
                    <li>Ai Patterns in React</li>
                    <li>Ai Plasticity Generator</li>
                    <li>Ai Tokenz of meta_conceptz</li>
                    <li>Audio - Visual integrations.</li>
            {/*</Fade> */}
                </ol>
            </section>
            <section style={{marginBottom:'2em',fontSize:'medium',padding:'0 2em'}}>

                <br></br><br></br>fork, PR, or drop a star on &nbsp;
                <a href='https://github.com/netcinematics/aPRYZMaGAMEa' rel="noreferrer" target="_blank">GitHub</a>,
                <br></br><br></br>Check out <strong>aPRYZMaGAMEa</strong>!
            </section>
        </article>
    </>)

};