import "../styles.css";
import { useState, useEffect } from 'react';
import TokenCard from "./TokenCard6";
// import omni_key_idx from '../meta_net/CARDZ/omni_key_idx_2.js'
// import * as omni_key_idx from '../meta_net/CARDZ/omni_key_idx_1.json';
import axios from 'axios'

let sonicSonar = new Audio("https://netcinematics.github.io/aPRYZMaGAMEa/sonic/nxSonar1d.mp3")
let sonicTally = new Audio("https://netcinematics.github.io/aPRYZMaGAMEa/sonic/nxTally0d.mp3")

export default function TokenGridFrame () {
useEffect(() => { document.title = "Token_Gridz";  }, []);
let [viewState, setViewState] = useState('overview');
let [selectedToken, setSelectedTokenObj] = useState({});
let [tokenz_INDEX_DATA, setTokenz_INDEX_DATA] = useState([]);
let [tokenz_CARD_COUNT, setTokenz_CARD_COUNT] = useState("");
let [tokenz_COLUMN_COUNT, setTokenz_COLUMN_COUNT] = useState(0);
let [tokenz_COLUMN_LENGTH, setTokenz_COLUMN_LENGTH] = useState(0);

// useEffect(() => { 
    // debugger;
    // console.log('omni',omni_key_idx.length)
    // setTokenz_INDEX_DATA(omni_key_index)
    // setTokenz_CARD_COUNT("token_indexes "+omni_key_index.length)
// }, []); 
useEffect(() => { getTokenzINDEX() }, [setTokenz_INDEX_DATA]); 
function getTokenzINDEX(){ //SHOW MAIN CARDS.
    const options = {
        method: 'GET',
        // url: 'https://raw.githubusercontent.com/netcinematics/aPRYZMaGAMEa/main/src/meta_net/CARDZ/token_index_0.json', //prod url
        // url: 'https://raw.githubusercontent.com/netcinematics/aPRYZMaGAMEa/main/src/meta_net/CARDZ/token_index_2.json', //prod url
        url: 'https://raw.githubusercontent.com/netcinematics/aPRYZMaGAMEa/main/src/meta_net/CARDZ/omni_key_idx_1.json', //prod url
    }
    axios.request(options).then((response) => {
        // setTokenz_INDEX_DATA(response.data.token_index)

        

        setTokenz_INDEX_DATA(format_INDEX_DATA(response.data.omni_key_index))
        // setTokenz_INDEX_DATA(response.data.omni_key_index)
        // setTokenz_CARD_COUNT("token_index "+response.data.token_index.length)
        setTokenz_CARD_COUNT("token_index "+response.data.omni_key_index.length)
    }).catch((error) => {
        console.error(error)
        setTokenz_CARD_COUNT("no data")
    })    
}

function format_INDEX_DATA(server_data){
    let formatted_data = []
    // let output = '';
    formatted_data = server_data.map( (item, idx)=>{
         if(item.key && item.key.length>10){
            //add underscore in front of any capital letter.
            // output = item.key.replace(/([A-Z])/g, '_$1');
            item.displayKey = item.key.replaceAll('_','_ ')
         }
         return item;
    }  )
    return formatted_data;
}

let TXTViewz =  ( {token} ) => { 
    // let exampleDetail = {key:'a13',txt:"add details",title:'a13',ctx:{}}
    let extraTXTz = {key:'a14',txt:"added txtz",title:'a15'}

    // let [localDetails,setLocalDetails] = useState([]) //TODO REMOVE
    let [localTXTz,setLocalTXTz] = useState([]) 

    let [tokenTXT_INDEX,setTokenTXTINDEX] = useState(0)
    let [tokenTXT_COUNT,setTokenTXTCOUNT] = useState(0)
    let [tokenTXT_ARRAY,setTokenTXTARRAY] = useState([])

    useEffect(() => {
        if(token.txtz){
            // console.log("INIT TXTz",token.title) 
            setTokenTXTARRAY(token.txtz) 
        }
        // if(token.details){ //remove
        //     // console.log("INIT details",token.title)
        //     setLocalDetails(token.details)  //todo remove
        // }
        if(token.txtz){ //remove
            setLocalTXTz(token.txtz)  
        }
     }, [token])

    // function addUnlockTXTz(  ){
    function addLocalTXTz (){
        // debugger;
    
        sonicTally.play()

        let newArr = [...localTXTz , extraTXTz]
        setLocalTXTz(newArr)
        setSelectedTXTz(newArr)


        // getTokenTXTZ()
        // let newArr = [...localDetails , exampleDetail]
        // setLocalDetails(newArr)
        // setSelectedDetails(newArr)
    }
    function getTokenTXTZ(){
        if(!token || !token.title){ return }
        let lookupTitle = token.title;
        if(token.title.indexOf('~')>-1){
            lookupTitle = token.title.replaceAll('~','')
        }

        debugger;
        console.log('load: src/meta_net/CARDZ/ ', lookupTitle+'.json')

        
        const options = {
            method: 'GET',
            url : `https://raw.githubusercontent.com/netcinematics/aPRYZMaGAMEa/main/src/meta_net/CARDZ/${lookupTitle}.json`
        }
        axios.request(options).then((response) => {
            // debugger;
            setTokenTXTINDEX(tokenTXT_INDEX+1)
            setTokenTXTCOUNT(response.data.token.txtz.length)
            // setTokenTXTARRAY(response.data.token.txtz)
            let newArr = [ ...token.txtz , response.data.token.txtz[tokenTXT_INDEX]]
            setTokenTXTARRAY(newArr)
            setSelectedTXTz(newArr)   //TODO bring back.
            // let newArr = [...localDetails , exampleDetail]
            // setLocalDetails(newArr)
            // setSelectedDetails(newArr)

        }).catch((error) => {
            console.error('oops',error)
            // setTokenTXTCOUNT("no data")
        })   

    }

    // function addLocalDetails( ){
    //     sonicTally.play()
    //     //TODO REMOVE
    //     let newArr = [...localDetails , exampleDetail]
    //     setLocalDetails(newArr)
    //     setSelectedDetails(newArr)
    //     // getTokenDETAILS(token)
    // }
    // function getTokenDETAILS(token){
    //     if(!token || !token.title){ return }
    //     let lookupTitle = token.title;
    //     if(token.title.indexOf('~')>-1){
    //         lookupTitle = token.title.replaceAll('~','')
    //     }
    //     const options = {
    //         method: 'GET',
    //         url : `https://raw.githubusercontent.com/netcinematics/aPRYZMaGAMEa/main/src/meta_net/CARDZ/${lookupTitle}.json`
    //         // url : `https://raw.githubusercontent.com/netcinematics/aPRYZMaGAMEa/main/src/meta_net/CARDZ/aWORDZa.json`
    //     }
    //     axios.request(options).then((response) => {
    //         debugger;
    //         setTokenTXTINDEX(tokenTXT_INDEX+1)
    //         setTokenTXTCOUNT(response.data.token.txtz.length)
    //         setTokenTXTARRAY(response.data.token.txtz)
    //     }).catch((error) => {
    //         console.error('oops',error)
    //         setTokenTXTCOUNT("no data")
    //     })    
    // }

    function dynamicLink(token){
        if(!token || !token.key) return;
        console.log('clicked',token.key)
        debugger;
        // setTokenViewfn( "detailview" , title );
        setTokenViewfn( "cardview" , token );
        // getDynamicTokenz(title)
        //load page view with new selected token
    }
    function dynamicTitleDisplay(){
    return(
        <>
        <h1 className='pageTitle' style={{cursor:"pointer"}} onClick={ ()=>dynamicLink(token)}>
        {(token && token.key)?token.key:'aWORDZa'}</h1>
        {/* {(token && token.state && token.state.txtz && token.state.txtz.length)?
            token.state.txtz[0] : 'unlocked' }
        <br></br> */}
        {/* {(token && token.timestamp)?token.timestamp:'no date'}
        <br></br> */}
        {/* {(token && token.txtz)?
            token.txtz.map( (item, idx)=> { //short description txt
                return (item && item.key && item.key==="short")?item.txtz[0]:'';
            }):'no short description'
        }
        <br></br>
        {(token && token.txtz)?
            token.txtz.map( (item, idx)=> { //long description txt
                return (item.key==="long")?item.txtz[0]:'';
            }):'no long description'
        } */}
    </>)
    }

    function displayTokenTXTArray(){
        return (
            <> 
            {/* {tokenTXT_ARRAY.map( (item,idx)=>{
                if(item.key){
                    return <h1>{item.key}</h1>   
                }
                return idx
            })} */}
            {/* {tokenTXT_ARRAY.length} */}

            
            {/* {tokenTXT_ARRAY.map( (item,idx)=>{
                if(item.txt && item.txt.length){
                    if(!item.txt.map){ return <div>{item.txt}!</div>}
                    return item.txt.map( (txtitem,txtidx)=>{
                        return (<p><h1>txtitem.key</h1>{txtidx}:{txtitem}</p>)
                    }) 
                }
                return idx
            })}             */}
            </>)        
    }
    return(
    <>
        {dynamicTitleDisplay()}
        {/* {displayTokenTXTArray()} */}
        <hr></hr>


        {/* <button style={{marginTop:'1em'}} onClick={()=>{ addLocalDetails()}}>add details</button>  */}
        <button style={{marginTop:'1em'}} onClick={()=>{ addLocalTXTz()}}>unlock text!</button>
        <hr></hr>

        {localTXTz.map((item,idx)=>{ 
            return <div>Key: {item.key}, <br/> Title: {item.title}, <br/>
             {item.txt} <hr></hr>{idx}</div>})}
        {/* {localDetails.map((item,idx)=>{ return <div>{item.txt}</div>})} */}


        {<article style={{background:'skyblue',
        // marginTop:'2em',
        boxShadow:'inset -1px -2px 7px 0px blue',
        margin:'0.444em',
        borderRadius:'22px',fontSize:'12px',padding:'1em',
            }}>
                
        {/* {(tokenTXT_ARRAY && tokenTXT_ARRAY.length)?
            tokenTXT_ARRAY.map( (item, token_idx)=> { //txt_tokenz
                return (
                    <>
                        <section >{item.title}</section>
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
        } */}
        COUNT: {tokenTXT_INDEX} of {tokenTXT_COUNT}
        &nbsp; 
        
        <hr></hr>
         &#127984;   &#128161; &#127775; &#9889;
        <hr></hr>
        &#8987; &#8986; &#9200; &#9201; &#9203; &#9875;
        <hr></hr> 
        {/* &#9935; &#10035;  &#10036;  &#10050;  &#10055;  &#10052;
        <hr></hr>
        &#10083;  &#11088;  &#11093;  &#12336; &#127760; &#9889;

        <hr></hr>
        &#127775; &#127879; &#127880;  &#127881; &#127919;
        <hr></hr>
        &#127925; &#127922; &#127942; &#127968; &#127984;
        <hr></hr>
        &#128064; &#128126; &#128160; &#128172; &#128173;
        <hr></hr>
        &#128206; &#128218; &#128211; &#128209; &#128225;
        <hr></hr>
        &#128263; &#128269; &#128270; &#128293; &#128301;  
        <hr></hr>
        &#128300; &#128640; &#128683; &#129322;
        <hr></hr>
        &#129412; &#129413; 
        <hr></hr>
        &#x1f512; &#128275; &#128272;  	
        &#11022; 	&#11023; 	&#11024; 	&#11025;
        <hr></hr>
        &#128161;    &#128367;   &#128273; &#10024;	 
        &#10042; 	&#10059; 	&#10046; 	&#10050;
        &#10051;  	&#10036; 	&#10019; 	&#10023;
        <hr></hr>
        &#10170; 	&#10041; &#10034;
        <hr></hr>
        &#10026;	 	&#10029;	 	&#10031;	
        &#10037;	 	&#10042;	 	&#10041;	
        &#10045;		&#10050;	 	&#10055;	
        <hr></hr>
        &#10056;	 	&#10059;		&#10070;	
        &#10083;		&#10146;		&#10164;	
        &#10169;			  
        <hr></hr>
         	&#9967;	   	&#9965;	
             &#9734;  &#9733;
        <hr></hr>
        &#127775; &#128142; 	&#128077; &#128078; &#128079; 	&#128128; &#128123;
        &#128165; &#128151;  &#128261;  &#128295; 	&#10035; 	&#10020; 	&#10084;
        <hr></hr>
        &#128270;  &#128264; 	&#128265;  	&#128266;   	&#128420;
         &#128279;
        <hr></hr>
        &#128280;  	&#128293;  &#128163; &#128171; 	&#128064; 	&#128045; 	&#128047;
        <hr></hr>
        &#128058; &#128059; 	&#127993; &#128028; &#128025; &#128013; 	&#128035;
        <hr></hr>
        &#127916; 	&#127942;

          	&#128009;  	&#127911; 

              &#10549; 	&#10548; 	
              <hr></hr>  */}
              {/* &#10531; 	&#10532; 	&#10533; &#10534;
              <hr></hr>
              &#10556; 	&#10555; 	&#10554; 	&#10552; */}

        </article> }
    </>
    )
}
 

function setCardViewContent(direction){
    if(direction==='home' || direction==='extra'){
        sonicSonar.play();
        setViewState('overview')
    } else if  (direction==='up'){ 
        let tgt = '', offsetRight = 1, offsetVert = 1;
        let numz = selectedToken.numz.split('.');
        offsetRight = numz[0];
        offsetVert = --numz[1]
        if(offsetVert <= 0 ){ offsetVert = tokenz_COLUMN_LENGTH; } //reset default
        tgt = offsetRight+'.'+offsetVert;
        let nextToken = lookUpNUMZToken(tgt);
        if(nextToken) { setSelectedTokenObj(nextToken); } //load tgt view.        
    } else if  (direction==='right'){ //look at numz, calculate offset, apply offset, look up numz, if found load, not loop default.
        let tgt = '', offsetRight = 1, offsetVert = 1;
        let numz = selectedToken.numz.split('.');
        offsetRight = ++numz[0];
        offsetVert = numz[1]
        if(offsetRight > tokenz_COLUMN_COUNT){ offsetRight = 1; } //reset default
        tgt = offsetRight+'.'+offsetVert;
        let nextToken = lookUpNUMZToken(tgt);
        if(nextToken) { setSelectedTokenObj(nextToken); } //load tgt view.
    } else if (direction==='left'){
        let tgt = '', offsetRight = 1, offsetVert = 1;
        let numz = selectedToken.numz.split('.');
        offsetRight = --numz[0];
        offsetVert = numz[1]
        if(offsetRight <= 0 ){ offsetRight = tokenz_COLUMN_COUNT; } //reset default
        tgt = offsetRight+'.'+offsetVert;
        let nextToken = lookUpNUMZToken(tgt);
        if(nextToken) { setSelectedTokenObj(nextToken); } //load tgt view.
    } else if (direction==='down'){
        let tgt = '', offsetRight = 1, offsetVert = 1;
        let numz = selectedToken.numz.split('.');
        offsetRight = numz[0];
        offsetVert = ++numz[1]
        if(offsetVert > tokenz_COLUMN_LENGTH ){ offsetVert = 1; } //reset default
        tgt = offsetRight+'.'+offsetVert;
        let nextToken = lookUpNUMZToken(tgt);
        if(nextToken) { setSelectedTokenObj(nextToken); } //load tgt view.
    } else if (direction==='extra'){
        console.log('extra') //todo undo home override...
        // addLocalDetails( ) //todo load more txt.
        // addLocalTXTz()
    }
}

function lookUpNUMZToken(tgt){
    console.log('Lookup:',tgt)
    for (var i=0; i<tokenz_INDEX_DATA.length; i++){
        if(tokenz_INDEX_DATA[i].numz && tokenz_INDEX_DATA[i].numz === tgt ){
            return tokenz_INDEX_DATA[i]
        }
    }
}
 
function TokenGrid (){ 
    let COLNUM=6; //column length, must be dependent on layout, per device.
    let colmz = [];
    let colm  = [];
    let humanIDX = 0; //column header
    let tokenCOLUMNS = [];
    for(let i=0; i < tokenz_INDEX_DATA.length; i += COLNUM){
        colm = tokenz_INDEX_DATA.slice(i, i+COLNUM);
        colmz.push(colm);
        ++humanIDX;
         tokenCOLUMNS.push( 
         <div  key={'col_'+i} style={{display:'flex',flexDirection:'column',flex:'1 1 0'}}>
            <header style={{minHeight:'2em'}}></header>
            <header>{humanIDX}</header>
            { 
            colm.map( (token,idx) => { 
                token.numz = humanIDX.toString()+'.'+(idx+1).toString();       //apply dynamic_numz
                return <TokenCard token={token} idx={idx} setTokenViewfn={setTokenViewfn} key={'tokencard'+token.numz}/>
            }) 
            }
            {/* <footer style={{minHeight:'3em'}}></footer> */}
         </div> 
         );
    }  
    setTokenz_COLUMN_COUNT(humanIDX)  
    setTokenz_COLUMN_LENGTH(COLNUM)  

    return(tokenCOLUMNS)
}

let TokenCardz = ( {token} ) => {  
    return(<>
    <main className='pageview' style={{background:'skyblue',borderRadius:'6px',
        display:'flex',width:'100%',flexDirection:'column',
        // marginRight:'1.444em',
        height:'100%', flex:'1'
        }}>
        <header style={{width:'100%',display:'flex',justifyContent:'space-between',
            padding:'0.666em'}}>
            <button className='btnLeft' style={{width:'6em',cursor:'pointer',borderRadius:'13px',background:'skyblue',border:'1px solid steelblue',fontSize:'0.666em'}} 
                onClick={ ()=>{setCardViewContent('up')}}><span style={{fontSize:'1.555em'}}>&#10531;</span>&nbsp;UP</button>
            <button style={{width:'4em',cursor:'pointer',borderRadius:'13px',background:'skyblue',border:'1px solid steelblue',fontSize:'0.666em',paddingBottom:'0.444em'}} 
                onClick={ ()=>{setCardViewContent('home')}}><span style={{fontSize:'1.555em'}}>&#127968;</span>&nbsp;</button>
            <button className='btnRight' style={{width:'6em',cursor:'pointer',borderRadius:'13px',background:'skyblue',border:'1px solid steelblue',fontSize:'0.666em'}} 
                onClick={ ()=>{setCardViewContent('right')}}>RIGHT <span style={{fontSize:'1.555em'}}>&#10532;</span></button>
        </header>
        {/* <article className="scrollBarV" style={{flex:1, color:'steelblue', */}
        <article style={{flex:1, color:'steelblue',
            boxShadow:'inset 0px 0px 10px 0px blue'}}>
            <hr></hr>
            <TXTViewz token={selectedToken} key={'txt.'+token.numz}/>
        </article>
        <footer style={{width:'100%',display:'flex',justifyContent:'space-between',
            padding:'0.666em'}}>
            <button className='btnLeft' style={{width:'6em',cursor:'pointer',borderRadius:'13px',background:'skyblue',border:'1px solid steelblue',fontSize:'0.666em'}} 
                onClick={ ()=>{setCardViewContent('left')}}><span style={{fontSize:'1.555em'}}>&#10534;</span>&nbsp;LEFT</button>
            <button style={{width:'4em',cursor:'pointer',borderRadius:'13px',background:'skyblue',border:'1px solid steelblue',fontSize:'0.666em',paddingBottom:'0.444em'}} 
                onClick={ ()=>{setCardViewContent('extra')}}><span style={{fontSize:'1.555em'}}>&#128064;</span>&nbsp;</button>
            <button className='btnRight' style={{width:'6em',cursor:'pointer',borderRadius:'13px',background:'skyblue',border:'1px solid steelblue',fontSize:'0.666em'}} 
                onClick={ ()=>{setCardViewContent('down')}}>DOWN <span style={{fontSize:'1.555em'}}>&#10533;</span></button>
        </footer>
    </main>
    </>)
}


function setTokenViewfn(selectedView,token){ //update app, show view
    console.log("setTokenView",selectedView, token.key)
    setViewState(selectedView);
    setSelectedTokenObj(token);
}

// function setSelectedDetails(newDetails){
//     let newObj = selectedToken
//     newObj.details = newDetails
//     setSelectedTokenObj(newObj);
// }
function setSelectedTXTz(newTXTz){
    let newObj = selectedToken
    newObj.txtz = newTXTz
    setSelectedTokenObj(newObj);
}

return (
<>
<div style={{
    // maxHeight:'77vh'
    }}>
<h1>aPRYZMaGAMEa</h1>
<div className='scrollBarV' style={{maxHeight:'72vh'}} >
<div className='scrollBarH' style={{maxHeight:'70vh'}} >
<main className='cardMain' style={{display:'flex'
// ,paddingRight:'1em'
}}>
    <section className='mainframe' style={{display:'flex',
    boxShadow:'0px 1px 14px 1px purple',
    // padding:'1em',
    marginTop:'0.444em',
    // paddingLeft:'1.444em',paddingRight:'1.444em',
    // marginRight:'1em',marginLeft:'1em',
    // marginRight:'1em',
    flex:1,
    borderRadius:'13px'
    // ,height:'90%'
    } }>
        { (!tokenz_CARD_COUNT)?
            <div style={{width:'100%',margin:'44%',marginLeft:'40%'}}>loading...</div>
          :'' 
        }

        { (viewState==='overview') ? 
            <TokenGrid/>
        : (viewState==='cardview') ? //todo pageview?
           <TokenCardz token={selectedToken}/>
        : <TokenGrid/>
        }
    </section>
        </main>
        </div>
        </div>
        <footer style={{marginTop:'1em',fontSize:'smaller'}}>
          WORD_GAME : {tokenz_CARD_COUNT}
        </footer>
        </div>
    </>
)

};