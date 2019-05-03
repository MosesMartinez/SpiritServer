const express = require('express');
const app = express();
const im = require('imagemagick');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const tokenizer = require('object-hash');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(fileUpload({
//     useTempFiles: true,
//     tempFileDir: '/tmp/'
// }));

app.post('/', (req, res) => {

    // let filename = null;
    // let { img } = req.body
    // console.log(img)

    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        // res.writeHead(200, { 'content-type': 'text/plain' });
        // res.write('received upload:\n\n');
        // res.end(util.inspect({ fields: fields, files: files }));
        // console.log(files);

        const filename = files.image.path;
        const newFilename = tokenizer(Date.now());

        im.convert(['-background', 'white', '-gravity', 'center',
            filename, '-resize', '200x200', '-extent', '200x200',
            `../build/images/uploads/${newFilename}.jpg`],
            (err, result) => {
                if (err) {
                    res.send(err);
                    console.log(err);
                }
                else {
                    res.send(`/images/uploads/${newFilename}.jpg`);
                }
            })

        // res.send(files);
    });





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