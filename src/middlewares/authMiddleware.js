
const checkAdminOrSuperAdmin = (req, res, next) => {
  const roleType = req.user["role.role_type"]
  
  if (!roleType || (roleType !== "ADMIN" && roleType !== "SUPER_ADMIN")) {
    return res
      .status(403)
      .json({ message: "Access denied. Only administrators and super administrators can access this resource.",});
  }
  next();
};

const checkAdmin = async (req, res, next) => {
  if (!req.user || req.user["role.role_type"] !== "ADMIN") {
    return res
      .status(403)
      .json({ message: "Access denied. Only administrators can access this resource." });
  }
  next();
};

const checkSuperAdmin = async (req, res, next) => {
  if (!req.user || req.user["role.role_type"] !== "SUPER_ADMIN") {
    return res
      .status(403)
      .json({ message: "Access denied. Only super administrators can access this resource. " });
  }
  next();
};

module.exports = {
  checkAdminOrSuperAdmin,
  checkSuperAdmin,
  checkAdmin,
};
