const fs = require('fs');

const deleteSingleFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            throw(err);
        }
    })
}

exports.deleteSingleFile = deleteSingleFile;