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
			email: {
				type: DataTypes.STRING,
				allowNUll: true,
			  },
			role_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			is_verifyed: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
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

	users.associate = (models) => {
		users.belongsTo(models.roles, {
			foreignKey : 'role_id',
			as: 'role'
		});
	};

	return users;
};
