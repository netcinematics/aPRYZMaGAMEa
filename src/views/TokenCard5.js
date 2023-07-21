import React from 'react';
import { useState, useEffect } from 'react';

let sonicWoop = new Audio("https://netcinematics.github.io/aPRYZMaGAMEa/sonic/nxWoop1.mp3")
let btnKey = 0;
function TokenCard ( { token, setTokenViewfn } ) {
    useEffect(() => { 
        document.key = (token && token.key)?token.key:'';  
        // token.numz = humanIDX.toString()+'.'+idx;       //apply dynamic_numz
    }, [token]);
    // hovered is why token frame is a sub component.
    let [isHovered, setHovered] = useState(false);
    let handleMouseEnter = () => { setHovered(true) }
    let handleMouseLeave = () => { setHovered(false) }

    function onTokenCardClick(  ){ 
        console.log("Token Click:",token.key)
        sonicWoop.play()
        setTokenViewfn("cardview",token);
    }

    let cardStyle={background:'#6facf7',border:'1px solid #444',lineHeight:'20px',margin:'0.5em',
        borderRadius:'13px',boxShadow:'inset 1px 1px 5px 0px blue',cursor:'pointer',
        color:'#013434',textShadow:'-1px 0px 1px whitesmoke',display:'flex',
        alignContent:'flex-end',alignItems:'stretch', minHeight:'10em',width:'95%',
        flexDirection:'column',padding:'0.555em',justifyContent:'space-evenly'
    } 

    let gameKey = "";
    let gameFontColor = "";
    function gameAGENT(token){ //REACT to state and RESPOND
        if(!token || !token.state){return}
        else if (token.state.key ==='lock'){gameKey =  'X'}
        else if (token.state.key ==='prize'){gameKey =  '!'}
        else if (token.state.key ==='clue'){gameKey =  '?'}

        gameFontColor = (token.state.key ==='prize')?'mediumpurple':(token.state.key ==='clue')
        ?'#d08701':(token.state.key ==='lock')?'#de6666':'steelblue';
    }; gameAGENT(token); 

    //-----------------TOKEN---------------
    return (<>
        <button  className={isHovered ? 'btnHover' : ''} style={cardStyle}
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            onClick={onTokenCardClick}>
            { (token.state)?
            // add to background color unlocked: #95d2f8;
                <section style={{background:'lightskyblue',flex:'1',borderTopLeftRadius:'13px',
                    borderTopRightRadius:'13px',display:'flex',justifyContent:'center',
                    color:gameFontColor, flexDirection:'column',
                    alignItems:'center',fontSize:'xx-large',paddingTop:'0.333em'}}>
                    <main style={{display:'flex',flex:'1',alignItems:'center'}}>{gameKey}</main>
                    <aside style={{fontSize:'x-small', color:'steelblue'}}>
                       {token.state.key}
                    </aside>
                </section>
                :
                <section style={{background:'lightskyblue',flex:'1',borderTopLeftRadius:'13px',
                    borderTopRightRadius:'13px',display:'flex',justifyContent:'center',
                    color:'#2374b7',
                    alignItems:'flex-end',fontSize:'large',paddingBottom:'0.222em'}}>
                    {token.key}
                </section>            
            }
            
            <footer style={{background:'cornflowerblue',fontSize:'x-small',
                borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px',
                color:'#4c038c',display:'flex',justifyContent:'space-between',
                padding:'0.222em 0.444em'
                }}>
                {token.numz}
                {(token && token.state && token.state.key==="lock")?
                    <div className='lockStatus'>&#x1f512;</div>
                    :
                    <div className='unlockStatus'>&#9989;</div>
                } 
            </footer>
        </button>
    </>)

}

export default TokenCard;