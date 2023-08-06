/****************************************\
 * AdvancedTokenizer - TRAIN_TXT_TOKENZ (algorithm)
 * ******************---*****************
 * EXAMPLE SYNTAX:
 * path, type version datestamp
 * EXAMPLE USE:
 > node train_txt_tokenz_2.jz all all 0.0.0.0 YMD:2023,7,18
 > node train_txt_tokenz_2.js z_SYNTAX_TEST all 0.0.0.0 YMD:2023,7,18
 > node train_txt_tokenz_2.js z_SYNTAX_TEST all 0.0.0.0 YMD:2023,7,24
 > node AdvancedTokenizer_2.js z_SYNTAX_TEST all 0.0.0.0 

// USAGE

 > node AdvancedTokenizer_2.js TEST  //reads different hard coded test files.


 * ******************---*****************
 * OVERVIEW:
 * - read all md files, 
 * - parse tokenz,
 * - write json files as:
 * - txtz and txt multi-dimensional-array
 * - in simple, standard, JSON_TXTZ_FORMAT:
 * 
 * > TXTZ:[TXT:""]
 * 
 * beautiful.
 * *******************************
 *  1) LANGUAGE PARSING DELIMITERZ:
 *     - TXT or TXTZ (required) for RECURSIVE_ALGORITHM.
 *     - EXTENDED_MARKDOWN_SYNTAX
 *     - TXTZ_DELIMITER: "~~~", END DOC
 *     - TXT_DELIMITER,  "---", END SECTION
 *     - TITLEZ: "#", "##", "###"
 *     - QUOTEZ 1,2,3: ">", ">>", ">>>"
 *     - DATEZ: "YMD:2023.7.16"
 *     - BULLETZ: '-' 
 *     - TOKENZ:  '_' any location, any number.
 *     - SIGZ: "~ : )"
 * *******************************
 * SYNTAX: (everything is optional)
 * KEY : (optional) precursor to TXT or TXTZ
 * TXTZ : (optional)
 * IMGZ : (optional)
 * LINKZ: (optional)
 * META: (optional)
 - important language innovations in syntax:
 '_' is "universal_delimiter", used to coin various tokenz
 'a...' is "little_a_prefix", means 'actual', to clarify from non-actual.
 '...a' is "little_a_postfix", means 'ACTZ', one of myriad human actions.
 '...z...' is "little_z", means clarified, unique, or exact, separate from ambiguous.
 * Additive syntax
 '# ' title - borrowed from markdown
 '> ' quote - borrowed from markdown
 ';'  endline //borrowed from javascript
 'aCamelCase' //borrowed from javascript and other programming languages, for enhanced_english aWORDZa.
 '~' endquote - to get multiline quotes. Means "send this prior quote to social media streams"
 * author: @spazefalcon (c) 2023 July, August (all rights reserved) net cinematics llc.
 \********************************************************/
 // /TXTZ and /SCRIPTZ hidden by .gitignore 
 // USE /TXTZ as INPUTS for un-edited (non-delimited) stream of consciousness, documents of aWORDZa.
 // USE /LIBZ for edited aWORDZa. (delimited) re-written, improved, clarified, elaborated
 // USE /SCRIPTZ to READ input and PARSE from /LIBZ and
 // USE /CARDZ as output of json 
 // USE /CARDZ/DATA/YMD_Y_M_D as backup data diagnostic to track output.
 // USE getTOKENZ (frontEND) to dynamically lookup/render TOKEN_CARDZ

 const fs = require('fs');
 const util = require('util');
 const readdir = util.promisify(fs.readdir);
 const readFile = util.promisify(fs.readFile);
 
 //READ RUNTIME_STATE, TO UNDERSTAND BUILD PROCESS.
 let RUNTIME_STATE = { //init defaults, then override
     tgt_path : 'all', //or 'test'
     search_type : '_', //or keys
     verz : '0.0.1.1',
    manifest:{
        output: [], 
        srcmap: [],
        year:0,
        month:0,
        day:0,
        engine:[],
        total_subtopic_count:0, //RUNTIME_STATE.manifest. confirm number of tokens to find duplicates or shortages.
        total_topic_count:0,
        total_quote_count:0,
        total_key_count:0,
        total_key_topic_count:0
    },
    idx:{
        TXT_IDX:0,       //RUNTIME_STATE.idx.TXT_IDX
        CARD_IDX:0,         //tracks output of cardz
        QUOTE_IDX:0,     //RUNTIME_STATE.idx.QUOTE_IDX
        TOPIC_IDX:0,     //RUNTIME_STATE.idx.TOPIC_IDX
        SERIEZ_IDX:0,    //RUNTIME_STATE.idx.SERIEZ_IDX
        SUBTOPIC_IDX:0,  //RUNTIME_STATE.idx.SUBTOPIC_IDX
        KEY_TOPICZ_IDX:0, //tracks ~~~ and !!!
        KEY_TOPICZ_FLAG:0, //tracks ~~~ and !!!
        //BOOK_IDX:0,      //future use todo - maps to hand written txt book/page
        //PAGE_IDX:0      
    },
    setz:{ //all_setz
        all_markdown:[],  //built from many markdown files
        all_raw_tokenz:[], //built from space delimiter and return delimiters.
        all_key_tokenz:[], //built from primary and subkeys of universal_underscore_words
        all_keyz_alias:[], //unique list of all keys with aliases.
        all_topic_tokenz:[], //built from hash title start through triple_hyphen
        all_quote_tokenz:[],  // build from greater_gator to carriage_return.
        all_key_topicz:[],  // build from !!! and ~~~ sections
        all_card_tokenz:[],  //RUNTIME_STATE.setz.all_card_tokenz
        omni_card_tokenz:[],   //output production product
        omni_key_idx:{}        // output production index.
        //all_subtxt_tokenz:[], // built from txt between triple_tildes
        //all_txt_tokenz:[],   // build from txt between triple_hyphens
        //all_error_tokenz:[]    //use this to try to catch parsing errors
     },
     ymdz : ['YMD_2020_1_1'], //format YMD split by underscore! original creation date.
     sigz : ['SIG_ENZO_2020_~:)'], //format symbol and year also by underscore     
    //  token_map:{}, //used to visualize delimiterz
 } 
 
 const readAllMarkdownFiles = async (dirname) => {
     try {
         const filenames = await readdir(dirname);
         console.log(" - all file names:", filenames, filenames.length);
         //todo test
         // RUNTIME.srcmap.push(...filenames);//for trace back
        //  RUNTIME_STATE.manifest.srcmap.push(RUNTIME_STATE.tgt_path);//for trace back
         const files_promise = filenames.map(filename => {
             return readFile(dirname + filename, 'utf-8');
         });
         const response = await Promise.all(files_promise);
         // console.log("3) ALL FILES TXT: ",{ response })
         return response
         // return filenames.reduce((accumulator, filename, currentIndex) => {
         //     const content = response[currentIndex];
         //     accumulator[filename] = { content };
         //     return accumulator;
         // }, {});
     } catch (error) {
         console.error(error);
     }
 };
 
 const readTGTMarkdownFile = async () => {
     console.log(' - tgt path',RUNTIME_STATE.tgt_path)
     try {
        RUNTIME_STATE.manifest.srcmap.push(RUNTIME_STATE.tgt_path);//for trace back
        RUNTIME_STATE.setz.all_markdown.push( fs.readFileSync(RUNTIME_STATE.tgt_path, "utf-8") );
     } catch (error) {
         console.error("Error reading file:", error);
     }
 };
 
 function Advanced_Tokenizer(){   //universal_underscore_combinagame_syntax
     let cleanMarkdown = () => {  //Local-Behavior_fns
         //linebreaks to semicolons and spaces, and collapse special characters to syntax
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[\r\n\r\n]+/g,";");
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[\r\n]+/g,";");
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[;;;]+/g,";");
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[;;]+/g,";");
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[   ]+/g," ");
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[  ]+/g," ");
         //  RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[---]+/g,";");
         //  RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[;]+/g,"\r\n");
         //  RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[;]+/g,"---");
         //  RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[\r\n]+/g," ");
         // RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[~]+/g,""); 
         //  RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[...]+/g,"");
         //  RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[;]+/g,"");
         //remove unexpected characters: ... , spaces, quotes
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[']+/g,"");
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[`]+/g,"");
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/["]+/g,"");
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[\\]+/g,"");
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[/]+/g,"");
     }; cleanMarkdown();
     //------------------------------------------------------------------------
     let txt_tokenz = [];
     let subtxt_line = [] //reusable variables.
     let aToken = {}; //reusable placeholder
     let txtToken = {}; //reusable placeholder
     let txt_slice = [] //reusable variables
     let txt_tgt = '';        
     //------------------------------------------------------------------------
    let delimit_txt_tokenz = () => {
        txt_tokenz = [];
        subtxt_line = txt_slice.join(' ').split(';');
        for(var i = 0; i< subtxt_line.length; i++){
            //LOOK FOR KEY_TOPICZ
            if( subtxt_line[i].match(/!!!!/) && RUNTIME_STATE.idx.KEY_TOPICZ_FLAG===0 ){ //KEY_TOPICZ
                // RUNTIME_STATE.setz.all_key_topicz.push(subtxt_line[i])
                txtToken = new Object();
                txtToken.type = 'KEY_TOPICZ' //token
                txtToken.txt = subtxt_line[i]
                txtToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}`+
                                `.${RUNTIME_STATE.idx.SUBTOPIC_IDX}`+
                                `.${++RUNTIME_STATE.idx.KEY_TOPICZ_IDX}kc`;                
                txtToken.ymdz = new Array(...RUNTIME_STATE.ymdz);              
                txtToken.sigz = new Array(...RUNTIME_STATE.sigz); 
                if(txtToken.txt.indexOf('SIG_')>-1){txtToken.sigz.push( txtToken.txt.match(/SIG_[^\s]+/)[0] );  }
                if(txtToken.txt.indexOf('YMD_')>-1){txtToken.ymdz.push( txtToken.txt.match(/YMD_[^\s]+/)[0] );  } 
                RUNTIME_STATE.setz.all_key_topicz.push(txtToken)  
                ++RUNTIME_STATE.manifest.total_key_topic_count;              
            } else if ( subtxt_line[i].match(/~~~/) ) {
                if(RUNTIME_STATE.idx.KEY_TOPICZ_FLAG > 0){
                    RUNTIME_STATE.idx.KEY_TOPICZ_FLAG = 0;
                } else if(RUNTIME_STATE.idx.KEY_TOPICZ_FLAG === 0){
                    txtToken = new Object();
                    txtToken.type = 'KEY_TOPICZ' //token
                    txtToken.txt = subtxt_line[i]
                    txtToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}`+
                                    `.${RUNTIME_STATE.idx.SUBTOPIC_IDX}`+
                                    `.${++RUNTIME_STATE.idx.KEY_TOPICZ_IDX}kc`;                
                    txtToken.ymdz = new Array(...RUNTIME_STATE.ymdz);              
                    txtToken.sigz = new Array(...RUNTIME_STATE.sigz); 
                    if(txtToken.txt.indexOf('SIG_')>-1){txtToken.sigz.push( txtToken.txt.match(/SIG_[^\s]+/)[0] );  }
                    if(txtToken.txt.indexOf('YMD_')>-1){txtToken.ymdz.push( txtToken.txt.match(/YMD_[^\s]+/)[0] );  } 
                    let lookahead_endtilde = () => { //lookahead pattern
                        for(var j = i+1; j< subtxt_line.length; j++){
                            if(subtxt_line[j].indexOf('~~~')>-1 
                            || subtxt_line[j].indexOf('#')>-1
                            || j===subtxt_line.length-1){
                                txtToken.txt = subtxt_line.slice(i+1,j).join('');
                                break;
                            }
                        }
                    }; lookahead_endtilde();
                    RUNTIME_STATE.idx.KEY_TOPICZ_FLAG = 1;
                    RUNTIME_STATE.setz.all_key_topicz.push(txtToken)
                    ++RUNTIME_STATE.manifest.total_key_topic_count;
                }
            }
            //LOOK FOR SERIES and QUOTES
            if(subtxt_line[i].indexOf('>') > -1  ){ //QUOTEZ
                txtToken = new Object();
                txtToken.type = 'QUOTE_TXT' //token
                txtToken.txt = subtxt_line[i]
                // txtToken.key = subtxt_line[i]
                // RUNTIME_STATE.token_map[i] = aToken.key //used to visualize delimiterz.
                txtToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}`+
                                `.${RUNTIME_STATE.idx.SUBTOPIC_IDX}`+
                                `.${++RUNTIME_STATE.idx.QUOTE_IDX}q`;                
                txtToken.ymdz = new Array(...RUNTIME_STATE.ymdz);              
                txtToken.sigz = new Array(...RUNTIME_STATE.sigz); 
                if(txtToken.txt.indexOf('SIG_')>-1){
                    txtToken.sigz.push( txtToken.txt.match(/SIG_[^\s]+/)[0] );
                }
                if(txtToken.txt.indexOf('YMD_')>-1){
                    txtToken.ymdz.push( txtToken.txt.match(/YMD_[^\s]+/)[0] );
                } 
                txt_tokenz.push(txtToken)
                RUNTIME_STATE.setz.all_quote_tokenz.push(txtToken)
                ++RUNTIME_STATE.manifest.total_quote_count;
                continue;                
            } else if (subtxt_line[i].match(/\d+\./g)) { //SERIEZ
                txtToken = new Object();
                txtToken.type = 'SERIEZ_TXT' //token
                txtToken.txt = subtxt_line[i]
                // txtToken.key = subtxt_line[i]
                txtToken.seriez = subtxt_line[i].match(/\d+\./g).toString(); //FIRST_MATCH
                // RUNTIME_STATE.token_map[i] = aToken.key //used to visualize delimiterz.
                RUNTIME_STATE.idx.SERIEZ_IDX = txtToken.seriez;
                txtToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}`+
                                `.${RUNTIME_STATE.idx.SUBTOPIC_IDX}`+
                                `.n${RUNTIME_STATE.idx.SERIEZ_IDX}`;
                txt_tokenz.push(txtToken)
                ++RUNTIME_STATE.manifest.total_subtopic_count;
                continue;   
            }  
            else if (subtxt_line[i]) {                 //SUBTXTZ
                if(subtxt_line[i].indexOf('~~~') >-1 ){ continue }
                if(subtxt_line[i].indexOf('---') >-1 ){ continue }
                if( subtxt_line[i].indexOf('#') >-1 ){ break }
                txtToken = new Object();
                txtToken.type = 'SUB_TXT' //token
                txtToken.txt = subtxt_line[i]
                // txtToken.key = subtxt_line[i]
                // RUNTIME_STATE.token_map[i] = aToken.key //used to visualize delimiterz.
                txtToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}`+
                                `.${RUNTIME_STATE.idx.SUBTOPIC_IDX}`+
                                `.${++RUNTIME_STATE.idx.TXT_IDX}`;                
                txt_tokenz.push(txtToken)
                ++RUNTIME_STATE.manifest.total_subtopic_count;
                continue;
            }

        }
        return txt_tokenz;
    }; //delimit_txt_tokenz();
 
    //IMPORTANT: Advanced DOUBLE_SPLIT, by new_line and then spaces.
     RUNTIME_STATE.setz.all_raw_tokenz = RUNTIME_STATE.setz.all_markdown[0].split(/(;|\s)/) //split and capture line_ends
     RUNTIME_STATE.setz.all_raw_tokenz = RUNTIME_STATE.setz.all_raw_tokenz.filter(function(str) {
        return /\S/.test(str); //remove white space characters but keep end_lines
    });
    console.log(' - all_RAW_tokenz, length: ', RUNTIME_STATE.setz.all_raw_tokenz.length)
    //--------------------------------------------
    let delimit_KEY_tokenz = () => {  //delimit PRIME_KEYZ to key_idx.
         for(let i = 0; i< RUNTIME_STATE.setz.all_raw_tokenz.length; i++){ //KEY-TOKENZ
            txt_tgt = RUNTIME_STATE.setz.all_raw_tokenz[i];
            txt_tgt = txt_tgt.replace(/[~.,]/g,'');//CLEAN_TOKEN
            if(txt_tgt.indexOf('SIG_')>-1||txt_tgt.indexOf('YMD_')>-1){continue;}
            else if (txt_tgt.indexOf('_') === 0){ //KEY_TOKEN found
                aToken = new Object();
                aToken.type = 'PRIME_KEY' //token
                aToken.key = txt_tgt
                RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
                ++RUNTIME_STATE.manifest.total_key_count;
                continue;
            } else if(txt_tgt.indexOf('_') > 0){ //SUBKEY_TOKEN found
                 aToken = new Object();
                 aToken.type = 'SUB_KEY'  //token
                 aToken.key = txt_tgt
                 RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
                 ++RUNTIME_STATE.manifest.total_key_count;
                 continue;       
            } else if( txt_tgt.charAt(0)==='a' //aWORDZa match
                && !!txt_tgt.charAt(1).match(/[A-Z]/) ){ 
                    aToken = new Object();
                    aToken.type = 'ALPHA_KEY' //token
                    aToken.key = txt_tgt
                    RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
                    ++RUNTIME_STATE.manifest.total_key_count;
                    continue;   
            } else if( (()=>{ //INLINE_MATCHING PATTERN (advanced conditions)
                if(txt_tgt.charAt(0).match(/[a-z]/)){
                    if(txt_tgt.length - txt_tgt.replace(/[A-Z]/g, '').length >= 1){
                        return true;
                    }// ascendingCase_match
                }
                if(txt_tgt.length - txt_tgt.replace(/[a-z]/g, '').length > 1){
                    if(txt_tgt.length - txt_tgt.replace(/[A-Z]/g, '').length > 1){
                        return true;
                    } // MixedCase_match
                } 
                return false; 
            })() ){ // MIXED_CASE: more than one uppercase AND more than one lowercase.
                aToken = new Object();
                aToken.type = 'MIX_KEY' //token
                aToken.key = txt_tgt
                RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
                ++RUNTIME_STATE.manifest.total_key_count;
                continue;   
            } 
            else if( !!txt_tgt.match(/z$|Z$/) //trailing_z_match and all upper case.
               && txt_tgt.length - txt_tgt.replace(/[A-Z]/g, '').length=== txt_tgt.length ){ 
                 aToken = new Object(); 
                 aToken.type = 'ENDZ_KEY' //token
                 aToken.key = txt_tgt
                 RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
                 ++RUNTIME_STATE.manifest.total_key_count;
                 continue;  
          } 
        } //endLOOP
    }; delimit_KEY_tokenz();   
    //--------------------------------------------
    // for each key, compare to all other keys
    // remove duplicates, selecting PRIME KEY
    let key_token_alias_check = ()=>{ //remove duplicates with alias_check on all_key_tokenz.
        let keyCheck = {}, duplicate = false;
        for(var i=0; i<RUNTIME_STATE.setz.all_key_tokenz.length;i++){

            for (var j=0; j<RUNTIME_STATE.setz.all_keyz_alias.length;j++){
                keyCheck = RUNTIME_STATE.setz.all_keyz_alias[j].key;
                if(keyCheck.indexOf('SIG'>-1)){continue}
                if(keyCheck.indexOf('YMD'>-1)){continue}
                if(keyCheck===RUNTIME_STATE.setz.all_key_tokenz[i]){ //duplicate
                    console.log('exact match',keyCheck)   
                    duplicate = true; break;
                }
            }
            if(!duplicate){
                debugger;
                aToken = new Object(); 
                aToken.key = RUNTIME_STATE.setz.all_key_tokenz[i];
                aToken.type = 'OMNI_KEY' //token
                // aToken.key = txt_tgt                
                RUNTIME_STATE.setz.all_keyz_alias.push(aToken)
            } else {
                console.log('duplicate key found',txt_tgt)
            }
        }
    }; key_token_alias_check();   
    //--------------------------------------    
    let delimit_all_topicz = ()=>{
        for(let i = 0; i< RUNTIME_STATE.setz.all_raw_tokenz.length; i++){ //KEY-TOKENZ
            txt_tgt = RUNTIME_STATE.setz.all_raw_tokenz[i];  
            if(txt_tgt.indexOf('#') === 0){ //TITLE_TOKEN found
                aToken = new Object();
                if(txt_tgt.length === 1){
                    aToken.type = 'maintopic';
                    ++RUNTIME_STATE.idx.TOPIC_IDX;
                    RUNTIME_STATE.idx.SUBTOPIC_IDX = 0;
                    RUNTIME_STATE.idx.SERIEZ_IDX = 0;    
                    aToken.ymdz = RUNTIME_STATE.ymdz;              
                    aToken.sigz = RUNTIME_STATE.sigz;              
                } else { aToken.type = 'subtopic';   }   
                RUNTIME_STATE.idx.QUOTE_IDX = 0;
                RUNTIME_STATE.idx.TXT_IDX = 0; //reset_IDX
                aToken.key = txt_tgt.replace(/[~.,]/g,'');//CLEAN_TOKEN
                aToken.txtz = [];
               let j=0,k=0; // LOOKAHEAD-PATTERNZ (watchers) fns trigger to create tokenz.
               let lookahead_title_line = ()=>{
                   for(j = i+1; j < RUNTIME_STATE.setz.all_raw_tokenz.length; j++){ //SUB-TOKENZ
                       if(RUNTIME_STATE.setz.all_raw_tokenz[j].indexOf(';') === 0 
                         || j+1>=RUNTIME_STATE.setz.all_raw_tokenz.length){ //SECTION_END found
                           txt_slice = RUNTIME_STATE.setz.all_raw_tokenz.slice(i+1,j+1)
                           txt_slice = txt_slice.join(' ').replace(/[;]/g,'');
                           txt_slice = txt_slice.trim();
                           aToken.title = txt_slice;
                           break;
                       } 
                   }
                }; lookahead_title_line();
                let lookahead_subtxt = ()=>{
                   for(k = j+1; k < RUNTIME_STATE.setz.all_raw_tokenz.length; k++){ //SUB-TOKENZ
                       if(
                        // RUNTIME_STATE.setz.all_raw_tokenz[k].indexOf('---') === 0 ||
                           RUNTIME_STATE.setz.all_raw_tokenz[k].indexOf('#') === 0
                           || k+1>=RUNTIME_STATE.setz.all_raw_tokenz.length){ //SECTION_END found
                                txt_slice = RUNTIME_STATE.setz.all_raw_tokenz.slice(j+1,k+1)
                                //REGEX: SPECIFIC_TOKEN 
                                //get quotes '>' or number items '1. ', or key_topicz '!!!!'    
                            if(txt_slice.indexOf('>') > -1 
                              || txt_slice.join('').match(/[0-9]./) 
                              || txt_slice.join('').match(/!!!!|~~~/) ){
                                txt_slice = delimit_txt_tokenz(); //CALLOUT-to-FACTORY.
                            } else {
                                txt_slice = txt_slice.join(' ').replace(/[;#]/g,'');
                                txt_slice = txt_slice.replace('---','')//CLEAN_TOKENZ
                                txt_slice = txt_slice.trim();
                                if(txt_slice) txt_slice = {
                                    type:'SOLO_TXT',
                                    txt:txt_slice,
                                    numz:`${RUNTIME_STATE.idx.TOPIC_IDX}.${RUNTIME_STATE.idx.SUBTOPIC_IDX}.${++RUNTIME_STATE.idx.TXT_IDX}`
                                }
                            }
                            //console.log(j,aToken.key) //shows topic_map. TODO page_index
                            // debugger;
                            if(txt_slice.length){ aToken.txtz.push(...txt_slice) }
                            else if(txt_slice.txt){ aToken.txtz.push(txt_slice) }
                            break;
                    
                        } 
                   }
                }; lookahead_subtxt();
                aToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}.${RUNTIME_STATE.idx.SUBTOPIC_IDX++}`
                RUNTIME_STATE.setz.all_topic_tokenz.push(aToken)
                ++RUNTIME_STATE.manifest.total_topic_count;
                continue;
            } 
        } //ENDLOOP
    }; delimit_all_topicz();
    //------------------------------------------------------------------------

    let generateAlias = (token)=>{
        let alias = ['abc','123','def'];
        // alias.push(token.)
        return alias
    }

    //------------------------------------------------------------------------
     let build_token_cardz = () => { 
        // use all the keys, to search through all the topics and subtopics, and keytopicz
        //search for key instances for keymap of txtz
        let key_tgt = '' //reusable variable
        let txt_tgt = {}, subtopic_tgt = {}, topic_tgt = {}
        // for(let i = 0; i< RUNTIME_STATE.setz.all_key_tokenz.length; i++){ //KEY-TOKENZ as TXT_TGTZ
        for(let i = 0; i< RUNTIME_STATE.setz.all_keyz_alias.length; i++){ //KEY-TOKENZ as TXT_TGTZ
            key_tgt = RUNTIME_STATE.setz.all_keyz_alias[i].key;
            // key_tgt = RUNTIME_STATE.setz.all_key_tokenz[i];
            console.log('3) SEARCH LIBZ: ', key_tgt)
            for(let j = 0; j< RUNTIME_STATE.setz.all_topic_tokenz.length; j++){ //Search subtxtz for tgt
                console.log('Searching, ',RUNTIME_STATE.setz.all_topic_tokenz[j].title)    
                let check_token_for_tgt = ()=>{
                    // let token_state = {title:false,txtz:false}
                    let token_state = {title:false,txtz:[]}
                    if(RUNTIME_STATE.setz.all_topic_tokenz[j].title 
                        && RUNTIME_STATE.setz.all_topic_tokenz[j].title.indexOf(key_tgt)>-1){
                            console.log(' - found ',key_tgt,'in title' )
                            token_state.title=true;
                    }
                    if(RUNTIME_STATE.setz.all_topic_tokenz[j].txtz){ 
                        for(let k = 0; k < RUNTIME_STATE.setz.all_topic_tokenz[j].txtz.length; k++){
                            if(RUNTIME_STATE.setz.all_topic_tokenz[j].txtz[k].txt.indexOf(key_tgt)>-1){
                                console.log(' - found ',key_tgt,'in subtxtz' )
                                txt_tgt = RUNTIME_STATE.setz.all_topic_tokenz[j].txtz[k];
                                token_state.txtz.push(txt_tgt);
                                // token_state.txtz = true;
                            }
                        }
                    }
                    // if(token_state.title || token_state.txtz){
                    if(token_state.title || token_state.txtz.length){
                        aToken = new Object();
                        aToken.type = 'card_token' //token
                        aToken.key = key_tgt
                        aToken.title = (token_state.title)?RUNTIME_STATE.setz.all_topic_tokenz[j].title:'';                        
                        aToken.txtz = (token_state.txtz.length)?token_state.txtz:[];
                        // aToken.txtz = (token_state.txtz)?RUNTIME_STATE.setz.all_topic_tokenz[j].txtz:[];
                        aToken.alias = [];
                        aToken.alias.push(...generateAlias(aToken))
                        // aToken.numz = [];
                        // aToken.numz.push(RUNTIME_STATE.setz.all_topic_tokenz[j].numz);
                        aToken.numz = RUNTIME_STATE.setz.all_topic_tokenz[j].numz+
                          `.${++RUNTIME_STATE.idx.CARD_IDX}cardz`; 
                        // aToken.numz.push(RUNTIME_STATE.setz.all_topic_tokenz[j].numz+
                        //   `.${++RUNTIME_STATE.idx.CARD_IDX}cardz`); 
                        // aToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}`+
                        // `.${RUNTIME_STATE.idx.SUBTOPIC_IDX}`+
                        // `.${++RUNTIME_STATE.idx.CARD_IDX}cardz`;  
                        RUNTIME_STATE.setz.all_card_tokenz.push(aToken);
                    }
                }; check_token_for_tgt();
            } //end inner loop of subtexz
         } //end outer loop of key tokenz.
     }; build_token_cardz();
 }
 
function wrap_KEY_ALIASES_with_METADATA(){
    //omni array wrapper of alias keyz
    RUNTIME_STATE.setz.omni_key_idx = {
        omni_key_index:RUNTIME_STATE.setz.all_keyz_alias
    }
    // for( var i = 0; i < RUNTIME_STATE.setz.all_keyz_alias.length; i++){
    //     //for each card, create a wrapped version.
    //     RUNTIME_STATE.setz.omni_key_idx.push( {
    //         key: RUNTIME_STATE.setz.all_card_tokenz[i].key,
    //         type : 'TOKEN_CARDZ', //underscore as master_token_delimiter
    //         txtz: RUNTIME_STATE.setz.all_card_tokenz[i].txtz,
    //         numz: RUNTIME_STATE.setz.all_card_tokenz[i].numz,
    //         tgt : RUNTIME_STATE.tgt_path,
    //         ymdz : RUNTIME_STATE.ymdz,
    //         input : "LIBZ",
    //         output : "CARDZ",
    //         version:'1.1.1.1',
    //         engine : RUNTIME_STATE.manifest.engine,
    //         srcmap : RUNTIME_STATE.manifest.srcmap,
    //     } )
    // } //end loop
}

function wrap_CARDZ_with_METADATA(){
    for( var i = 0; i < RUNTIME_STATE.setz.all_card_tokenz.length; i++){
        //for each card, create a wrapped version.
        RUNTIME_STATE.setz.omni_card_tokenz.push( {
            key: RUNTIME_STATE.setz.all_card_tokenz[i].key,
            type : 'TOKEN_CARDZ', //underscore as master_token_delimiter
            txtz: RUNTIME_STATE.setz.all_card_tokenz[i].txtz,
            numz: RUNTIME_STATE.setz.all_card_tokenz[i].numz,
            tgt : RUNTIME_STATE.tgt_path,
            ymdz : RUNTIME_STATE.ymdz,
            input : "LIBZ",
            output : "CARDZ",
            version:'1.1.1.1',
            engine : RUNTIME_STATE.manifest.engine,
            srcmap : RUNTIME_STATE.manifest.srcmap,
        } )
    } //end loop
}

//  function wrap_METADATA(){
//      let meta_wrap_tokenz = {
//          tgt : RUNTIME_STATE.tgt_path,
//          type : '_', //underscore as master_token_delimiter
//          tokenz: [],
//          ymdz : RUNTIME_STATE.ymdz,
//          lookup : "LIBZ",
//          output : "CARDZ",
//          engine : RUNTIME_STATE.manifest.engine,
//          srcmap : RUNTIME_STATE.manifest.srcmap,
//      } 
//      return meta_wrap_tokenz
//  }
 
 function writeOutTokenz(){
    let data_folder = 'YMD_'+RUNTIME_STATE.manifest.year+'_'+RUNTIME_STATE.manifest.month+'_'+RUNTIME_STATE.manifest.day
    RUNTIME_STATE.manifest.output.push('../SCRIPTZ/TOKEN_DATA/'+ data_folder) //artifacts of building cards.
    let PRODUCTION_PATH = '../CARDZ/' //output of building cards.
    console.log('5) WRITE File(s) out: ', RUNTIME_STATE.manifest.output[0])

    const create_output_folder = ()=>{
        try {
        if (!fs.existsSync(RUNTIME_STATE.manifest.output[0])) {
            fs.mkdirSync(RUNTIME_STATE.manifest.output[0]);
        }
        } catch (err) {
        console.error("could not save backup",err);
        }
    }; create_output_folder();

 
    //-----------------------------------WRITE_OUT_SETZ---------
    // let write_out_all_key_tokenz = () => {
    //     if(!RUNTIME_STATE || !RUNTIME_STATE.setz.all_key_tokenz){return}
    //     let tgt = "all_key_tokenz_1.json"
    //     fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify(RUNTIME_STATE.setz.all_key_tokenz), err => {
    //         if (err) { console.error(err); } //dehydrate with JSON.parse()
    //         RUNTIME_STATE.manifest.output.push(tgt)
    //         console.log(' - Written to file',RUNTIME_STATE.manifest.output[0]+'/'+tgt)
    //     });
    // }; write_out_all_key_tokenz();

    let write_out_all_omni_keyz = () => {
        wrap_KEY_ALIASES_with_METADATA()
        if(!RUNTIME_STATE || !RUNTIME_STATE.setz.omni_key_idx){return}
        let tgt = "omni_key_idx_1.json"
        // let tgt = "all_key_tokenz_1.json"
        fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify(RUNTIME_STATE.setz.omni_key_idx), err => {
            if (err) { console.error(err); } //dehydrate with JSON.parse()
            RUNTIME_STATE.manifest.output.push(tgt)
            console.log(' - Written to file',RUNTIME_STATE.manifest.output[0]+'/'+tgt)
        });
    }; write_out_all_omni_keyz();

    let write_out_all_raw_tokenz = () => {
        if(!RUNTIME_STATE || !RUNTIME_STATE.setz.all_raw_tokenz){return}
        let tgt = "all_raw_tokenz_1.json"
        fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify(RUNTIME_STATE.setz.all_raw_tokenz), err => {
            if (err) { console.error(err); } //dehydrate with JSON.parse()
            RUNTIME_STATE.manifest.output.push(tgt)
            console.log(' - Written to file',RUNTIME_STATE.manifest.output[0]+'/'+tgt)
        });
    }; //write_out_all_raw_tokenz();    

    let write_out_all_topic_tokenz = () => {
        if(!RUNTIME_STATE || !RUNTIME_STATE.setz.all_topic_tokenz){return}
        let tgt = "all_topic_tokenz_1.json"
        fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify(RUNTIME_STATE.setz.all_topic_tokenz), err => {
            if (err) { console.error(err); } //dehydrate with JSON.parse()
            RUNTIME_STATE.manifest.output.push(tgt)
            console.log(' - Written to file',RUNTIME_STATE.manifest.output[0]+'/'+tgt)
        });
    }; write_out_all_topic_tokenz();    

    let write_out_all_quote_tokenz = () => {
        if(!RUNTIME_STATE || !RUNTIME_STATE.setz.all_quote_tokenz){return}
        let tgt = "all_quote_tokenz_1.json"
        fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify(RUNTIME_STATE.setz.all_quote_tokenz), err => {
            if (err) { console.error(err); } //dehydrate with JSON.parse()
            RUNTIME_STATE.manifest.output.push(tgt)
            console.log(' - Written to file',RUNTIME_STATE.manifest.output[0]+'/'+tgt)
        });
    }; write_out_all_quote_tokenz();    

    let write_out_all_key_topicz = () => {
        if(!RUNTIME_STATE || !RUNTIME_STATE.setz.all_key_topicz){return}
        let tgt = "all_key_topicz_1.json"
        fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify(RUNTIME_STATE.setz.all_key_topicz), err => {
            if (err) { console.error(err); } //dehydrate with JSON.parse()
            RUNTIME_STATE.manifest.output.push(tgt)
            console.log(' - Written to file',RUNTIME_STATE.manifest.output[0]+'/'+tgt)
        });
    }; write_out_all_key_topicz();  
    
    let write_out_all_cardz = () => {
        let production_path = `../LIBZ/CARDZ`
        // let read_data = [];
        // const readTGTFile = async () => {
        //     let data_path = `${RUNTIME_STATE.tgt_path}`
        //     console.log(' - tgt path',RUNTIME_STATE.tgt_path)
        //     try {
        //     //    RUNTIME_STATE.manifest.srcmap.push(RUNTIME_STATE.tgt_path);//for trace back
        //        read_data.push( fs.readFileSync(data_path, "utf-8") );
        //     } catch (error) {
        //         console.error("Error reading file:", error);
        //     }
        // }; readTGTFile();


        const create_output_folders = ()=>{
            try {
                if (!fs.existsSync(RUNTIME_STATE.manifest.output[0]+'/CARDZ')) {
                    fs.mkdirSync(RUNTIME_STATE.manifest.output[0]+'/CARDZ');
                }
            } catch (err) {
            console.error("could not save backup",err);
            }
            try {
               
                if (!fs.existsSync(production_path)) {
                    fs.mkdirSync(production_path);
                }
            } catch (err) {
            console.error("could not save backup",err);
            }            
        }; create_output_folders();

        if(!RUNTIME_STATE || !RUNTIME_STATE.setz.all_card_tokenz){return}
        let tgt = "CARDZ/cardz_1.json" //BACKUP-COPY
        fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify(RUNTIME_STATE.setz.omni_card_tokenz), err => {
            if (err) { console.error(err); } //dehydrate with JSON.parse()
            RUNTIME_STATE.manifest.output.push(tgt)
            console.log(' - Written to file',RUNTIME_STATE.manifest.output[0]+'/'+tgt)
        });

        let card_file_tgt = 'cardz_1.json' //PRODUCTION_PRODUCT-.
        // fs.writeFile(production_path+"/"+card_file_tgt, JSON.stringify(RUNTIME_STATE.setz.all_card_tokenz), err => {
        fs.writeFile(production_path+"/"+card_file_tgt, JSON.stringify(RUNTIME_STATE.setz.omni_card_tokenz), err => {
            if (err) { console.error(err); } //dehydrate with JSON.parse()
            RUNTIME_STATE.manifest.output.push(tgt)
            console.log(' - Written to file', production_path+'/'+card_file_tgt)
        });        

    }; write_out_all_cardz();     

 }

 function writeOutCounts(){
    console.log('TOKEN COUNTS:')
    console.log('key:',RUNTIME_STATE.manifest.total_key_count,
      RUNTIME_STATE.setz.all_keyz_alias.length)
    //   RUNTIME_STATE.setz.all_key_tokenz.length)
    console.log('key_topic:',RUNTIME_STATE.manifest.total_key_topic_count,
      RUNTIME_STATE.setz.all_key_topicz.length)
    console.log('quote:',RUNTIME_STATE.manifest.total_quote_count,
      RUNTIME_STATE.setz.all_quote_tokenz.length)      
    console.log('topic:',RUNTIME_STATE.manifest.total_topic_count,
      RUNTIME_STATE.setz.all_topic_tokenz.length)
    console.log('cardz:',RUNTIME_STATE.setz.all_card_tokenz.length)
    console.log('subtopic:',RUNTIME_STATE.manifest.total_subtopic_count)
    // console.log('total_tokenz:', RUNTIME_STATE.setz.all_key_tokenz.length
    console.log('total_tokenz:', RUNTIME_STATE.setz.all_keyz_alias.length
      +RUNTIME_STATE.setz.all_key_topicz.length
      +RUNTIME_STATE.setz.all_quote_tokenz.length
      +RUNTIME_STATE.setz.all_topic_tokenz.length
      +RUNTIME_STATE.manifest.total_subtopic_count);
 }
 
 const main = async () => {
     console.log('START~aWORDZa~TOKENIZER!!!')
     console.log("USAGE: node AdvancedTokenizer_1 TGT_PATH TYPE" )
     /// PROCESS ARGUMENTS
     const args = process.argv; //OVERRIDE RUNTIME_STATE
     if(args[1]){console.log('SAVE PATH for MINT_STAMP',args[1])
        RUNTIME_STATE.manifest.engine = args[1]
     }

     if(!args[2]){console.log('no TGT_PATH parameter')}
     else{
         RUNTIME_STATE.tgt_path = args[2];
         console.log('TGT_PATH',RUNTIME_STATE.tgt_path)
     }
     if(!args[3]){console.log('no SEARCH TYPE parameter')}
     else{
         RUNTIME_STATE.search_type = args[3];
         console.log('TYPE',RUNTIME_STATE.search_type)
     }

     let SETUP_SIGNATURE_STAMP = async () => {
        var dateObj = new Date();
        RUNTIME_STATE.manifest.month = dateObj.getUTCMonth() + 1; //months from 1-12
        RUNTIME_STATE.manifest.day = dateObj.getUTCDate();
        RUNTIME_STATE.manifest.year = dateObj.getUTCFullYear();
        RUNTIME_STATE.ymdz.push( 'YMD_' + RUNTIME_STATE.manifest.year + "_" + RUNTIME_STATE.manifest.month + "_" + RUNTIME_STATE.manifest.day );
        console.log("YMDz:",RUNTIME_STATE.ymdz)
        RUNTIME_STATE.sigz.push(`SIG_ENZO_${RUNTIME_STATE.manifest.year}_~:)`)
     }; SETUP_SIGNATURE_STAMP();

     let MAIN_PROCESS = async () => {
         console.log('0) MAIN_PROCESS - PIPELINE ')
         //1 read files
         console.log('1) READ File(s): ', RUNTIME_STATE.tgt_path)
         if(RUNTIME_STATE.tgt_path === 'all'){
             RUNTIME_STATE.setz.all_markdown[0] = await readAllMarkdownFiles(`../LIBZ/`);
         } else { // TEST //todo switch default to all
            console.log('running in TEST MODE')
            RUNTIME_STATE.tgt_path = './TOKEN_TESTS/aWORDZa_2023_8_6.md'
            // RUNTIME_STATE.tgt_path = './TOKEN_TESTS/a_QUOTE_TEST.md'
            // RUNTIME_STATE.tgt_path = './TOKEN_TESTS/a_SERIEZ_TEST.md'
            // RUNTIME_STATE.tgt_path = './TOKEN_TESTS/a_TOPIC_TEST.md'
            // RUNTIME_STATE.tgt_path = './TOKEN_TESTS/z_SYNTAX_TEST.md'
             await readTGTMarkdownFile();
             // console.log('markdown_data', RUNTIME_STATE.markdown_data)
         }
         //2 run tokenizer
         console.log('2) Run Tokenizer: ', RUNTIME_STATE.tgt_path)
         Advanced_Tokenizer()
 
         //3 Wrap Metadata
        //  console.log('3) Wrap METADATA: ', RUNTIME_STATE.tgt_path)
        //  RUNTIME_STATE.meta_wrap_tokenz = wrap_METADATA()

         //3 Wrap CARDZ with Metadata
         console.log('3) Wrap CARDZMETADATA: ', RUNTIME_STATE.tgt_path)
         wrap_CARDZ_with_METADATA()

         //4 WRITE to FILE
         console.log('4) Write to file: ', RUNTIME_STATE.tgt_path)
         writeOutTokenz();

         //5 WRITE out analytic counts.
         writeOutCounts();
 
     }; MAIN_PROCESS();
 };
 main();
 
  // TODO:
  // X READ all markdown from LIBZ
  // X WRITE JSON objects to CARDZ
  // X PARAMETERS for: VERSION DATESTAMP 
  // X Write out to DATA_MODEL_SYNTAX
  // X TOKENIZE to PARSE DELIMITERZ by TYPE and FILE
  // X source file as SRC, rename date to DATEZ VERZ SRCZ
  // X metadata section by tokenz abstraction
    // X loop clean_tokenz, over delimited_markdown. to build METATXTZ {}.
     // X by search for TGT_TXT in delimited_markdown.
     // X ask: does delimited_markdown contain tgt_txt in delimited_token.txt?
     // X where found, then: 
     // X ask: does METATXTZ include tgt_txt as txt_key?
     // X if metatxtz (not TXT_KEY), then txt_key created in METATXTZ, and
     // X metatxtz.txt_key.txtz[], appended with each(delimited_markdown.txt)
     // X track 'parents'[], for later meta lookup, with NUMZ.
  // X TXTZ 
 //X BUILD_ARTIFACT Philosophy: each step creates readable output : keysrc
 //X _underscore as universal delimiter, of more data.
 //X exact names for input/output files. by key and datez as key_YMD_2020_10_01
 //X _YMD_dates on run output. not as parameter
 //X LOOP all clean tokens
 //X build docz and subz as subtxts from --- and ~~~
 //X convert to TOKENZ with TXTZ by keys
 //X # _..._ (key_tokenz), like: # _aWORDZa_ - used in TITLE
 //X _..._ (primary_key), like _aWORDZa_ used in key reference
 //X and ..._... (secondary_key), like a_long_complex_token as SUB_TOKENZ.
 //X tokenz (of type): key, txt, quotez, seriez, and txtz.
 //X key_tokenz = {tokenz:[]}       //_..._
 //X subkey_tokenz = {sub_tokenz:[]}   //..._...
 //X quote_tokenz = {type:quote,txtz:[]} //>
 //X txt_tokenz = {type:txt,txtz:[]} //## and --- and ~~~
 //X subtxt_tokenz = [] //##
 //X series_tokenz = {type:list,txtz[]}
 //X master_tokenz = FILE.md like aWORDZa_YMD_2020_10_01.json
 //X key_cardz, use JSON output, to COMPILE, KEY_CARDZ
 //X delimiter_map = {1:_aWORDZa_, 8:>}
 //X replace as SETZ line 100 with line 90
 //X extend writeOut to write each to all_file.
 //X add continue to parser points
 //X add index listeners on end_point_delimiters.
 //X add total count arrays
 //X update manifest total count
 //X push to error array, write out error array
 
 //O compile all_card_tokenz
 
 