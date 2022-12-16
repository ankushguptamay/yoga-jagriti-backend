module.exports = (app) => {
    const course = require('../controllers/admin/course.cont');
    const enquiry = require('../controllers/admin/enquiry.cont');
    const homeBanner = require('../controllers/admin/homebanner.cont');
    const shop = require('../controllers/admin/shop.cont');
    const testimonial = require('../controllers/admin/testimonial.cont');
    //middleware
    const uploadSingleImage = require('../middlewares/upload.single.image');
    const uploadMultiImage = require('../middlewares/upload.multi.image');

    const router = require('express').Router();

    router.post("/add-courses", uploadSingleImage.single("courseimage"), course.addCourse);
    router.get("/courses", course.getAllCourse);
    router.delete("/delete-courses/:id", course.deleteCourse);
    router.put("/update-courses/:id", uploadSingleImage.single("courseimage"), course.updateCourse);

    //<input type="file" name="homebanner"/>
    router.post("/add-homebanners", uploadSingleImage.single("bannerimage"), homeBanner.addHomeBanner);
    router.get("/homebanners", homeBanner.getAllBanner);
    router.delete("/delete-homebanners/:id", homeBanner.deleteBanner);
    router.put("/update-homebanners/:id", uploadSingleImage.single("bannerimage"), homeBanner.updateBanner);

    router.post("/add-enquiries",  enquiry.addEnquiry);
    router.get("/enquiries", enquiry.getAllEnquiry);
    router.delete("/delete-enquiries/:id", enquiry.deleteEnquiry);
    router.put("/update-enquiries/:id", enquiry.updateEnquiry);

    router.post("/add-products", uploadMultiImage.array("productimages", 10), shop.addProduct);
    router.get("/products", shop.getAllProduct);

    router.post("/add-testimonies",  testimonial.addTestimonial);
    router.get("/testimonies", testimonial.getAllTestimonial);
    router.delete("/delete-testimonies/:id", testimonial.deleteTestimonial);
    router.put("/update-testimonies/:id", testimonial.updateTestimonial);

    app.use("/api/jagriti", router);

};