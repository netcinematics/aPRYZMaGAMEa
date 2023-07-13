'use strict';
const fs = require('fs');

//in - out : template : use to TEST minimal INPUT AND OUT i/o
//READ in FILES, modify, WRITE out FILES
//TXT in, MD in, OBJ out.

function standardTokenizer(data){
    let tokenz = data.split(' ')
    let cleanToken = '', index1=0, index2=0;
    console.log('Created tokenz: ',tokenz.length)
    
    let cleanTokenz = [];
    for(let i = 0; i<tokenz.length; i++){ //CLEAN-TOKENZ
        // if(tokenz.indexOf('~')>-1){
        if(countLetters(tokenz[i], '~')===2){
            index1 = tokenz[i].indexOf('~')
            index2 = tokenz[i].lastIndexOf('~')
            cleanToken = tokenz[i].substring(index1,index2)
            console.log('tgtz: ',cleanToken)
            cleanTokenz.push(cleanToken)
        }
    }

    let objectTokenz = [];
    for(let i = 0; i<cleanTokenz.length; i++){ //OBJECTIFY-TOKENZ
        objectTokenz.push({"title":cleanTokenz[i]})
    }
    console.log(('objz',objectTokenz.count))

    writeOutTokenz( objectTokenz );

}

function countLetters(token, tgt) {
        return token.split(tgt).length - 1;
}

function writeOutTokenz(tokenz){
    let lookup = "aBETTaWORDZa.txt"
    fs.writeFile("../libz/"+lookup, JSON.stringify(tokenz), err => {
        if (err) { console.error(err); } //dehydrate with JSON.parse()
    });
}

function appendTokenz(tokenz){

    const content = 'Some content!';
    
    fs.appendFile('file.log', content, err => {
      if (err) {
        console.error(err);
      }
      // done!
    });
}

function main(){
    console.log("Running Script...")
    let lookup = "aWORDZa";
    fs.readFile("../libz/"+lookup+".md", 'utf8', (err, data) => {
        if (err) {
            console.log("File not found: ", lookup)
        } else {
            console.log("Reading: ", lookup)
            standardTokenizer(data);
        }
    });
    
}

main();