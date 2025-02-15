const { User, Sequelize } = require("./../models");
const Op = Sequelize.Op;
let self = {};

/**
 * @description Get All Users
 * @type GET
 * @path /api/users
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.getAll = async (req, res) => {
  try {
    let data = await user.findAll({});
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

/**
 * @description Create New User
 * @type POST
 * @path /api/users/
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.createUser = async (req, res) => {
  if (!req.body.firstName || !req.body.lastName) {
    return res.status(400).send({
      success: false,
      message: "Content can not be empty!",
    });
  }
  try {
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    console.log("data", newUser);
    console.log("data", User);

    let data = await User.create(newUser);
    return res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};
/**
 * @description Get Single User info by id
 * @type GET
 * @path /api/users/:id
 * @param {*} req
 * @param {*} res
 * @param {Number} — id — user id
 * @returns JSON
 */
self.get = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await user.findByPk(id);
    if (data)
      return res.status(200).json({
        success: true,
        data: data,
      });
    else
      return res.status(400).json({
        success: false,
        error: "No such user present",
        data: [],
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
/**
 * @description Update User data
 * @type PUT
 * @path /api/users/:id
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let data = await user.update(body, {
      where: {
        id: id,
      },
    });
    if (data[0] === 0) {
      return res.status(200).json({
        success: false,
        error: "No user found with this id",
      });
    }
    return res.status(200).json({
      success: true,
      "number of rows changed": data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
/**
 * @description Delete user with the specified id in the request
 * @type DELETE
 * @path /api/users/:id
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await user.destroy({
      where: {
        id: id,
      },
    });
    if (data === 1) {
      return res.status(200).json({
        success: true,
        message: `User with id=${id} deleted`,
      });
    }
    return res.status(200).json({
      success: false,
      message: `User with id=${id} is not present.`,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: error,
    });
  }
};
/**
 * @description Delete all users from the database
 * @type DELETE
 * @path /api/users/
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.deleteAll = async (req, res) => {
  try {
    let data = await user.destroy({
      where: {},
      truncate: true,
    });
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
module.exports = self;
