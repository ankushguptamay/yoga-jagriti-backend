module.exports = (sequelize, DataTypes) => {
    const Shop = sequelize.define("shop", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productName: {
            type: DataTypes.STRING,
        },
        actualPrice: {
            type: DataTypes.DOUBLE,
        },
        offerPrice: {
            type: DataTypes.DOUBLE,
        },
        productDescription: {
            type: DataTypes.TEXT,
        },
        productImages: {
            type: DataTypes.TEXT,
        }
    })
    return Shop;
}