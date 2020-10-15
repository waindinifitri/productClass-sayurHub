'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    full_name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Insert your name,please!"
        },
      }
    },
    email: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Insert your email address,please!"
        },
        isEmail : {
          msg : "Should filled by an email format, thanks!"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Password should not be empty!"
        },
        is: {
          match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          msg: "Password minimum eight characters, at least one letter and one number"
        }
      }
    },
    profile_image: {
      type : DataTypes.STRING,
        validate : {
          notEmpty : {
            msg : "Upload your image here!"
          }
        }
      },
    description: DataTypes.TEXT,
    notification: DataTypes.STRING,
    role: {
      type : DataTypes.STRING,
      defaultValue : "Buyer"
    },
  },
    {
      hooks: {
        beforeBulkUpdate(users){
          users.attributes.password = encryptPwd(users.attributes.password)
        },
        beforeCreate(users){
          users.password = encryptPwd(users.password)
        }
      },
    sequelize,
    modelName: 'User',
  });
  return User;
};