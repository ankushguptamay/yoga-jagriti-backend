const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../resources/save-multi-image`));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg", "image/jpg"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} is invalid. Only accept png/jpeg/jpg.`;
      return callback(message, null);
    }

    var filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  }
});

uploadFiles = multer({ storage: storage });

module.exports = uploadFiles;