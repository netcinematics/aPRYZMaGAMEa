const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const readFiles = async (dirname) => {
    try {
        const filenames = await readdir(dirname);
        console.log("2) all file names:", filenames, filenames.length);
        const files_promise = filenames.map(filename => {
            return readFile(dirname + filename, 'utf-8');
        });
        const response = await Promise.all(files_promise);
        // console.log("3) ALL FILES TXT: ",{ response })
        //return response
        return filenames.reduce((accumulator, filename, currentIndex) => {
            const content = response[currentIndex];
            accumulator[filename] = { content };
            return accumulator;
        }, {});
    } catch (error) {
        console.error(error);
    }
};

function writeOutTokenz(tokenz){
    let lookup = "aWORDZa_test.json"
    fs.writeFile("../CARDZ/"+lookup, JSON.stringify(tokenz), err => {
        if (err) { console.error(err); } //dehydrate with JSON.parse()
        console.log('4) Write to file',lookup)
    });
}

const main = async () => {
    let lookup = "LIBZ"
    console.log('1) Read All File in: ', lookup)
    const response = await readFiles(`../${lookup}/`);
    writeOutTokenz( response );
};
main();