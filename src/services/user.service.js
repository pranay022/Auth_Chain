const { status } = require("http-status");
const ApiError = require("../utils/ApiError.js");
const { encryptData } = require("../utils/auth.js");
const db = require("../db/models");
const config = require("../config/config.js");
const { profile } = require("winston");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

async function getUserByEmail(email) {
  const user = await db.users.findOne({
    where: { email },
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
        name: "User",
        role_type: "USER",
      });
    }
    if (!req.file) {
      throw new ApiError(status.BAD_REQUEST, "Please upload a profile image");
    }
    let result;
    if (req.file ) {
      try {
        const file = req.file;
        const base64Image = `data:${
          file.mimetype
        };base64,${file.buffer.toString("base64")}`;
        result = await cloudinary.uploader.upload(base64Image, {
          folder: "auth_chain",
        });
        if (!result || !result.secure_url) {
          throw new ApiError(status.INTERNAL_SERVER_ERROR, "Cloudinary upload failed");
        }
      } catch (error) {
        throw new ApiError(status.INTERNAL_SERVER_ERROR, "Image upload error", error);
      }
    }

    const createUser = await db.users.create(
      {
        ...req.body,
        password: hashedPassword,
        role_id: role.id,
        profile_img: result.secure_url,

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
    if (!req.file) {
      throw new ApiError(status.BAD_REQUEST, "Please upload a profile image");
    }
    let result;
    if (req.file ) {
      try {
        const file = req.file;
        const base64Image = `data:${
          file.mimetype
        };base64,${file.buffer.toString("base64")}`;
        result = await cloudinary.uploader.upload(base64Image, {
          folder: "auth_chain",
        });
        if (!result || !result.secure_url) {
          throw new ApiError(status.INTERNAL_SERVER_ERROR, "Cloudinary upload failed");
        }
      } catch (error) {
        throw new ApiError(status.INTERNAL_SERVER_ERROR, "Image upload error", error);
      }
    }
    
    const createAdmin = await db.users.create(
      {
        ...req.body,
        password: hashedPassword,
        role_id: role.id,
        profile_img: result.secure_url,
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
  const adminId = req.query.id;
  try {
    const updateAdmin = await db.users
      .update(
        { is_verifyed: true },
        {
          where: { id: adminId },
          returning: true,
          raw: true,
          transaction,
        }
      )
      .then((data) => data[1]);
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
  const userId = req.query.id;
  try {
    const user = await db.users.findOne({ where: { id: userId } });
    if (!user) {
      throw new ApiError(status.NOT_FOUND, "User not found");
    }
    if (!user.profile_img) {
      throw new ApiError(
        status.BAD_REQUEST,
        "User profile image not found update the profile image first"
      );
    }
    const updateUser = await db.users
      .update(
        { is_verifyed: true },
        {
          where: { id: userId },
          returning: true,
          raw: true,
          transaction,
        }
      )
      .then((data) => data[1]);
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
    include: [
      {
        model: db.roles,
        as: "role",
        where: {
          role_type: {
            [db.Sequelize.Op.in]: ["USER", "GUEST"],
          },
        },
        attributes: [],
      },
    ],
    attributes: {
      exclude: ["password"],
    },
    order: [["created_at", "DESC"]],
  });
  return users;
}

async function getAlladmins() {
  const users = await db.users.findAll({
    include: [
      {
        model: db.roles,
        as: "role",
        where: { role_type: "ADMIN" },
        attributes: [],
      },
    ],
    attributes: {
      exclude: ["password"],
    },
    order: [["created_at", "DESC"]],
  });
  return users;
}

async function registerGuest(req) {
  let transaction = await db.sequelize.transaction();
  const { email, password } = req.body;
  const hashedPassword = await encryptData(password);
  try {
    const admin = await db.users.findOne({ where: { email } });
    if (admin) {
      throw new ApiError(status.CONFLICT, "This email is already registered");
    }
    let role = await db.roles.findOne({
      where: { role_type: "GUEST" },
    });
    if (!role) {
      role = await db.roles.create({
        name: "Guest",
        role_type: "GUEST",
      });
    }
    const createGuest = await db.users.create(
      {
        ...req.body,
        password: hashedPassword,
        role_id: role.id,
      },
      { transaction }
    );
    const userObj = createGuest.get({ plain: true });
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

async function updateGuest(req) {
  let transaction = await db.sequelize.transaction();
  const guestId = req.user.id;
  try {
    if (!req.file) {
      throw new ApiError(status.BAD_REQUEST, "Please upload a profile image");
    }
    let result;
    if (req.file ) {
      try {
        const file = req.file;
        const base64Image = `data:${
          file.mimetype
        };base64,${file.buffer.toString("base64")}`;
        result = await cloudinary.uploader.upload(base64Image, {
          folder: "auth_chain",
        });
        if (!result || !result.secure_url) {
          throw new ApiError(status.INTERNAL_SERVER_ERROR, "Cloudinary upload failed");
        }
      } catch (error) {
        throw new ApiError(status.INTERNAL_SERVER_ERROR, "Image upload error", error);
      }
    }
    
    const updateGuest = await db.users
      .update(
        { profile_img: result.secure_url },
        {
          where: { id: guestId },
          returning: true,
          raw: true,
          transaction,
        }
      )
      .then((data) => data[1]);
    await transaction.commit();
    const updateGuestObject = updateGuest[0];
    return updateGuestObject;
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    throw error;
  }
}

module.exports = {
  getUserByEmail,
  registerUser,
  registerAdmin,
  adminApproval,
  userApproval,
  getAllUsers,
  getAlladmins,
  registerGuest,
  updateGuest,
};
