const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

app.set('view engine', 'ejs');
app.set('views', 'views');

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


//Get Request
app.get("/", (req, res) => {
    return res.status(200).render("home");
});
app.get("/download", (req, res) => {
    let filename = req.query.filename;
    const file = `${__dirname}/uploads/${filename}`;
    res.download(file);
});
//Post Request
app.post('/upload', async(req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "myfile") to retrieve the uploaded file
            let myfile = req.files.myfile;
            let apple = "apple";

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            myfile.mv('./uploads/' + myfile.name);
            //send response
            // res.send({
            //     status: true,
            //     message: 'File is uploaded',
            //     data: {
            //         name: myfile.name,
            //         mimetype: myfile.mimetype,
            //         size: myfile.size
            //     }
            // });
            res.status(200).render("upload", { myfile: myfile });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

//start app 
const port = process.env.PORT || 3000;

app.listen(port, () =>
    console.log(`App is listening on port ${port}.`)
);