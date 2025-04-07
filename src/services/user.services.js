const { where } = require("sequelize");
const db = require("../db/models");

async function registerUser(req) {
  let transactions = await db.sequelize.transaction();
  try {
    const user = await db.users.create(
      {
        ...req.body,
      },
      { transactions }
    );
    await transactions.commit();
    return user;
  } catch (error) {
    if (transactions) {
      await transactions.rollback();
    }
    throw error;
  }
}

async function userLogin(req) {
  const { name, password } = req.body;
  let transaction = await db.sequelize.transaction();
  try {
    const user = await db.users.findOne(
      {
        where: { name, password },
      },
      { transaction }
    );
    await transaction.commit();
    return user;
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    throw error;
  }
}

module.exports = {
  registerUser,
  userLogin,
};
