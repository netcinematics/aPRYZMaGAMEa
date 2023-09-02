import Typewriter from "typewriter-effect";
// import Zoom from 'react-reveal/Zoom';
// import Fade from 'react-reveal/Fade';
import { useState, useEffect } from 'react';
import axios from 'axios'

// import SocialPhrases_2 from '../data/SocialPhrases_2.js'
// import { useEffect } from "react";
// import {useEffect, useState} from 'react'
import "../styles.css";


export default function RuleView () {
    useEffect(() => { document.title = "aPRYZMaGAMEa";  }, []);

    let [tokenz_INDEX_DATA, setTokenz_INDEX_DATA] = useState([]);
    useEffect(() => { getTokenzINDEX() }, [setTokenz_INDEX_DATA]); 
    function getTokenzINDEX(){ //SHOW MAIN CARDS.
        const options = {
            method: 'GET',
            // url: 'https://raw.githubusercontent.com/netcinematics/aPRYZMaGAMEa/main/src/meta_net/CARDZ/token_index_0.json', //prod url
            // url: 'https://raw.githubusercontent.com/netcinematics/aPRYZMaGAMEa/main/src/meta_net/CARDZ/token_index_2.json', //prod url
            // url: 'https://raw.githubusercontent.com/netcinematics/aPRYZMaGAMEa/main/src/meta_net/IDXZ/omni_key_idx_3.json', //prod url
            // url: 'https://raw.githubusercontent.com/netcinematics/aPRYZMaGAMEa/main/src/meta_net/CARDZ/omni_key_idx_1.json', //prod url
            url: 'https://raw.githubusercontent.com/netcinematics/aPRYZMaGAMEa/main/src/meta_net/IDXZ/omni_key_idx_5.json', //prod url
        }
        axios.request(options).then((response) => {
            setTokenz_INDEX_DATA(format_INDEX_DATA(response.data.omni_key_idx))
            // setTokenz_INDEX_DATA(response.data.omni_key_idx)
        }).catch((error) => {
            console.error(error)
            // setTokenz_CARD_COUNT("no data")
        })    
    }

    function format_INDEX_DATA(server_data){ //from str into token and set
        let formatted_data = []
        formatted_data = server_data.map( (item, idx)=>{
            if(item.title && item.title.length>10){
               //add underscore in front of any capital letter.
               item.title = item.title.replaceAll('_','_ ') //word wrap in browser
            }
             return item;
        }  )
        return formatted_data;
    }

    function ListView (){ 
        let COLNUM=6; //column length, must be dependent on layout, per device.
        let ROWz = [];
        let ROW  = [];
        let humanIDX = 0; //column header
        let tokenCOLUMNS = [];
        for(let i=0; i < tokenz_INDEX_DATA.length; i += COLNUM){
            ROW = tokenz_INDEX_DATA.slice(i, i+COLNUM);
            ROWz.push(ROW);
            ++humanIDX;
             tokenCOLUMNS.push( 
             <div  key={'col_'+i} style={{display:'flex',flexDirection:'column',
               flex:'1 1 0',borderLeft:'1px solid purple',
               borderRadius:'13px',margin:'1em'}}>
                <header style={{minHeight:'2em'}}></header>
                <header>{humanIDX}</header>
                { 
                ROW.map( (token,idx) => { 
                    // token = {key:token}
                    token.numz = humanIDX.toString()+'.'+(idx+1).toString();       //apply dynamic_numz
                    return <section style={{
                        textAlign:'left',
                        marginLeft:'1em',
                        padding:'0.666em 0'
                        }}>
                        {token.title} | {token.numz} </section>
                    // return <Token token={token}/>
                }) 
                }
                {/* <footer style={{minHeight:'3em'}}></footer> */}
             </div> 
             );
        }  
        // setTokenz_COLUMN_COUNT(humanIDX)  
        // setTokenz_COLUMN_LENGTH(COLNUM)  
    
        return(tokenCOLUMNS)
    }

    return (<>
    <div className="scrollBarV mainBorder" style={{maxHeight:'82vh'
            // ,overflowY:'scroll'
            
        }}>
        <header style={{borderRadius:'13px',fontSize:'xxx-large',
        marginBottom:'0.666em'}}>
        {/* <Zoom>Welcome!</Zoom> */}
        INDEX
        </header>
        <article style={{height:'90%',display:'flex',flexDirection:'column',justifyContent:'space-evenly',
            borderRadius:'10px', backgroundColor: 'rgb(22 35 62)',paddingTop:'2em'}}>
            <code>Artificial Intelligence Word Games.</code><br/>
            <p>AI_WORD_GAMEZ.</p>
            <ListView/>
            <pre><i>u wanna try?</i></pre>
            <hr style={{width:'88%',height:'6px',boxShadow:'-3px 15px 7px 0px #180018',
                border:'1px solid skyblue',borderRadius:'100%',margin:'1em auto',
                marginBottom:'2em'}}></hr>

            {/* <Fade delay={1e3} cascade damping={1e-1}> */}
            <div className="sub">
                {/* <Typewriter style={{fontSize:'x-large',paddingTop:'1em'}}
                    options={{
                    strings: ["a WORKSPACE for Ai CONCEPTS!", 
                            "NLP and LLMs in JavaScript,",
                            "ReactJS State Machine grid displays,", 
                            "NodeJS Training Tokenizers",
                            "... MetaData, Algorithms, and more!"],
                    autoStart: true,
                    loop: true,
                    delay: 100,
                    changeDeleteSpeed:4444
                    }}
                /> */}
               
            </div>
            <hr style={{width:'88%',height:'6px',boxShadow:'-3px 15px 7px 0px #180018',
                border:'1px solid skyblue',borderRadius:'100%',margin:'1em auto',marginTop:'2em'}}></hr>
            <section style={{fontSize:'smaller',display:'flex',justifyContent:'center'}}>
                <ol style={{margin:'1em auto',textAlign:'left'}}>
            {/* <Fade cascade  damping={0.444} delay={1000} duration={4000}>*/}
                    <li>Ai NLP in JavaScript, ReactJS, NodeJS</li>
                    <li>Enhanced_English</li>
                    <li>forever on GitHub</li>
            {/*</Fade> */}
                </ol>
            </section>
            <code><h3>instructions</h3>
            generated json tokenz:
            node AdvancedTokenizer_2.js TEST
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