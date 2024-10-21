'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Karyawan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Karyawan.init({
    Nama: DataTypes.STRING,
    Tgl_Lahir: DataTypes.DATE,
    Gaji: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Karyawan',
  });
  return Karyawan;
};