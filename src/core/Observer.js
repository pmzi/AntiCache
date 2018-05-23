const fs = require('fs');

class Observer{

    constructor(files){
        
        for(let file of files){

            this.lookForTags(file);

        }

    }

    lookForTags(file){

        const contentOfTheFile = fs.readFileSync(file,"utf8");

    }

}

module.exports = Observer;