import Typewriter from "typewriter-effect";
// import Zoom from 'react-reveal/Zoom';
// import Fade from 'react-reveal/Fade';

// import SocialPhrases_2 from '../data/SocialPhrases_2.js'
import { useEffect } from "react";
// import {useEffect, useState} from 'react'
import "../styles.css";

export default function StatView () {
    useEffect(() => { document.title = "aPRYZMaGAMEa";  }, []);

    return (<>
    <div className="scrollBarV mainBorder" style={{maxHeight:'82vh'
            // ,overflowY:'scroll'
            
        }}>
        <header style={{borderRadius:'13px',fontSize:'xxx-large',
        marginBottom:'0.666em'}}>
        {/* <Zoom>Welcome!</Zoom> */}
        Stat~View
        </header>
        <article style={{height:'90%',display:'flex',flexDirection:'column',justifyContent:'space-evenly',
            borderRadius:'10px', backgroundColor: 'rgb(22 35 62)',paddingTop:'2em'}}>
            <code>Artificial Intelligence Word Games.</code><br/>
            <p>AI_WORD_GAMEZ.</p>
            <pre><i>ur progress is shown below</i></pre>
            <pre><i>easter-eggs determine your progress</i></pre>
            <pre><i>can you find them all?</i></pre>
            <hr style={{width:'88%',height:'6px',boxShadow:'-3px 15px 7px 0px #180018',
                border:'1px solid skyblue',borderRadius:'100%',margin:'1em auto',
                marginBottom:'2em'}}></hr>

            {/* <Fade delay={1e3} cascade damping={1e-1}> */}
            <div className="sub">
                <Typewriter style={{fontSize:'x-large',paddingTop:'1em'}}
                    options={{
                    strings: ["Web GAMIFICATION!", 
                            "NLP and LLMs in JavaScript,",
                            "ReactJS NodeJS Tokenizers", 
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
            {/* <section style={{fontSize:'smaller',display:'flex',justifyContent:'center'}}>
                <ol style={{margin:'1em auto',textAlign:'left'}}>
                    <li>Ai NLP in JavaScript, ReactJS, NodeJS</li>
                    <li>Enhanced_English</li>
                    <li>forever on GitHub</li>
                </ol>
            </section> */}
            <code className='txtBox1'>
            <h3>instructions</h3>
            > start, with a_good_look_around.<br></br>
            > then, you_will_see_many_viewz.<br></br><br></br>
            YMD_2020_1_1 sig_~:)
            </code>

            <section style={{marginBottom:'2em',fontSize:'medium',padding:'0 2em'}}>

                <br></br><br></br>fork, PR, or drop a star on &nbsp;
                <a href='https://github.com/netcinematics/aPRYZMaGAMEa' rel="noreferrer" target="_blank">GitHub</a>,
                <br></br><br></br>Check out <strong>aPRYZMaGAMEa</strong>!
            </section>
        </article>
        </div>
    </>)

};