const upload = require('../middleware/upload');
const MongoClient = require('mongodb').MongoClient;
const GridFsStorage = require('mongodb').GridFSBucket;
const url = "mongodb+srv://webdev:MeinCoolesPassword@cluster0.2snr7nl.mongodb.net/?retryWrites=true&w=majority"
const mongoClient = new MongoClient(url);
const uploadFiles = async (req, res)=> {
    try{
        await upload(req, res);
        console.log(req.file);
        if(req.file == undefined){
            return res.send({
                message: 'No file selected'
            });
        }
        return res.send({
            message: 'File uploaded successfully'
        })
        
    }catch(err){
        return res.send({
            message: err
        })
    }
};

const download = async (req, res)=> {
    try{
        await mongoClient.connect();
        const bucket = new GridFSBucket(url, {bucketName: 'images'});
        let downloadStream = bucket.openDownloadStreamByName(req.params.filename);
        downloadStream.on('data', function(chunk) {
            res.write(chunk);
        }
        ).on('error', function(err) {
            res.send(err);
        }
        ).on('end', function() {
            res.end();
        }
        );
    }catch(err){
        return res.send({
            message: err
        });
    }
}

module.exports = {
    uploadFiles,
    download
}