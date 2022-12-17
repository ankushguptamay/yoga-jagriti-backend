const db = require("../../models");
const fileHelper = require("../../util/delete.single.file");
const Course = db.course;

exports.addCourse = async (req, res) => {
    try {
        if (!req.file) {
            return res.send(`You must select a Image.`);
        }
        await Course.create({
            courseName: req.body.courseName,
            price: req.body.price,
            eligibility: req.body.eligibility,
            duration: req.body.duration,
            age: req.body.age,
            image: req.file.filename
        }).then(data => {
            // console.log("some error")
            res.status(201).send(`Course added with Id: ${data.id}`);
        }).catch(err => {
            console.log("some error")
            res.status(500).send({
                message: err.message || "Some error occurred while uploading Course."
            });
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getAllCourse = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.status(200).send(courses);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const courses = await Course.findOne({ where: { id: id } });
        if (!courses) {
            return res.send(`Fail to delete: Id is not present`);
        }
        fileHelper.deleteSingleFile(courses.image);
        await courses.destroy();
        res.status(200).send(`Course deleted with Id: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
// /home/rajat_gupta5/Ankush/yoga-jagriti/resources/save-single-images/1671191606431-Screenshot from 2022-12-05 13-05-35.png

exports.updateCourse = async (req, res) => {
    try {

        let imagePath;
        const id = req.params.id;
        const courses = await Course.findOne({ where: { id: id } });
        if (!courses) {
            return res.send(`Fail to update: Id is not present`);
        }
        if (req.file) {
            fileHelper.deleteSingleFile(courses.image);
            imagePath = req.file.filename;
        }
        await courses.update({
            courseName: req.body.courseName,
            price: req.body.price,
            eligibility: req.body.eligibility,
            duration: req.body.duration,
            age: req.body.age,
            image: imagePath
        }).then(() => {
            res.status(200).send(`Course updated with Id: ${id}`);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating Course."
            });
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}