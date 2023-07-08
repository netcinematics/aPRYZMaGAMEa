import "../styles.css";
// import LangData from '../data/SocialPhraseCLM'
import { useState, useEffect } from 'react';
import TokenFrame from "./TokenFrame4";
import axios from 'axios'
// import ReactMarkdown from 'react-markdown'

let sonicTally = new Audio("https://netcinematics.github.io/aPRYZMaGAMEa/sonic/nxTally0d.mp3")
let sonicWoop = new Audio("https://netcinematics.github.io/aPRYZMaGAMEa/sonic/nxWoop1.mp3")


export default function TokenGridFrame () {
    useEffect(() => { document.title = "Token_Gridz";  }, []);
    // let [rootsARR, setRootsARR] = useState([]);
    let [viewState, setViewState] = useState('overview');
    let [selectedToken, setSelectedTokenObj] = useState({});

    // let [markdownDATA, setMarkdownDATA] = useState("");
    let [tokenz_INDEX_DATA, setTokenz_INDEX_DATA] = useState([]);
    let [tokenz_CARD_COUNT, setTokenz_CARD_COUNT] = useState("");

// useEffect(() => { getTokenzINDEX() }, []); 
// useEffect(() => { getTokenzINDEX() }, [tokenz_CARD_COUNT]); 
useEffect(() => { getTokenzINDEX() }, [setTokenz_INDEX_DATA]); 
function getTokenzINDEX(){ //SHOW MAIN CARDS.
    // console.log("LOAD INDEX",tokenz_CARD_COUNT)
    const options = {
        method: 'GET',
        params: {'lookup':'tokenz'},
        // url: 'https://node-dashboard-server.vercel.app/ai2', //prod url
        // url: 'https://node-dashboard-server.vercel.app/libz/tokenz/', //prod url
        url: 'https://raw.githubusercontent.com/netcinematics/aPRYZMaGAMEa/main/src/meta_net/CARDZ/token_index.json', //prod url
        // url: 'http://localhost:8008/libz/tokenz/',
    }
    axios.request(options).then((response) => {
        setTokenz_INDEX_DATA(response.data.token_index)
        setTokenz_CARD_COUNT("token_index "+response.data.token_index.length)
    }).catch((error) => {
        console.error(error)
        setTokenz_CARD_COUNT("no data")
    })    
}

function TokenCard({ token }) {
    // console.log("tokenCard",token)
    let cardStyle={background:'#6facf7',border:'1px solid #444',lineHeight:'20px',margin:'0.5em',
        borderRadius:'13px',boxShadow:'inset 1px 1px 5px 0px blue',cursor:'pointer',
        color:'#013434',textShadow:'-1px 0px 1px whitesmoke',display:'flex',
        alignContent:'flex-end',alignItems:'stretch',height:'10em',width:'95%',
        flexDirection:'column',padding:'0.555em',justifyContent:'space-evenly'
    } 
    let fontColor = (token.state==='prize')?'mediumpurple':(token.state==='clue')
                    ?'#d08701':(token.state==='locked')?'#de6666':'steelblue';
    let gameTitle = gameAGENT(token); //GAMIFICATION AGENT
    return ( <TokenFrame token={token} setTokenViewfn={setTokenViewfn}/> );
}

function gameAGENT(token){ //REACT to state to update game view state.
  if(!token){return ''}
  else if (token.state==='locked'){return 'X'}
  else if (token.state==='prize'){return '!'}
  else if (token.state==='clue'){return '?'}
}

let DetailView =  ( {token} ) => { 
    let exampleDetail = {key:'a13',txt:"add details",title:'a13',ctx:{}}
    let [localDetails,setLocalDetails] = useState([])

    let [tokenTXT_INDEX,setTokenTXTINDEX] = useState(0)
    let [tokenTXT_COUNT,setTokenTXTCOUNT] = useState('')
    let [tokenTXT_ARRAY,setTokenTXTARRAY] = useState([])

    useEffect(() => {
        if(token.txtz){
            // console.log("INIT TXTz",token.title) 
            setTokenTXTARRAY(token.txtz) 
        }
        if(token.details){
            // console.log("INIT details",token.title)
            setLocalDetails(token.details)  //todo remove
        }
     }, [])

    function addLocalDetails( addTokenz){
        sonicTally.play()
        let newArr = [...localDetails , exampleDetail]
        setLocalDetails(newArr)
        setSelectedDetails(newArr)
        getTokenDETAILS(token)
    }

    function getTokenDETAILS(token){
        if(!token || !token.title){ return }
        let lookupTitle = token.title;
        if(token.title.indexOf('~')>-1){
            lookupTitle = token.title.replaceAll('~','')
        }
        const options = {
            method: 'GET',
            url : `https://raw.githubusercontent.com/netcinematics/aPRYZMaGAMEa/main/src/meta_net/CARDZ/aWORDZa.json`
            // url : `https://raw.githubusercontent.com/netcinematics/aWordaGami/main/cardz/aWORDZa.json`
            // url : `https://raw.githubusercontent.com/netcinematics/node_dashboard_server/main/libz/aBETTaWORDZa.json`
            // params: {'lookup':'markdown'},
            // url: 'https://node-dashboard-server.vercel.app/ai2', //prod url
            // url: `https://node-dashboard-server.vercel.app/libz/lookup/${lookupTitle}`, //prod url broke
            // url: `https://node-dashboard-server.vercel.app/libz/tokenz/${lookupTitle}`, //prod url
           // url: `https://node-dashboard-server.vercel.app/libz/tokenz/`, //prod url working index
            // url: `http://localhost:8008/libz/tokenz/${lookupTitle}`, 
        }
        axios.request(options).then((response) => {
            // console.log("LOADED JSON DETAILS")
            // debugger;
            setTokenTXTINDEX(tokenTXT_INDEX+1)
            setTokenTXTCOUNT(response.data.token.txtz.length)
            setTokenTXTARRAY(response.data.token.txtz)
            // setMarkdownDETAILSView(response.data)
            // displayMarkdown(response.data)
            // setItemCOUNT(`data loaded: $ `)
        }).catch((error) => {
            console.error('oops',error)
            setTokenTXTCOUNT("no data")
        })    
    }

    function dynamicLink(token){
        if(!token || !token.title) return;
        console.log('clicked',token.title)
        debugger;
        // setTokenViewfn( "detailview" , title );
        setTokenViewfn( "cardview" , token );
        // getDynamicTokenz(title)
        //load page view with new selected token
    }
    function dynamicDetailDisplay(){
        return(<>

        <h1 style={{cursor:"pointer"}} 
        onClick={ ()=>dynamicLink(token)}>
        {(token && token.title)?token.title:'aWORDZa'}</h1>
        {(token && token.state && token.state.txtz && token.state.txtz.length)?
            token.state.txtz[0] : 'unlocked' }
        <br></br>
        {(token && token.timestamp)?token.timestamp:'no date'}
        <br></br>
        {(token && token.txtz)?
            token.txtz.map( (item, idx)=> { //short description txt
                return (item.title==="short")?item.txtz[0]:'';
            })
            :'no short description'
        }
        <br></br>
        {(token && token.txtz)?
            token.txtz.map( (item, idx)=> { //long description txt
                return (item.title==="long")?item.txtz[0]:'';
            })
            :'no long description'
        }

        </>)
    }

    return(
    <>
        { dynamicDetailDisplay() }
        <hr></hr>
        <button style={{marginTop:'1em'}} onClick={ ()=>{ addLocalDetails()   }  } >unlock text</button>
        { localDetails.map( (item,idx)=>{ return <div>{item.txt}</div>   } )}
        { <article style={{background:'skyblue',marginTop:'2em',borderRadius:'22px',fontSize:'22px',padding:'1em',
            }}>
                
        {(tokenTXT_ARRAY && tokenTXT_ARRAY.length)?
            tokenTXT_ARRAY.map( (item, token_idx)=> { //txt_tokenz
                return (
                    <>
                        <section>{item.title}</section>
                        {(item.txtz && item.txtz.length)?
                            item.txtz.map( (txt, txt_idx)=> { //txt_tokenz
                                return (
                                    <>
                                        <section>{txt}</section>
                                    </>
                                )
                            })
                            :'no txtz'
                        }
                    </>
                )
            })
            :'no tokenz'
        }
        COUNT: {tokenTXT_INDEX} of {tokenTXT_COUNT}
        </article> }
    </>
    )
}

let TokenCardzBtnStyle = {width:'4em',cursor:'pointer',borderRadius:'13px',background:'skyblue',border:'1px solid steelblue'}

function setCardViewContent(direction){
    if(direction==='up'){
        sonicWoop.play();
        setViewState('overview')
    } else if  (direction==='right'){ //look at numz, calculate offset, apply offset, look up numz, if found load, not loop default.
        debugger;
        let tgt = '', offsetRight = 1, offsetVert = 1;
        let numz = selectedToken.numz.split('.');
        offsetRight = numz[0]++;
        if(offsetRight>= humanIDX){ offsetRight = 1; } //reset default
        if(colm && colm.length && offsetVert >= colm[offsetRight].length){ offsetRight = 1; } //reset default
        tgt = offsetRight+'.'+offsetVert;
        let nextToken = lookUpNUMZToken(tgt);
        // let newToken = {numz:tgt, id:111, txt:'hi',title:'yooooo!'}
        if(nextToken) { setSelectedTokenObj(nextToken); } //load tgt view.
    }
}

let TokenCardz = ( {token} ) => {  //rename TokenCardz

    return(<>
    <main className='pageview' style={{background:'skyblue',borderRadius:'6px',
        display:'flex',width:'100%',flexDirection:'column',marginRight:'1.444em',
        height:'100%', flex:'1'
        }}>
        <header style={{width:'100%',display:'flex',justifyContent:'space-between',
            padding:'0.666em'}}>
            <button style={TokenCardzBtnStyle} 
                onClick={ ()=>{setCardViewContent('up')}}>UP</button>
            <button style={TokenCardzBtnStyle} 
                onClick={ ()=>{setCardViewContent('right')}}>RIGHT</button>
                {/* onClick={ ()=>{setViewState('overview')}}>RIGHT</button> */}
        </header>
        <article className="scrollBarV" style={{flex:1, color:'steelblue',
            boxShadow:'inset 0px 0px 10px 0px blue'}}>
            {/* {(selectedToken && selectedToken.title)?selectedToken.title:'_'} */}
            <hr></hr>
            <DetailView token={selectedToken}/>
        </article>
        <footer style={{width:'100%',display:'flex',justifyContent:'space-between',
            padding:'0.666em'}}>
            <button style={TokenCardzBtnStyle} 
                onClick={ ()=>{setCardViewContent('overview')}}>LEFT</button>
                {/* onClick={ ()=>{setViewState('overview')}}>LEFT</button> */}
            <button style={TokenCardzBtnStyle} 
                onClick={ ()=>{setCardViewContent('overview')}}>DOWN</button>
                {/* onClick={ ()=>{setViewState('overview')}}>DOWN</button> */}
        </footer>
    </main>
    </>)
}

 
let colm = [];
let COLNUM=6; //vertical wrap limit
let tokenCOLUMNS = []; //available for meta data lookup on MOVE.
let humanIDX = 0; //column header
function TokenGrid (){ 
    // let colm = []; 
    // let COLNUM=6; //vertical wrap limit
    // let tokenCOLUMNS = [];
    // debugger;
    // console.log('rendering', tokenz_INDEX_DATA.length)
    colm = [];
    humanIDX = 0; //column header
    tokenCOLUMNS = [];
    for(let i=0; i < tokenz_INDEX_DATA.length; i += COLNUM){
        colm = tokenz_INDEX_DATA.slice(i, i+COLNUM);
        ++humanIDX;
         tokenCOLUMNS.push( 
         <div  key={'col_'+i} style={{display:'flex',flexDirection:'column',flex:'1 1 0'}}>
            <header style={{minHeight:'2em'}}></header>
            <header>{humanIDX}</header>
            { colm.map( (token,idx)=>{ token.numz = humanIDX+'.'+idx;       //apply dynamic_numz
                return <TokenCard key={'tokencard_'+idx} token={token}/>
            }) }
            <footer style={{minHeight:'3em'}}></footer>
         </div> 
         );
    }    
    return(tokenCOLUMNS)
}

function lookUpNUMZToken(tgt){
    debugger;
    console.log("test3",colm.length)
}

function setTokenViewfn(selectedView,token){ //update app, show view
    console.log("setTokenView",selectedView, token.title)
    setViewState(selectedView);
    setSelectedTokenObj(token);
}

function setSelectedDetails(newDetails){
    let newObj = selectedToken
    newObj.details = newDetails
    setSelectedTokenObj(newObj);
}

// let btnCardStyle = { background:'#6facf7',border:'1px solid #444',lineHeight:'20px',margin:'0.5em',
// borderRadius:'13px',boxShadow:'inset 1px 1px 5px 0px blue',cursor:'pointer',
// color:'#013434',textShadow:'-1px 0px 1px whitesmoke',display:'flex',
// alignContent:'flex-end',alignItems:'stretch',height:'10em',flex:'1',minWidth:'6em',
// flexDirection:'column',padding:'0.555em',justifyContent:'space-evenly' }

return (
    < >
    <h1>aPRYZMaGAMEa</h1>
    {/* <h1>StoryTree</h1> */}
    {/* <ReactMarkdown>
            {markdownDATA}
        </ReactMarkdown> */}
<main className='scrollBarH' style={{overflowY:'auto'}}>
    <section className='mainframe scrollBarV' style={{display:'flex',
    boxShadow:'0px 1px 14px 1px purple',paddingBottom:'1em',
    marginTop:'0.444em',paddingLeft:'1.444em',paddingRight:'1.444em',flex:1,
    marginRight:'1em',marginLeft:'1em'} }>
        { (viewState==='overview') ? //rename token_grid
            <TokenGrid/>
        : (viewState==='cardview') ? //token_cardz
           <TokenCardz token={selectedToken}/>
        : <TokenGrid/>
        }
    </section>
    {/* <section style={{display:'flex',justifyContent:'flex-start',paddingLeft:'1.444em',
        paddingRight:'1.444em',flexWrap:'wrap'}}>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
        <div className='cardTileBtn'>X</div>
    </section> */}

        </main>
        <footer style={{marginTop:'2em'}}>
          WORD_GAME : {tokenz_CARD_COUNT}
        </footer>
    </>
)

};