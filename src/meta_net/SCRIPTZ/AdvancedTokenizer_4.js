/****************************************\
 * AdvancedTokenizer - TRAIN_TXT_TOKENZ (algorithm)
 * ******************---*****************
 * EXAMPLE SYNTAX:
 * path, type version datestamp
 * EXAMPLE USE:
 > node train_txt_tokenz_4.jz all all 0.0.0.0 YMD:2023,7,18
 > node train_txt_tokenz_4.js z_SYNTAX_TEST all 0.0.0.0 YMD:2023,7,18
 > node train_txt_tokenz_4.js z_SYNTAX_TEST all 0.0.0.0 YMD:2023,7,24
 > node AdvancedTokenizer_4.js z_SYNTAX_TEST all 0.0.0.0 

// USAGE

 > node AdvancedTokenizer_4.js TEST  //reads different hard coded test files.


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
     verz : '0.4.4.4',
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
        STAR_TOPICZ_IDX:0, //tracks ~~~ and !!!
        STAR_TOPICZ_FLAG:0, //tracks open and close ~~~ 
        //BOOK_IDX:0,      //future use todo - maps to hand written txt book/page
        //PAGE_IDX:0      
    },
    setz:{ //all_setz
        all_markdown:[],  //built from many markdown files
        all_raw_tokenz:[], //built from space delimiter and return delimiters.
        all_key_tokenz:[], //built from primary and subkeys of universal_underscore_words
        omni_key_idx:[], //unique list of all keys with aliases.
        all_topic_tokenz:[], //built from hash title start through triple_hyphen
        all_quote_tokenz:[],  // build from greater_gator to carriage_return.
        all_star_topicz:[],  // build from !!! and ~~~ sections

        alias_matrix:{}, //hold alias array for each prime_key.
        all_alias_list:[],
        all_card_tokenz:[],  //RUNTIME_STATE.setz.all_card_tokenz
        prime_key_idx:[],        // output production index.
        prime_key_cardz:{},
        prime_card_filez:[]
        // omni_card_tokenz:[],   //output production product
        // prime_key_idx:{prime_key_idx:[]},        // output production index.
     },
     ymdz : ['YMD_2020_1_1'], //format YMD split by underscore! original creation date.
     sigz : ['SIG_ENZO_2020_~:)'], //format symbol and year also by underscore     
 } 
 
/********************************************************\
  * READ FILES
  * - TARGET FILE and ALL FILES in DIRECTORY.
  ********************************************************/
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

 /***************************************************************\
  * ADVANCED TOKENIZER : PURPOSE : 
  * - ontology and taxonomy curation of aWORDZa
  * - as map from ai2axi
  * - ARCHITECTURE NOTES:
  * - uses CUMULATIVE build PRINCIPLE
  * - output to show each step of the build.
  * - also CLOSURE structure
  * - all the code executes linearly, within CONCEPT CLOSURES.
  * - makes it easier to imagine the whole engine.
  * 
  */
 function Advanced_Tokenizer(){   //universal_underscore_combinagame_syntax

     //-------------------------reusable-variables----------------------------------------------
     let aToken = {}; 
     let txtToken = {}; 
     let txt_slice = [] 
     let subtxt_line = [] 
     let txt_tokenz = [];
     let txt_tgt = '';
     let last_omni_key = ''  //use for special_operator_: to assign meta_data.   
     let last_prime_key = ''  

    /********************************************************\
     * cleanMarkdown  : PURPOSE :  
     * single line, delimiter, for
     * simple and clean txt_slices.
    \********************************************************/    
    let cleanMarkdown = () => {  //Local-Behavior_fns
    // cleanMarkdown: single space, line delimited by ;
        /*****************************************************
         * ORIGINAL Linebreak system, super-simplified.
        //linebreaks to semicolons and spaces, and collapse special characters to syntax
         */
        //linebreaks to semicolons and spaces, and collapse special characters to syntax
        // RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[\r\n\r\n]+/g,";");
        // RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[\r\n]+/g,";");
        // RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[;;;]+/g,";");
        // RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[;;]+/g,";");
        // RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[   ]+/g," ");
        // RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/[  ]+/g," ");
        /*****************************************************
         * ADVANCED Linebreak system, super-exact.
         * // use ; for line-breaks, and ;; for paragraph new lines.
         * // with this super elegant, single line of code .replace(/(\r\n)/g,";")
         * // reduces to single and double: ; ;;.
         */
        // debugger;
        RUNTIME_STATE.setz.all_markdown[0] = RUNTIME_STATE.setz.all_markdown[0].replace(/(\r\n)/g,";");
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
    /********************************************************\
     * POPULATED : all_markdown : split by ; and cleaned.
    \********************************************************/
    let split_input_data_into_tokenz = () => {
        //IMPORTANT: Advanced DOUBLE_SPLIT, by new_line ; and then spaces.
        // RUNTIME_STATE.setz.all_raw_tokenz = RUNTIME_STATE.setz.all_markdown[0].split(/(;|\s)/) //split and capture line_ends
        //IMPORTANT: ADVANCED TRIPLE_SPLIT, by paragraph, new line, and then space!
        RUNTIME_STATE.setz.all_raw_tokenz = RUNTIME_STATE.setz.all_markdown[0].split(/(;;|\s|;)/)//split and capture line_ends
        RUNTIME_STATE.setz.all_raw_tokenz = RUNTIME_STATE.setz.all_raw_tokenz.filter(function(str) {
            return /\S/.test(str); 
        }); //remove white spaces, keep end_lines as ; and paragraphs as ;;
        console.log(' - all_RAW_tokenz, length: ', RUNTIME_STATE.setz.all_raw_tokenz.length)

    }; split_input_data_into_tokenz();
    /********************************************************\
     * POPULATED : all_raw_tokenz : split by ; and cleaned.
    \********************************************************/
    //--------------------------------------------
    // debugger;
    /********************************************************\
     * delimit_KEY_tokenz  : PURPOSE :  
     * search tokenz for multiple types : ALPHA, MIX, UNI, and OMNI. 
     - TRAILZ and special_operatorsz(clarifierz). For example alias_:
    \********************************************************/  
    let delimit_KEY_tokenz = () => {  //delimit PRIME_KEYZ to key_idx.
        for(let i = 0; i< RUNTIME_STATE.setz.all_raw_tokenz.length; i++){ //KEY-TOKENZ
           txt_tgt = RUNTIME_STATE.setz.all_raw_tokenz[i];
           txt_tgt = txt_tgt.replace(/[~.,]/g,'');//CLEAN_TOKENZ
           if(txt_tgt.indexOf('SIG_')>-1||txt_tgt.indexOf('YMD_')>-1){continue;} //SKIP SIG and YMD
           if(txt_tgt.indexOf('-')>-1){continue;}
           else if (txt_tgt.indexOf('_') === 0){ //UNI_KEY_TOKEN found
               aToken = new Object(); // regex filter spaces and check for underscore wrapper.
               if(txt_tgt.split('').filter(itm=>{if(!itm || itm===' '){return false}; return true;}).reverse()[0] ==='_'){
                   aToken.type = 'prime_key' //token
                   console.log('PrimeKey:',txt_tgt)       // FOUND: PRIME_KEY
                   // last_omni_key = txt_tgt;
                   let check_unique_prime_key = ()=> { //FOUND: PRIME_KEY_DUPLICATE
                       for(var j=0; j<RUNTIME_STATE.setz.prime_key_idx.length;j++){
                           if(RUNTIME_STATE.setz.prime_key_idx[j]===txt_tgt){
                               console.log('Duplicate key def Found',txt_tgt)
                               return; //if exists, skip, else append.
                           }
                       }
                       RUNTIME_STATE.setz.prime_key_idx.push(txt_tgt);
                   }; check_unique_prime_key();

                   // RUNTIME_STATE.setz.prime_key_idx.push(txt_tgt);
               } else {                                  // FOUND: SUB_PRIME_KEY
                   aToken.type = 'sub_prime_key' //token
               }
               aToken.key = txt_tgt
               RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //POPULATE: OMNI_iNDEX
               ++RUNTIME_STATE.manifest.total_key_count;
               continue;
           } else if(txt_tgt.indexOf('_') > 0){           //FOUND: UNI_KEY_TOKEN
               if(txt_tgt.indexOf('_:')>-1){ //FOUND: SPECIAL_OPERATOR SOPZ SKIP - use later? //TODO
                   console.log('special_operator found', txt_tgt)
                   let special_operator_factory = ()=>{
                       if(txt_tgt.match(/alias|aliaz/)){ //get_LAST_KEY and look_ahead_line
                           last_omni_key = RUNTIME_STATE.setz.all_key_tokenz[RUNTIME_STATE.setz.all_key_tokenz.length-1];
                           if(!last_omni_key){return;}
                           console.log('Sets alias for:',last_omni_key)
                           if(!RUNTIME_STATE.setz.alias_matrix[last_omni_key]){ //create new alias object.
                               RUNTIME_STATE.setz.alias_matrix[last_omni_key] = {
                                   key:last_omni_key, aliaz:[]
                               }
                           }
                           txt_slice = [];
                           let lookahead_line_aliaslist = ()=>{ //
                               // let lookahead_title_line = ()=>{
                                   for(j = i+1; j < RUNTIME_STATE.setz.all_raw_tokenz.length; j++){ //SUB-TOKENZ
                                       if(RUNTIME_STATE.setz.all_raw_tokenz[j].indexOf(';') === 0 
                                         || j+1>=RUNTIME_STATE.setz.all_raw_tokenz.length){ //SECTION_END found
                                           txt_slice = RUNTIME_STATE.setz.all_raw_tokenz.slice(i+1,j)
                                           txt_slice = txt_slice.join(' ').replace(/[,.;]/g,'');
                                           txt_slice = txt_slice.trim().toLowerCase(); //CLEAN ALIAZ
                                           txt_slice = txt_slice.split(' ')
                                           break;
                                       } 
                                   }
                               //  }; lookahead_title_line();
                           }; lookahead_line_aliaslist();
                           
                           if(txt_slice && txt_slice.length){
                               RUNTIME_STATE.setz.alias_matrix[last_omni_key].aliaz.push(...txt_slice)
                               RUNTIME_STATE.setz.all_alias_list.push(...txt_slice) //use for all aliases.
                           }
                           /*****************************************\
                            * POPULATES: alias_matrix
                            * - with things like plural or long_form_text.
                            *****************************************/
                       } 
                       else if(txt_tgt.match(/or/)){ }
                       else if(txt_tgt.match(/and/)){ }
                       else if(txt_tgt.match(/is|iz/)){ }
                       else if(txt_tgt.match(/means|meanz/)){ }
                   };special_operator_factory();
                   continue;
               }

               // UNIVERSAL_KEY******************************************FOUND: UNIVERSAL_KEY
                aToken = new Object();
                aToken.type = 'uni_key'  //token
                aToken.key = txt_tgt
                RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
                ++RUNTIME_STATE.manifest.total_key_count;
                continue;       
           } else if( txt_tgt.charAt(0)==='a'               //FOUND: ALPHA, aWORDZa match
               && !!txt_tgt.charAt(1).match(/[A-Z]/) ){ 
                   aToken = new Object();
                   aToken.type = 'alpha_key' //token
                   aToken.key = txt_tgt
                   RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
                   ++RUNTIME_STATE.manifest.total_key_count;
                   continue;   
           } else if( (()=>{ // COMPLEX ALPHA_CASES : check ascendingCase and MixCase. 
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
               })() ){   // FOUND: MIXED_CASE: more than one uppercase AND more than one lowercase.
               aToken = new Object();
               aToken.type = 'mix_key' //token
               aToken.key = txt_tgt
               RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
               ++RUNTIME_STATE.manifest.total_key_count;
               continue;   
           } 
           else if( !!txt_tgt.match(/z$|Z$/) //FOUND: TRAILZ, trailing_z_match and all upper case.
              && txt_tgt.length - txt_tgt.replace(/[A-Z]/g, '').length=== txt_tgt.length ){ 
                aToken = new Object(); 
                aToken.type = 'trailz_key' //token
                aToken.key = txt_tgt
                RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
                ++RUNTIME_STATE.manifest.total_key_count;
                continue;  
           } 
       } //endLOOP
   }; delimit_KEY_tokenz();       
    
    let delimit_KEY_tokenz_old = () => {  //delimit PRIME_KEYZ to key_idx.
        let key_tgt=''
         for(let i = 0; i< RUNTIME_STATE.setz.all_raw_tokenz.length; i++){ //KEY-TOKENZ
            key_tgt = RUNTIME_STATE.setz.all_raw_tokenz[i];
            key_tgt = key_tgt.replace(/[~.,]/g,'');//CLEAN_TOKENZ
            last_omni_key = '';
            last_prime_key= ''; //for special operators.
            // debugger;
            if(key_tgt.indexOf('SIG_')>-1||key_tgt.indexOf('YMD_')>-1){
                console.log('skip nonkey',key_tgt); continue;} //SKIP: SIG and YMD lines
            // if(key_tgt.indexOf('-')>-1){continue;}
            if(key_tgt.indexOf('~~~')===0||key_tgt.indexOf('---')===0){console.log('skip nonkey',key_tgt);continue;} //SKIP: SIG and YMD lines
            if(key_tgt.indexOf(';')===0){console.log('skip nonkey',key_tgt);continue;} //SKIP: SIG and YMD lines
            if(key_tgt.indexOf('#')===0){console.log('skip nonkey',key_tgt);continue;} //SKIP: SIG and YMD lines

            // else if (key_tgt.indexOf('_') === 0){ //UNI_KEY_TOKEN found
            if (key_tgt.indexOf('_') === 0){ //************************************FOUND: UNI_KEY_TOKEN
                aToken = new Object(); // regex filter spaces and check for underscore wrapper.
                if(key_tgt.split('').filter(itm=>{if(!itm || itm===' '){return false}; return true;}).reverse()[0] ==='_'){
                    aToken.type = 'prime_key' //token
                    console.log('FOUND PRIMEKEY:',key_tgt)       // FOUND: PRIME_KEY
                    last_prime_key = key_tgt;
                    let check_unique_prime_key = ()=> { //F******************OUND: PRIME_KEY_DUPLICATE
                        for(var j=0; j<RUNTIME_STATE.setz.prime_key_idx.length;j++){
                            if(RUNTIME_STATE.setz.prime_key_idx[j]===key_tgt){
                                console.log('Duplicate key def Found',key_tgt)
                                return; //if exists, skip, else append.
                            }
                        }
                        RUNTIME_STATE.setz.prime_key_idx.push(key_tgt);
                    }; check_unique_prime_key();

                    // RUNTIME_STATE.setz.prime_key_idx.push(key_tgt);
                } else {                                  // FOUND: SUB_PRIME_KEY
                    aToken.type = 'sub_prime_key' //token
                }
                aToken.key = key_tgt
                RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //POPULATE: OMNI_iNDEX
                ++RUNTIME_STATE.manifest.total_key_count;
                continue;
                //todo breakout?
            // } else if(key_tgt.indexOf('_') > 0){           //FOUND: UNI_KEY_TOKEN
            } 
            if(key_tgt.indexOf('_') > 0){           //**********************FOUND: UNIVERSAL_KEY_TOKEN
                if(key_tgt.indexOf('_:')>-1){ //****************************FOUND: SPECIAL_OPERATORZ : SOPZ
                    console.log('FOUND: special_operator', key_tgt)
                    let special_operator_factory = ()=>{
                        if(key_tgt.match(/alias_:|aliaz_:/)){ //get_LAST_KEY and look_ahead_line
                            // last_omni_key = RUNTIME_STATE.setz.all_key_tokenz[RUNTIME_STATE.setz.all_key_tokenz.length-1];
                            // if(!last_omni_key){return;}
                            // console.log('Sets alias for:',last_omni_key)
                            // debugger;
                            // if(!RUNTIME_STATE.setz.alias_matrix[last_omni_key]){ //create new alias object.
                            //     RUNTIME_STATE.setz.alias_matrix[last_omni_key] = {
                            //         key:last_omni_key, aliaz:[]
                            //     }
                            // }
                            if(last_prime_key){
                                // debugger;
                                last_prime_key = RUNTIME_STATE.setz.all_key_tokenz[RUNTIME_STATE.setz.all_key_tokenz.length-1];
                                // if(!last__key){return;}
                                console.log('FOUND: Set alias for:',last_prime_key)
                                debugger;
                                if(!RUNTIME_STATE.setz.alias_matrix[last_prime_key]){ //create new alias object.
                                    RUNTIME_STATE.setz.alias_matrix[last_prime_key] = {
                                        key:last_prime_key, aliaz:[]
                                    }
                                }
                            } else if (last_omni_key){
                                debugger;
                                last_omni_key = RUNTIME_STATE.setz.all_key_tokenz[RUNTIME_STATE.setz.all_key_tokenz.length-1];
                                // if(!last_omni_key){return;}
                                console.log('Sets alias for:',last_omni_key)
                                if(!RUNTIME_STATE.setz.alias_matrix[last_omni_key]){ //create new alias object.
                                    RUNTIME_STATE.setz.alias_matrix[last_omni_key] = {
                                        key:last_omni_key, aliaz:[]
                                    }
                                }
                            }
                                
                            txt_slice = [];
                            let lookahead_line_aliaslist = ()=>{ //
                                // let lookahead_title_line = ()=>{
                                    for(j = i+1; j < RUNTIME_STATE.setz.all_raw_tokenz.length; j++){ //SUB-TOKENZ
                                        if(RUNTIME_STATE.setz.all_raw_tokenz[j].indexOf(';') === 0 
                                          || j+1>=RUNTIME_STATE.setz.all_raw_tokenz.length){ //SECTION_END found
                                            txt_slice = RUNTIME_STATE.setz.all_raw_tokenz.slice(i+1,j)
                                            txt_slice = txt_slice.join(' ').replace(/[,.;]/g,'');
                                            txt_slice = txt_slice.trim().toLowerCase(); //CLEAN ALIAZ
                                            txt_slice = txt_slice.split(' ')
                                            break;
                                        } 
                                    }
                                //  }; lookahead_title_line();
                            }; lookahead_line_aliaslist();
                            //POPULATE ALIASLIST
                            if(txt_slice && txt_slice.length){
                                // debugger;
                                if(last_prime_key){
                                    RUNTIME_STATE.setz.alias_matrix[last_prime_key].aliaz.push(...txt_slice)
                                } else if (last_omni_key){
                                    RUNTIME_STATE.setz.alias_matrix[last_omni_key].aliaz.push(...txt_slice)
                                }
                                // RUNTIME_STATE.setz.alias_matrix[last_omni_key].aliaz.push(...txt_slice)
                                RUNTIME_STATE.setz.all_alias_list.push(...txt_slice) //use for all aliases.
                            }
                            /*****************************************\
                             * POPULATES: alias_matrix
                             * - with things like plural or long_form_text.
                             *****************************************/
                        } 
                        else if(key_tgt.match(/or/)){ }
                        else if(key_tgt.match(/and/)){ }
                        else if(key_tgt.match(/is|iz/)){ }
                        else if(key_tgt.match(/means|meanz/)){ }
                    };special_operator_factory();
                    // continue;
                } //END  special_operatorz 
                // else {
                    // UNI_KEY******************************************FOUND: UNI_KEY
                    aToken = new Object();
                    aToken.type = 'uni_key'  //token
                    aToken.key = key_tgt
                    RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
                    ++RUNTIME_STATE.manifest.total_key_count;
                    //  continue;       
                // }
            // } else if( key_tgt.charAt(0)==='a'               //FOUND: ALPHA, aWORDZa match
            } 
            if( key_tgt.charAt(0)==='a'               //FOUND: ALPHA, aWORDZa match
                && !!key_tgt.charAt(1).match(/[A-Z]/) ){ 
                    aToken = new Object();
                    aToken.type = 'alpha_key' //token
                    aToken.key = key_tgt
                    RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
                    ++RUNTIME_STATE.manifest.total_key_count;
                    // continue;   
            // } else if( (()=>{ // COMPLEX ALPHA_CASES : check ascendingCase and MixCase. 
            } 
            if( (()=>{ // COMPLEX ALPHA_CASES : check ascendingCase and MixCase. 
                    if(key_tgt.charAt(0).match(/[a-z]/)){
                        if(key_tgt.length - key_tgt.replace(/[A-Z]/g, '').length >= 1){
                            return true;
                        }// ascendingCase_match
                    }
                    if(key_tgt.length - key_tgt.replace(/[a-z]/g, '').length > 1){
                        if(key_tgt.length - key_tgt.replace(/[A-Z]/g, '').length > 1){
                            return true;
                        } // MixedCase_match
                    } 
                    return false; 
                })() ){   // FOUND: MIXED_CASE: more than one uppercase AND more than one lowercase.
                aToken = new Object();
                aToken.type = 'mix_key' //token
                aToken.key = key_tgt
                RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
                ++RUNTIME_STATE.manifest.total_key_count;
                // continue;   
            } 
            // else if( !!key_tgt.match(/z$|Z$/) //FOUND: TRAILZ, trailing_z_match and all upper case.
            if( !!key_tgt.match(/z$|Z$/) //FOUND: TRAILZ, trailing_z_match and all upper case.
               && key_tgt.length - key_tgt.replace(/[A-Z]/g, '').length=== key_tgt.length ){ 
                 aToken = new Object(); 
                 aToken.type = 'trailz_key' //token
                 aToken.key = key_tgt
                 RUNTIME_STATE.setz.all_key_tokenz.push(aToken.key); //for iNDEX
                 ++RUNTIME_STATE.manifest.total_key_count;
                //  continue;  
            } 
        } //endLOOP
    }; delimit_KEY_tokenz_old();   //todo remove
    /********************************************************\
     * POPULATED: prime_key_idx && all_key_tokenz 
     - PRIME_KEYZ : used to organize CARDZ. (defined by _underscoreWrapper_ to keep numz smaller.)
    - OMNI_KEYZ: universal_underscore, ALPHA_KEYZ, and PRIME_KEYZ.
    * including many special_operators (clarifierz). For example alias_:
    \********************************************************/   
        // debugger;
        //--------------------------------------------
    /********************************************************\
     * key_token_alias_check :  : PURPOSE :  
     * remove duplicates 
     - and combine aliases. 
    // for each key, compare to all other keys, remove duplicates, selecting PRIME KEY
    \********************************************************/        
    let set_unique_omni_key = ()=>{ //remove duplicates with alias_check on all_key_tokenz.
        let keyCheck = '', keyClean = '',duplicate = false;//, alias = false;
        console.log('all aliases',RUNTIME_STATE.setz.all_alias_list)
        for(var i=0; i<RUNTIME_STATE.setz.all_key_tokenz.length;i++){
            keyCheck = RUNTIME_STATE.setz.all_key_tokenz[i];
            if(keyCheck.indexOf('SIG')>-1){continue}
            if(keyCheck.indexOf('YMD')>-1){continue} //skip duplicates and aliases.
            keyClean = keyCheck.replace(/[,.;? ]/g,'').toLowerCase()
            if(RUNTIME_STATE.setz.all_alias_list.indexOf(keyClean)>-1){
                    // console.log('found alias',keyCheck);
                    continue} else { //console.log('non alias',keyClean);
                    }         
            for (var j=0; j<RUNTIME_STATE.setz.omni_key_idx.length;j++){
                if(keyCheck===RUNTIME_STATE.setz.omni_key_idx[j]){ //duplicate
                    console.log('Omni reference:',keyCheck)   
                    duplicate = true; 
                    break;
                }
            }
            if(!duplicate){
                RUNTIME_STATE.setz.omni_key_idx.push(RUNTIME_STATE.setz.all_key_tokenz[i])
            }    
        }

    }; set_unique_omni_key();   
    /********************************************************\
     * POPULATED: omni_key_idx
     - removes duplicates from OMNI_INDEX.
    * uses special_operators (clarifierz). For example alias_:
    \********************************************************/   
    //-------------------------------------- 
    /********************************************************\
     * delimit_all_topicz : PURPOSE :  
     - populating NUMZ, sigz and ymdz.
    - CONTAINS:
    - 1. LOOK AHEAD TITLE. 
    - 2. LOOK AHEAD SUBTXT.
    - 3. LOOK AHEAD TXTTOKENZ.
    - searches for token types: QUOTEZ, SERIEZ, STARZ. 
    - Later: puzzlez??? and focuz topics from starz //TODO
    \********************************************************/        
    // debugger; 
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
                    // aToken.ymdz = RUNTIME_STATE.ymdz; //no ymdz without ymdz    

                    if(RUNTIME_STATE.ymdz && RUNTIME_STATE.ymdz.length){
                        // debugger;
                        aToken.ymdz = RUNTIME_STATE.ymdz;              
                    }
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
                         || j+1>=RUNTIME_STATE.setz.all_raw_tokenz.length){ //***********FOUND: TITLE_SLICE
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
                       if(RUNTIME_STATE.setz.all_raw_tokenz[k].indexOf('#') === 0
                           || k+1>=RUNTIME_STATE.setz.all_raw_tokenz.length){
                               txt_slice = RUNTIME_STATE.setz.all_raw_tokenz.slice(j+1,k+1)
                            // debugger; //top of all txt slicing!
                        //    ||RUNTIME_STATE.setz.all_raw_tokenz[k].indexOf(';;') >-1){    // FOUND: TXT_SLICE
                            if(txt_slice.indexOf('>') > -1  // FOUND: for FACTORY: QUOTE, SERIEZ, STARZ
                              || txt_slice.join('').match(/[0-9]./)          //SERIEZ
                              || txt_slice.join('').match(/!!!|~~~|!i!/) ){
                                /******************************************\
                                 * lookahead_txt_tokenz : PURPOSE :
                                 * SERIEZ, STARZ and QUOTEZ FACTORY.
                                 * //get quotes '>' or number items '1. ', or key_topicz '!!!!' 
                                \******************************************/
                                let lookahead_txt_tokenz = () => {  //SERIEZ, STARZ and QUOTEZ FACTORY.
                                    txt_tokenz = [];
                                    // debugger;
                                    subtxt_line = txt_slice.join(' ').split(';;');
                                    // subtxt_line = txt_slice.join(' ').split(';');
                                    // subtxt_line = txt_slice.join(' ').split(';;').join(' ').split(';');
                                    for(var i = 0; i< subtxt_line.length; i++){ 
                                        subtxt_line[i] = subtxt_line[i].trim(); //CLEAN sentences, with magic_tokenz!
                                        // if(subtxt_line[i].match(/~0~/) ){ //FOUND: THE_ENDZ!!! 
                                        //     //TODO: test this, or move up?
                                        //     break;
                                        // }  
                                        //---STARZ--------------------------------------------
                                        if(subtxt_line[i].match(/!!!|!i!/) && RUNTIME_STATE.idx.STAR_TOPICZ_FLAG===0 ){ //STAR_TOPICZ
                                            txtToken = new Object();                   //FOUND: STARZ token **** or !!!
                                            txtToken.type = 'star_txt' //txt token
                                            txtToken.txt = subtxt_line[i]
                                            txtToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}`+
                                                            `.${RUNTIME_STATE.idx.SUBTOPIC_IDX}`+
                                                            `.star:${++RUNTIME_STATE.idx.STAR_TOPICZ_IDX}`;                
                                            if(RUNTIME_STATE.ymdz && RUNTIME_STATE.ymdz.length){
                                                txtToken.ymdz = new Array(...RUNTIME_STATE.ymdz);              
                                            }
                                            // txtToken.ymdz = new Array(...RUNTIME_STATE.ymdz);              
                                            txtToken.sigz = new Array(...RUNTIME_STATE.sigz); 
                                            if(txtToken.txt.indexOf('SIG_')>-1){txtToken.sigz.push( txtToken.txt.match(/SIG_[^\s]+/)[0] );  }
                                            if(txtToken.txt.indexOf('YMD_')>-1){
                                                if(!txtToken.ymdz){txtToken.ymdz=[]}
                                                txtToken.ymdz.push( txtToken.txt.match(/YMD_[^\s]+/)[0] );  } 
                                            RUNTIME_STATE.setz.all_star_topicz.push(txtToken)  
                                            ++RUNTIME_STATE.manifest.total_key_topic_count;              
                                        } 
                                        //TODO: break these apart?
                                        //--------SUBTOPICZ.------------------------------------------------
                                        else if ( subtxt_line[i].match(/~~~/) ) {    //FOUND: SUBTOPICZ
                                            if(RUNTIME_STATE.idx.STAR_TOPICZ_FLAG > 0){
                                                RUNTIME_STATE.idx.STAR_TOPICZ_FLAG = 0;
                                            } else if(RUNTIME_STATE.idx.STAR_TOPICZ_FLAG === 0){
                                                txtToken = new Object();
                                                txtToken.type = 'starz_txt' //txt token
                                                txtToken.txt = subtxt_line[i]
                                                txtToken.txtz = []
                                                txtToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}`+
                                                                `.${RUNTIME_STATE.idx.SUBTOPIC_IDX}`+
                                                                `.starz:${++RUNTIME_STATE.idx.STAR_TOPICZ_IDX}`;                
                                                // txtToken.ymdz = new Array(...RUNTIME_STATE.ymdz);   
                                                if(RUNTIME_STATE.ymdz && RUNTIME_STATE.ymdz.length){
                                                    txtToken.ymdz = new Array(...RUNTIME_STATE.ymdz);              
                                                }           
                                                txtToken.sigz = new Array(...RUNTIME_STATE.sigz); 
                                                if(txtToken.txt.indexOf('SIG_')>-1){txtToken.sigz.push( txtToken.txt.match(/SIG_[^\s]+/)[0] );  }
                                                if(txtToken.txt.indexOf('YMD_')>-1){
                                                    if(!txtToken.ymdz){txtToken.ymdz=[]}
                                                    txtToken.ymdz.push( txtToken.txt.match(/YMD_[^\s]+/)[0] );  } 
                                                let lookahead_endtilde = () => { //lookahead pattern to dynamic load TXTZ
                                                    for(var j = i+1; j< subtxt_line.length; j++){
                                                        if(subtxt_line[j].indexOf('~~~')>-1 
                                                        || subtxt_line[j].indexOf('#')>-1
                                                        || j===subtxt_line.length-1){
                                                            // debugger;
                                                            txtToken.txt = subtxt_line.slice(i+1,j).join('');
                                                            txtToken.txtz.push({type:'magic_tilde_open',txt:'~~~'});
                                                            txtToken.txtz.push(subtxt_line.slice(i+1,j));
                                                            txtToken.txtz.push({type:'magic_tilde_open',txt:'~~~'});
                                                            break;
                                                        }
                                                    }
                                                }; lookahead_endtilde(); 
                                                // debugger;
                                                RUNTIME_STATE.idx.STAR_TOPICZ_FLAG = 1; //open state.
                                                RUNTIME_STATE.setz.all_star_topicz.push(txtToken)
                                                ++RUNTIME_STATE.manifest.total_key_topic_count;
                                            }
                                        }
                                        /******************************************\
                                         * POPULATES : STARZ TXT.
                                        \******************************************/  
                                        //--QUOTEZ---------------------------------------
                                        if(subtxt_line[i].indexOf('>') > -1  ){ //FOUND: QUOTEZ txt
                                            txtToken = new Object();
                                            txtToken.type = 'quote_txt' //token
                                            txtToken.txt = subtxt_line[i]
                                            txtToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}`+
                                                            `.${RUNTIME_STATE.idx.SUBTOPIC_IDX}`+
                                                            `.quote:${++RUNTIME_STATE.idx.QUOTE_IDX}`;                
                                            // txtToken.ymdz = new Array(...RUNTIME_STATE.ymdz); 
                                            if(RUNTIME_STATE.ymdz && RUNTIME_STATE.ymdz.length){
                                                txtToken.ymdz = new Array(...RUNTIME_STATE.ymdz);              
                                            }                                                          
                                            txtToken.sigz = new Array(...RUNTIME_STATE.sigz); 
                                            if(txtToken.txt.indexOf('SIG_')>-1){
                                                txtToken.sigz.push( txtToken.txt.match(/SIG_[^\s]+/)[0] );
                                            }
                                            if(txtToken.txt.indexOf('YMD_')>-1){
                                                if(!txtToken.ymdz){txtToken.ymdz=[]}
                                                txtToken.ymdz.push( txtToken.txt.match(/YMD_[^\s]+/)[0] );
                                            } 
                                            txt_tokenz.push(txtToken)
                                            RUNTIME_STATE.setz.all_quote_tokenz.push(txtToken)
                                            ++RUNTIME_STATE.manifest.total_quote_count;
                                            continue;                
                                        } 
                                        /******************************************\
                                         * POPULATES : QUOTE TXT.
                                        \******************************************/                                          
                                        // TODO break these out?
                                        //--SERIEZ------------------------------------------
                                        else if (subtxt_line[i].match(/\d+\./g)) { //***************FOUND: SERIEZ txt
                                            txtToken = new Object();
                                            txtToken.type = 'seriez_txt' //token
                                            txtToken.txt = subtxt_line[i]
                                            txtToken.seriez = subtxt_line[i].match(/\d+\./g).toString(); //FIRST_MATCH
                                            if(RUNTIME_STATE.ymdz && RUNTIME_STATE.ymdz.length){
                                                txtToken.ymdz = new Array(...RUNTIME_STATE.ymdz);              
                                            } 
                                            RUNTIME_STATE.idx.SERIEZ_IDX = txtToken.seriez.replace('.','');
                                            txtToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}`+
                                                            `.${RUNTIME_STATE.idx.SUBTOPIC_IDX}`+
                                                            `.set:${RUNTIME_STATE.idx.SERIEZ_IDX}`;
                                            if(txtToken.txt.indexOf('YMD_')>-1){
                                                if(!txtToken.ymdz){txtToken.ymdz=[]}
                                                txtToken.ymdz.push( txtToken.txt.match(/YMD_[^\s]+/)[0] );
                                            } 
                                            txt_tokenz.push(txtToken)
                                            ++RUNTIME_STATE.manifest.total_subtopic_count;
                                            continue; 
                                            /******************************************\
                                             * POPULATES : SERIEZ TXT.
                                            \******************************************/  
                                        }  
                                        //-------MAGIC_TOKENZ---------------------------------------
                                        else if (subtxt_line[i].indexOf('~~~') >-1
                                          || subtxt_line[i].indexOf('---') >-1
                                          || subtxt_line[i].indexOf('_:') >-1) {                 // FOUND: MAGIC_TXTZ
                                            txtToken = new Object();
                                            txtToken.type = 'magic_token' //token
                                            txtToken.txt = subtxt_line[i]
                                            txtToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}`+
                                                            `.${RUNTIME_STATE.idx.SUBTOPIC_IDX}`+
                                                            `.mtok:${++RUNTIME_STATE.idx.TXT_IDX}`;                
                                            txt_tokenz.push(txtToken)
                                            ++RUNTIME_STATE.manifest.total_subtopic_count;
                                            continue;                                            
                                        }//-------SUBTXT---------------------------------------
                                        else if (subtxt_line[i]) {                     // FOUND: SUBTXTZ
                                            // if(subtxt_line[i].indexOf('~~~') >-1 ){ continue }  
                                            // if(subtxt_line[i].indexOf('---') >-1 ){ continue }   
                                            if( subtxt_line[i].indexOf('#') >-1 ){ break }       //FOUND END_TOPIC
                                            txtToken = new Object();
                                            txtToken.type = 'sub_txt' //token
                                            txtToken.txt = subtxt_line[i]
                                            txtToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}`+
                                                            `.${RUNTIME_STATE.idx.SUBTOPIC_IDX}`+
                                                            `.sub:${++RUNTIME_STATE.idx.TXT_IDX}`;                
                                            txt_tokenz.push(txtToken)
                                            ++RUNTIME_STATE.manifest.total_subtopic_count;
                                            continue;
                                        }
                            
                                    }
                                    return txt_tokenz;
                                }; //END lookahead_txt_tokenz
                                txt_slice = lookahead_txt_tokenz();
                                // debugger;
                                /******************************************\
                                 * POPULATES : txt_slice
                                 * like a SERIEZ, STARZ and QUOTEZ FACTORY.
                                \******************************************/
                            } else //END FACTORY for QUOTE, SERIES, STARZ, solotxt does not include
                            { //SOLO_TXT--------------------------------------FOUND: SOLO_TXT
                                subtxt_line = [];
                                if(txt_slice.indexOf(';;')>=-1){ //IMPORTANT: BREAKUP_SUB_TXTZ
                                // if(false){
                                    // debugger 
                                    txt_slice = txt_slice.join(' ').split(/;;/)
                                    for(let idx = 0; idx < txt_slice.length; idx++){
                                        // txt_slice = {
                                        //     type:'solo_sub_txt',
                                        //     txt:txt_slice[idx],
                                        //     numz:`${RUNTIME_STATE.idx.TOPIC_IDX}:${RUNTIME_STATE.idx.SUBTOPIC_IDX}:${++RUNTIME_STATE.idx.TXT_IDX}`
                                        // }
                                        txt_slice[idx] = txt_slice[idx].replace(/[#]/g,'');
                                        // txt_slice[idx] = txt_slice[idx].replace('---','')//CLEAN_TOKENZ
                                        txt_slice[idx] = txt_slice[idx].trim();
                                        if(!txt_slice[idx]){continue}

                                        subtxt_line.push( {
                                            type:'solo_sub_txt',
                                            txt:txt_slice[idx],
                                            numz:`${RUNTIME_STATE.idx.TOPIC_IDX}:${RUNTIME_STATE.idx.SUBTOPIC_IDX}:${++RUNTIME_STATE.idx.TXT_IDX}`
                                        })
                                    }
                                }else{
                                    // txt_slice = txt_slice.join(' ').replace(/[;#]/g,'');
                                    txt_slice = txt_slice.join(' ').replace(/[#]/g,'');
                                    // txt_slice = txt_slice.replace('---','')//CLEAN_TOKENZ
                                    txt_slice = txt_slice.trim();
                                }
                                // // txt_slice = txt_slice.join(' ').replace(/[;#]/g,'');
                                // txt_slice = txt_slice.join(' ').replace(/[#]/g,'');
                                // txt_slice = txt_slice.replace('---','')//CLEAN_TOKENZ
                                // txt_slice = txt_slice.trim();
                                // debugger;
                                // if(txt_slice) txt_slice = { //todo is this necessary?
                                //     type:'odd_txt',
                                //     txt:txt_slice,
                                //     numz:`${RUNTIME_STATE.idx.TOPIC_IDX}:${RUNTIME_STATE.idx.SUBTOPIC_IDX}:${++RUNTIME_STATE.idx.TXT_IDX}`
                                // }
                            } //END IF TOKEN.
                            // debugger;
                            // let load_Token_TXTZ = ()=>{
                                if(subtxt_line.length){aToken.txtz.push(...subtxt_line)}
                                // if(false){aToken.txtz.push(...subtxt_line)}
                                else if(txt_slice.length){ aToken.txtz.push(...txt_slice) }
                                // if(txt_slice.length){ aToken.txtz.push(...txt_slice) }
                                else if(txt_slice.txt){ aToken.txtz.push(txt_slice) }
                            // }; load_Token_TXTZ();
                            // // let load_Token_TXTZ = ()=>{
                            //     if(txt_slice.length){ aToken.txtz.push(...txt_slice) }
                            //     else if(txt_slice.txt){ aToken.txtz.push(txt_slice) }
                                break; //TODO remove?
                            // // }; load_Token_TXTZ();
                            /******************************************\
                            * POPULATES : aToken.txtz
                            * both types: txtz or txt. Then brea
                            \******************************************/
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
    /******************************************\
    * POPULATES : all_topic_tokenz, with aToken.txtz
    * use for CARDZ
    \******************************************/
    //------------------------------------------------------------------------
    debugger;
    let populate_auto_aliases = ()=> {

        for( aliaz in RUNTIME_STATE.setz.alias_matrix){
            debugger;
            if(RUNTIME_STATE.setz.alias_matrix[aliaz].aliaz.indexOf(aliaz.replace('_',''))){
                //FOUND : correct auto_alias
            } else { //ADD : auto_alias
                RUNTIME_STATE.setz.alias_matrix[aliaz].aliaz.push(aliaz.replace('_',''));
            }
        }

    }; populate_auto_aliases();
    /******************************************\
    * POPULATES : ALIAS_MATRIX with auto aliases
    * Example: 'this' and '_this_' are aliases.
    \******************************************/
    //------------------------------------------------------------------------
    /******************************************\
    * build_token_cardz : PURPOSE : 
     - use all_topic_tokenz, with aToken.txtz 
     - to match aliases, 
     - and push / append (non dupe) TXTZ to CARDZ
     NOTE: first loop KEYS, then by ALIAS_KEY, loop all_topic_tokenz
    \******************************************/
    // debugger;
     let build_token_cardz = () => { 
        // use all the keys, to search through all the topics and subtopics, and keytopicz
        //search for key instances for keymap of txtz
        let prime_key_tgt = '', prime_key_clean = '' //reusable variables
        let txt_tgt = {}, prime_key_aliaz=[];

        let subtopic_tgt = {}, topic_tgt = {}
        // for(let i = 0; i< RUNTIME_STATE.setz.all_key_tokenz.length; i++){ //KEY-TOKENZ as TXT_TGTZ
        debugger;
        // for(let i = 0; i< RUNTIME_STATE.setz.omni_key_idx.length; i++){ //KEY-TOKENZ as TXT_TGTZ
            // key_tgt = RUNTIME_STATE.setz.omni_key_idx[i]; //FOR ALL_OMNI_KEYZ (non_dupe): todo omni_key_tgt
        for(let i = 0; i< RUNTIME_STATE.setz.prime_key_idx.length; i++){ //KEY-TOKENZ as TXT_TGTZ
            prime_key_tgt = RUNTIME_STATE.setz.prime_key_idx[i]; //FOR ALL_PRIME_KEYZ (non_dupe): 
            prime_key_aliaz = (RUNTIME_STATE.setz.alias_matrix[prime_key_tgt] && RUNTIME_STATE.setz.alias_matrix[prime_key_tgt].aliaz)
                ?RUNTIME_STATE.setz.alias_matrix[prime_key_tgt].aliaz:[];
            prime_key_clean = prime_key_tgt.toLowerCase().replace(/[_,.?]/g,''); //FOR ALL_PRIME_KEYZ (non_dupe): 
            search_topic_txt = '';
            console.log('3) Find all TXT TOPICS for: ', prime_key_clean)      //SEARCH FOR TGT
            for(let j = 0; j< RUNTIME_STATE.setz.all_topic_tokenz.length; j++){ //Search subtxtz for tgt
                // console.log('Searching, ',RUNTIME_STATE.setz.all_topic_tokenz[j].title)    
                /*****************************************\
                 * check_token_for_tgt : PURPOSE : 
                 * compares complex ALIAS_KEYZ, 
                \*****************************************/
                let check_all_tokens_for_tgt = ()=>{ //tgt reference check
                    //FIRST CHECK THE TITLE***************************************
                    let token_state = 
                      {title:false,txtz:[],topicz:'',keyz:[]}
                    let token_TITLE_prime_key_alias_check = () => { //***************SECTION 1 : Exact PK in TITLE
                        if(!RUNTIME_STATE.setz.all_topic_tokenz[j].title){return}
                        search_topic_txt = RUNTIME_STATE.setz.all_topic_tokenz[j].title;
                        search_topic_txt = search_topic_txt.toLowerCase();//.replace(/[/_,.?~-]+/g,"");
                        console.log('search1',search_topic_txt, prime_key_tgt);
                        // if(RUNTIME_STATE.setz.all_topic_tokenz[j].title 
                        if(search_topic_txt.indexOf(prime_key_clean)>-1){ //***- FOUND: EXACT_TITLE
                                // console.log('1) - found ',prime_key_tgt,'in title '
                                //,RUNTIME_STATE.setz.all_topic_tokenz[j].title )
                                token_state.title=true; //todo if txtz
                                if(RUNTIME_STATE.setz.all_topic_tokenz[j].txtz){
                                    token_state.txtz.push(...RUNTIME_STATE.setz.all_topic_tokenz[j].txtz)
                                }
                                token_state.keyz.push(prime_key_tgt)
                                // token_state.primeCOUNT++;
                                //PRODUCE TXTz to TOKEN.
                                console.log('FOUND TITLE',prime_key_tgt)
                                if(RUNTIME_STATE.setz.all_topic_tokenz[j].key==='#'){
                                    token_state.topicz = 'maintopic';
                                    console.log('MAIN TITLE',prime_key_tgt)
                                    //todo if true
                                } else if(RUNTIME_STATE.setz.all_topic_tokenz[j].key==='##'){
                                    token_state.topicz = 'subtopic'
                                    console.log('SUB TITLE',prime_key_tgt)
                                }
                        } else {  
                            /****************SECTION 2  - ALIAS_PK check on TITLE.
                            //alias check on TITLE : does the TITLE contain any alias?
                            */
                            debugger;
                            // RUNTIME_STATE.setz.all_alias_list.forEach( alias_tgt => {
                                prime_key_aliaz.forEach( alias_tgt => {
                                // search_topic_txt = RUNTIME_STATE.setz.all_topic_tokenz[j].title;
                                // alias_tgt = alias_tgt.toLowerCase();
                                console.log('search2',search_topic_txt, alias_tgt);
                                if(search_topic_txt.indexOf(alias_tgt)>-1){ 
                                    // debugger;
                                //  if(RUNTIME_STATE.setz.all_topic_tokenz[j].title //***- SEARCH: ALIAS_TITLE
                                    // && RUNTIME_STATE.setz.all_topic_tokenz[j].title.indexOf(alias_tgt)>-1){ 
                                        console.log("TITLE alias found", alias_tgt, search_topic_txt)
                                        //if key and alias exist in same alias matrix,                    //***- FOUND: ALIAS_TITLE_PK
                                        // if(RUNTIME_STATE.setz.alias_matrix[prime_key_tgt]){ //POPULATE ALIAS_in_TITLE
                                            // if(RUNTIME_STATE.setz.alias_matrix[prime_key_tgt].aliaz.indexOf(alias_tgt)>-1){
                                                // console.log("TITLE alias confirmed", prime_key_tgt,alias_tgt) 
                                                token_state.title=true;
                                                // token_state.topicz = 'subtxt'
                                                token_state.txtz.push(...RUNTIME_STATE.setz.all_topic_tokenz[j].txtz)  
                                                token_state.keyz.push(alias_tgt)                                              
                                                console.log('FOUND TITLE',alias_tgt)
                                                if(RUNTIME_STATE.setz.all_topic_tokenz[j].key==='#'){
                                                    token_state.topicz = 'maintopic';
                                                    console.log('MAIN TITLE',alias_tgt)
                                                    //todo if true
                                                } else if(RUNTIME_STATE.setz.all_topic_tokenz[j].key==='##'){
                                                    token_state.topicz = 'subtopic'
                                                    console.log('SUB TITLE',alias_tgt)
                                                }


                                            // }
                                        // } 
                                        // else if(RUNTIME_STATE.setz.alias_matrix[alias_tgt]){ //POPULATE ? todo
                                        //     if(RUNTIME_STATE.setz.alias_matrix[alias_tgt].alias.indexOf(prime_key_tgt)>-1){
                                        //         console.log("TITLE alias inverted", prime_key_tgt,alias_tgt) 
                                        //         token_state.title=true;
                                        //         token_state.txtz.push(...RUNTIME_STATE.setz.all_topic_tokenz[j].txtz)  
                                        //         token_state.keyz.push(prime_key_tgt)                                              
                                        //     }
                                        // }
                                } 
                            });
                        }
                        //if main topic is prime_key - then entire doc is txt.
                    }; token_TITLE_prime_key_alias_check();
                    let token_TXT_prime_key_alias_check = ()=>{
                        if(token_state.title){return} //everything is already loaded. SKIP.
                        /* *****************************SECTION 3:  - PK Exact in TXT.
                        */
                        //ALSO CHECK THE TXTZ for reference.*************************- FOUND: EXACT_TXT
                        if(RUNTIME_STATE.setz.all_topic_tokenz[j].txtz){ 
                            for(let k = 0; k < RUNTIME_STATE.setz.all_topic_tokenz[j].txtz.length; k++){
                                search_topic_txt = RUNTIME_STATE.setz.all_topic_tokenz[j].txtz[k].txt;
                                if(!search_topic_txt){
                                    // debugger; //todo
                                    search_topic_txt = RUNTIME_STATE.setz.all_topic_tokenz[j].txtz[k]
                                }
                                if(search_topic_txt.join){
                                    // debugger; //todo combining back magic_txts into sub_txts, probably new (deeper) loop.
                                    search_topic_txt = search_topic_txt.join(' ')
                                }
                                // debugger;
                                console.log('search3',search_topic_txt);
                                search_topic_txt = search_topic_txt.toLowerCase();
                                //TODO: if maintitle alias check also //if main_title_prime_key put all references in title txt.
                                // if(RUNTIME_STATE.setz.all_topic_tokenz[j].txtz[k].txt.indexOf(prime_key_tgt)>-1){ 
                                if(search_topic_txt.indexOf(prime_key_clean)>-1){                         //FOUND EXACT_PK in TXT
                                    // debugger; 
                                    console.log(' - found ',prime_key_tgt,'in subtxtz' )
                                    txt_tgt = RUNTIME_STATE.setz.all_topic_tokenz[j].txtz[k];
                                    token_state.txtz.push(txt_tgt);
                                    token_state.keyz.push(prime_key_tgt)
                                    token_state.topicz = 'subtxt'
                                    //***************************** POPULATE :  */ TXTz to TOKEN.
                                    
                                } else{  //**************************SECTON 4: ALIAS PK in TXT
                                        debugger;
                                        prime_key_aliaz.forEach( alias_tgt => {
                                            if(search_topic_txt.indexOf(alias_tgt)>-1){                         //FOUND EXACT_PK in TXT
                                                // debugger; 
                                                console.log(' - found alias',alias_tgt,'in subtxtz' )
                                                txt_tgt = RUNTIME_STATE.setz.all_topic_tokenz[j].txtz[k];
                                                token_state.txtz.push(txt_tgt);
                                                token_state.keyz.push(alias_tgt)
                                                token_state.topicz = 'subtxt'
                                                //***************************** POPULATE :  */ TXTz to TOKEN.
                                                
                                            }     
                                        });
                                        // RUNTIME_STATE.setz.all_alias_list.forEach( alias_tgt => {
                                            // if(RUNTIME_STATE.setz.all_topic_tokenz[j].txtz){ //***- SEARCH: ALIAS_TITLE in TXT
                                                // && RUNTIME_STATE.setz.all_topic_tokenz[j].txtz.indexOf(alias_tgt)>-1){ 
                                                    // for(var z=0; z< RUNTIME_STATE.setz.all_topic_tokenz[j].txtz.length; z++){
                                                    //     search_topic_txt = RUNTIME_STATE.setz.all_topic_tokenz[j].txtz[z].txt;
                                                    //     search_topic_txt = search_topic_txt.toLowerCase();
                                                    //     console.log('search4',search_topic_txt);
                                                    //     // if(RUNTIME_STATE.setz.all_topic_tokenz[j].txtz[z].indexOf(alias_tgt)>-1){
                                                    //     if(search_topic_txt.indexOf(alias_tgt)>-1){                         //FOUND: TXT_ALIAS_PK
                                                    //         console.log("TXT alias found", alias_tgt)
                                                    //         // token_state.primeCOUNT++;
                                                    //         token_state.keyz.push(prime_key_tgt, search_topic_txt)
                                                    //         token_state.topicz = 'subtxt'
                                                    //     }
                                                    // }
                                                    //if key and alias exist in same alias matrix //***- FOUND: ALIAS_TITLE
                                                    // if(RUNTIME_STATE.setz.alias_matrix[prime_key_tgt]){
                                                    //     if(RUNTIME_STATE.setz.alias_matrix[prime_key_tgt].alias.indexOf(alias_tgt)>-1){
                                                    //         console.log("alias confirmed", prime_key_tgt,alias_tgt) 
                                                    //         token_state.title=true;
                                                    //         token_state.txtz.push(...RUNTIME_STATE.setz.all_topic_tokenz[j].txtz)                                                
                                                    //     }
                                                    // } else if(RUNTIME_STATE.setz.alias_matrix[alias_tgt]){
                                                    //     if(RUNTIME_STATE.setz.alias_matrix[alias_tgt].alias.indexOf(prime_key_tgt)>-1){
                                                    //         console.log("alias inverted", prime_key_tgt,alias_tgt) 
                                                    //         token_state.title=true;
                                                    //         token_state.txtz.push(...RUNTIME_STATE.setz.all_topic_tokenz[j].txtz)                                                
                                                    //     }
                                                    // }
                                            // } 
                                        // });

                                        //PRODUCE TXTz to TOKEN.
                                    // }; token_txt_prime_key_alias_check();
                                }
                            }
                        }
                    }; token_TXT_prime_key_alias_check();
                    /*****************************************\
                     * POPULATE : token_state for token_card append.
                    \*****************************************/
                    let populate_tokens_to_CARDZ = () => {
                        if(token_state.title || token_state.txtz.length){
                            aToken = new Object();
                            aToken.type = 'token_cardz' //token
                            aToken.key = prime_key_tgt
                            aToken.title = (token_state.title)?RUNTIME_STATE.setz.all_topic_tokenz[j].title:'';                        
                            aToken.txtz = (token_state.txtz.length)?token_state.txtz:[];
                            aToken.topicz = token_state.topicz;
                            // aToken.aliaz = (RUNTIME_STATE.setz.alias_matrix[prime_key_tgt])?RUNTIME_STATE.setz.alias_matrix[prime_key_tgt].aliaz:[];
                            if(RUNTIME_STATE.setz.alias_matrix[prime_key_tgt]){ // no array if no aliaz
                                aToken.aliaz = RUNTIME_STATE.setz.alias_matrix[prime_key_tgt].aliaz;
                            }
                            aToken.keyz = (token_state.keyz)? token_state.keyz:[];
                            //aToken.alias = [];
                            //aToken.alias.push(...generateAlias(aToken))
                            // aToken.numz = [];
                            // ymdz? sigz?
                            // aToken.numz.push(RUNTIME_STATE.setz.all_topic_tokenz[j].numz);
                            aToken.numz = RUNTIME_STATE.setz.all_topic_tokenz[j].numz+
                            `.cardz:${++RUNTIME_STATE.idx.CARD_IDX}`; 
                            // aToken.numz.push(RUNTIME_STATE.setz.all_topic_tokenz[j].numz+
                            //   `.${++RUNTIME_STATE.idx.CARD_IDX}cardz`); 
                            // aToken.numz = `${RUNTIME_STATE.idx.TOPIC_IDX}`+
                            // `.${RUNTIME_STATE.idx.SUBTOPIC_IDX}`+
                            // `.${++RUNTIME_STATE.idx.CARD_IDX}cardz`;  
                            RUNTIME_STATE.setz.all_card_tokenz.push(aToken);
                            
                        }
                    };  populate_tokens_to_CARDZ();                        
                    /*****************************************\
                     * POPULATE : all_card_tokenz. 
                     * ALL PRIME_KEY TOKENZ into CARDZ.
                    \*****************************************/
                }; check_all_tokens_for_tgt();
            } //end inner loop of subtexz
         } //end outer loop of key tokenz.
     }; build_token_cardz();
    /******************************************\
    * POPULATES : all_card_tokenz, with aToken.txtz
    * todo: use for Write out CARDZ?
    \******************************************/     
     //---------------------------------------------
    //  debugger;
     /*****************************************************

      ***********************/
     function build_prime_key_cardz(){
        // debugger;
        let primeKeyTgt = '', primeKeyObj = {}, primeKeyCard = {}, aToken = {}
        for(let i = 0; i< RUNTIME_STATE.setz.all_card_tokenz.length; i++){ 
            primeKeyTgt = '', primeKeyObj = {};
            if(RUNTIME_STATE.setz.all_card_tokenz[i].key){
                primeKeyTgt = RUNTIME_STATE.setz.all_card_tokenz[i].key;
                primeKeyObj = RUNTIME_STATE.setz.all_card_tokenz[i]
                // primeKeyClean = primeKey.replace(/_/g,'')
            }
            if( RUNTIME_STATE.setz.prime_key_cardz[primeKeyTgt]){ // FOUND: CARD EXISTS. APPEND.
                // primeKeyCard = RUNTIME_STATE.setz.prime_key_cardz[primeKeyTgt];
                // primeKeyCard.keyz.push(...primeKeyObj.keyz)
                // primeKeyCard.keyz.push(...primeKeyObj.keyz)
                RUNTIME_STATE.setz.prime_key_cardz[primeKeyTgt].push(primeKeyObj)

            } else { //FOUND: CARD DOES NOT EXIST. CREATE ARRAY.
                // debugger;
                aToken = new Object();
                aToken.type = 'prime_card_token'
                aToken.key = primeKeyTgt;
                aToken.keyz = (primeKeyObj.keyz)?primeKeyObj.keyz:[];
                aToken.title = (primeKeyObj.title)?primeKeyObj.title:'';
                aToken.txtz = (primeKeyObj.txtz)?primeKeyObj.txtz:[];
                if(primeKeyObj.aliaz && primeKeyObj.aliaz.length){ //no aliaz if blank.
                    debugger;
                    aToken.aliaz = primeKeyObj.aliaz;
                }
                // aToken.aliaz = (primeKeyObj.aliaz)?primeKeyObj.aliaz:[];

                aToken.topicz = (primeKeyObj.topicz)?primeKeyObj.topicz:[];
                if(primeKeyObj.ymdz && primeKeyObj.ymdz.length){ // no ymdz without ymdz
                    aToken.ymdz = primeKeyObj.ymdz;
                }
                // aToken.ymdz = (primeKeyObj.ymdz)?primeKeyObj.ymdz:[];
                aToken.numz = (primeKeyObj.numz)?primeKeyObj.numz:[];
                RUNTIME_STATE.setz.prime_key_cardz[primeKeyTgt] = [aToken];


            }
            //loop over token cards.
            // debugger;
            // for(let j = 0; j < RUNTIME_STATE.setz.all_card_tokenz.length; j++){
            //     tokenTgt = RUNTIME_STATE.setz.all_card_tokenz[j].title.toLowerCase();
            //     if(tokenTgt.indexOf(primeKey)>-1){
                        
                    //pop ulate txt and txt
                    // aToken = new Object();
                    // aToken.type = 'prime_card_token' //token
                    // aToken.key = RUNTIME_STATE.setz.omni_key_idx[i]
                    // aToken.title = //(token_state.title)?RUNTIME_STATE.setz.all_topic_tokenz[j].title:'';                        
                    // aToken.txtz = //(token_state.txtz.length)?token_state.txtz:[];
                    // aToken.alias = [];
                    // aToken.alias.push(...generateAlias(aToken))
                    // aToken.numz = RUNTIME_STATE.setz.all_card_tokenz[j].numz+
                    // `.${++RUNTIME_STATE.idx.CARD_IDX}cardz`; 
                    // RUNTIME_STATE.setz.prime_key_cardz[primeKey] = RUNTIME_STATE.setz.all_card_tokenz[j];
                    // 
                // }
            // }
        }
        console.log('Prime_Key_Cards:',Object.keys(RUNTIME_STATE.setz.prime_key_cardz).length)
     }; build_prime_key_cardz();
    /******************************************\
    * POPULATES : prime_key_cardz, 
    * - with all TXTZ from topics.
    * todo: write to file by prime_key?
    \******************************************/   
    function wrap_CARDZ_with_METADATA(){
        // debugger;
        // let keyData = {};
        for( prime_key in RUNTIME_STATE.setz.prime_key_cardz){
            
            // metaItem = RUNTIME_STATE.setz.prime_key_cardz[i];
            //for each card, create a wrapped version.
            // RUNTIME_STATE.setz.omni_card_tokenz.push( {
            //     key: RUNTIME_STATE.setz.all_card_tokenz[i].key,
            //     type : 'TOKEN_CARDZ', //underscore as master_token_delimiter
            //     txtz: RUNTIME_STATE.setz.all_card_tokenz[i].txtz,
            //     numz: RUNTIME_STATE.setz.all_card_tokenz[i].numz,
            aToken = new Object();
            aToken.type = 'prime_key_card' //token            
            aToken.key = prime_key;
            aToken.txtz = RUNTIME_STATE.setz.prime_key_cardz[prime_key];
            aToken.tgt_path =  RUNTIME_STATE.tgt_path;
            if(RUNTIME_STATE.ymdz && RUNTIME_STATE.ymdz.length){
                aToken.ymdz=[]; 
                aToken.ymdz.push(RUNTIME_STATE.ymdz);
            }
            // aToken.ymdz=[]; aToken.ymdz.push(RUNTIME_STATE.ymdz);
            aToken.input = "LIBZ";
            aToken.output = "CARDZ";
            aToken.version ='444';
            aToken.engine = RUNTIME_STATE.manifest.engine;
            aToken.srcmap = RUNTIME_STATE.manifest.srcmap;
            RUNTIME_STATE.setz.prime_card_filez.push(aToken)
        } //end loop
    }; wrap_CARDZ_with_METADATA();

    // debugger;

 } //END advanced tokenizer
 //---------------------------------------------------------
 /********************************************************\
//--------------------------------------------

/***********************************************
 * WRITE OUT FILES: DESCRIPTION : 
 * 
 */
 function writeOutTokenz(){
    let data_folder = 'YMD_'+RUNTIME_STATE.manifest.year+'_'+RUNTIME_STATE.manifest.month+'_'+RUNTIME_STATE.manifest.day
    RUNTIME_STATE.manifest.output.push('../SCRIPTZ/TOKEN_DATA/'+ data_folder) //artifacts of building cards.
    let PRODUCTION_PATH = '../CARDZ/' //output of building cards.
    console.log('5) WRITE File(s) out: ', RUNTIME_STATE.manifest.output[0])

    const create_output_folder = ()=>{ //backup files.
        try {
        if (!fs.existsSync(RUNTIME_STATE.manifest.output[0])) {
            fs.mkdirSync(RUNTIME_STATE.manifest.output[0]);
        }
        } catch (err) {
        console.error("could not save backup",err);
        }
    }; create_output_folder();

    //DEVELOPMENT-DIAGNOSTICS-OUTPUT-.
    //-----------------------------------WRITE_OUT_RAW-TOKENZ---------
    // let write_out_all_raw_tokenz = () => {
    //     if(!RUNTIME_STATE || !RUNTIME_STATE.setz.all_raw_tokenz){return}
    //     let tgt = "all_raw_tokenz_1.json"
    //     fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify(RUNTIME_STATE.setz.all_raw_tokenz), err => {
    //         if (err) { console.error(err); } //dehydrate with JSON.parse()
    //         RUNTIME_STATE.manifest.output.push(tgt)
    //         console.log(' - Written to file',RUNTIME_STATE.manifest.output[0]+'/'+tgt)
    //     });
    // }; //write_out_all_raw_tokenz();      
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

    let write_out_DEV_prime_key_index = ()=>{
        // let production_path = `../CARDZ`
        let tgt = 'prime_key_idx_2.json' //PRODUCTION_PRODUCT-.
        // fs.writeFile(production_path+"/"+index_file_tgt, JSON.stringify(RUNTIME_STATE.setz.prime_key_idx), err => {
        // fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify(RUNTIME_STATE.setz.prime_key_idx), err => {
        fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify({"prime_key_idx":RUNTIME_STATE.setz.prime_key_idx}), err => {
            if (err) { console.error(err); } //dehydrate with JSON.parse()
            // RUNTIME_STATE.manifest.output.push(tgt)
            console.log(' - Written to file', RUNTIME_STATE.manifest.output[0]+"/"+tgt)
        });
    }; write_out_DEV_prime_key_index();

    let write_out_DEV_omni_keyz = () => { //FILE-OUTPUT: OMNI_KEY_INDEX
        // wrap_KEY_ALIASES_with_METADATA()
        if(!RUNTIME_STATE || !RUNTIME_STATE.setz.omni_key_idx){return}
        // RUNTIME_STATE.setz.old_omni_key_idx_obj = { //OBJECT-ARRAY-WRAPPER.
        //     "omni_key_index":RUNTIME_STATE.setz.all_omni_keyz
        // }

        let tgt = "omni_key_idx_2.json"
        // let tgt = "all_key_tokenz_1.json" //TODO change all_key_tokenz to omni_key_tokenz
        fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify({"omni_key_idx":RUNTIME_STATE.setz.omni_key_idx}), err => {
            if (err) { console.error(err); } //dehydrate with JSON.parse()
            RUNTIME_STATE.manifest.output.push(tgt)
            console.log(' - Written to file: ',RUNTIME_STATE.manifest.output[0]+'/'+tgt)
        });
    }; write_out_DEV_omni_keyz();

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

    let write_out_all_star_topicz = () => {
        if(!RUNTIME_STATE || !RUNTIME_STATE.setz.all_star_topicz){return}
        let tgt = "all_star_topicz_1.json"
        fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify(RUNTIME_STATE.setz.all_star_topicz), err => {
            if (err) { console.error(err); } //dehydrate with JSON.parse()
            RUNTIME_STATE.manifest.output.push(tgt)
            console.log(' - Written to file',RUNTIME_STATE.manifest.output[0]+'/'+tgt)
        });
    }; write_out_all_star_topicz();  
    
    let write_out_prime_key_cardz = () => {
        let production_path = `../CARDZ`

        //TODO APPEND by TARGET_FILEZ.
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
            console.error("could not save output",err);
            }
            try {
               
                if (!fs.existsSync(production_path)) {
                    fs.mkdirSync(production_path);
                }
            } catch (err) {
            console.error("could not save production",err);
            }            
        }; create_output_folders();


        // debugger;
        /***********************************************\
         * WRITE OUT DYNAMIC CARDZ with TOKENZ.
        //load card txtz with all reference to key.
        \***********************************************/
        if(!RUNTIME_STATE || !RUNTIME_STATE.setz.prime_card_filez){return}
        let card_file_tgt = ''; let card_data = {};//'cardz_2.json' //PRODUCTION_PRODUCT-.
        for(var i = 0; i<RUNTIME_STATE.setz.prime_card_filez.length;i++){
            if(!RUNTIME_STATE.setz.prime_card_filez[i].key){continue}
            card_file_tgt = RUNTIME_STATE.setz.prime_card_filez[i].key.toLowerCase();
            card_file_tgt = `card${card_file_tgt}4.json`//prime key wrapped in _
            //get data payload
            card_data = RUNTIME_STATE.setz.prime_card_filez[i];
            //TODO if new create, else add to alias
            //TODO check unique card.
            // debugger;
            // if(RUNTIME_STATE.setz.prime_key_cardz[RUNTIME_STATE.setz.prime_key_idx[i]]){
            //     card_data = RUNTIME_STATE.setz.prime_key_cardz[RUNTIME_STATE.setz.prime_key_idx[i]]
            // }

            //TODO
            // (function (file_tgt) {
            if(card_data){
                console.log(' - Written to dynamic file:', production_path+'/'+card_file_tgt)
                // fs.writeFile(production_path+"/"+card_file_tgt, JSON.stringify(RUNTIME_STATE.setz.omni_card_tokenz), err => {
                fs.writeFile(production_path+"/"+card_file_tgt, JSON.stringify(card_data), err => {
                    if (err) { console.error(err); } //dehydrate with JSON.parse()
                    RUNTIME_STATE.manifest.output.push(card_file_tgt)                   
                });  
            }
            // })(card_file_tgt);
        }
        // // fs.writeFile(production_path+"/"+card_file_tgt, JSON.stringify(RUNTIME_STATE.setz.all_card_tokenz), err => {
        // fs.writeFile(production_path+"/"+card_file_tgt, JSON.stringify(RUNTIME_STATE.setz.omni_card_tokenz), err => {
        //     if (err) { console.error(err); } //dehydrate with JSON.parse()
        //     RUNTIME_STATE.manifest.output.push(tgt)
        //     console.log(' - Written to file', production_path+'/'+card_file_tgt)
        // });        

    }; write_out_prime_key_cardz();     

    //----------------------------------------------------------------------
    // let write_out_production_omni_key_index = ()=>{
    //     let production_path = `../CARDZ`
    //     let index_file_tgt = 'omni_key_idx_2.json' //PRODUCTION_PRODUCT-.
    //     fs.writeFile(production_path+"/"+index_file_tgt, JSON.stringify(RUNTIME_STATE.setz.omni_key_idx), err => {
    //         if (err) { console.error(err); } //dehydrate with JSON.parse()
    //         // RUNTIME_STATE.manifest.output.push(tgt)
    //         console.log(' - Written to file', production_path+'/'+index_file_tgt)
    //     });
    // }; write_out_production_omni_key_index();
    //----------------------------------------------------------------------
    // let write_out_production_prime_key_index = ()=>{
    //     let production_path = `../CARDZ`
    //     let index_file_tgt = 'prime_key_idx_2.json' //PRODUCTION_PRODUCT-.
    //     // fs.writeFile(production_path+"/"+index_file_tgt, JSON.stringify(RUNTIME_STATE.setz.prime_key_idx), err => {
    //     fs.writeFile(production_path+"/"+index_file_tgt, JSON.stringify(RUNTIME_STATE.setz.prime_key_idx), err => {
    //         if (err) { console.error(err); } //dehydrate with JSON.parse()
    //         // RUNTIME_STATE.manifest.output.push(tgt)
    //         console.log(' - Written to file', production_path+'/'+index_file_tgt)
    //     });
    // }; write_out_production_prime_key_index();

 } //END WRITEOutTOKENZ
 //--------------------------------------------
 //TODO add refactored output here, with grouping of DEV and PROD sub fnz.
 //--------------------------------------------
 let writeOutAllFilez = ()=> {//-----------------------------------
    // debugger;
        const create_DEV_output_folder = ()=>{ //backup files.
            let data_folder = 'YMD_'+RUNTIME_STATE.manifest.year+'_'+RUNTIME_STATE.manifest.month+'_'+RUNTIME_STATE.manifest.day
            RUNTIME_STATE.manifest.output.push('../SCRIPTZ/TOKEN_DATA/'+ data_folder) //artifacts of building cards.
            console.log('3) WRITE DEV File(s) to: ', RUNTIME_STATE.manifest.output[0]) //DEV PATH
            try { //DEV PATH
            if (!fs.existsSync(RUNTIME_STATE.manifest.output[0])) {
                fs.mkdirSync(RUNTIME_STATE.manifest.output[0]);
            }
            } catch (err) {
            console.error("could not save backup",err);
            }//----------------------------------------------------
        }; create_DEV_output_folder();
        const create_PROD_output_folders = ()=>{           
            let production_folder_idxz = `../IDXZ`
            RUNTIME_STATE.manifest.output.push(production_folder_idxz) //artifacts of building cards.
            console.log('3) WRITE PROD IDX(z) to: ', RUNTIME_STATE.manifest.output[1]) //PROD IDX_PATH
            try {
                if (!fs.existsSync(RUNTIME_STATE.manifest.output[1])) {
                    fs.mkdirSync(RUNTIME_STATE.manifest.output[1]);
                }
            } catch (err) {
            console.error("could not save output",err);
            }   //-----------------------------------------------       
            let production_folder_topicz = `../TOPICZ`
            RUNTIME_STATE.manifest.output.push(production_folder_topicz) //artifacts of building topics.
            console.log('3) WRITE PROD TOPIC(z) to: ', RUNTIME_STATE.manifest.output[2]) //PROD TOPICZ_PATH
            try {
                if (!fs.existsSync(RUNTIME_STATE.manifest.output[2])) {
                    fs.mkdirSync(RUNTIME_STATE.manifest.output[2]);
                }
            } catch (err) {
            console.error("could not save output",err);
            }  //---------------------------------------------------             
            let production_folder_cardz = `../CARDZ`
            RUNTIME_STATE.manifest.output.push(production_folder_cardz) //artifacts of building cards.
            console.log('3) WRITE PROD CARD(z) to: ', RUNTIME_STATE.manifest.output[3]) //PROD CARDZ_PATH
            try {
                if (!fs.existsSync(RUNTIME_STATE.manifest.output[3])) {
                    fs.mkdirSync(RUNTIME_STATE.manifest.output[3]);
                }
            } catch (err) {
            console.error("could not save output",err);
            } //------------------------------------------------              
        }; create_PROD_output_folders();
        //---------------------------------- END CREATE FOLDERS.
        //---------------------------------- BEGIN WRITE OUT DATA
        let writeOutIDXz = ()=> {
            let writeIDXZ_DEV = ()=>{ //-------------------------output 1 : DEV IDX : prime & omni.
                let write_out_DEV_prime_key_index = ()=>{
                    let tgt = 'prime_key_idx_4.json' //PRODUCTION_PRODUCT-.
                    fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify({"prime_key_idx":RUNTIME_STATE.setz.prime_key_idx}), err => {
                        if (err) { console.error(err); } 
                        console.log(' - Written to DEV', RUNTIME_STATE.manifest.output[0]+"/"+tgt)
                    });
                }; write_out_DEV_prime_key_index();
                //----------------------------------------------------------
                let write_out_DEV_omni_keyz = () => { //FILE-OUTPUT: OMNI_KEY_INDEX
                    if(!RUNTIME_STATE || !RUNTIME_STATE.setz.omni_key_idx){return}
                    let tgt = "omni_key_idx_4.json"
                    fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify({"omni_key_idx":RUNTIME_STATE.setz.omni_key_idx}), err => {
                        if (err) { console.error(err); } 
                        RUNTIME_STATE.manifest.output.push(tgt)
                        console.log(' - Written to DEV: ',RUNTIME_STATE.manifest.output[0]+'/'+tgt)
                    });
                }; write_out_DEV_omni_keyz();
            }; writeIDXZ_DEV();
            //----------------------------------------------------------------
            let writeIDXZ_PROD = ()=>{                       //***************output 2 : PROD IDX
                let write_out_PROD_prime_key_index = ()=>{
                    let tgt = 'prime_key_idx_4.json' //PRODUCTION_PRODUCT-.
                    fs.writeFile(RUNTIME_STATE.manifest.output[1]+"/"+tgt, JSON.stringify({"prime_key_idx":RUNTIME_STATE.setz.prime_key_idx}), err => {
                        if (err) { console.error(err); } //dehydrate with JSON.parse()
                        console.log(' - Written to PROD', RUNTIME_STATE.manifest.output[1]+"/"+tgt)
                    });
                }; write_out_PROD_prime_key_index();
                //----------------------------------------------------------
                let write_out_PROD_omni_keyz = () => { //FILE-OUTPUT: OMNI_KEY_INDEX
                    if(!RUNTIME_STATE || !RUNTIME_STATE.setz.omni_key_idx){return}
                    let tgt = "omni_key_idx_4.json"
                    fs.writeFile(RUNTIME_STATE.manifest.output[1]+"/"+tgt, JSON.stringify({"omni_key_idx":RUNTIME_STATE.setz.omni_key_idx}), err => {
                        if (err) { console.error(err); } //dehydrate with JSON.parse()
                        RUNTIME_STATE.manifest.output.push(tgt)
                        console.log(' - Written to PROD: ',RUNTIME_STATE.manifest.output[1]+'/'+tgt)
                    });
                }; write_out_PROD_omni_keyz();
            }; writeIDXZ_PROD();
        }; writeOutIDXz();
        //------------------------------------------------------
        let writeOutTOPICz = ()=> {
            let writeTOPICZ_DEV = ()=>{//---------------------------------output 4 : DEV TOPICZ
                let write_out_all_topic_tokenz_dev = () => {
                    if(!RUNTIME_STATE || !RUNTIME_STATE.setz.all_topic_tokenz){return}
                    let tgt = "all_topic_tokenz_4.json"
                    fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify(RUNTIME_STATE.setz.all_topic_tokenz), err => {
                        if (err) { console.error(err); } //dehydrate with JSON.parse()
                        RUNTIME_STATE.manifest.output.push(tgt)
                        console.log(' - Written to DEV',RUNTIME_STATE.manifest.output[0]+'/'+tgt)
                    });
                }; write_out_all_topic_tokenz_dev();    
                //------------------------------------------------------
                let write_out_all_quote_tokenz_dev = () => {
                    if(!RUNTIME_STATE || !RUNTIME_STATE.setz.all_quote_tokenz){return}
                    let tgt = "all_quote_tokenz_4.json"
                    fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify(RUNTIME_STATE.setz.all_quote_tokenz), err => {
                        if (err) { console.error(err); } //dehydrate with JSON.parse()
                        RUNTIME_STATE.manifest.output.push(tgt)
                        console.log(' - Written to DEV',RUNTIME_STATE.manifest.output[0]+'/'+tgt)
                    });
                }; write_out_all_quote_tokenz_dev();    
                //-------------------------------------------------------------------
                let write_out_all_star_topicz_dev = () => {
                    if(!RUNTIME_STATE || !RUNTIME_STATE.setz.all_star_topicz){return}
                    let tgt = "all_star_topicz_4.json"
                    fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+tgt, JSON.stringify(RUNTIME_STATE.setz.all_star_topicz), err => {
                        if (err) { console.error(err); } //dehydrate with JSON.parse()
                        RUNTIME_STATE.manifest.output.push(tgt)
                        console.log(' - Written to DEV',RUNTIME_STATE.manifest.output[0]+'/'+tgt)
                    });
                }; write_out_all_star_topicz_dev();  
            }; writeTOPICZ_DEV();
            //------------------------------------------------------------            
            let writeTOPICZ_PROD = ()=>{  //--------------------------------output 4 : PROD TOPICZ
                let write_out_all_topic_tokenz_prod = () => {
                    if(!RUNTIME_STATE || !RUNTIME_STATE.setz.all_topic_tokenz){return}
                    let tgt = "all_topic_tokenz_4.json"
                    fs.writeFile(RUNTIME_STATE.manifest.output[2]+"/"+tgt, JSON.stringify(RUNTIME_STATE.setz.all_topic_tokenz), err => {
                        if (err) { console.error(err); } //dehydrate with JSON.parse()
                        RUNTIME_STATE.manifest.output.push(tgt)
                        console.log(' - Written to PROD',RUNTIME_STATE.manifest.output[2]+'/'+tgt)
                    });
                }; write_out_all_topic_tokenz_prod();    
                //------------------------------------------------------
                let write_out_all_quote_tokenz_prod = () => {
                    if(!RUNTIME_STATE || !RUNTIME_STATE.setz.all_quote_tokenz){return}
                    let tgt = "all_quote_tokenz_4.json"
                    fs.writeFile(RUNTIME_STATE.manifest.output[2]+"/"+tgt, JSON.stringify(RUNTIME_STATE.setz.all_quote_tokenz), err => {
                        if (err) { console.error(err); } //dehydrate with JSON.parse()
                        RUNTIME_STATE.manifest.output.push(tgt)
                        console.log(' - Written to PROD',RUNTIME_STATE.manifest.output[2]+'/'+tgt)
                    });
                }; write_out_all_quote_tokenz_prod();    
                //-------------------------------------------------------------------
                let write_out_all_star_topicz_prod = () => {
                    if(!RUNTIME_STATE || !RUNTIME_STATE.setz.all_star_topicz){return}
                    let tgt = "all_star_topicz_4.json"
                    fs.writeFile(RUNTIME_STATE.manifest.output[2]+"/"+tgt, JSON.stringify(RUNTIME_STATE.setz.all_star_topicz), err => {
                        if (err) { console.error(err); } //dehydrate with JSON.parse()
                        RUNTIME_STATE.manifest.output.push(tgt)
                        console.log(' - Written to PROD',RUNTIME_STATE.manifest.output[2]+'/'+tgt)
                    });
                }; write_out_all_star_topicz_prod();  
            }; writeTOPICZ_PROD();
        }; writeOutTOPICz();
        //-----------------------------------------------------------
        let writeOutCARDz = ()=> {
            let writeCARDZ_DEV = ()=>{ //***************************output 5 : DEV CARDZ
                let write_out_DEV_key_cardz = () => {
                    if(!RUNTIME_STATE || !RUNTIME_STATE.setz.prime_card_filez){return}
                    let card_file_tgt = ''; let card_data = {}; 
                    for(var i = 0; i<RUNTIME_STATE.setz.prime_card_filez.length;i++){
                        if(!RUNTIME_STATE.setz.prime_card_filez[i].key){continue}
                        card_file_tgt = RUNTIME_STATE.setz.prime_card_filez[i].key.toLowerCase();
                        card_file_tgt = `card${card_file_tgt}4.json`//prime key wrapped in _
                        card_data = RUNTIME_STATE.setz.prime_card_filez[i]; //get data payload
                        if(card_data){
                            console.log(' - Written to dynamic file:', RUNTIME_STATE.manifest.output[0]+'/'+card_file_tgt)
                            fs.writeFile(RUNTIME_STATE.manifest.output[0]+"/"+card_file_tgt, JSON.stringify(card_data), err => {
                                if (err) { console.error(err); } //dehydrate with JSON.parse()
                                RUNTIME_STATE.manifest.output.push(card_file_tgt)                   
                            });  
                        }
                    }
                }; write_out_DEV_key_cardz();    
            }; writeCARDZ_DEV();
            //------------------------------------
            let writeCARDZ_PROD = ()=>{  //**************************output6 : PROD CARDZ
                let write_out_prod_key_cardz = () => {
                    /***********************************************\
                     * WRITE OUT DYNAMIC CARDZ with TOKENZ.
                    //load card txtz with all reference to key.
                    \***********************************************/
                    if(!RUNTIME_STATE || !RUNTIME_STATE.setz.prime_card_filez){return}
                    let card_file_tgt = ''; let card_data = {}; //PRODUCTION_PRODUCT-.
                    for(var i = 0; i<RUNTIME_STATE.setz.prime_card_filez.length;i++){
                        if(!RUNTIME_STATE.setz.prime_card_filez[i].key){continue}
                        card_file_tgt = RUNTIME_STATE.setz.prime_card_filez[i].key.toLowerCase();
                        card_file_tgt = `card${card_file_tgt}4.json`//prime key wrapped in _
                        card_data = RUNTIME_STATE.setz.prime_card_filez[i]; //get data payload
                        if(card_data){
                            console.log(' - Written to dynamic file:', RUNTIME_STATE.manifest.output[3]+'/'+card_file_tgt)
                            fs.writeFile(RUNTIME_STATE.manifest.output[3]+"/"+card_file_tgt, JSON.stringify(card_data), err => {
                                if (err) { console.error(err); } //dehydrate with JSON.parse()
                                RUNTIME_STATE.manifest.output.push(card_file_tgt)                   
                            });  
                        }
                    }
                }; write_out_prod_key_cardz();     
            }; writeCARDZ_PROD();
        }; writeOutCARDz();
    }; //writeOutAllFilez();
     /**********************************************\
      * WriteOutCounts : PURPOSE :
      * analytic coverage of ecosystem (historic)
    \***********************************************/
 function writeOutCounts(){
    console.log('TOKEN COUNTS:')
    console.log('key:',RUNTIME_STATE.manifest.total_key_count,
      RUNTIME_STATE.setz.omni_key_idx.length)
    //   RUNTIME_STATE.setz.all_key_tokenz.length)
    console.log('star_topicz:',RUNTIME_STATE.manifest.total_key_topic_count,
      RUNTIME_STATE.setz.all_star_topicz.length)
    console.log('quotez:',RUNTIME_STATE.manifest.total_quote_count,
      RUNTIME_STATE.setz.all_quote_tokenz.length)      
    console.log('topicz:',RUNTIME_STATE.manifest.total_topic_count,
      RUNTIME_STATE.setz.all_topic_tokenz.length)
    console.log('cardz:',RUNTIME_STATE.setz.all_card_tokenz.length)
    console.log('subtopicz:',RUNTIME_STATE.manifest.total_subtopic_count)
    // console.log('total_tokenz:', RUNTIME_STATE.setz.all_key_tokenz.length
    console.log('total_tokenz:', RUNTIME_STATE.setz.omni_key_idx.length
      +RUNTIME_STATE.setz.all_star_topicz.length
      +RUNTIME_STATE.setz.all_quote_tokenz.length
      +RUNTIME_STATE.setz.all_topic_tokenz.length
      +RUNTIME_STATE.manifest.total_subtopic_count);
 }
 /**********************************************\
  * MAIN : PURPOSE :
  * Process Abstraction, for metadata layer.
  * and multi file, aWordzaFactory scaling. //TODO
\***********************************************/
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
            //todo test all of these for append.
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
         //console.log('3) Wrap CARDZMETADATA: ', RUNTIME_STATE.tgt_path)
         //wrap_CARDZ_with_METADATA()

         //4 WRITE to FILE
        //  console.log('4) Read from file: ', RUNTIME_STATE.tgt_path)
        //  writeOutTokenz(); //todo remove 
         writeOutAllFilez();
        //  writeOutIDXz(); 
        //  writeOutTOPICz();
        //  writeOutCARDz();
         //5 WRITE out analytic counts.
         writeOutCounts();
         //THE_0_END && _0_ //todo aSYMBOLZa _*_ aSPARKa sig_: enzo~:)
     }; MAIN_PROCESS();
    //  }; try{ MAIN_PROCESS(); } catch(e){console.log(e)}
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
 //O populate card_awordza_2.json similar to concepts txt
 