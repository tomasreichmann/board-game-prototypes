const fs = require("fs");

export default function getFiles(dir: string, previousFiles?: string[]) {
    previousFiles = previousFiles || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var name = dir + "/" + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, previousFiles);
        } else {
            previousFiles.push(name);
        }
    }
    return previousFiles;
}
