const db = require("../../models");
const fileHelper = require("../../util/delete.file");
const HomeBanner = db.homebanner;

exports.addHomeBanner = async (req, res) => {
    try {
        if (!req.file) {
            return res.send(`You must select a Image.`);
        }
        await HomeBanner.create({
            image: req.file.filename
        }).then(data => {
            res.status(201).send(`Banner added with Id: ${data.id}`);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while uploading Banner."
            });
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getAllBanner = async (req, res) => {
    try {
        const homeBanners = await HomeBanner.findAll();
        res.status(200).send(homeBanners);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.deleteBanner = async (req, res) => {
    try {
        const id = req.params.id;
        const homeBanners = await HomeBanner.findOne({ where: { id: id } });
        if (!homeBanners) {
            return res.send(`Fail to delete: Id is not present`);
        }
        fileHelper.deleteFile(homeBanners.image);

        await homeBanners.destroy();
        res.status(200).send(`Banner deleted with Id: ${id}`);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.updateBanner = async (req, res) => {
    try {

        let imagePath;
        const id = req.params.id;
        const homeBanners = await HomeBanner.findOne({ where: { id: id } });
        if (!homeBanners) {
            return res.send(`Fail to update: Id is not present`);
        }
        if (req.file) {
            fileHelper.deleteFile(homeBanners.image);
            imagePath = req.file.filename;
        }
        await homeBanners.update({
            image: imagePath
        }).then(() => {
            res.status(200).send(`Banner updated with Id: ${id}`);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating Banner."
            });
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}