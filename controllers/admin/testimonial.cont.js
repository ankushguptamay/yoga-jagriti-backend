const db = require("../../models");
const Testimonial = db.testimonial;

exports.addTestimonial = async (req, res) => {
    try {
        console.log(req.body);
        let Testimoni;
        if(req.body.videoUrl){
            Testimoni = req.body.videoUrl;
        }else{
            Testimoni = req.body.massage;
        }
        await Testimonial.create({
            name: req.body.name,
            designation: req.body.designation,
            testimoni : Testimoni
        }).then(data => {
            res.status(201).send(`Testimoni added with Id: ${data.id}`);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while uploading Testimoni."
            });
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getAllTestimonial = async (req, res) => {
    try {
        const testimonies = await Testimonial.findAll();
        res.status(200).send(testimonies);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.deleteTestimonial = async (req, res) => {
    try {
        const id = req.params.id;
        const testimonies = await Testimonial.findOne({ where: { id: id } });
        if (!testimonies) {
            return res.send(`Fail to delete: Id is not present`);
        }
        await testimonies.destroy();
        res.status(200).send(`Testimoni deleted with Id: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.updateTestimonial = async (req, res) => {
    try {
        const id = req.params.id;
        const testimonies = await Testimonial.findOne({ where: { id: id } });
        if (!testimonies) {
            return res.send(`Fail to update: Id is not present`);
        }
        let Testimoni;
        if(req.body.videoUrl){
            Testimoni = req.body.videoUrl;
        }else{
            Testimoni = req.body.massage;
        }
        await testimonies.update({
            name: req.body.name,
            designation: req.body.designation,
            testimoni : Testimoni
        }).then(data => {
            res.status(200).send(`Testimoni updated with Id: ${id}`);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating Testimoni."
            });
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}