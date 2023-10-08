

const videoDetail = (req, res) =>{
    res.status(201).set("content-type", "application/json")
    .send(JSON.stringify({
        "filename" : req.body.fileName
    }));
}


module.exports = {
    videoDetail
}