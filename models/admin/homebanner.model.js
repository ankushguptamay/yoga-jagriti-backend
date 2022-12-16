module.exports = (sequelize, DataTypes) => {
    const HomeBanner = sequelize.define("homebanner", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        image: {
            type: DataTypes.STRING,
        }
    })
    return HomeBanner;
}