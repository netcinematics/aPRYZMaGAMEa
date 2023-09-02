import "../styles.css";
import { useState, useEffect, useRef } from 'react';
import TokenCard from "./TokenCard6";
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

useEffect(() => { getTokenzINDEX() }, [setTokenz_INDEX_DATA]); 
function getTokenzINDEX(){ //SHOW MAIN CARDS.
    const options = {
        method: 'GET',
        url: 'https://raw.githubusercontent.com/netcinematics/aPRYZMaGAMEa/main/src/meta_net/IDXZ/prime_key_idx_5.json', //prod url
    }
    axios.request(options).then((response) => {
        setTokenz_INDEX_DATA(format_INDEX_DATA(response.data.prime_key_idx))
        setTokenz_CARD_COUNT("token_index "+response.data.prime_key_idx.length)
    }).catch((error) => {
        console.error(error)
        setTokenz_CARD_COUNT("no data")
    })    
}

function format_INDEX_DATA(server_data){ //from str into token and set
    let formatted_data = []
    formatted_data = server_data.map( (item, idx)=>{
        if(item.title && item.title.length>10){ //add underscore in front of any capital letter.
           item.title = item.title.replaceAll('_','_ ') //word wrap in browser
        }
         return item;
    }  )
    return formatted_data;
}

let TXTViewz =  ( {token, reloadTXTidx, setShowEyes} ) => { //todo rename TokenTXTView
    const autoScrollDown = useRef(null);
    const autoScrollEnd = useRef(null);
    let [loadTXTidx,setLoadTXTidx] = useState(0) 
    let [localTXTz,setLocalTXTz] = useState([]) 
    let [tokenTXT_ARRAY,setTokenTXTARRAY] = useState([])

    useEffect(() => { //load txtz from outside page component.
        console.log('load from outside idx change',reloadTXTidx) 
        if(reloadTXTidx>0){ addLocalTXTz();  }
    }, [reloadTXTidx]);

    useEffect(() => {
        console.log("INIT TXTz",token.title) 
        if(token.txtz){
            setTokenTXTARRAY(token.txtz) 
            setShowEyes(1)
        }

        if(token.loadTXTidx){
            console.log('new idx',token.loadTXTidx)
            setLoadTXTidx(token.loadTXTidx)
        }

        if(token.txtz){ 
            console.log('load from inside idx change')
            setLocalTXTz(token.txtz)  
            autoScrollDown.current.scrollIntoView({ behavior: "smooth" });
        }
     }, [token])

    function addLocalTXTz (){ //load from inner button
        if(localTXTz.length && loadTXTidx>=localTXTz.length){
            autoScrollEnd.current.scrollIntoView({ behavior: "smooth" });
            return;
        }
        sonicTally.play()
        if(loadTXTidx===0){
            load_all_TXTZ();
            setLoadTXTidx(loadTXTidx+1)
            setShowEyes(1)
            return;
        }
        setSelectedTXTz([...localTXTz],loadTXTidx+1) //reloads between card viewz
        setLoadTXTidx(loadTXTidx+1)
        autoScrollDown.current.scrollIntoView({ behavior: "smooth" });
    };

    function load_all_TXTZ(){ //call api to load card data.
        if(!token){ return }
        let lookupTitle = token.key;
            lookupTitle = lookupTitle.replaceAll('~','')
            lookupTitle = lookupTitle.replaceAll('.','')
            lookupTitle = lookupTitle.toLowerCase()
            lookupTitle = lookupTitle.replace(/^\s+|\s+$/g, '') //replace white space
               .replace(/^_+|_+$/g, '');// and remove prime key _ wrapper.
        let tokenBatch = 5; // *****************************<- UPDATE VERSION FLAG HERE
        lookupTitle = `card_${lookupTitle}_${tokenBatch}`;
        console.log('LOAD_FILEZ: src/meta_net/CARDZ/ ', lookupTitle+'.json')
        const options = {
            method: 'GET',
            url : `https://raw.githubusercontent.com/netcinematics/aPRYZMaGAMEa/main/src/meta_net/CARDZ/${lookupTitle}.json`
        }
        axios.request(options).then((response) => {
            let card_data = response.data
            let newTXTData = [...card_data.txtz]
            setLocalTXTz(newTXTData)
            setSelectedTXTz(newTXTData,loadTXTidx+1) //save between card viewz

        }).catch((error) => {
            console.error('oops',error)
            let newTXTData = [...localTXTz , {key:'no data',type:'error',txt:'no data',title:'no data'}]
            setLocalTXTz(newTXTData)
            setSelectedTXTz(newTXTData,loadTXTidx+1) //save between card viewz
        })   

    }

    function dynamicLink(token){
        if(!token || !token.key) return;
        console.log('clicked',token.key)
        setTokenViewfn( "pageview" , token );
        //load page view with new selected token
    }

    function dynamicTitleDisplay(){
        let docTitle = (token && token.title)?token.title:token.key;
    return(  <>
        <section className='pageHeader' style={{}}>
            <header style={{display:'flex',justifyContent:'space-between'}}>
                <aside style={{fontSize:'xx-small'}}>numz</aside>
                <span>&nbsp;</span> 
                <aside style={{fontSize:'xx-small'}}>title</aside> 
            </header>

            <h1 className='pageTitle' style={{cursor:"pointer"}} onClick={ ()=>dynamicLink(token)}>
            {(docTitle && docTitle.length<18)
                ?docTitle
                :(docTitle.length>30)
                ?<span style={{fontSize:'x-small'}}>{docTitle}</span>
                :<span style={{fontSize:'medium'}}>{docTitle}</span>
            }
            </h1>

            <footer style={{display:'flex',justifyContent:'space-between'}}>
                <aside style={{fontSize:'xx-small'}}>date</aside>
                <aside style={{fontSize:'xx-small'}}>type</aside>
            </footer>

        </section>
    </>)}

    function dynamicArticleTXTz(token,idx) { //*************** POPULATE : Token TXTz : FACTORY
        if(!token || !token.txtz || !token.txtz.length){return}
        let dynamicTXTz = [], specialOperators = '';
        let styleName = ''; 
        
        //if box is seriez or token cards
        dynamicTXTz = token.txtz.map((item,idx)=>{
            styleName = 'plainTXT' // default style
            item.txt = item.txt.replace(';','\n')    //Newline requires special css.
            if(item.txt.indexOf('---')>-1){
                return <hr></hr>
            } else if(item.txt.indexOf('YMD_')>-1){
                return <code style={{textAlign:'left',marginTop:'2em',display:'flex',fontSize:'0.888em'}}>{item.txt}</code>
            } else if(item.txt.indexOf('SIG_')>-1){
                return <pre style={{textAlign:'left',marginTop:'2em'}}>{item.txt}</pre>
            } else if(item.type==='quote_txt'){
                styleName = 'txtBox2';
            } else if(item.type==='seriez_txt'){
                styleName = 'txtBox3';
            } else if(item.type==='magic_token'){
                styleName = 'txtBox1';
            }
            specialOperators = /meanz_ |alias_ |aliaz_ |goalz_/; //todo
            if(specialOperators.test(item.txt)){
                styleName = 'txtBox1';
            }
            return (
                <article  className={styleName}>
                    {item.txt}
                </article>
            )
        });
        return (<section>{dynamicTXTz}</section>)
    }

    return( <>
        {dynamicTitleDisplay()}
        <hr style={{marginBottom:'1em'}}></hr>

        { (loadTXTidx===0)
            ?<span style={{fontSize:'x-small'}}>
                chooze_to_look...</span>
            :(localTXTz.length===0 && loadTXTidx===1)?'loading...'
            :(localTXTz.length===0 && loadTXTidx>1)?'no data'
            :''}
        { (loadTXTidx===0)?<>
            <button style={{width:'4em',cursor:'pointer',borderRadius:'13px',background:'skyblue',
                border:'1px solid steelblue',fontSize:'0.666em',
                boxShadow:'0px 0px 2px 2px #4aef58',
                paddingBottom:'0.444em'}} 
                onClick={()=>{ addLocalTXTz()}
                }><span style={{fontSize:'1.555em'}}>&#128064;</span>&nbsp;
                </button>  
                <hr style={{marginBottom:'0.666em'}}></hr>
                    </>
                :''
        }  
        <section className='scrollBarDoc' style={{ padding:'0 3%',maxHeight:'18em'}}>
            { localTXTz.map((item,idx)=>{ 
                if (idx+1 > loadTXTidx){ return '' }
                return (
                <section className='scrollBarPage' style={{}}>
                    <header style={{display:'flex',justifyContent:'space-between'}}>
                        <aside style={{fontSize:'small'}}>{item.numz}</aside>
                        <span>&nbsp;</span> 
                        <aside style={{fontSize:'x-small'}}>{item.title}</aside> 
                    </header> 
                    { dynamicArticleTXTz(item,idx) }
                    <footer  className='scrollBarSmall' style={{display:'flex',justifyContent:'space-between',
                        marginTop:'0.666em'}}>
                        <aside style={{fontSize:'xx-small'}}>
                            {(item.ymdz && item.ymdz.length)?item.ymdz:token.ymdz}
                            {/* {item.ymdz} */}
                        </aside>
                        <aside style={{fontSize:'xx-small'}}>{item.type}</aside>
                    </footer>
                    <hr></hr>

                </section>
              )
            })}

            {/* <div ref={autoScrollDown} /> */}

            <article style={{background:'skyblue',
                boxShadow:'inset -1px -2px 7px 0px blue',
                margin:'0.444em',
                borderRadius:'22px',fontSize:'12px',padding:'1em', }}>
                    
                <div style={{margin:'1em 0 0 0',}}>
                    COUNT: {loadTXTidx} of {localTXTz.length}
                </div>
                
                &nbsp;               
                {/* <hr></hr>
                &#127984;   &#128161;  &#9889; &#127775; */}
                <hr></hr>
                &#8987; &#8986; &#9200; &#9201; &#9203; &#9875;
                {/* <hr></hr>  */}

            </article> 
            <div ref={autoScrollDown} />
            <div ref={autoScrollEnd} style={{height:'1em'}}/>
        </section> {/*END SCROLL DOC*/}
    </>
    )
}
        // TODO: GAMIFY WITH THESE ICONS
         // {/* <article> &#9935; &#10035;  &#10036;  &#10050;  &#10055;  &#10052;
        // <hr></hr>
        // &#10083;  &#11088;  &#11093;  &#12336; &#127760; &#9889;
        // <hr></hr>
        // &#127775; &#127879; &#127880;  &#127881; &#127919;
        // <hr></hr>
        // &#127925; &#127922; &#127942; &#127968; &#127984;
        // <hr></hr>
        // &#128064; &#128126; &#128160; &#128172; &#128173;
        // <hr></hr>
        // &#128206; &#128218; &#128211; &#128209; &#128225;
        // <hr></hr>
        // &#128263; &#128269; &#128270; &#128293; &#128301;  
        // <hr></hr>
        // &#128300; &#128640; &#128683; &#129322;
        // <hr></hr>
        // &#129412; &#129413; 
        // <hr></hr>
        // &#x1f512; &#128275; &#128272;  	
        // &#11022; 	&#11023; 	&#11024; 	&#11025;
        // <hr></hr>
        // &#128161;    &#128367;   &#128273; &#10024;	 
        // &#10042; 	&#10059; 	&#10046; 	&#10050;
        // &#10051;  	&#10036; 	&#10019; 	&#10023;
        // <hr></hr>
        // &#10170; 	&#10041; &#10034;
        // <hr></hr>
        // &#10026;	 	&#10029;	 	&#10031;	
        // &#10037;	 	&#10042;	 	&#10041;	
        // &#10045;		&#10050;	 	&#10055;	
        // <hr></hr>
        // &#10056;	 	&#10059;		&#10070;	
        // &#10083;		&#10146;		&#10164;	
        // &#10169;			  
        // <hr></hr>
        //  	&#9967;	   	&#9965;	
        //      &#9734;  &#9733;
        // <hr></hr>
        // &#127775; &#128142; 	&#128077; &#128078; &#128079; 	&#128128; &#128123;
        // &#128165; &#128151;  &#128261;  &#128295; 	&#10035; 	&#10020; 	&#10084;
        // <hr></hr>
        // &#128270;  &#128264; 	&#128265;  	&#128266;   	&#128420;
        //  &#128279;
        // <hr></hr>
        // &#128280;  	&#128293;  &#128163; &#128171; 	&#128064; 	&#128045; 	&#128047;
        // <hr></hr>
        // &#128058; &#128059; 	&#127993; &#128028; &#128025; &#128013; 	&#128035;
        // <hr></hr>
        // &#127916; 	&#127942;

        //   	&#128009;  	&#127911; 

        //       &#10549; 	&#10548; 	
        //       <hr></hr> 
        // </article>      
        // */}
        //       {/* &#10531; 	&#10532; 	&#10533; &#10534;
        //       <hr></hr>
        //       &#10556; 	&#10555; 	&#10554; 	&#10552; 
        //     */}


function lookUpNUMZToken(tgt){
    console.log('Lookup:',tgt)
    for (var i=0; i<tokenz_INDEX_DATA.length; i++){
        if(tokenz_INDEX_DATA[i].numz && tokenz_INDEX_DATA[i].numz === tgt ){
            return tokenz_INDEX_DATA[i]
        }
    }
}
 
function CardView (){ 
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
         </div> 
         );
    }  
    setTokenz_COLUMN_COUNT(humanIDX)  
    setTokenz_COLUMN_LENGTH(COLNUM)  
    return(tokenCOLUMNS)
}

let TokenCardz = ( {token} ) => { //todo rename TokenPage, TokenCard and TokenTXT and TokenGrid.
    const [showEyes, setShowEyes] = useState(0);
    const [reloadTXTidx, reloadTXT] = useState(0);

    function setCardViewContent(direction){
        if(direction==='home'){
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
            reloadTXT( reloadTXTidx + 1 )
        }
    }

    return(<>
    <main className='pageview' style={{background:'skyblue',borderRadius:'6px',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        height:'64vh', 
        width:'100%'
        }}>
        <header style={{width:'100%',display:'flex',justifyContent:'space-between',
            background:'#8db7dc',borderRadius:'6px',border:'1px solid #3540a0',padding:'0.666em'}}>
            <button className='btnLeft' style={{width:'6em',cursor:'pointer',borderRadius:'13px',background:'skyblue',border:'1px solid steelblue',fontSize:'0.666em'}} 
                onClick={ ()=>{setCardViewContent('up')}}><span style={{fontSize:'1.555em'}}>&#10531;</span>&nbsp;UP</button>
            <button style={{width:'4em',cursor:'pointer',borderRadius:'13px',background:'skyblue',border:'1px solid steelblue',fontSize:'0.666em',paddingBottom:'0.444em'}} 
                onClick={ ()=>{setCardViewContent('home')}}><span style={{fontSize:'1.555em'}}>&#127968;</span>&nbsp;</button>

            <button className='btnRight' style={{width:'6em',cursor:'pointer',borderRadius:'13px',background:'skyblue',border:'1px solid steelblue',fontSize:'0.666em'}} 
                onClick={ ()=>{setCardViewContent('down')}}>DOWN <span style={{fontSize:'1.555em'}}>&#10533;</span></button>
        </header>
        <article style={{color:'steelblue',boxShadow:'inset 0px 0px 10px 0px #0a0a79',maxHeight:'53vh' }}>
            <hr style={{marginBottom:'0.555em'}}></hr>
            <TXTViewz setShowEyes={setShowEyes} reloadTXTidx={reloadTXTidx} token={selectedToken} key={'txt.'+token.numz}/>
        </article>
        <footer style={{width:'100%',display:'flex',justifyContent:'space-between',padding:'0.666em',background:'#8db7dc',
            borderRadius:'6px',border:'1px solid #3540a0'  }}>
            <button className='btnLeft' style={{width:'6em',cursor:'pointer',borderRadius:'13px',background:'skyblue',border:'1px solid steelblue',fontSize:'0.666em'}} 
                onClick={ ()=>{setCardViewContent('left')}}><span style={{fontSize:'1.555em'}}>&#10534;</span>&nbsp;LEFT</button>
            {(showEyes)?
            <button style={{width:'4em',cursor:'pointer',
                boxShadow:'0px 0px 2px 2px #4aef58',
                borderRadius:'13px',background:'skyblue',border:'1px solid steelblue',fontSize:'0.666em',paddingBottom:'0.444em'}} 
                onClick={ ()=>{setCardViewContent('extra')}}><span style={{fontSize:'1.555em'}}>&#128064;</span>&nbsp;</button>
            : ''
            }

            <button className='btnRight' style={{width:'6em',cursor:'pointer',borderRadius:'13px',background:'skyblue',border:'1px solid steelblue',fontSize:'0.666em'}} 
                onClick={ ()=>{setCardViewContent('right')}}>RIGHT <span style={{fontSize:'1.555em'}}>&#10532;</span></button>
        </footer>
    </main>
    </>)
}

function setTokenViewfn(selectedView,token){ //update app, show view
    console.log("setTokenView",selectedView, token.key)
    setViewState(selectedView);
    setSelectedTokenObj(token);
}

// necessary for moving between cardz.
function setSelectedTXTz(newTXTz,loadTXTidx){
    let newObj = selectedToken
    // newObj.txtz = newTXTz.txtz
    newObj.txtz = newTXTz
    newObj.loadTXTidx = loadTXTidx;
    setSelectedTokenObj(newObj);
}

return (
<>

<article style={{flex:'1',display:'flex',flexWrap:'wrap',justifyContent:'center',alignContent:'stretch' }}>
<h1 className="appTitle">WORD_GAME</h1>
<div className='scrollBarV' style={{maxHeight:'83vh',minWidth:'98%'}} >
<div className='scrollBarH' style={{maxHeight:'83vh' }} >
<main className='cardMain' style={{display:'flex'}}>
    <section className='mainframe' style={{display:'flex',
    boxShadow:'0px 1px 14px 1px purple',
    marginTop:'0.444em',
    flex:'1 1 auto',
    borderRadius:'13px',
    } }>
        { (!tokenz_CARD_COUNT)?
            <div style={{width:'100%',margin:'44%',marginLeft:'40%'}}>loading...</div>
          :'' 
        }
        { (viewState==='overview') ? 
            <CardView/>
        : (viewState==='pageview') ? //todo pageview?
           <TokenCardz token={selectedToken}/>
        : <CardView/>
        }
    </section>
    <div style={{}}>&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </main>
        </div>
        </div>
        <footer style={{marginTop:'1em',fontSize:'xx-small'}}>
          WORD_GAME : {tokenz_CARD_COUNT}
        </footer>
        </article>
    </>
)

};