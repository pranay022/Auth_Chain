const { status } = require("http-status");
const ApiError = require("../utils/ApiError.js");
const { encryptData } = require("../utils/auth.js");
const db = require("../db/models");
const { transport } = require("winston");

async function getUserByEmail(email) {
  const user = await db.users.findOne({
    include: [
      {
        model: db.roles,
        as: "role",
        attributes: ["role_type"],
      },
    ],
    raw: true,
  });
  return user;
}

async function registerUser(req) {
  let transaction = await db.sequelize.transaction();
  const { email, password } = req.body;
  const hashedPassword = await encryptData(password);
  try {
    const user = await db.users.findOne({ where: { email } });
    if (user) {
      throw new ApiError(status.CONFLICT, "This email is already registered");
    }
    let role = await db.roles.findOne({
      where: { role_type: "USER" },
    });
    if (!role) {
      role = await db.roles.create({
        name: "user",
        role_type: "USER",
      });
    }

    const createUser = await db.users.create(
      {
        ...req.body,
        password: hashedPassword,
        role_id: role.id,
      },
      { transaction }
    );
    const userObj = createUser.get({ plain: true });
    await transaction.commit();
    delete userObj.password;
    return userObj;
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    throw error;
  }
}

async function registerAdmin(req) {
  let transaction = await db.sequelize.transaction();
  const { email, password } = req.body;
  const hashedPassword = await encryptData(password);
  try {
    const admin = await db.users.findOne({ where: { email } });
    if (admin) {
      throw new ApiError(status.CONFLICT, "This email is already registered");
    }
    let role = await db.roles.findOne({
      where: { role_type: "ADMIN" },
    });
    if (!role) {
      role = await db.roles.create({
        name: "Admin",
        role_type: "ADMIN",
      });
    }
    const createAdmin = await db.users.create(
      {
        ...req.body,
        password: hashedPassword,
        role_id: role.id,
      },
      { transaction }
    );
    const userObj = createAdmin.get({ plain: true });
    await transaction.commit();
    delete userObj.password;
    return userObj;
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    throw error;
  }
}

async function adminApproval(req) {
  let transaction = await db.sequelize.transaction();
  const adminId = req.body.id;
  try {
    const updateAdmin = await db.users.update(
      { is_verifyed: true},
      {
        where: { id: adminId },
        attributes: { exclude: ['password'] },
        returning: true,
        raw: true,
        transaction,
      },
    ).then((data) => data[1]);
    await transaction.commit();
    const updateAdminObject = updateAdmin[0];
    return updateAdminObject;
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    throw error;
  }
}

async function userApproval(req) {
  let transaction = await db.sequelize.transaction();
  const userId = req.body.id;  
  try {
    const updateUser = await db.users.update(
      { is_verifyed: true},
      {
        where: { id: userId },
        attributes: { exclude: ['password'] },
        returning: true,
        raw: true,
        transaction,
      },
    ).then((data) => data[1]);
    await transaction.commit();
    const updateUserObject = updateUser[0];
    return updateUserObject;
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    throw error;
  }
}

async function getAllUsers() {
  const users = await db.users.findAll({
    include : [ 
      {
        model: db.roles,
        as : 'role',
        where: { role_type : 'USER' },
        attributes: [],
      }
    ],
    attributes: {
      exclude: [ 'password'],
    },
    order: [['created_at', 'DESC']]
  })
  return users;
}

async function getAlladmins() {
  const users = await db.users.findAll({
    include : [ 
      {
        model: db.roles,
        as : 'role',
        where: { role_type : 'ADMIN' },
        attributes: [],
      }
    ],
    attributes: {
      exclude: [ 'password'],
    },
    order: [['created_at', 'DESC']]
  })
  return users;
}

module.exports = {
  getUserByEmail,
  registerUser,
  registerAdmin,
  adminApproval,
  userApproval,
  getAllUsers,
  getAlladmins,
};
