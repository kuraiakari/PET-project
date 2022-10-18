import { DataTypes, Model } from 'sequelize'
import db from '../config/dbconfig'

export class Product extends Model {}
Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    like: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    promotion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    producer: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: db,
    modelName: 'product',
})
