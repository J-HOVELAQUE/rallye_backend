//// A controller that record a photo in cloudinary and bind it to user via token  ////
const cloudinary = require('cloudinary').v2;
const config = require('config');
const fs = require('fs');
const uniquid = require('uniqid');






cloudinary.config({
    cloud_name: config.get('cloudinary.cloud_name'),
    api_key: config.get('cloudinary.api_key'),
    api_secret: config.get('cloudinary.api_secret')
});


async function changeAvatar(req, res) {

    console.log('DATA', req.files);

    // const imagePath = './tmp/' + uniquid() + '.jpg';
    // const resultCopy = await req.files.photo.mv(imagePath);
    // const resultCloudinary = await cloudinary.uploader.upload(imagePath);

    // console.log('Result CLOUD', resultCloudinary);

    // if (!resultCopy) {
    //     res.json({ result: true, message: 'File uploaded!', info: resultCloudinary });
    // } else {
    //     res.json({ result: false, message: resultCopy });
    // }

    // fs.unlinkSync(imagePath);
}

module.exports = changeAvatar;