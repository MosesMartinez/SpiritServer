const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const im = require('imagemagick');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const image2base64 = require('image-to-base64');
const base64Img = require('base64-img');

// app.use(fileUpload({
//     useTempFiles: true,
//     tempFileDir: '/tmp/'
// }));

app.post('/', upload.single('img'), (req, res) => {

    let { filename } = req.file;

    im.convert(['-background', 'white', '-gravity', 'center',
        `uploads/${filename}`, '-resize', '200x200', '-extent', '200x200', 'uploads/thumb.jpg'],
        (err, result) => {
            let data = base64Img.base64Sync(`uploads/thumb.jpg`);
            res.send(data);
        })



    // image2base64(`/uploads/${filename}`) // you can also to use url
    //     .then(
    //         (response) => {
    //             console.log(response); //cGF0aC90by9maWxlLmpwZw==
    //             res.send(response);
    //         }
    //     )
    //     .catch(
    //         (error) => {
    //             console.log(error); //Exepection error....
    //             res.sendStatus(500);
    //         }
    //     )

    // res.send(req.files);

    // req.files.mv()

    // im.convert([
    //     '-background', 'white',
    //     '-gravity', 'center',
    //     req.files.img.tempFilePath,
    //     '-resize', '200x200',
    //     '-extent', '200x200',
    //     'PNG:-', '|', 'base64'],
    //     (err, result) => {
    //         console.log(result);
    //         console.log(err);
    //     });

    // im.convert(['/uploads/' + filename, '-', 'resize', '400x400', 'JPG:', '-', '|', 'base64'], (err, result) => {
    //     if (err) res.send(err);
    //     else res.send(result);
    // })


    // res.send(req.file);

})

app.get('/', (req, res) => {
    res.send('test')
})

app.listen(5006);