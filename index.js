const express = require("express");
const multer = require("multer");
const sharpify = require("./server/sharpify");
require("dotenv").config();
const S3 = require("./server/aws");


const app = express();
const port = 3001;

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
    // Compressing
    const buffer = await sharpify.compress(req.file.buffer).then(buffer => {
        // Uploading to s3 bucket
        S3.send(buffer, req.file.originalname).then(r => {
            console.log("File uploaded");
            res.status(200).send("File uploaded");
        }).catch(err => {
            console.error(err);
            res.status(500).send("Failed to upload file");
        })
    }).catch(e => {
        console.error(e);
        res.status(500).send(e);
    });
});

app.listen(port);
console.log("3001 is the port");