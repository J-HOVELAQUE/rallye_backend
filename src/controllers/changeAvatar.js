//// A controller that record a photo in cloudinary and bind it to user via token  ////
const cloudinary = require('cloudinary').v2;
const config = require('config');
const fs = require('fs');
const uniquid = require('uniqid');

const UserModel = require('../db/models/user');

cloudinary.config({
    cloud_name: config.get('cloudinary.cloud_name'),
    api_key: config.get('cloudinary.api_key'),
    api_secret: config.get('cloudinary.api_secret')
});

async function changeAvatar(req, res) {

    //// Record the photo in temp directory ////
    const imagePath = './tmp/' + uniquid() + '.jpg';
    const resultCopy = await req.files.avatar.mv(imagePath);

    //// Sending photo to cloudinary ////
    const resultCloudinary = await cloudinary.uploader.upload(imagePath);

    //// Record the url of the photo in database's users collection ////
    await UserModel.updateOne({ token: req.query.token }, { avatar: resultCloudinary.secure_url })

    if (!resultCopy) {
        res.json({ result: true, message: 'File uploaded!', avatar_url: resultCloudinary.secure_url });
    } else {
        res.json({ result: false, message: resultCopy });
    }

    //// Remove the photo from temp directory ////
    fs.unlinkSync(imagePath);
}

module.exports = changeAvatar;