const express = require("express");
const multer = require("multer");
const sharpify = require("./server/sharpify");
require("dotenv").config();
const S3 = require("./server/aws");

const app = express();

// set up multer
const storage = multer.memoryStorage();
const upload = multer({storage});

// set the view engine to ejs
app.set('view engine', 'ejs');

// upload form
app.get("/upload", (req, res) => {
    res.render("upload");
});

// upload request
app.post("/upload", upload.single("image"), async (req, res) => {
    if(!req.file){
        return res.status(400).json({error: "Image file is required"});
    }
    // Compressing
    const buffer = await sharpify.compress(req.file.buffer).then(buffer => {
        // Uploading to s3 bucket
        S3.send(req.file.originalname, buffer).then(r => {
            console.log("Image uploaded");
            res.status(200).json({message: "Image uploaded"});
        }).catch(err => {
            console.error(err);
            res.status(500).json({error: "Failed to upload file"});
        })
    }).catch(e => {
        res.status(400).json({error:"Unsupported image format"});
    });
});

module.exports = app;