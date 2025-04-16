const db = require("../db/models");
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError.js');
const { encryptData } = require('../utils/auth.js');
const db = require('../db/models/index.js');

async function registerUser(req) {
  let transaction = await db.sequelize.transaction();
  const { email, password } = req.body;
  const hashedPassword = await encryptData(password);
  try {
      const user = await db.users.findOne(
        { where: { email } }
      )
      if(user){
        throw new ApiError(httpStatus.CONFLICT, 'This email is already registered')
      }  
      let role = await db.roles.findOne({
        where: { role_type : 'USER'},
      })
      if(!role){
        role = await db.role.create({
          name: 'user',
          role_type: 'USER',
        })
      }
      const createUser = await db.user.create({
        ...req.body,
        password: hashedPassword,
        role_id: role.id,
      },
      { transaction }
    )
    const userObj = createUser.get({ plain: true });
    await transaction.commit();
    delete userObj.password;
    return userObj;
  } catch (error) {
    if(transaction) {
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
      const admin = await db.users.findOne(
        { where: { email } }
      )
      if(admin){
        throw new ApiError(httpStatus.CONFLICT, 'This email is already registered')
      }  
      let role = await db.roles.findOne({
        where: { role_type : 'ADMIN'},
      })
      if(!role){
        role = await db.role.create({
          name: 'admin',
          role_type: 'ADMIN',
        })
      }
      const createAdmin = await db.user.create({
        ...req.body,
        password: hashedPassword,
        role_id: role.id,
      },
      { transaction }
    )
    const userObj = createAdmin.get({ plain: true });
    await transaction.commit();
    delete userObj.password;
    return userObj;
  } catch (error) {
    if(transaction) {
      await transaction.rollback();
    }
    throw error;
  } 
}

module.exports = {
  registerUser,
  registerAdmin,
};
