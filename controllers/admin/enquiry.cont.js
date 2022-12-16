const db = require("../../models");
const Enquiry = db.enquiry;

exports.addEnquiry = async (req, res) => {
    try {
        await Enquiry.create({
            name: req.body.name,
            email: req.body.email,
            massage: req.body.massage,
            phoneNumber: req.body.phoneNumber
        }).then(data => {
            res.status(201).send(`Enquiry added with Id: ${data.id}`);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while uploading Enquiry."
            });
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getAllEnquiry = async (req, res) => {
    try {
        const enquiries = await Enquiry.findAll();
        res.status(200).send(enquiries);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.deleteEnquiry = async (req, res) => {
    try {
        const id = req.params.id;
        const enquiries = await Enquiry.findOne({ where: { id: id } });
        if (!enquiries) {
            return res.send(`Fail to delete: Id is not present`);
        }
        await enquiries.destroy();
        res.status(200).send(`Enquiry deleted with Id: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.updateEnquiry = async (req, res) => {
    try {
        const id = req.params.id;
        const enquiries = await Enquiry.findOne({ where: { id: id } });
        if (!enquiries) {
            return res.send(`Fail to update: Id is not present`);
        }
        await enquiries.update({
            name: req.body.name,
            email: req.body.email,
            massage: req.body.massage,
            phoneNumber: req.body.phoneNumber
        }).then(() => {
            res.status(200).send(`Enquiry updated with Id: ${id}`);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating Enquiry."
            });
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}