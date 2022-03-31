const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "dz4wlcxs5",
    api_key: "463652762533881",
    api_secret: "QTVzA0BrmOOjWhmOxIeEfc-WAfM",
});

module.exports = { cloudinary };