const busboy = require('connect-busboy');  
const path = require('path');               
const fs = require('fs-extra');              

const uploadPath = path.join(__dirname, "..","..", "/public", 'video'); 
fs.ensureDir(uploadPath);

const uploadVideo = (req, res, next) =>{

    req.pipe(req.busboy); // Pipe it trough busboy

    req.busboy.on('file', (fieldname, file, filename) => {

        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + filename.filename;
        console.log(`Upload of '${filename}' started`);
 
        const fstream = fs.createWriteStream(path.join(uploadPath, uniqueSuffix));
        // Pipe it trough
        file.pipe(fstream);
 
        // On finish of the upload
        fstream.on('close', () => {
            console.log(`Upload of '${filename}' finished`);
            req.body.fileName = uniqueSuffix;
            // res.redirect('back');
            next();
        });
    });
}



module.exports = {
    uploadVideo,
};