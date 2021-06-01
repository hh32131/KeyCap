var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
var keyboardPath = 'public/json';
var router = express.Router();
var fs = require('fs');


app.use(cors())

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.body)
        cb(null, keyboardPath)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname )
        // cb(null, Date.now() + '-' +file.originalname )
    }
})
app.post('/upload', function(req, res) {
    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })
});

app.post('/keyboardList',function(req, res) {
    fs.readdir(keyboardPath, function(error, filelist){
        console.log("[KEYBOARD_LIST]  " + filelist);
        return res.status(200).send(filelist);
    })

});

app.listen(8000, function() {

    console.log('App running on port 8000');

});