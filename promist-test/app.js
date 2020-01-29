const fs = require("fs");
const path = require("path");

const getFiles = fileName => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "files", fileName), function(
            error,
            data
        ) {
            if (error) {
                reject(error);
                return;
            }
            if (data) {
                resolve(JSON.parse(data.toString()));
            }
        });
    });
};
// getFiles('a.json').then((aData) => {
//     console.log(aData);
//     return getFiles(aData.next)
// }).then(bData => {
//     console.log(bData);
//     return getFiles(bData.next)
// }).then(cData => {
//     console.log(cData);
// })

const getData = async () => {
    try {
        const aData = await getFiles("a.json");
        console.log(aData);
        const bData = await getFiles(aData.next);
        console.log(bData);
        const cData = await getFiles(bData.next);
        console.log(cData);
    } catch (error) {
        console.log(error);
    }
};
getData();
