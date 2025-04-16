const isAdmin = (req, res, next) => {
	if (!req.user || req.user['role.role_type'] !== 'admin') {
		return res.status(403).json({ message: 'Permission denied you are not a admin ' });
	}
	next();
};

module.exports = isAdmin;
