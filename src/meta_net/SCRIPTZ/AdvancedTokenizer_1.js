/****************************************\
 * AdvancedTokenizer - TRAIN_TXT_TOKENZ (algorithm)
 * ******************---*****************
 * EXAMPLE SYNTAX:
 * path, type version datestamp
 * EXAMPLE USE:
 > node train_txt_tokenz_1.jz all all 0.0.0.0 YMD:2023,7,18
 > node train_txt_tokenz_1.js z_SYNTAX_TEST all 0.0.0.0 YMD:2023,7,18
 > node train_txt_tokenz_1.js z_SYNTAX_TEST all 0.0.0.0 YMD:2023,7,24
 > node AdvancedTokenizer_1.js z_SYNTAX_TEST all 0.0.0.0 
 > node AdvancedTokenizer_1.js TEST  //reads different hard coded test files.
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
 * author: @spazefalcon (c) 2023 July
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
    //  verz : '0.0.0.0',
    manifest:{
        output: [], 
        srcmap: [],
        year:0,
        month:0,
        day:0,
        engine:[],
        total_token_count:0 //use to confirm number of tokens to find duplicates or shortages.
    },
    idx:{
        TOPIC_IDX:0,     //RUNTIME_STATE.idx.TOPIC_IDX
        SUBTOPIC_IDX:0,  //RUNTIME_STATE.idx.SUBTOPIC_IDX
        SERIEZ_IDX:0,    //RUNTIME_STATE.idx.SERIEZ_IDX
        QUOTE_IDX:0,     //RUNTIME_STATE.idx.QUOTE_IDX
        TXT_IDX:0,       //RUNTIME_STATE.idx.TXT_IDX
        BOOK_IDX:0,      //future use todo - maps to hand written txt book/page
        PAGE_IDX:0      
    },
     setz:{ //all_setz
        all_markdown:[],  //built from many markdown files
        all_raw_tokenz:[], //built from space delimiter and return delimiters.
        all_key_tokenz:[], //built from primary and subkeys of universal_underscore_words
        all_topic_tokenz:[], //built from hash title start through triple_hyphen
        all_subtxt_tokenz:[], // built from txt between triple_tildes
        all_quote_tokenz:[],  // build from greater_gator to carriage_return.
        all_txt_tokenz:[],   // build from txt between triple_hyphens
        all_error_tokenz:[]    //use this to try to catch parsing errors
     },
     ymdz : ['YMD_2020_1_1'], //format YMD split by underscore!
     sigz : ['SIG_ENZO_2020_~:)'], //format symbol and year also by underscore     
     token_map:{}, //used to visualize delimiterz
 } 
 
 const readAllMarkdownFiles = async (dirname) => {
     try {
         const filenames = await readdir(dirname);
         console.log(" - all file names:", filenames, filenames.length);
         //todo test
         // ARG_OPTIONS.srcmap.push(...filenames);//for trace back
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
    //  let raw_markdown_data = ''
    //  let dynamic_src = ''
     try {
        //  dynamic_src = "../LIBZ/"+RUNTIME_STATE.lookup+".md"
        //  RUNTIME_STATE.srcmap.push(dynamic_src);//for trace back
        RUNTIME_STATE.manifest.srcmap.push(RUNTIME_STATE.tgt_path);//for trace back
        //  raw_markdown_data = fs.readFileSync(dynamic_src, "utf-8");
        // RUNTIME_STATE.markdown_data = fs.readFileSync(RUNTIME_STATE.tgt_path, "utf-8");
        RUNTIME_STATE.setz.all_markdown.push( fs.readFileSync(RUNTIME_STATE.tgt_path, "utf-8") );
        //todo markdown data 
     } catch (error) {
         console.error("Error reading file:", error);
     }
    //  return raw_markdown_data
 };
 
 function Advanced_Tokenizer(){   //universal_underscore_combinagame_syntax
     let cleanMarkdown = () => {  //Local-Behavior_fns
         //linebreaks to semicolons and spaces, and collapse special characters to syntax
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[\r\n\r\n]+/g,";");
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[\r\n]+/g,";");
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[;;;]+/g,";");
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[;;]+/g,";");
         //  RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[---]+/g,";");
        //  RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[;]+/g,"\r\n");
        //  RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[;]+/g,"---");
        //  RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[\r\n]+/g," ");
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[   ]+/g," ");
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[  ]+/g," ");
         //remove unexpected characters: ... , spaces, quotes
         // RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[~]+/g,""); 
        //  RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[...]+/g,"");
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[']+/g,"");
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[`]+/g,"");
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/["]+/g,"");
        //  RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[;]+/g,"");
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[\\]+/g,"");
         RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[/]+/g,"");
     }; cleanMarkdown();
     //------------------------------------------------------------------------
     let txt_tokenz = [];
     let subtxt_line = [] //reusable variables.
    //  let subtxt_idx = 0;
     let aToken = {}; //reusable placeholder
     let txtToken = {}; //reusable placeholder
     let txt_slice = [] //reusable variables
     let txt_tgt = '';        
     //------------------------------------------------------------------------
    let delimit_txt_tokenz = () => {
        txt_tokenz = [];
        subtxt_line = txt_slice.join(' ').split(';');
       
        //LOOK FOR SERIES and QUOTES
        for(var i = 0; i< subtxt_line.length; i++){
            // if(subtxt_line[i].indexOf('dropoff')>-1){debugger;}  
            if(subtxt_line[i].indexOf('>') > -1  ){
                // debugger;
                txtToken = new Object();
                txtToken.type = 'QUOTE_TXT' //token
                // txtToken.key = subtxt_line[i]
                txtToken.txt = subtxt_line[i]
                // RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
                // RUNTIME_STATE.token_map[i] = aToken.key //used to visualize delimiterz.
                // txtToken.numz = '1.1.1.1';
                // txtToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}.${RUNTIME_STATE.idx.QUOTE_IDX}.`
                txtToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}`+
                                `.${RUNTIME_STATE.idx.SUBTOPIC_IDX}`+
                                `.${++RUNTIME_STATE.idx.QUOTE_IDX}`                
                txt_tokenz.push(txtToken)
                RUNTIME_STATE.setz.all_quote_tokenz.push(txtToken)
                continue;                
            } else if (subtxt_line[i].match(/\d+\./g)) {
                
                txtToken = new Object();
                txtToken.type = 'SERIEZ_TXT' //token
                // txtToken.key = subtxt_line[i]
                txtToken.txt = subtxt_line[i]
                // console.log('1x',subtxt_line[i].match(/\d+\./g))
                // txtToken.seriez = subtxt_line[i].match(/[0-9]+./g).toString();
                txtToken.seriez = subtxt_line[i].match(/\d+\./g).toString(); //FIRST_MATCH
                // console.log('2x',txtToken.seriez)
                // RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
                // RUNTIME_STATE.token_map[i] = aToken.key //used to visualize delimiterz.
                // txtToken.numz = '1.1.1.1';
                RUNTIME_STATE.idx.SERIEZ_IDX = txtToken.seriez;
                txtToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}`+
                                `.${RUNTIME_STATE.idx.SUBTOPIC_IDX}`+
                                `.${RUNTIME_STATE.idx.SERIEZ_IDX}`
                txt_tokenz.push(txtToken)
                continue;   
            }  
            else if (subtxt_line[i]) {
                // console.log('checking', subtxt_line[i])
                // if(subtxt_line[i].indexOf('---') >-1 || subtxt_line[i].indexOf('#') >-1 ){ break }
                if(subtxt_line[i].indexOf('---') >-1 ){ continue }
                if( subtxt_line[i].indexOf('#') >-1 ){ break }
                txtToken = new Object();
                txtToken.type = 'SUB_TXT' //token
                // txtToken.key = subtxt_line[i]
                txtToken.txt = subtxt_line[i]
                // RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
                // RUNTIME_STATE.token_map[i] = aToken.key //used to visualize delimiterz.
                // txtToken.numz = '1.1.1.1';
                // txtToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}.${RUNTIME_STATE.idx.TXT_IDX}.`
                txtToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}`+
                                `.${RUNTIME_STATE.idx.SUBTOPIC_IDX}`+
                                `.${++RUNTIME_STATE.idx.TXT_IDX}`                
                txt_tokenz.push(txtToken)
                continue;
            }
        }
        return txt_tokenz;
    }; //delimit_txt_tokenz();
 
     // let tokenz = RUNTIME_STATE.setz.all_markdown[0].split(' ')
    //  RUNTIME_STATE.raw_tokenz = RUNTIME_STATE.setz.all_markdown[0].split(' ')

    //IMPORTANT: Advanced DOUBLE_SPLIT, by new_line and then spaces.
     RUNTIME_STATE.setz.all_raw_tokenz = RUNTIME_STATE.setz.all_markdown[0].split(/(;|\s)/) //split and capture line_ends
     RUNTIME_STATE.setz.all_raw_tokenz = RUNTIME_STATE.setz.all_raw_tokenz.filter(function(str) {
        return /\S/.test(str); //remove white space characters but keep end_lines
    });
     console.log(' - all_RAW_tokenz, length: ', RUNTIME_STATE.setz.all_raw_tokenz.length)

 
     // let objectTokenz = []; //final return product
     let delimit_KEY_tokenz = () => {  //delimit PRIME_KEYZ to key_idx.
         for(let i = 0; i< RUNTIME_STATE.setz.all_raw_tokenz.length; i++){ //KEY-TOKENZ
            txt_tgt = RUNTIME_STATE.setz.all_raw_tokenz[i];
            txt_tgt = txt_tgt.replace(/[~.,]/g,'');//CLEAN_TOKEN
             if(txt_tgt.indexOf('_') === 0){ //KEY_TOKEN found
                aToken = new Object();
                aToken.type = 'UNIVERSAL_KEY' //token
                aToken.key = txt_tgt
                RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
                RUNTIME_STATE.token_map[i] = aToken.key //used to visualize delimiterz.
                continue;
             } else if(txt_tgt.indexOf('_') > 0){ //SUBKEY_TOKEN found
                 aToken = new Object();
                 aToken.type = 'SUB_KEY'  //token
                 aToken.key = txt_tgt
                 RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
                 RUNTIME_STATE.token_map[i] = aToken.key; //used to visualize delimiterz.
                 continue;       
             } else if( txt_tgt.charAt(0)==='a' //aWORDZa match
                && !!txt_tgt.charAt(1).match(/[A-Z]/) ){ 
                    aToken = new Object();
                    aToken.type = 'PRIME_KEY' //token
                    aToken.key = txt_tgt
                    RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
                    RUNTIME_STATE.token_map[i] = aToken.key; //used to visualize delimiterz.
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
                RUNTIME_STATE.token_map[i] = aToken.key; //used to visualize delimiterz.
                continue;   
             } 
             else if( !!txt_tgt.match(/z$|Z$/) //trailing_z_match and all upper case.
               && txt_tgt.length - txt_tgt.replace(/[A-Z]/g, '').length=== txt_tgt.length ){ 
                // console.log('found z',txt_tgt)
                 aToken = new Object(); 
                 aToken.type = 'ENDZ_KEY' //token
                 aToken.key = txt_tgt
                 RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
                 RUNTIME_STATE.token_map[i] = aToken.key; //used to visualize delimiterz.
                 continue;  
          } 
        } //endLOOP
     }; delimit_KEY_tokenz();
     //--------------------------------------------
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
                    //reset_IDX
                    RUNTIME_STATE.idx.QUOTE_IDX = 0;
                    RUNTIME_STATE.idx.TXT_IDX = 0;
                    


                } else { aToken.type = 'subtopic';   }    
                aToken.key = txt_tgt.replace(/[~.,]/g,'');//CLEAN_TOKEN
                aToken.txtz = [];
                RUNTIME_STATE.token_map[i] = aToken.key; //used to visualize delimiterz.

               let j=0,k=0; // LOOKAHEAD-PATTERNZ (watchers) fns trigger to create tokenz.
               let lookahead_title_line = ()=>{
                   for(j = i+1; j < RUNTIME_STATE.setz.all_raw_tokenz.length; j++){ //SUB-TOKENZ
                       if(RUNTIME_STATE.setz.all_raw_tokenz[j].indexOf(';') === 0 
                         || j+1>=RUNTIME_STATE.setz.all_raw_tokenz.length){ //SECTION_END found
                           txt_slice = RUNTIME_STATE.setz.all_raw_tokenz.slice(i+1,j+1)
                           txt_slice = txt_slice.join(' ').replace(/[;]/g,'');
                           txt_slice = txt_slice.trim();
                           aToken.txtz.push(txt_slice);
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
                                //REGEX: get quotes or number items.    
                            if(txt_slice.indexOf('>') > -1 || txt_slice.join('').match(/[0-9]./) ){
                                console.log('Q or N SLICE',RUNTIME_STATE.setz.all_raw_tokenz[k])
                                txt_slice = delimit_txt_tokenz(); //CALLOUT-to-FACTORY.
                                // console.log('qnSLICEout',txt_slice.join(' '))
                            } else {
                                console.log('SOLO SLICE',RUNTIME_STATE.setz.all_raw_tokenz[k])
                                txt_slice = txt_slice.join(' ').replace(/[;#]/g,'');
                                txt_slice = txt_slice.replace('---','')//CLEAN_TOKENZ
                                txt_slice = txt_slice.trim();
                                if(txt_slice) txt_slice = {
                                    type:'SOLO_TXT',
                                    txt:txt_slice,
                                    numz:`${RUNTIME_STATE.idx.TOPIC_IDX}.${RUNTIME_STATE.idx.SUBTOPIC_IDX}.${++RUNTIME_STATE.idx.TXT_IDX}.`
                                }
                                // console.log('soloSLICEout',txt_slice.join(' '))
                            }
                       
                            if(txt_slice){ aToken.txtz.push(txt_slice) }
                            break;
                    
                        } 
                   }
                }; lookahead_subtxt();
                // aToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}.${RUNTIME_STATE.setz.all_topic_tokenz.length}`
                // aToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}.${subtxt_idx++}`
                aToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}.${RUNTIME_STATE.idx.SUBTOPIC_IDX++}`
                RUNTIME_STATE.setz.all_topic_tokenz.push(aToken)
                continue;
            } 
        } //ENDLOOP
    }; delimit_all_topicz();

        //------------------------------------------------------------------------
    let delimit_all_quotez = () => {
        // for(let i = 0; i< RUNTIME_STATE.setz.all_raw_tokenz.length; i++){ //KEY-TOKENZ
            // txt_tgt = RUNTIME_STATE.setz.all_raw_tokenz[i];             
            if(txt_tgt.indexOf('>') === 0){ //QUOTE_TOKEN found
                aToken = new Object();
                aToken.type = 'quote'
                aToken.key = txt_tgt;
                RUNTIME_STATE.token_map[i] = aToken.key; //used to visualize delimiterz.
                // startQuoteIDX = i;
            } 
            if(txt_tgt.indexOf('~') > 0){ //END_QUOTE_ found
                aToken = new Object();
                aToken.type = 'endquote'
                aToken.key = txt_tgt;
                aToken.txtz = [];
                // if(startQuoteIDX  >= 0){ //slice values from array to txt storage.
                    txt_slice = RUNTIME_STATE.setz.all_raw_tokenz.slice(startQuoteIDX+1,i+1)
                    //todo push all quotes.
                    aToken.txtz.push(txt_slice);
                    startQuoteIDX = 0;
                    RUNTIME_STATE.token_map[i] = txt_slice.join(' '); //used to visualize delimiterz.
                // } else { console.log('missing quote token')}

            } 
        // }//ENDLOOP
    }; //delimit_all_quotez();

    let delimit_metadata = ()=>{
        if(txt_tgt.indexOf('~~~') === 0){ //DOC_END found
            aToken = new Object();
            aToken.type = 'endtxt'
            aToken.key = txt_tgt;
            RUNTIME_STATE.token_map[i] = aToken.key; //used to visualize delimiterz.
        } 
        
        if(txt_tgt.indexOf('YMD') === 0){ //DOC_END found
            aToken = new Object();
            aToken.type = 'ymdz'
            aToken.key = txt_tgt;
            RUNTIME_STATE.token_map[i] = aToken.key; //used to visualize delimiterz.
        } 
        
        if(txt_tgt.indexOf('SIG') === 0){ //DOC_END found
            aToken = new Object();
            aToken.type = 'sigz'
            aToken.key = txt_tgt;
            RUNTIME_STATE.token_map[i] = aToken.key; //used to visualize delimiterz.
        } 
    }; //delimit_metadata();
     //---
     // let getAll_SUBKEY_Tokenz = (token, tgt) => {
     //     for(let i = 0; i<RUNTIME_STATE.raw_tokenz.length; i++){ //SUB-KEY-TOKENZ
     //         if(RUNTIME_STATE.raw_tokenz[i].indexOf('_')>-1){
     //             aToken = new Object();
     //             aToken.key = RUNTIME_STATE.raw_tokenz[i];
     //             objectTokenz.push(aToken)
     //         }
     //     }
 
     //     console.log(' - token_objectify',objectTokenz.length,objectTokenz)
     // }; getAll_SUBKEY_Tokenz();
 
     // return objectTokenz;
 // }
 
 // function delimit_METATXTZ(){
     //OVERVIEW: TOKEN_KEYZ, given every txt reference, from markdown,  as TXTZ in METATXTZ, by TXT_KEY.
     // X delimit clean markdown by ~~~ and --- into delimited_markdown, TXTZ. STORE in RUNTIME_STATE
 
     // let delimit_clean_markdown = () => { // delimit by ~~~ and --- , flatmap
     //     RUNTIME_STATE.DOCZ_MARKDOWN_DATA = []; 
     //     RUNTIME_STATE.SUBTXTZ_MARKDOWN_DATA = [];
     //     let docz_idx = 0;
     //     let subtxtz_idx = 0;
     //     let txt_slice = [] //reusable variable
 
     //     console.log(' - delimit markdown',RUNTIME_STATE.raw_tokenz.length)
     //     for(let i = 0; i< RUNTIME_STATE.raw_tokenz.length; i++){ //DELIMITED-TOKENZ
     //         if(RUNTIME_STATE.raw_tokenz[i].indexOf('~~~') > -1){ //END_DOC_KEY-TOKEN found
     //             txt_slice = RUNTIME_STATE.raw_tokenz.slice(docz_idx,i)
     //             RUNTIME_STATE.DOCZ_MARKDOWN_DATA.push(txt_slice)
     //             docz_idx = i+1;
     //         } else if(RUNTIME_STATE.raw_tokenz[i].indexOf('---') > -1 ){ //END_SUB_KEY-TOKEN found
     //             txt_slice = RUNTIME_STATE.raw_tokenz.slice(subtxtz_idx,i)
     //             RUNTIME_STATE.SUBTXTZ_MARKDOWN_DATA.push(txt_slice)
     //             subtxtz_idx = i+1;
     //         }
     //     }
 
     // }; delimit_clean_markdown();
 
 // }
 
 // function populate_METATXTZ(){
 
     let get_token_tgtz_in_delimited_txtz = () => { //search for key instances for keymap of txtz
         // RUNTIME_STATE.DOCZ_MARKDOWN_DATA = []; //todo add to runtime state
         // RUNTIME_STATE.SUBTXTZ_MARKDOWN_DATA = [];
         let txt_tgt = '' //reusable variable
         RUNTIME_STATE.SUBTXTZ_TXT_DATA = {} //final KEYMAP result
 
         for(let i = 0; i< RUNTIME_STATE.json_txtz.length; i++){ //KEY-TOKENZ as TXT_TGTZ
             if(RUNTIME_STATE.json_txtz && RUNTIME_STATE.json_txtz[i].key){
                 txt_tgt = RUNTIME_STATE.json_txtz[i].key; //TODO Change to INDEX #?
                 console.log(' - use clean tokenz to search for', txt_tgt)
 
             } else { continue }
 
             // console.log(' - search ',txt_tgt)
             for(let j = 0; j< RUNTIME_STATE.SUBTXTZ_MARKDOWN_DATA.length; j++){ //Search subtxtz for tgt
                 if(RUNTIME_STATE.SUBTXTZ_MARKDOWN_DATA[j].indexOf(txt_tgt)>-1){
                     // txt_tgt = RUNTIME_STATE.json_txtz.key;
                     console.log(' - found ',txt_tgt,'in subtxtz', j )
 
                     if(RUNTIME_STATE.SUBTXTZ_TXT_DATA[txt_tgt]){ //append to keymap
                         RUNTIME_STATE.SUBTXTZ_TXT_DATA[txt_tgt].txtz.push(... RUNTIME_STATE.SUBTXTZ_MARKDOWN_DATA[j])
                     } else { //create on keymap
                         RUNTIME_STATE.SUBTXTZ_TXT_DATA[txt_tgt]={
                             txtz:RUNTIME_STATE.SUBTXTZ_MARKDOWN_DATA[j] 
                         }
                     }
 
                 } else { continue }
             } //end inner loop of subtexz
 
 
         } //end outer loop of key tokenz.
         // console.log("sub txt populated",RUNTIME_STATE.SUBTXTZ_TXT_DATA[0].txt.length)
     }; //get_token_tgtz_in_delimited_txtz();
 
 
 }
 
 function wrap_METADATA(){
     let meta_wrap_tokenz = {
         tgt : RUNTIME_STATE.tgt_path,
         type : '_', //underscore as master_token_delimiter
         tokenz: [],
        //  tokenz: RUNTIME_STATE.json_txtz,
        //  verz : RUNTIME_STATE.verz,
         ymdz : RUNTIME_STATE.ymdz,
         lookup : "LIBZ",
         output : "CARDZ",
        //  engine : "SCRIPTZ/AdvancedTokenizer_1.js",
         engine : RUNTIME_STATE.manifest.engine,
         srcmap : RUNTIME_STATE.manifest.srcmap,
     } 
     return meta_wrap_tokenz
 }
 
 function writeOutTokenz(){

    let data_folder = 'YMD_'+RUNTIME_STATE.manifest.year+'_'+RUNTIME_STATE.manifest.month+'_'+RUNTIME_STATE.manifest.day
    RUNTIME_STATE.manifest.output.push('../SCRIPTZ/TOKEN_DATA/'+ data_folder) //artifacts of building cards.
    // let BACKUP_PATH = '../SCRIPTZ/TOKEN_DATA/'+data_folder //artifacts of building cards.
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

  
    //  let write_out_token_index = () => {
    //      if(!RUNTIME_STATE || ! RUNTIME_STATE.json_txtz){return}
    //      // let lookup = "aWORDZa_test.json"
    //      let tgt = "token_index_1.json"
    //     //  fs.writeFile("../CARDZ/"+tgt, JSON.stringify(RUNTIME_STATE.json_txtz), err => {
    //      fs.writeFile(BACKUP_PATH+"/"+tgt, JSON.stringify(RUNTIME_STATE.json_txtz), err => {
    //          if (err) { console.error(err); } //dehydrate with JSON.parse()
    //          console.log(' - Written to file',BACKUP_PATH+'/'+tgt)
    //      });
    //  }; write_out_token_index();
 
     let write_out_token_master = () => {
         if(!RUNTIME_STATE || ! RUNTIME_STATE.meta_wrap_tokenz){return}
         let tgt = "token_master_1.json"
        //  fs.writeFile("../CARDZ/"+tgt, JSON.stringify(RUNTIME_STATE.meta_wrap_tokenz), err => {
         fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify(RUNTIME_STATE.meta_wrap_tokenz), err => {
             if (err) { console.error(err); } //dehydrate with JSON.parse()
             RUNTIME_STATE.manifest.output.push(tgt)
             console.log(' - Written to file',RUNTIME_STATE.manifest.output[0]+'/'+tgt)
         });
     }; write_out_token_master();
 
     let write_out_token_map = () => {
         if(!RUNTIME_STATE || !RUNTIME_STATE.token_map){return}
         let tgt = "token_map_2.json"
         fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify(RUNTIME_STATE.token_map), err => {
             if (err) { console.error(err); } //dehydrate with JSON.parse()
             RUNTIME_STATE.manifest.output.push(tgt)
             console.log(' - Written to file',RUNTIME_STATE.manifest.output[0]+'/'+tgt)
         });
     }; write_out_token_map();
 
    //  let write_out_token_object_map = () => {
    //     if(!RUNTIME_STATE || !RUNTIME_STATE.token_object_map){return}
    //     let tgt = "token_object_map_4.json"
    //    //  fs.writeFile(BACKUP_PATH+"/"+tgt, JSON.stringify(RUNTIME_STATE.token_object_map), err => {
    //     fs.writeFile(BACKUP_PATH+"/"+tgt, JSON.stringify(RUNTIME_STATE.token_object_map), err => {
    //         if (err) { console.error(err); } //dehydrate with JSON.parse()
    //         console.log(' - Written to file',BACKUP_PATH+'/'+tgt)
    //     });
    // }; write_out_token_object_map();

    //-----------------------------------WRITE_OUT_SETZ---------
    let write_out_all_key_tokenz = () => {
        if(!RUNTIME_STATE || !RUNTIME_STATE.setz.all_key_tokenz){return}
        let tgt = "all_key_tokenz_1.json"
        fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify(RUNTIME_STATE.setz.all_key_tokenz), err => {
            if (err) { console.error(err); } //dehydrate with JSON.parse()
            RUNTIME_STATE.manifest.output.push(tgt)
            console.log(' - Written to file',RUNTIME_STATE.manifest.output[0]+'/'+tgt)
        });
    }; write_out_all_key_tokenz();

    let write_out_all_raw_tokenz = () => {
        if(!RUNTIME_STATE || !RUNTIME_STATE.setz.all_raw_tokenz){return}
        let tgt = "all_raw_tokenz_1.json"
        fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify(RUNTIME_STATE.setz.all_raw_tokenz), err => {
            if (err) { console.error(err); } //dehydrate with JSON.parse()
            RUNTIME_STATE.manifest.output.push(tgt)
            console.log(' - Written to file',RUNTIME_STATE.manifest.output[0]+'/'+tgt)
        });
    }; write_out_all_raw_tokenz();    

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

 
 }
 
 const main = async () => {
     console.log('START~aWORDZa~TOKENIZER!!!')
     console.log("USAGE: node AdvancedTokenizer_1 TGT_PATH TYPE" )
     /// PROCESS ARGUMENTS
//  debugger;
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
    //  if(!args[4]){console.log('no VERSION STAMP parameter')}
    //  else{
    //      RUNTIME_STATE.verz = args[4];
    //      console.log('VERSION',RUNTIME_STATE.verz)
    //  }

     let SETUP_SIGNATURE_STAMP = async () => {
        var dateObj = new Date();
        RUNTIME_STATE.manifest.month = dateObj.getUTCMonth() + 1; //months from 1-12
        RUNTIME_STATE.manifest.day = dateObj.getUTCDate();
        RUNTIME_STATE.manifest.year = dateObj.getUTCFullYear();
        RUNTIME_STATE.ymdz.push( 'YMD_' + RUNTIME_STATE.manifest.year + "_" + RUNTIME_STATE.manifest.month + "_" + RUNTIME_STATE.manifest.day );
        console.log("YMDz:",RUNTIME_STATE.ymdz)
        RUNTIME_STATE.sigz.push(`SIG_ENZO_${RUNTIME_STATE.manifest.year}_~:)`)
        // RUNTIME_STATE.sigz.push(`SIG_ENZO_2023_~:)`)
     }; SETUP_SIGNATURE_STAMP();

     let MAIN_PROCESS = async () => {
         console.log('0) MAIN_PROCESS - PIPELINE ')
         //1
         console.log('1) READ File(s): ', RUNTIME_STATE.tgt_path)
         if(RUNTIME_STATE.tgt_path === 'all'){
             RUNTIME_STATE.setz.all_markdown[0] = await readAllMarkdownFiles(`../LIBZ/`);
            //  RUNTIME_STATE.markdown_data = await readAllMarkdownFiles(`../${RUNTIME_STATE.lookup}/`);
         } else { // TEST //todo switch default to all
            console.log('running in TEST MODE')
            RUNTIME_STATE.tgt_path = './TOKEN_TESTS/a_SERIEZ_TEST.md'
            // RUNTIME_STATE.tgt_path = './TOKEN_TESTS/a_TOPIC_TEST.md'
            // RUNTIME_STATE.tgt_path = './TOKEN_TESTS/z_SYNTAX_TEST.md'
            //  RUNTIME_STATE.lookup = RUNTIME_STATE.tgt_path;
            //  RUNTIME_STATE.markdown_data = await readTGTMarkdownFile();
             await readTGTMarkdownFile();
             // console.log('markdown_data', RUNTIME_STATE.markdown_data)
         }
         //2
         console.log('2) Run Tokenizer: ', RUNTIME_STATE.tgt_path)
         // RUNTIME_STATE.json_txtz = Advanced_Tokenizer()
         Advanced_Tokenizer()
 
         //3 Separate TXT Population process.
         // console.log('3) POPULATE TXTZ: ')
         // delimit_METATXTZ()
         // console.log("DELIMITED DOCZ",RUNTIME_STATE.DOCZ_MARKDOWN_DATA.length)
         // console.log("DELIMITED SUBTXTZ",RUNTIME_STATE.SUBTXTZ_MARKDOWN_DATA.length)
         // populate_METATXTZ()
 
 
         //4 Wrap Metadata
         console.log('4) Wrap METADATA: ', RUNTIME_STATE.tgt_path)
         RUNTIME_STATE.meta_wrap_tokenz = wrap_METADATA()
         //5 WRITE to FILE
         
         writeOutTokenz();
 
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
 
 
    // O loop clean_tokenz, over delimited_markdown. to build METATXTZ {}.
     // O by search for TGT_TXT in delimited_markdown.
     // O ask: does delimited_markdown contain tgt_txt in delimited_token.txt?
     // O where found, then: 
     // O ask: does METATXTZ include tgt_txt as txt_key?
     // O if metatxtz (not TXT_KEY), then txt_key created in METATXTZ, and
     // O metatxtz.txt_key.txtz[], appended with each(delimited_markdown.txt)
     // O track 'parents'[], for later meta lookup.
 
  // O TXTZ 
 
 //O BUILD_ARTIFACT Philosophy: each step creates readable output : keysrc
 //O _underscore as universal delimiter, of more data.
 //O exact names for input/output files. by key and datez as key_YMD_2020_10_01
 //O _YMD_dates on run output. not as parameter
 
 //O LOOP all clean tokens
 //O build docz and subz as subtxts from --- and ~~~
 //O convert to TOKENZ with TXTZ by keys
 //O # _..._ (key_tokenz), like: # _aWORDZa_ - used in TITLE
 //O _..._ (primary_key), like _aWORDZa_ used in key reference
 // and ..._... (secondary_key), like a_long_complex_token as SUB_TOKENZ.
 //O tokenz (of type): key, txt, quotez, listz, and txtz.
 //O key_tokenz = {tokenz:[]}       //_..._
 //O subkey_tokenz = {sub_tokenz:[]}   //..._...
 //O quote_tokenz = {type:quote,txtz:[]} //>
 //O txt_tokenz = {type:txt,txtz:[]} //## and --- and ~~~
 //O subtxt_tokenz = [] //##
 //O list_tokenz = {type:list,txtz[]}
 //O master_tokenz = FILE.md like aWORDZa_YMD_2020_10_01.json
 
 //O delimiter_map = {1:_aWORDZa_, 8:>}


 
 //O replace as SETZ line 100 with line 90
 //O extend writeOut to write each to all_file.
 //O add continue to parser points
 //O add index listeners on end_point_delimiters.
 //O add total count arrays
 //O update manifest total count
 //O push to error array, write out error array
 
 
 
 