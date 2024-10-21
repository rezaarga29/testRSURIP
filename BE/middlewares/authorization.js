const { Cuisine, Category, User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authorization = async (req, res, next) => {
  try {
    let cuisine = await Cuisine.findByPk(req.params.id);
    let user = await User.findByPk(req.user.id);
    if (!cuisine) {
      throw { name: "InvalidInput" };
    }
    //! id yang membedakan admin dan staff
    if (user.role == "admin") {
      next();
    } else if (cuisine.authorId !== req.user.id) {
      throw { name: "Forbidden" };
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const authorizationAdmin = async (req, res, next) => {
  try {
    let user = await User.findByPk(req.user.id);

    if (user.role === "admin") {
      next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authorization, authorizationAdmin };
