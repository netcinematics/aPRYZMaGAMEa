/****************************************\
 * TRAIN_TXT_TOKENZ (algorithm)
 * ******************---*****************
 * EXAMPLE SYNTAX:
 * path, type version datestamp
 * EXAMPLE USE:
 > node train_txt_tokenz_1.jz all all 0.0.0.0 YMD:2023,7,18
 > node train_txt_tokenz_1.js z_SYNTAX_TEST all 0.0.0.0 YMD:2023,7,18
 > node train_txt_tokenz_1.js z_SYNTAX_TEST all 0.0.0.0 YMD:2023,7,24
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
 * TXTZ : (optional)
 * KEY : (optional) precursor to TXT or TXTZ
 * IMGZ : (optional)
 * LINKZ: (optional)
 * META: (optional)
 * author: @spazefalcon (c) 2023 July
 \********************************************************/
 // /TXTZ and /SCRIPTZ hidden by .gitignore 
 // USE /TXTZ for un-edited (non-delimited) documents of aWORDZa.
 // USE /LIBZ for edited aWORDZa. (delimited)
 // USE /SCRIPTZ to read input from /LIBZ and
 // USE /CARDZ as output of json 
 // USE getTOKENZ (frontEND) to dynamically lookup CARDZ

const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

let RUNTIME_STATE = { //init defaults, then override
    tgt_path_selection : 'all',
    search_type_selection : '_',
    verz : '0.0.0.0',
    datez : 'YMD:2020_1_1',
    markdown_data : "" , //all markdown as string
    raw_tokenz:[],       //all split by ' '
    all_key_tokenz:[],   //all _keytokenz_ 
    // all_sub_tokenz:{},   //all sub_key_tokenz index map.
    // all_quote_tokenz:{}, //all quotes in index map. >
    // all_txt_tokenz:{},   //delimit ---, #
    token_map:{}, //used to visualize delimiterz
    token_object_map:{},
    lookup : "LIBZ",
    json_txtz : "",
    srcmap: [] 
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
    console.log(' - tgt lookup',RUNTIME_STATE.lookup)
    let raw_markdown_data = ''
    let dynamic_src = ''
    try {
        dynamic_src = "../LIBZ/"+RUNTIME_STATE.lookup+".md"
        RUNTIME_STATE.srcmap.push(dynamic_src);//for trace back
        raw_markdown_data = fs.readFileSync(dynamic_src, "utf-8");
    } catch (error) {
        console.error("Error reading file:", error);
    }
    return raw_markdown_data
};

function Advanced_Tokenizer(){
    //Local-Behavior_fns
    let cleanMarkdown = () => {
        //linebreaks to spaces, and collapse multiple spaces
        RUNTIME_STATE.markdown_data = RUNTIME_STATE.markdown_data.replace(/[\r\n]+/g," ");
        RUNTIME_STATE.markdown_data = RUNTIME_STATE.markdown_data.replace(/[   ]+/g," ");
        RUNTIME_STATE.markdown_data = RUNTIME_STATE.markdown_data.replace(/[  ]+/g," ");
        //remove unexpected characters: ... , spaces, quotes
        // RUNTIME_STATE.markdown_data = RUNTIME_STATE.markdown_data.replace(/[~]+/g,""); 
        RUNTIME_STATE.markdown_data = RUNTIME_STATE.markdown_data.replace(/[...]+/g,"");
        RUNTIME_STATE.markdown_data = RUNTIME_STATE.markdown_data.replace(/[']+/g,"");
        RUNTIME_STATE.markdown_data = RUNTIME_STATE.markdown_data.replace(/[`]+/g,"");
        RUNTIME_STATE.markdown_data = RUNTIME_STATE.markdown_data.replace(/["]+/g,"");
        RUNTIME_STATE.markdown_data = RUNTIME_STATE.markdown_data.replace(/[;]+/g,"");
        RUNTIME_STATE.markdown_data = RUNTIME_STATE.markdown_data.replace(/[\\]+/g,"");
        RUNTIME_STATE.markdown_data = RUNTIME_STATE.markdown_data.replace(/[/]+/g,"");
    }; cleanMarkdown();

    // let tokenz = RUNTIME_STATE.markdown_data.split(' ')
    RUNTIME_STATE.raw_tokenz = RUNTIME_STATE.markdown_data.split(' ')
    console.log(' - RAW tokenz: ', RUNTIME_STATE.raw_tokenz.length)
    let aToken = {}; //reusable placeholder
    let startQuoteIDX = 0;
    let txt_slice = [] //reusable variable
    //     let docz_idx = 0;
    //     let subtxtz_idx = 0;


    // let objectTokenz = []; //final return product
    let get_All_Token_Keyz = () => {
        // debugger;
        for(let i = 0; i< RUNTIME_STATE.raw_tokenz.length; i++){ //KEY-TOKENZ
            // if(RUNTIME_STATE.raw_tokenz[i].split('~').length - 1 > 1){ //TWO-TILDE_KEY-TOKEN
            if(RUNTIME_STATE.raw_tokenz[i].indexOf('_') === 0){ //KEY_TOKEN found
                RUNTIME_STATE.all_key_tokenz.push(RUNTIME_STATE.raw_tokenz[i]); //for iNDEX
                aToken = new Object();
                aToken.type = 'keytoken'
                aToken.key = RUNTIME_STATE.raw_tokenz[i];
                RUNTIME_STATE.token_map[i] = aToken.key //used to visualize delimiterz.
                if (!RUNTIME_STATE.token_object_map[aToken.key]){ //create
                    RUNTIME_STATE.token_object_map[aToken.key] = aToken;
                } else { /*append txtz to object later*/ }
            } else if(RUNTIME_STATE.raw_tokenz[i].indexOf('_') > 0){ //SUB_TOKEN found
                aToken = new Object();
                aToken.type = 'subkey'
                aToken.key = RUNTIME_STATE.raw_tokenz[i];
                RUNTIME_STATE.token_map[i] = aToken.key; //used to visualize delimiterz.
                if (!RUNTIME_STATE.token_object_map[aToken.key]){ //create
                    RUNTIME_STATE.token_object_map[aToken.key] = aToken;
                } else { /*append txtz to object later*/ }                
                // RUNTIME_STATE.all_sub_tokenz.push(RUNTIME_STATE.raw_tokenz[i])
            // else if(RUNTIME_STATE.raw_tokenz[i].split('_').length - 1 > 1){ //TWO-TILDE_KEY-TOKEN
            //     aToken.key = RUNTIME_STATE.raw_tokenz[i].replace(/[~]+/g,"");
            //     objectTokenz.push(aToken)
            
            } 
            
            if(RUNTIME_STATE.raw_tokenz[i].indexOf('#') === 0){ //TITLE_TOKEN found
                aToken = new Object();
                aToken.type = 'title'
                aToken.key = RUNTIME_STATE.raw_tokenz[i];
                RUNTIME_STATE.token_map[i] = aToken.key; //used to visualize delimiterz.
            } else if(RUNTIME_STATE.raw_tokenz[i].indexOf('---') === 0){ //SECTION_END found
                aToken = new Object();
                aToken.type = 'subtxt'
                aToken.key = RUNTIME_STATE.raw_tokenz[i];
                RUNTIME_STATE.token_map[i] = aToken.key; //used to visualize delimiterz.
            } 
            
            if(RUNTIME_STATE.raw_tokenz[i].indexOf('>') === 0){ //QUOTE_TOKEN found
                // debugger;
                aToken = new Object();
                aToken.type = 'quote'
                aToken.key = RUNTIME_STATE.raw_tokenz[i];
                RUNTIME_STATE.token_map[i] = aToken.key; //used to visualize delimiterz.
                startQuoteIDX = i;
            } 
            
            if(RUNTIME_STATE.raw_tokenz[i].indexOf('~') > 0){ //END_QUOTE_ found
                // debugger;
                aToken = new Object();
                aToken.type = 'endquote'
                aToken.key = RUNTIME_STATE.raw_tokenz[i];
                aToken.txtz = [];
                if(startQuoteIDX){ //slice values from array to txt storage.
                    txt_slice = RUNTIME_STATE.raw_tokenz.slice(startQuoteIDX+1,i+1)
                    //todo push all quotes.
                    aToken.txtz.push(txt_slice);
                    startQuoteIDX = 0;
                } else { console.log('missing quote token')}
                RUNTIME_STATE.token_map[i] = txt_slice.join(' '); //used to visualize delimiterz.

            } 
            
            if(RUNTIME_STATE.raw_tokenz[i].indexOf(';') === 0){ //END_LINE found
                aToken = new Object();
                aToken.type = 'endline'
                aToken.key = RUNTIME_STATE.raw_tokenz[i];
                RUNTIME_STATE.token_map[i] = aToken.key; //used to visualize delimiterz.
            } 

            if(RUNTIME_STATE.raw_tokenz[i].indexOf('~~~') === 0){ //DOC_END found
                aToken = new Object();
                aToken.type = 'endtxt'
                aToken.key = RUNTIME_STATE.raw_tokenz[i];
                RUNTIME_STATE.token_map[i] = aToken.key; //used to visualize delimiterz.
            } 
            
            if(RUNTIME_STATE.raw_tokenz[i].indexOf('YMD') === 0){ //DOC_END found
                aToken = new Object();
                aToken.type = 'ymdz'
                aToken.key = RUNTIME_STATE.raw_tokenz[i];
                RUNTIME_STATE.token_map[i] = aToken.key; //used to visualize delimiterz.
            } 
            
            if(RUNTIME_STATE.raw_tokenz[i].indexOf('SIG') === 0){ //DOC_END found
                aToken = new Object();
                aToken.type = 'sigz'
                aToken.key = RUNTIME_STATE.raw_tokenz[i];
                RUNTIME_STATE.token_map[i] = aToken.key; //used to visualize delimiterz.
            } 
        }
        // console.log(' - token_objectify',objectTokenz.length,objectTokenz)
    }; get_All_Token_Keyz();
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
    }; get_token_tgtz_in_delimited_txtz();


}


function wrap_METADATA(){
    let meta_wrap_tokenz = {
        tgt : RUNTIME_STATE.tgt_path_selection,
        type : '_', //underscore as master_token_delimiter
        tokenz: RUNTIME_STATE.json_txtz,
        verz : RUNTIME_STATE.verz,
        ymdz : RUNTIME_STATE.datez,
        // lookup : "LIBZ",
        output : "CARDZ",
        engine : "SCRIPTZ/train_txt_tokenz_1.js",
        srcmap : RUNTIME_STATE.srcmap 
    } 
    return meta_wrap_tokenz
}

function writeOutTokenz(){

    let write_out_raw_tokenz = () => {
        if(!RUNTIME_STATE || !RUNTIME_STATE.raw_tokenz){return}
        // let lookup = "aWORDZa_test.json"
        let tgt = "tokenz_raw.json"
        fs.writeFile("../CARDZ/"+tgt, JSON.stringify(RUNTIME_STATE.raw_tokenz), err => {
            if (err) { console.error(err); } //dehydrate with JSON.parse()
            console.log(' - Written to file',tgt)
        });
    }; write_out_raw_tokenz();


    let write_out_token_index = () => {
        if(!RUNTIME_STATE || ! RUNTIME_STATE.json_txtz){return}
        // let lookup = "aWORDZa_test.json"
        let tgt = "token_index_1.json"
        fs.writeFile("../CARDZ/"+tgt, JSON.stringify(RUNTIME_STATE.json_txtz), err => {
            if (err) { console.error(err); } //dehydrate with JSON.parse()
            console.log(' - Written to file',tgt)
        });
    }; write_out_token_index();

    let write_out_token_master = () => {
        if(!RUNTIME_STATE || ! RUNTIME_STATE.meta_wrap_tokenz){return}
        let tgt = "token_master_1.json"
        fs.writeFile("../CARDZ/"+tgt, JSON.stringify(RUNTIME_STATE.meta_wrap_tokenz), err => {
            if (err) { console.error(err); } //dehydrate with JSON.parse()
            console.log(' - Written to file',tgt)
        });
    }; write_out_token_master();

    let write_out_token_map = () => {
        // if(!RUNTIME_STATE || ! RUNTIME_STATE.SUBTXTZ_MARKDOWN_DATA){return}
        if(!RUNTIME_STATE || !RUNTIME_STATE.token_map){return}
        // let tgt = "token_map_1.json"
        let tgt = "token_map_2.json"
        // fs.writeFile("../CARDZ/"+tgt, JSON.stringify(RUNTIME_STATE.SUBTXTZ_MARKDOWN_DATA), err => {
        fs.writeFile("../CARDZ/"+tgt, JSON.stringify(RUNTIME_STATE.token_map), err => {
            if (err) { console.error(err); } //dehydrate with JSON.parse()
            console.log(' - Written to file',tgt)
        });
    }; write_out_token_map();

    let write_out_token_object_map = () => {
        // if(!RUNTIME_STATE || ! RUNTIME_STATE.SUBTXTZ_MARKDOWN_DATA){return}
        if(!RUNTIME_STATE || !RUNTIME_STATE.token_object_map){return}
        // let tgt = "token_map_1.json"
        let tgt = "token_map_3.json"
        // fs.writeFile("../CARDZ/"+tgt, JSON.stringify(RUNTIME_STATE.SUBTXTZ_MARKDOWN_DATA), err => {
        fs.writeFile("../CARDZ/"+tgt, JSON.stringify(RUNTIME_STATE.token_object_map), err => {
            if (err) { console.error(err); } //dehydrate with JSON.parse()
            console.log(' - Written to file',tgt)
        });
    }; write_out_token_object_map();


    // if(RUNTIME_STATE.meta_wrap_tokenz){
    //     writeOutTokenz( RUNTIME_STATE.meta_wrap_tokenz );
    // } else if(RUNTIME_STATE.markdown_data && RUNTIME_STATE.json_txtz){
    //     writeOutTokenz( RUNTIME_STATE.json_txtz );
    //     //todo rename json_txtz to json_key_tokenz
    // } else {
    //     console.log('no markdown output')
    // }


}

const main = async () => {
    console.log('START~aWORDZa~TOKENIZER!!!')
    /// PROCESS ARGUMENTS

    const args = process.argv; //OVERRIDE RUNTIME_STATE
    if(!args[2]){console.log('no LOOKUP PATH parameter')}
    else{
        RUNTIME_STATE.tgt_path_selection = args[2];
        console.log('PATH',RUNTIME_STATE.tgt_path_selection)
    }
    if(!args[3]){console.log('no SEARCH TYPE parameter')}
    else{
        RUNTIME_STATE.search_type_selection = args[3];
        console.log('TYPE',RUNTIME_STATE.search_type_selection)
    }
    if(!args[4]){console.log('no VERSION STAMP parameter')}
    else{
        RUNTIME_STATE.verz = args[4];
        console.log('VERSION',RUNTIME_STATE.verz)
    }
    if(!args[5]){console.log('no DATESTAMP parameter')}
    else{
        RUNTIME_STATE.datez = args[5];
        console.log('DATESTAMP',RUNTIME_STATE.datez)
    }

    let MAIN_PROCESS = async () => {
        console.log('0) MAIN_PROCESS - PIPELINE ')
        //1
        console.log('1) READ File(s): ', RUNTIME_STATE.lookup)
        if(RUNTIME_STATE.tgt_path_selection === 'all'){
            RUNTIME_STATE.markdown_data = await readAllMarkdownFiles(`../${RUNTIME_STATE.lookup}/`);
        } else {
            RUNTIME_STATE.lookup = RUNTIME_STATE.tgt_path_selection;
            RUNTIME_STATE.markdown_data = await readTGTMarkdownFile();
            // console.log('markdown_data', RUNTIME_STATE.markdown_data)
        }
        //2
        console.log('2) Send to Tokenizer: ', RUNTIME_STATE.lookup)
        // RUNTIME_STATE.json_txtz = Advanced_Tokenizer()
        Advanced_Tokenizer()

        //3 Separate TXT Population process.
        // console.log('3) POPULATE TXTZ: ')
        // delimit_METATXTZ()
        // console.log("DELIMITED DOCZ",RUNTIME_STATE.DOCZ_MARKDOWN_DATA.length)
        // console.log("DELIMITED SUBTXTZ",RUNTIME_STATE.SUBTXTZ_MARKDOWN_DATA.length)
        // populate_METATXTZ()


        //4 Wrap Metadata
        console.log('4) Wrap METADATA: ', RUNTIME_STATE.tgt_path_selection)
        RUNTIME_STATE.meta_wrap_tokenz = wrap_METADATA()
        //5 WRITE to FILE
        console.log('5) WRITE File(s) out: ', RUNTIME_STATE.lookup)
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
//O sub_tokenz = {sub_tokenz:[]}   //..._...
//O quote_tokenz = {type:quote,txtz:[]} //>
//O txt_tokenz = {type:txt,txtz:[]}
//O list_tokenz = {type:list,txtz[]}
//O master_tokenz = FILE.md like aWORDZa_YMD_2020_10_01.json

//O delimiter_map = {1:_aWORDZa_, 8:>}





