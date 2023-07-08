// import Typewriter from "typewriter-effect";
// import Zoom from 'react-reveal/Zoom';
// import Fade from 'react-reveal/Fade';
// import { useState } from 'react';
import SocialPhrases_2 from '../data/SocialPhrases_2.js'
// import React, { useEffect } from "react";
import { useEffect } from "react";
// import {useEffect, useState} from 'react'
import "../styles.css";

export default function MainView () {
    useEffect(() => { document.title = "aPRYZMaGAMEa";  }, []);

    return (<>
        <header className="App-header" style={{borderRadius:'13px'}}>
        <div>Welcome!</div>
        {/* <Zoom>Welcome!</Zoom> */}
        </header>
        <article style={{height:'55vh',display:'flex',flexDirection:'column',justifyContent:'space-evenly',
            borderRadius:'10px', backgroundColor: 'rgb(22 35 62)'}}>
            <code>Artificial Intelligence AI_WORD_GAMES:</code><br/>
            u want to play?<br/>
            <hr style={{width:'100%'}}></hr>
            <section style={{fontSize:'x-large',display:'flex',justifyContent:'center'}}>
                <ol style={{margin:'1em auto',textAlign:'left'}}>
            {/* <Fade cascade  damping={0.444} delay='1000' duration='4000'>
                    <li>Ai NLP Concepts</li>
                    <li>Ai Patterns in React</li>
                    <li>Ai Plasticity Generator</li>
                    <li>Ai Tokenz of meta_conceptz</li>
                    <li>Audio - Visual integrations.</li>
            </Fade> */}
                </ol>
            </section>
            <hr style={{width:'100%'}}></hr>
            <section style={{marginBottom:'2em',fontSize:'medium',padding:'0 2em'}}>
                {/* <Fade delay={1e3} cascade damping={1e-1}> */}
                <div className="sub">
          {/* <Typewriter
            options={{
              strings: ["This code is a WORKSPACE to PRACTICE Ai CONCEPTS.", 
                    "Like Natural Language Processing (NLP), Language Models (LLM),", 
                    "Tokenizers, MetaData, State Machine, Algorithms and more!"],
              autoStart: true,
              loop: true,
              delay: 50,
              changeDeleteSpeed:4
            }}
          /> */}
        </div>

                {/* </Fade> */}
                <br></br><br></br>fork, PR, or drop a star:&nbsp;
                <a href='https://github.com/netcinematics/aWordaGami' rel="noreferrer" target="_blank">GitHub</a>...
            </section>
        </article>
    </>)

};