// EXAMPLE
// node parameter_test 123 321

function main(){
    const args = process.argv;
    if(!args[2]){console.log('no lookup file parameter')}
    else{console.log("PARAM 1) Lookup", args[2]);}
    if(!args[3]){console.log('no parameter for search type')}
    else{console.log("PARAM 2) Type", args[3]);}
 }

 main();