module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define(
    'roles',
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
      role_type:{
        type: DataTypes.ENUM('SUPER_ADMIN', 'ADMIN', 'USER', 'GUEST'),
				defaultValue: 'GUEST',
				allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false, 
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW,
      }
    },
    {
      tableName: 'roles',
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return roles; 
};
