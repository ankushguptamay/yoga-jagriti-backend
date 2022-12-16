module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define("course", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        courseName: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DOUBLE,
        },
        eligibility: {
            type: DataTypes.STRING,
        },
        duration: {
            type: DataTypes.STRING,
        },
        age: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        }
    })
    return Course;
}