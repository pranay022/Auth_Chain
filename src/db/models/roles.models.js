module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define(
    "roles",
    {
      id: {
        type: DataTypes.INTERGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true,
      },
      auth_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: "ACTIVE",
        allowNull: true,
      },
    },
    {
      tableName: "roles",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return roles; 
};
