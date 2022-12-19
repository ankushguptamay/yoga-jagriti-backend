const e = require("express");
const db = require("../../models");
const Shop = db.shop;
const multiFileHelper = require("../../util/delete.multi.file");

exports.addProduct = async (req, res) => {
    try {
        if (req.files.length <= 0) {
            return res.send(`You must select at least 1 Image.`);
        }
        const fileNameArray = (req.files).map((file => { return file.filename }));
        const fileNameSting = fileNameArray.toString();

        await Shop.create({
            productName: req.body.productName,
            actualPrice: req.body.actualPrice,
            offerPrice: req.body.offerPrice,
            productDescription: req.body.productDescription,
            productImages: fileNameSting
        }).then(data => {
            // console.log("some error")
            res.status(201).send(`product added with Id: ${data.id}`);
        }).catch(err => {
            console.log("some error")
            res.status(500).send({
                message: err.message || "Some error occurred while uploading Product."
            });
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getAllProduct = async (req, res) => {
    try {
        const products = await Shop.findAll();
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const products = await Shop.findOne({ where: { id: id } });
        if (!products) {
            return res.send(`Fail to delete: Id is not present`);
        }
        const data = (products.productImages).split(',');

        // const ImagePath = data.map((path => { return ("/home/rajat_gupta5/Ankush/yoga-jagriti/resources/save-multi-image/").concat(path) }));

        multiFileHelper.deleteMultiFile(data);
        await products.destroy();
        res.status(200).send(`Product deleted with Id: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.deleteOnlyImages = async (req, res) => {
    try {
        const imageArray = [];
        const id = req.params.id;
        const products = await Shop.findOne({ where: { id: id } });
        if (!products) {
            return res.send(`Fail to delete images: Id is not present`);
        }
        const backendImageArray = (products.productImages).split(',');
        const reqImage= req.body.productimages;
        backendImageArray.forEach((value)=>{
            if(reqImage.includes(value)===false){
                imageArray.push(value);
            }
        })
        const imageString = imageArray.toString();

        multiFileHelper.deleteMultiFile(reqImage);
        await products.update({
            ...products,
            productImages: imageString
        }).then(() => {
            res.status(200).send(`Images deleted with Id: ${id}`);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while deleteing Images."
            });
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.udateproduct = async (req, res) => {
    try {
        let imageString;
        const id = req.params.id;
        const products = await Shop.findOne({ where: { id: id } });
        if (!products) {
            return res.send(`Fail to delete images: Id is not present`);
        }
        const backendImageArray = (products.productImages).split(',');
        if (req.files) {
            const fileNameArray = (req.files).map((file => { return file.filename }));
            const imageArray = backendImageArray.concat(fileNameArray);
            imageString = imageArray.toString();
        }

        await products.update({
            productName: req.body.productName,
            actualPrice: req.body.actualPrice,
            offerPrice: req.body.offerPrice,
            productDescription: req.body.productDescription,
            productImages: imageString
        }).then(() => {
            res.status(200).send(`Product updated with id: ${id}`);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating Product."
            });
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
