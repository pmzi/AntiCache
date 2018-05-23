const fs = require('fs');

class Observer{

    constructor(files){

        this.files = [];
        
        for(let file of files){

            if(this.changeFileExistance(file)){
                this.files.push(file);
                this.lookForTags(file);
            }

        }

    }

    observe(file){
        if(this.changeFileExistance(file)){
            this.files.push(file);
            this.lookForTags(file);
        }

    }

    lookForTags(file){

        let contentOfTheFile = fs.readFileSync(file,"utf8");

        let result = /<script(?=.*data-nc).+src=(['"])(.+)\1>.*<\/script>/i.exec(contentOfTheFile);

        let address = result[2];

        fs.watch(address,{encoding:'utf8'},(eventType,fileName)=>{
            
            this.changeFileContent(file,result[0],address);

        });

    }

    changeFileExistance(file){

        if(fs.existsSync(file)){
            return true;
        }
        return false;

    }

    changeFileContent(file, tag, address){

        let fileContent = fs.readFileSync(file,"utf8");

        let newTag = tag.replace(address,`${address}?cache=`+Math.random());

        fileContent = fileContent.replace(tag,newTag);

        fs.writeFileSync(file, fileContent);

    }

}

module.exports = Observer;