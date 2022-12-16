module.exports = (sequelize, DataTypes) => {
    const Testimonial = sequelize.define("testimonial", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        designation: {
            type: DataTypes.TEXT,
        },
        testimoni: {
            type: DataTypes.TEXT
        }
    })
    return Testimonial;
}