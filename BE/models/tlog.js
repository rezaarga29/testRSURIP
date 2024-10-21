'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tlog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tlog.init({
    Tanggal: DataTypes.DATE,
    Jam: DataTypes.TIME,
    Keterangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tlog',
  });
  return Tlog;
};