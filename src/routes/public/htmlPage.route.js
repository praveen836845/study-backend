const htmlRoute = require("express").Router();
const fs = require("fs");
const path=require('path');

htmlRoute.get("/", (req, res) =>{
    fs.readFile(path.join(__dirname,"..", "..", "..", "/public", 'upload.html'),(err,data)=>{
        if(err){
          throw err
        }
        res.end(data)
      })
});

// htmlRoute.get("/video", function(req, res){
//   // res.sendFile(__dirname + "/index.html");
//   res.sendFile(path.join(__dirname,"..", "..", "..", "/public",'index.html'));
// });

htmlRoute.get("/get", function(req, res){
  const range = req.headers.range;
  if(!range){
    res.status(400).send("Require Range headers");
  }
 
  // const videoPath = `${__dirname}/Volkswagen.mp4`;
  req.body.filename = "1696580298152-177183969VolkswagenGTIReview.mp4";
  const videoPath =  path.join(__dirname,"..", "..", "..", "/public","video", req.body.filename);
  console.log(videoPath);
  const videoSize = fs.statSync(videoPath).size;
  console.log("video size is : " , videoSize);
  const chunkSize = 10**6 // 1 mb
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + chunkSize , videoSize -1);
  const contentLength = end-start+1;
  const headers = {
    "Content-Range" : `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges" : 'bytes',
    "content-length" : contentLength,
    "Content-Type" : "video/mp4"
  }

  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, {start , end});
  videoStream.pipe(res);

})

module.exports = htmlRoute;