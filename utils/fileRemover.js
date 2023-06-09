import fs from 'fs';
import path from 'path';
const fileRemover = (filename) =>{
    fs.unlink(path.join(__dirname, '../uploads'), function(err){
        if(err && err.code=="ENOENT"){
            console.log(`Il file ${filename} non esiste, non sarà rimosso`);
        } else if(err){
            console.log(`C'è stato un errore durante l'eliminazione del file ${filename}`);
        } else {
            console.log(`Rimosso ${filename}`)
        }
    });
};
export {fileRemover};