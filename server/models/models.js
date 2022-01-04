const {DataTypes} = require('sequelize')
const sequelize = require('../utils/db')


const Track = sequelize.define('track', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    track_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    audio: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
})


module.exports = {
    Track
}