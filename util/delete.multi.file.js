const fs = require('fs');

const deleteMultiFile = (filePath) => {
    filePath.map(path => fs.unlink(path, (err) => {
        if (err) {
            throw (err);
        }
    }))
}

exports.deleteMultiFile = deleteMultiFile;