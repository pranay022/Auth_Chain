module.exports = (sequelize, DataTypes) => {
	const users = sequelize.define(
		'users',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			role_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			status: {
				type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'BLOCKED'),
				defaultValue: 'ACTIVE',
				allowNull: true,
			},
			created_at: {
				allowNull: false,
				defaultValue: DataTypes.NOW,
				type: DataTypes.DATE,
			},
			updated_at: {
				allowNull: false,
				defaultValue: DataTypes.NOW,
				type: DataTypes.DATE,
			},
		},
		{
			tableName: 'users',
			timestamps: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		}
	);
	return users;
};
