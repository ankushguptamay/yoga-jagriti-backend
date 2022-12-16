const db = require("../../models");
const Shop = db.shop;

exports.addProduct = async (req, res) => {
    try {
        if (req.files.length <= 0) {
            return res.send(`You must select at least 1 file.`);
        }
        const FileName = (req.files).map((file => { return file.filename }))
        console.log(FileName);

        await Shop.create({
            productName: req.body.productName,
            actualPrice: req.body.actualPrice,
            offerPrice: req.body.offerPrice,
            productDescription: req.body.productDescription,
            productImages: FileName
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
