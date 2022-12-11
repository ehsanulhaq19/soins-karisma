const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
 process.env.DATABASE_USER,
 process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql'
  }
);

const User = sequelize.define(
  "User",
  {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
      },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
  },
  {
      
  }
);

sequelize.sync().then(() => {
    console.log('User table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

module.exports = User